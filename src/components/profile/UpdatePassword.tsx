"use client"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { updatePasswordSchema } from "@/src/schema/profile"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


export default function UpdatePassword() {
    /**
   * ! STATE (état, données) de l'application
   */

    const [isEditingPassword, setIsEditingPassword] = useState(false)


    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    const handleUpdatePassword = () => {
        console.log("Mot de passe mis à jour !")
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="mt-4  pb-4">

            {isEditingPassword ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Mot de passe actuel</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                       placeholder="**************"
                                                        {...field}
                                                        className="bg-gray-50 focus:bg-white focus:outline-none border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Nouveau mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                        placeholder="**************"
                                                        className="bg-gray-50 focus:bg-white focus:outline-none border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="confirmNewPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Confirmer le nouveau mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="**************"
                                                        {...field}
                                                        className="bg-gray-50 focus:bg-white focus:outline-none border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button type="submit" size="sm" className="bg-blue-900 hover:bg-blue-950 rounded-sm font-inter shadow-sm">
                                    Mettre à jour le mot de passe
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditingPassword(false)}
                                    size="sm"
                                    variant="ghost"
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
