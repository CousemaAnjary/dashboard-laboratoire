"use client"
import { Button } from "../ui/button"
import UpdateEmail from "./UpdateEmail"
import { FcLock } from "react-icons/fc"
import UpdatePassword from "./UpdatePassword"
import { authClient } from "@/src/lib/auth-client"


export default function SignInMethod() {
    /**
     * ! STATE (état, données) de l'application
     */
 

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="bg-white mt-4 shadow-sm border rounded-md">
            <div className="p-4 border-b">
                <h2 className="font-spaceGrotesk font-semibold text-gray-800">Méthode de connexion</h2>
            </div>
            <div className="px-6 pb-6">
                <UpdateEmail />
                <UpdatePassword />

                {/* 🔐 Sécurité : 2FA */}
                <div className="mt-2 flex justify-between items-center gap-3 rounded-md  border-blue-300 border-dotted border bg-blue-50 p-4">
                    <div className="flex items-start gap-2">
                        <span className="text-blue-500 text-3xl">🔒</span>
                        <div>
                            <h3 className="font-inter font-semibold text-gray-800">Sécurisez votre compte</h3>
                            <p className="text-xs text-muted-foreground font-spaceGrotesk">
                                L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.
                                Vous devrez fournir un code à 6 chiffres lors de la connexion.
                            </p>
                        </div>
                    </div>
                    <Button size={"sm"} className="rounded-sm bg-blue-900 text-sm hover:bg-blue-950 font-spaceGrotesk">
                        Activer 2FA
                    </Button>
                </div>
            </div>
        </div>
    )
}