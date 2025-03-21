"use client"
import { z } from "zod"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { VerifyEmailSchema } from "@/src/schema/auth"
import { verifyEmail } from "@/app/server/auth/auth.actions"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/src/components/ui/input-otp"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form"


const OTP_EXPIRATION_TIME = 600
const RESEND_COOLDOWN_TIME = 30


export default function EmailVerified() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [loading, setLoading] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [otpExpiration, setOtpExpiration] = useState(OTP_EXPIRATION_TIME)


    const form = useForm<z.infer<typeof VerifyEmailSchema>>({
        resolver: zodResolver(VerifyEmailSchema),
        defaultValues: {
            pin: "",
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // ⏳ Timer pour l'expiration de l'OTP
    useEffect(() => {
        const interval = setInterval(() => {
            setOtpExpiration((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // ⏳ Timer pour le cooldown du renvoi
    useEffect(() => {
        if (resendCooldown === 0) return
        const interval = setInterval(() => {
            setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [resendCooldown])


    const handleVerifyOtp = async (data: z.infer<typeof VerifyEmailSchema>) => {
        // Affichage du loader pendant le chargement
        setLoading(true)
        try {
            const response = await verifyEmail(data)
        }
        catch (error) {
            console.error("Erreur de vérification du code OTP :", error)
        }
        finally { setLoading(false) }
    }

    const handleResendOtp = async () => {
        console.log("Renvoyer le code")
    }

    const minutes = Math.floor(otpExpiration / 60)
    const seconds = otpExpiration % 60


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="relative w-full max-w-md p-8 text-center">
            <h1 className="mb-4 font-spaceGrotesk text-2xl font-medium">Vérifier votre adresse email</h1>

            <p className="mb-4 font-spaceGrotesk text-sm text-muted-foreground">
                Un code de vérification à 6 chiffres a été envoyé à votre adresse e-mail.
                Veuillez entrer ce code ci-dessous pour confirmer votre compte.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleVerifyOtp)}>
                    <div className="mb-4 flex justify-center">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} autoFocus className="flex justify-center gap-2">
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} className="bg-white font-inter" />
                                                <InputOTPSlot index={1} className="bg-white font-inter" />
                                                <InputOTPSlot index={2} className="bg-white font-inter" />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} className="bg-white font-inter" />
                                                <InputOTPSlot index={4} className="bg-white font-inter" />
                                                <InputOTPSlot index={5} className="bg-white font-inter" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Votre code de vérification à 6 chiffres <span> expirera dans {minutes} min {seconds} sec</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-blue-900 font-inter hover:bg-blue-950">
                        {loading ? (
                            <>
                                <Loader className="mr-2 size-4 animate-spin" />
                                Veuillez patienter
                            </>
                        ) : (
                            " Confirmer le code"
                        )}
                    </Button>


                    {/* ✅ Message en cas de non-réception */}
                    <p className="mt-4 font-inter text-sm text-gray-600">
                        Vous n&apos;avez pas reçu le code ?{" "}
                        <button
                            type="button"
                            className="font-spaceGrotesk text-blue-600 hover:underline"
                            onClick={handleResendOtp}
                            disabled={resendCooldown > 0}
                        >
                            {resendCooldown > 0 ? `Réessayer dans ${resendCooldown}s` : "Renvoyer le code"}
                        </button>
                    </p>
                </form>
            </Form>
        </div>
    )
}