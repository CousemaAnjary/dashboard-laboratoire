"use server"
import { z } from "zod"
import { auth } from "@/src/lib/auth"
import { updateUserSchema } from "@/src/schema/profile"


export async function updateUser(data: z.infer<typeof updateUserSchema>) {
    try {
        // validation des données
        const validatedData = updateUserSchema.safeParse(data)
        if (!validatedData.success) return { success: false, error: "Données invalides" }

        // Extraire les données validées
        const { name } = validatedData.data

        // Mise à jour de l'utilisateur
        await auth.api.updateUser({ body: { name } })

        // Retourner le message de succès
        return { success: true, message: "Utilisateur mis à jour avec succès" }

    }
    catch (error) {
        console.error("Erreur de mise à jour de l'utilisateur :", error)
        return { success: false, error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." }
    }
}