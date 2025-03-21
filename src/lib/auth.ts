import db from "@/db/drizzle"
import * as schema from "@/db/schema"
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { emailOTP, openAPI } from "better-auth/plugins"
import { sendEmail } from "@/app/server/auth/email.actions"
import { drizzleAdapter } from "better-auth/adapters/drizzle"


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
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },

    plugins: [
        openAPI(), // Expose an OpenAPI schema at /api/auth/reference
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {

                let subject = "Code de vérification [Laboratoire]"

                if (type === "sign-in") {
                    subject = "Connexion avec OTP"

                } else if (type === "forget-password") {
                    subject = "Réinitialisation de mot de passe"
                }

                await sendEmail({ to: email, subject, otp })
            }

        }),
        nextCookies(),
    ]
})