
import db from "@/db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import * as schema from "@/db/schema"


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
        usePlural: true
    }),

    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true,
    }
})