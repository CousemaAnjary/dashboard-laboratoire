"use client"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { authClient } from "@/src/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema } from "@/src/schema/profile"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"


export default function ProfileDetails() {
    /**
     * ! STATE (état, données) de l'application
     */
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
    const handleUpdateUser = (data: any) => {
        console.log("Données utilisateur mises à jour :", data)
    }

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="bg-white mt-6 shadow-sm  rounded-md" >
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
                                                        placeholder={session?.user?.name }
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
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium font-inter">Image (optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="bg-gray-50  focus:bg-white border-none shadow placeholder:text-slate-500 font-inter rounded-sm dark:bg-zinc-950"
                                                        onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : null) }}
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
                                >
                                    Effacer
                                </Button>
                                <Button size={"sm"} className="rounded-sm bg-blue-900 text-sm hover:bg-blue-950 font-spaceGrotesk">
                                    Enregistrer les modifications
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div >
    )
}