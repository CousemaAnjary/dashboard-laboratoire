"use client";
import { useState } from "react"
import { Button } from "../ui/button"

export default function SignInMethod() {
    const [email, setEmail] = useState("support@keenthemes.com");
    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState(email);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const handleUpdateEmail = () => {
        // 🔒 Ajoute ici la logique pour mettre à jour l'email (API call)
        setEmail(newEmail);
        setIsEditing(false);
    }

    const handleUpdatePassword = () => {
        if (newPassword !== confirmNewPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        // 🔒 Ajouter la logique pour changer le mot de passe (API call)
        console.log("Mot de passe mis à jour !");
        setIsEditingPassword(false);
    }

    return (
        <div >
            {/* 🔑 Titre */}
            <h2 className=" font-spaceGrotesk font-semibold text-gray-800">Méthode de connexion</h2>

            {/* 📧 Modification d'email */}
            <div className="mt-4 border-b pb-4">
                {isEditing ? (
                    <>
                        <label className="block text-sm font-medium text-gray-600">Nouvelle adresse e-mail</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        <label className="mt-3 block text-sm font-medium text-gray-600">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={handleUpdateEmail}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Mettre à jour l'email
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="rounded-md px-4 py-2 text-sm text-gray-600 hover:underline"
                            >
                                Annuler
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm font-medium  font-inter">Adresse e-mail</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground font-spaceGrotesk font-medium">{email}</span>
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                            >
                                Modifier l'email
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* 🔑 Modification du mot de passe */}
            <div className="mt-4 border-b pb-4">
                {isEditingPassword ? (
                    <>
                        <label className="block text-sm font-medium text-gray-600">Mot de passe actuel</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        <label className="mt-3 block text-sm font-medium text-gray-600">Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        <label className="mt-3 block text-sm font-medium text-gray-600">Confirmer le nouveau mot de passe</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            Le mot de passe doit contenir au moins 8 caractères et inclure des symboles.
                        </p>

                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={handleUpdatePassword}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Mettre à jour le mot de passe
                            </button>
                            <button
                                onClick={() => setIsEditingPassword(false)}
                                className="rounded-md px-4 py-2 text-sm text-gray-600 hover:underline"
                            >
                                Annuler
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm font-medium text-gray-600">Mot de passe</p>
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm text-gray-800">**********</span>
                            <button
                                onClick={() => setIsEditingPassword(true)}
                                className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* 🔐 Sécurité : 2FA */}
            <div className="mt-4 flex flex-col gap-3 rounded-md border border-blue-200 bg-blue-50 p-4">
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
    );
}
