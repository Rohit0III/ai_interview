
import { db } from "@/Database"
import { agents } from "@/Database/schema"
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { agentInsertSchema } from "../schemas"
import z from "zod"
import { eq, getTableColumns, sql } from "drizzle-orm"



export const agentsRouter = createTRPCRouter({
     // TODO: Change "getOne" to use "proctectedProcedure"
    getOne:protectedProcedure
    .input(z.object({id:z.string()}))
    .query(async ({input})=>{
        const [existingAgent] = await db
        .select(
          {
            // TODO: Change to actual meeting count
            meetingCount: sql`COUNT(5)`,
          ...getTableColumns(agents),
        }
        )
        .from(agents)
        .where(eq(agents.id, input.id))
        
        return existingAgent
    }),
    
    // TODO: Change "getmany" to use "proctectedProcedure"
    getMany:protectedProcedure.query(async ()=>{
        const data = await db.select()
        .from(agents)
        return data
    }),

    // You need to define an input schema, for example using zod:
    // import { z } from "zod"
    // input: z.object({ name: z.string() })
   create: protectedProcedure
  .input(agentInsertSchema)
  .mutation(async ({input ,ctx}) =>{
    const [createdAgent] = await db.insert(agents).values({
        ...input,
        userId: ctx.auth.user.id,
        instructions: input.instructions, // Ensure the correct property is set
    })
    .returning();

    return createdAgent;
  }),
})

