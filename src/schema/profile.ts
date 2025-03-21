import { z } from "zod"


export const updateEmailSchema = z.object({
    newEmail: z.string().email("L'adresse email est invalide"),
    confirmPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})