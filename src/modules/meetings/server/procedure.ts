
import { db } from "@/Database"
import {  meetings } from "@/Database/schema"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import z from "zod"
import { and, desc, count, eq, getTableColumns, ilike } from "drizzle-orm"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants"
import { TRPCError } from "@trpc/server"




export const meetingsRouter = createTRPCRouter({

  // TODO: Change "getOne" to use "proctectedProcedure"
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select(
          {
            // TODO: Change to actual meeting count
            ...getTableColumns(meetings),
          }
        )
        .from(meetings)
        .where(
          and
            (
              eq(meetings.id, input.id),
              eq(meetings.userId, ctx.auth.user.id)
            )
        )

      if (!meetings) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not Found" })
      }
      return existingMeeting
    }),

  // TODO: Change "getmany" to use "proctectedProcedure"
  getMany: protectedProcedure
    .input(
      z.object(
        {
          page: z.number().default(DEFAULT_PAGE),
          pageSize: z.number()
            .min(MIN_PAGE_SIZE)
            .max(MAX_PAGE_SIZE)
            .default(DEFAULT_PAGE_SIZE),
          search: z.string().nullish(),
        }
      )
    )
    .query(
      async ({ ctx, input }) => {
        const { search, page, pageSize } = input
        const data = await db
          .select(
            {
              ...getTableColumns(meetings),
            }
          )
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}$%`) : undefined
            )
          ).orderBy(
            desc(meetings.createdAt), desc(meetings.id)
          ).limit(pageSize)
          .offset((page - 1) * pageSize)

        const [total] = await db
          .select({ count: count() })
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}$%`) : undefined
            )
          )

        const totalPages = Math.ceil(total.count / pageSize)
        return {
          items: data,
          total: total.count,
          totalPages,
        }
      }
    ),

  // You need to define an input schema, for example using zod:
  // import { z } from "zod"
  // input: z.object({ name: z.string() })
  
})

