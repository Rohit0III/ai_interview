import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../Database";
import * as schema from "../Database/schema"; // Fixed import

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema:{
            ...schema,
        }, // ✅ Required to recognize user/session/etc.
    }),
});
