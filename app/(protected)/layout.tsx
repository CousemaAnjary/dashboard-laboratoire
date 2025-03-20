import { cookies } from "next/headers"
import Navbar from "@/src/components/dashboard-panel/Navbar"
import AppSidebar from "@/src/components/dashboard-panel/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <SidebarProvider defaultOpen={defaultOpen} className="bg-slate-50" >
            <AppSidebar />
            <SidebarInset className="relative h-screen overflow-x-hidden bg-slate-50"> {/* Ajoutez overflow-x-hidden */}
                <Navbar />
                <main className="py-8 sm:px-8"> {/* Ajoutez overflow-x-auto */}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )

}