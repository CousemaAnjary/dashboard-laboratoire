"use client"
import Image from "next/image"
import { authClient } from "@/src/lib/auth-client"
import profileCover from "@/public/images/profile-cover-2.jpg"
import SignInMethod from "@/src/components/profile/SignInMethod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"


export default function Profile() {
    /**
     * ! STATE (état, données) de l'application
     */

    const { data: session } = authClient.useSession()



    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="mb-8 flex w-full items-center justify-between rounded-md bg-white p-4 ">
                <h1 className="font-spaceGrotesk font-medium text-gray-800">Mes informations personnelles</h1>
            </div>

            <div className="mx-auto overflow-hidden rounded-md bg-white shadow-sm">
                {/* 🎨 Couverture */}
                <div className="relative h-72 w-full">
                    <Image
                        src={profileCover} // Remplace avec ton image
                        alt="Cover"
                        layout="fill"
                        objectFit="cover"

                    />
                </div>

                {/* 🏅 Profil */}
                <div className="relative -mt-20 flex flex-col items-start px-6 pb-6">
                    <div className="relative">
                        {/* ✅ Affichage de l'image dynamique avec fallback */}
                        <div className="h-36 w-36 overflow-hidden rounded-xl border-4 border-white ">
                            {session?.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="Profile picture"
                                    width={144}
                                    height={144}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-3xl font-semibold text-gray-700"> CN</div>
                            )}
                        </div>
                    </div>

                    {/* 📌 Informations */}
                    <h2 className="mt-2 font-inter font-semibold text-gray-800">
                        {session?.user?.name}
                    </h2>
                    <p className="text-sm font-spaceGrotesk text-gray-600 text-center text-muted-foreground">
                        Explorateur curieux, toujours en quête de nouvelles expériences
                    </p>

                    {/* 🔹 Métadonnées */}
                    {/* <p className="mt-2 text-sm text-gray-500">
                        UI/UX Design • Austin, TX • <span className="font-semibold">3,450 Followers</span>
                    </p> */}

                    {/* 🎛️ Boutons */}
                    {/* <div className="mt-4 flex gap-2">
                        <button className="rounded-lg border px-4 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100">
                            Send Message
                        </button>
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow-md hover:bg-blue-700">
                            Follow
                        </button>
                    </div> */}
                </div>
            </div>

            <Tabs defaultValue="Settings" className=" mt-6 rounded-lg p-1 py-1.5">
                <TabsList className=" flex justify-start space-x-4 p-2 py-6 bg-slate-100 w-full ">
                    <TabsTrigger className="p-2 font-inter rounded-sm" value="account">Vue générale</TabsTrigger>
                    <TabsTrigger className="p-2 font-inter rounded-sm" value="Settings">Paramètres</TabsTrigger>
                    <TabsTrigger className="p-2 font-inter rounded-sm" value="Security">Sécurité</TabsTrigger>
                    <TabsTrigger className="p-2 font-inter rounded-sm" value="delete">Supprimer le compte</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="bg-white mt-4 shadow-sm p-2 px-3 rounded-md">
                    <div>
                        <h1>Vue générale</h1>
                        <p>Informations générales</p>
                    </div>
                </TabsContent>
                <TabsContent value="Settings" className="bg-white mt-4 shadow-sm  rounded-md">
                    <SignInMethod />
                </TabsContent>
            </Tabs>
        </>
    )
}