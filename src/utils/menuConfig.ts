import { menuItems } from "./menu"
import { Group } from "../typeScript/menu"


/**
 * Génère dynamiquement le menu avec l'état actif basé sur l'URL actuelle.
 * @param pathname URL actuelle
 * @returns Liste des groupes de menu avec `active: boolean`
 */
export function getMenu(pathname: string): Group[] {
    return menuItems.map((group) => ({
        ...group,
        menus: group.menus.map((menu) => {
            const isActive =
                pathname === menu.href || (menu.submenus?.some(sub => sub.href === pathname));

            return {
                ...menu,
                active: isActive,
                submenus: menu.submenus
                    ? menu.submenus.map((submenu) => ({
                        ...submenu,
                        active: pathname === submenu.href,
                    }))
                    : [],
            };
        }),
    }));
}
