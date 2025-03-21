import { Group } from "../typeScript/menu"
import { House, Key, LayoutDashboard, Receipt, Settings2, SquareKanban, Users } from "lucide-react"


export const menuConfig: Group[] = [
    {
        groupLabel: "Tableaux de bord",
        menus: [
            {
                label: "Administration",
                href: "/dashboard",
                icon: House,
                submenus: []
            },
            {
                label: "Tableau de bord",
                href: "#",
                icon: LayoutDashboard,
                submenus: [
                    {
                        label: "Kanban-board",
                        href: "#",
                    },
                    {
                        label: "Facturation",
                        href: "/#",
                    },
                ]
            },
        ]
    },
    // Groupe de menus pour les applications
    {
        groupLabel: "Applications",
        menus: [
            {
                label: "Kanban",
                href: "#",
                icon: SquareKanban,
            },
            {
                label: "Facturation",
                href: "/dashboard/facturation",
                icon: Receipt,
            },

        ]
    },
    // Groupe de menus pour les paramètres
    {
        groupLabel: "Paramètres",
        menus: [
            {
                label: "Configurations",
                href: "#",
                icon: Settings2,
            },
            {
                label: "Droit d'accès",
                href: "/droit-acces",
                icon: Key,

            },
            {
                label: "Rôles et Permissions",
                href: "/roles-permissions",
                icon: Users,
            }
        ]
    },
]

export const menuItems = menuConfig