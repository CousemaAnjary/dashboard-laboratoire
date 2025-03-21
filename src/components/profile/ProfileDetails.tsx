import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod";
import { updateUserSchema } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

export default function ProfileDetails() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
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
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-inter">Nom</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="ABDILLAH" className="bg-white font-inter  dark:bg-zinc-950" />
                                                    </FormControl>
                                                    <FormMessage className="font-inter" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="firstname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-inter">Prénom</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Cousema Anjary" className="bg-white font-inter  dark:bg-zinc-950" />
                                                    </FormControl>
                                                    <FormMessage className="font-inter" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-inter">Image (optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="shadow-sm bg-white font-inter text-xs"
                                                        onChange={(e) => { field.onChange(e.target.files ? e.target.files[0] : null) }}
                                                    />
                                                </FormControl>
                                                <FormMessage className="font-inter" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div >
    )
}