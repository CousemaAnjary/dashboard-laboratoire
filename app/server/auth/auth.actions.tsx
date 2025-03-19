"use server"
import { z } from "zod"
import db from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { LoginSchema, RegisterSchema } from "@/src/lib/schemas/auth"

// Enregistre un utilisateur
export async function register(data: z.infer<typeof RegisterSchema>) {
    try {
        // Validation des données 
        const validatedData = RegisterSchema.safeParse(data)
        if (!validatedData.success) return { success: false, message: "Données invalides" }

        // Extraire les données validées
        const { lastname, firstname, email, password } = validatedData.data
        const fullName = `${lastname} ${firstname}`.trim()

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })



    }
    catch (error) {
        console.error("Erreur d'inscription :", error)
    }
}

// Connecte un utilisateur
export async function login(data: z.infer<typeof LoginSchema>) { }

// Vérifie un utilisateur par email avec OTP
export async function verifyEmail() { }