"use server"


import { z } from "zod"
import { LoginSchema, RegisterSchema } from "@/src/lib/schemas/auth"

// Enregistre un utilisateur
export async function register(data: z.infer<typeof RegisterSchema>) { }

// Connecte un utilisateur
export async function login(data: z.infer<typeof LoginSchema>) { }

// Vérifie un utilisateur par email avec OTP
export async function verifyEmail() { }