"use client";
import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "sidebarState";

export default function useSidebarToggle() {
    const [open, setOpen] = useState<boolean | null>(null);

    // Charger l'état depuis sessionStorage au premier rendu
    useEffect(() => {
        const savedState = sessionStorage.getItem(SIDEBAR_STATE_KEY);
        setOpen(savedState ? JSON.parse(savedState) : true);
    }, []);

    // Sauvegarder l'état à chaque changement
    useEffect(() => {
        if (open !== null) {
            sessionStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(open));
        }
    }, [open]);

    return { open: open ?? true, setOpen };
}
