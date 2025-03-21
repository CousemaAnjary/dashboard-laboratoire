"use client"
import { z } from "zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateEmailSchema } from "@/src/schema/profile"
import { Input } from "../ui/input"


export default function SignInMethod() {
    const [email, setEmail] = useState("support@keenthemes.com")

    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState(email);
    const [confirmPassword, setConfirmPassword] = useState("")

    const form = useForm<z.infer<typeof updateEmailSchema>>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            newEmail: email,
            confirmPassword: "",
        },
    })


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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdateEmail)}>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="newEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-inter">Nouvelle adresse e-mail</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder={field.value} onChange={field.onChange} className="bg-white font-inter  dark:bg-zinc-950" />
                                                    </FormControl>
                                                    <FormMessage className="font-inter" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-inter">Confirmer le mot de passe</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Entrez votre mot de passe" className="bg-white font-inter  dark:bg-zinc-950" />
                                                    </FormControl>
                                                    <FormMessage className="font-inter" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size={"sm"}
                                        className="bg-blue-900 hover:bg-blue-950 rounded-sm font-inter shadow-sm "
                                    >
                                        Modifier l'email
                                    </Button>
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        size={"sm"}
                                        variant={"ghost"}
                                        className="rounded-sm font-inter shadow"
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>


                ) : (
                    <>
                        <p className="text-sm font-medium font-inter">Adresse e-mail</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground font-spaceGrotesk font-medium">{email}</span>
                            <Button
                                onClick={() => setIsEditing(true)}
                                size={"sm"}
                                variant={"outline"}
                                className="rounded-sm font-inter shadow-sm "
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
                        <p className="text-sm font-medium font-inter">Mot de passe</p>
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground font-inter">**************</span>
                            <Button
                                onClick={() => setIsEditing(true)}
                                size={"sm"}
                                variant={"outline"}
                                className="rounded-sm font-spaceGrotesk shadow-sm "
                            >
                                Réinitialiser le mot de passe
                            </Button>
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
