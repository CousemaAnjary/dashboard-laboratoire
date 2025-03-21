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
    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .optional() // ✅ rendu optionnel
        .or(z.literal("")),
    image: z
        // Vérifie que l’entrée est bien un fichier (File).
        .custom<File>((value) => value instanceof File, {
            message: "Le fichier doit être un fichier valide.",
        })

        //Vérifie que le fichier est une image (par exemple, image/png, image/jpeg)
        .refine((file) => file?.type.startsWith("image/"), {
            message: "Le fichier doit être une image.",
        })

        //Vérifie que la taille du fichier est inférieure à 5 Mo
        // .refine((file) => file?.size < 5 * 1024 * 1024, {
        //     message: "Le fichier doit être inférieur à 5 Mo.",
        // }),

        .optional()
})