"use server"
import React from 'react'
import nodemailer from 'nodemailer'
import { render } from '@react-email/components'
import VerifyEmail from '@/src/components/email/VerifyEmail'

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a4ba81eaabcc40",
        pass: "bbee333bcbe5ff"
    }
})

export async function sendEmail({ to, subject, otp }: { to: string; subject: string; otp: string }) {
    try {
        // 📨 Générer le contenu HTML de l'email
        const emailHtml = await render(React.createElement(VerifyEmail, { verificationCode: otp }))


        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: emailHtml,
        })
        return { success: true }

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}