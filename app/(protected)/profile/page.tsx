"use client"
import Image from "next/image"
import { authClient } from "@/src/lib/auth-client"
import profileCover from "@/public/images/profile-cover-2.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"


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

            <div className="mx-auto rounded-lg bg-white shadow-sm">
                {/* 🎨 Couverture */}
                <div className="relative h-64 w-full">
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
                        <Avatar className="h-36 w-36 rounded-xl border-4 border-white">
                            <AvatarImage
                                src={session?.user?.image || "/images/default-avatar.png"} // ✅ Fallback image
                                alt="@shadcn"
                            />
                            <AvatarFallback className="rounded-xl">JD</AvatarFallback>
                        </Avatar>
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
        </>
    )
}