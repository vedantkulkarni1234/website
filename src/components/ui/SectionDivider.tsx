"use client";

import { motion } from "framer-motion";

export function WaveDivider() {
    return (
        <div className="w-full overflow-hidden leading-none">
            <svg
                className="relative block w-full h-[80px]"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill="currentColor"
                    className="text-void"
                    animate={{
                        d: [
                            "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                            "M321.39,46.44c58-20.79,114.16-40.13,172-51.86,82.39-6.72,168.19-7.73,250.45,9.61C823.78,41,906.67,62,985.66,102.83c70.05,8.48,146.53,16.09,214.34-7V0H0V17.35A600.21,600.21,0,0,0,321.39,46.44Z",
                            "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                        ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}

export function GradientDivider() {
    return (
        <div className="w-full h-px relative overflow-hidden">
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--color-cyan), var(--color-purple), transparent)",
                }}
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}

export function GlowingLine() {
    return (
        <div className="relative w-full h-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple to-transparent h-[2px]"
                animate={{
                    x: ["-100%", "200%"],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}

export function AnimatedBorder({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative group">
            <motion.div
                className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan via-purple to-cyan opacity-70 blur-sm"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <div className="relative bg-void rounded-xl p-[1px]">
                {children}
            </div>
        </div>
    );
}

export function ScanningLine() {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl">
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
                animate={{
                    y: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
