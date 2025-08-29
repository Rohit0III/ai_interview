import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: process.env.BETTER_AUTH_URL! || "http://localhost:3000",
    baseURL:"https://ai-interview-pink-xi.vercel.app",

    plugins:[polarClient(),],
})