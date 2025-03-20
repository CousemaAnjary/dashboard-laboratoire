"use server"
import { z } from "zod"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { auth } from "@/src/lib/auth"
import { LoginSchema, RegisterSchema } from "@/src/schema/auth"


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

        return { success: true, message: "Inscription réussie. Vérifiez votre email" }
    }
    catch (error) {
        console.error("Erreur d'inscription :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}

// connexion d'un utilisateur
export async function login(data: z.infer<typeof LoginSchema>) { }

// Vérifie un utilisateur par email avec OTP
export async function verifyEmail() { }