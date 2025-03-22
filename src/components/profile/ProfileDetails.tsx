"use client"
import { z } from "zod"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { authClient } from "@/src/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema } from "@/src/schema/profile"
import { updateUser } from "@/app/server/profile/profile.actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


export default function ProfileDetails() {
    /**
     * ! STATE (état, données) de l'application
     */
    const [loading, setLoading] = useState(false)
    const { data: session } = authClient.useSession()


    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: "",
            image: undefined
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    const handleUpdateUser = async (data: z.infer<typeof updateUserSchema>) => {
        // Affichage du loader pendant le chargement
        setLoading(true)
        try {
            await authClient.updateUser({ name: data.name })

            // Vider le formulaire après la soumission
            form.reset({
                name: "",
                image: undefined
            })
        }
        catch (error) {
            console.error("Erreur de mise à jour de l'utilisateur :", error)
        }
        finally { setLoading(false) }
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="bg-white mt-6 shadow-sm  rounded-md">
            <div className="p-4 border-b">
                <h2 className="font-spaceGrotesk font-semibold text-gray-800">Détails du profil</h2>
            </div>

            <div className="px-6 pb-6">
                <div className="mt-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdateUser)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Nom complet</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder={session?.user?.name}
                                                        className="bg-gray-50 focus:bg-white border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2 ">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Image (optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="bg-gray-50 focus:bg-white border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-6 gap-2 justify-end">
                                <Button
                                    type="reset"
                                    size={"sm"}
                                    variant="secondary"
                                    className="rounded-sm font-inter shadow"
                                    onClick={() => form.reset()}

                                >
                                    Effacer
                                </Button>
                                <Button size={"sm"} className="rounded-sm bg-blue-900 text-sm hover:bg-blue-950 font-spaceGrotesk">
                                    {loading ? (
                                        <>
                                            <Loader className="mr-2 size-4 animate-spin" />
                                            Veuillez patienter
                                        </>
                                    ) : (
                                        "Enregistrer les modifications"
                                    )}

                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div >
    )
}