"use client"
import Navbar from "@/src/components/dashboard-panel/Navbar"
import AppSidebar from "@/src/components/dashboard-panel/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"
import { useSidebarStore } from "@/src/components/dashboard-panel/hooks/use-sibebar-toggle"


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const { open, setOpen, } = useSidebarStore()

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <SidebarProvider open={open} onOpenChange={setOpen} className="bg-slate-50">
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