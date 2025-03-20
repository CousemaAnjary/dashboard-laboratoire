import { SidebarProvider } from "@/src/components/ui/sidebar"

export default function DashboardLayout() {
    /**
     * ! STATE (état, données) de l'application
     */


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