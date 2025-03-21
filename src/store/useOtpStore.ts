import { create } from "zustand";

const OTP_EXPIRATION_TIME = 600;
const RESEND_COOLDOWN_TIME = 30;

interface OtpState {
    otpRemaining: number;
    cooldownRemaining: number;
    startOtpTimer: () => void;
    startCooldown: () => void;
    hydrateFromSession: () => void;
}

export const useOtpStore = create<OtpState>((set) => {
    let interval: NodeJS.Timeout;

    const tick = () => {
        const now = Date.now();
        const otpEnd = sessionStorage.getItem("otp_end_time");
        const cooldownEnd = sessionStorage.getItem("resend_cooldown_end");

        set(() => ({
            otpRemaining: otpEnd
                ? Math.max(Math.floor((parseInt(otpEnd) - now) / 1000), 0)
                : 0,
            cooldownRemaining: cooldownEnd
                ? Math.max(Math.floor((parseInt(cooldownEnd) - now) / 1000), 0)
                : 0,
        }));
    };

    const startInterval = () => {
        clearInterval(interval);
        interval = setInterval(tick, 1000);
    };

    return {
        otpRemaining: 0,
        cooldownRemaining: 0,

        startOtpTimer: () => {
            const end = Date.now() + OTP_EXPIRATION_TIME * 1000;
            sessionStorage.setItem("otp_end_time", end.toString());
            tick();
            startInterval();
        },

        startCooldown: () => {
            const end = Date.now() + RESEND_COOLDOWN_TIME * 1000;
            sessionStorage.setItem("resend_cooldown_end", end.toString());
            tick();
            startInterval();
        },

        hydrateFromSession: () => {
            tick();
            startInterval();
        },
    };
});