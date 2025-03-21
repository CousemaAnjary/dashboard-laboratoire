"use client"
import { z } from "zod"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateEmailSchema } from "@/src/schema/profile"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


export default function UpdateEmail() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("support@keenthemes.com");

    const form = useForm<z.infer<typeof updateEmailSchema>>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            newEmail: "",
            confirmPassword: "",
        },
    });
    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */

    const handleUpdateEmail = (data: z.infer<typeof updateEmailSchema>) => {
        console.log("Email mis à jour :", data.newEmail);
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="mt-4 border-b-2 border-gray-300 border-dotted pb-4">
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
                                                <FormLabel className="text-sm font-medium font-inter">Nouvelle adresse e-mail</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder={email} // ✅ Affichage en placeholder
                                                        onChange={field.onChange}
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
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Confirmer le mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="**************"
                                                        {...field}
                                                        className="bg-gray-50  focus:bg-white border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
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
                                    Mettre à jour l'e-mail
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
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
                    <p className="text-sm font-medium font-inter">Adresse e-mail</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-spaceGrotesk font-medium">{email}</span>
                        <Button
                            onClick={() => setIsEditing(true)}
                            size="sm"
                            variant="ghost"
                            className="rounded-sm font-inter shadow"
                        >
                            Modifier l'email
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
