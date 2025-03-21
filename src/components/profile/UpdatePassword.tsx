"use client"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


export default function UpdatePassword() {
    /**
   * ! STATE (état, données) de l'application
   */
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    const handleUpdatePassword = () => {
        if (newPassword !== confirmNewPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        console.log("Mot de passe mis à jour !");
        setIsEditingPassword(false);
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="mt-4  pb-4">

            {isEditingPassword ? (
                <>
                    <label className="block text-sm font-medium text-gray-600">Mot de passe actuel</label>
                    <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                    />

                    <label className="mt-3 block text-sm font-medium text-gray-600">Nouveau mot de passe</label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                    />

                    <label className="mt-3 block text-sm font-medium text-gray-600">Confirmer le nouveau mot de passe</label>
                    <Input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        Le mot de passe doit contenir au moins 8 caractères et inclure des symboles.
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                        <Button onClick={handleUpdatePassword} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                            Mettre à jour le mot de passe
                        </Button>
                        <Button onClick={() => setIsEditingPassword(false)} className="rounded-md px-4 py-2 text-sm text-gray-600 hover:underline">
                            Annuler
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-sm font-medium font-inter">Mot de passe</p>
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-inter">**************</span>
                        <Button onClick={() => setIsEditingPassword(true)} size="sm" variant="ghost" className="rounded-sm font-inter shadow">
                            Réinitialiser le mot de passe
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
