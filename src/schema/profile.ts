import { z } from "zod"


export const updateEmailSchema = z.object({
    newEmail: z.string().email("L'adresse email est invalide"),
    confirmPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const updatePasswordSchema = z.object({
    currentPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmNewPassword: z.string()

}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
})


export const updateUserSchema = z.object({
    firstname: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    image: z.string().url("L'URL de l'image est invalide"),
})