"use server"
import { z } from "zod"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { auth } from "@/src/lib/auth"
import { cookies } from "next/headers"
import { LoginSchema, RegisterSchema, VerifyEmailSchema } from "@/src/schema/auth"


// Enregistre un utilisateur
export async function register(data: z.infer<typeof RegisterSchema>) {
    try {
        // Validation des données 
        const validatedData = RegisterSchema.safeParse(data)
        if (!validatedData.success) return { success: false, error: "Données invalides" }

        // Extraire les données validées
        const { lastname, firstname, email, password } = validatedData.data
        const fullName = `${lastname} ${firstname}`.trim()

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
        if (existingUser) return { success: false, error: "Un compte existe déjà avec cette adresse e-mail" }

        // Créer un nouvel utilisateur
        await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        // Envoyer l'OTP **en tâche de fond** pour ne pas bloquer l'inscription
        setTimeout(async () => {
            await auth.api.sendVerificationOTP({ body: { email, type: "email-verification" } })
        }, 0)

        //  Stocker l'email temporairement et rediriger vers `/verify-email`
        const cookieStore = await cookies()
        cookieStore.set("emailToVerify", email, { httpOnly: true, secure: true });

        // Retourner le message de succès
        return { success: true, message: "Inscription réussie. Vérifiez votre email" }
    }
    catch (error) {
        console.error("Erreur d'inscription :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}

// connexion d'un utilisateur
export async function login(data: z.infer<typeof LoginSchema>) {
    try {
        // Validation des données 
        const validatedData = LoginSchema.safeParse(data)
        if (!validatedData.success) return { success: false, error: "Données invalides" }

        // Extraire les données validées
        const { email, password } = validatedData.data

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await db.query.users.findFirst({ where: eq(users.email, email) })
        if (!user) return { success: false, error: "Aucun compte n'est associé à cette adresse e-mail" }

        // Connexion de l'utilisateur
        await auth.api.signInEmail({ body: { email, password } })

        // Retourner le message de succès
        return { success: true, message: "Connexion réussie" }

    }
    catch (error) {
        console.error("Erreur de connexion :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}

// Vérifie un utilisateur par email avec OTP
export async function verifyEmail(data: z.infer<typeof VerifyEmailSchema>) {
    try {
        // Récupérer l'email stocké temporairement
        const cookieStore = await cookies()
        const email = cookieStore.get("emailToVerify")?.value
        if (!email) return { success: false, error: "Email non trouvé" }

        // Validation des données 
        const validatedData = VerifyEmailSchema.safeParse(data)
        if (!validatedData.success) return { success: false, error: "Données invalides" }

        // Extraire les données validées
        const { pin } = validatedData.data

        // Vérifier l'OTP
        await auth.api.verifyEmailOTP({ body: { email, otp: pin } })

        // Supprimer les données stockées après validation
        cookieStore.delete("emailToVerify")

        // Retourner le message de succès
        return { success: true, message: "Email vérifié avec succès" }

    }
    catch (error) {
        console.error("Erreur de vérification du code OTP :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}

export async function resendOtp() {
    try {
        // Récupérer l'email stocké temporairement
        const cookieStore = await cookies()
        const email = cookieStore.get("emailToVerify")?.value
        if (!email) return { success: false, error: "Email non trouvé" }

        // Renvoyer l'OTP
        setTimeout(async () => {
            await auth.api.sendVerificationOTP({ body: { email, type: "email-verification" } })
        }, 0)

        // Retourner le message de succès
        return { success: true, message: "Code renvoyé avec succès" }
    }
    catch (error) {
        console.error("Erreur lors du renvoi du code OTP :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}