"use client"
import UpdateEmail from "./UpdateEmail"
import UpdatePassword from "./UpdatePassword"


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
        <div>
            <div className="p-4 border-b">
                <h2 className="font-spaceGrotesk font-semibold text-gray-800">Méthode de connexion</h2>
            </div>
            <div className="px-6 pb-6">
                <UpdateEmail />
                <UpdatePassword />
                {/* 🔐 Sécurité : 2FA */}
                <div className="mt-2 flex flex-col gap-3 rounded-md border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-2">
                        <span className="text-blue-500">🔒</span>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">Sécurisez votre compte</h3>
                            <p className="text-xs text-gray-600">
                                L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.
                                Vous devrez fournir un code à 6 chiffres lors de la connexion.
                            </p>
                        </div>
                    </div>
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        Activer
                    </button>
                </div>
            </div>
        </div>
    )
}