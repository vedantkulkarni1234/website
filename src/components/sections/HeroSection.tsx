"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button, Terminal, AnimatedBackground, FloatingOrbs } from "@/components/ui";
import { STATS } from "@/lib/constants";

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-void via-surface to-void flex items-center justify-center">
            <div className="spinner" />
        </div>
    ),
});

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <AnimatedBackground />
                <FloatingOrbs />
            </div>

            {/* 3D Background */}
            <HeroScene />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void pointer-events-none z-10" />

            {/* Aurora effect */}
            <div className="aurora" />

            {/* Content */}
            <div className="container relative z-20 px-4 lg:px-8 py-20 lg:py-24">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface/60 backdrop-blur-md border border-border/60 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-300">
                            v2.1.0 — 17 Extensions Available
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        <span className="text-white">The </span>
                        <GlitchText
                            text="Hacker's"
                            className="text-cyan"
                            glitchOnHover
                            intensity="medium"
                        />
                        <br className="hidden sm:block" />
                        <span className="text-white"> Arsenal for </span>
                        <span className="text-gradient">Bug Bounty</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Elite browser extensions that transform complex reconnaissance
                        workflows into{" "}
                        <span className="text-cyan font-medium">powerful, streamlined operations</span>.
                        Find what others miss.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href="/extensions">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={<ArrowRight className="w-5 h-5" />}
                                iconPosition="right"
                            >
                                Explore Extensions
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button variant="secondary" size="lg">
                                View Pricing
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Terminal Demo */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Terminal className="shadow-2xl shadow-cyan/10" />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-16 max-w-3xl mx-auto"
                    >
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="group text-center p-5 lg:p-6 bg-surface/60 backdrop-blur-md border border-cyan/20 rounded-2xl card-lift relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <motion.div
                                        className="text-2xl sm:text-3xl font-bold text-cyan mb-1"
                                        animate={{ textShadow: ["0 0 20px rgba(0,255,255,0.3)", "0 0 40px rgba(0,255,255,0.6)", "0 0 20px rgba(0,255,255,0.3)"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-gray-500 font-medium">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5 text-cyan animate-bounce" />
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;
