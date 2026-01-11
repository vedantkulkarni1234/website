"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large gradient orbs that float */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-to-br from-cyan/20 via-purple/20 to-transparent blur-[120px]"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute -bottom-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-to-tl from-purple/20 via-cyan/20 to-transparent blur-[120px]"
            />
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-green-500/10 via-cyan/10 to-transparent blur-[150px]"
            />
        </div>
    );
}

export function GradientMesh() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <svg className="w-full h-full opacity-30">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#00ffff", stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.1 }} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#00ff41", stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: "#00ffff", stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M0,200 Q400,100 800,200 T1600,200 L1600,0 L0,0 Z"
                    fill="url(#grad1)"
                    animate={{
                        d: [
                            "M0,200 Q400,100 800,200 T1600,200 L1600,0 L0,0 Z",
                            "M0,150 Q400,250 800,150 T1600,250 L1600,0 L0,0 Z",
                            "M0,200 Q400,100 800,200 T1600,200 L1600,0 L0,0 Z",
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                    d="M0,800 Q400,700 800,800 T1600,700 L1600,1080 L0,1080 Z"
                    fill="url(#grad2)"
                    animate={{
                        d: [
                            "M0,800 Q400,700 800,800 T1600,700 L1600,1080 L0,1080 Z",
                            "M0,750 Q400,850 800,750 T1600,850 L1600,1080 L0,1080 Z",
                            "M0,800 Q400,700 800,800 T1600,700 L1600,1080 L0,1080 Z",
                        ],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}

export function FloatingOrbs() {
    const orbs = [
        { size: 200, color: "cyan", top: "10%", left: "20%", delay: 0 },
        { size: 150, color: "purple", top: "60%", left: "80%", delay: 2 },
        { size: 180, color: "green", top: "40%", left: "50%", delay: 4 },
        { size: 120, color: "cyan", top: "80%", left: "10%", delay: 1 },
        { size: 160, color: "purple", top: "20%", left: "70%", delay: 3 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-3xl opacity-20 bg-${orb.color}`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        top: orb.top,
                        left: orb.left,
                        background: `radial-gradient(circle, var(--color-${orb.color}) 0%, transparent 70%)`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}
        </div>
    );
}
