"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button, GlitchText, FloatingOrbs } from "@/components/ui";

export function CTASection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="section relative bg-void overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <FloatingOrbs />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />
            </div>

            <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Icon */}
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan to-purple mb-8 relative"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        whileHover={{ scale: 1.1, rotate: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan to-purple blur-xl opacity-50"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Zap className="w-10 h-10 text-void relative z-10" />
                        <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to{" "}
                        <GlitchText
                            text="Level Up"
                            className="text-cyan"
                            glitchOnHover
                            intensity="medium"
                        />
                        <br />
                        Your Hunting Game?
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of elite security researchers who are finding
                        more bugs, faster, with HexStrike's powerful browser extensions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/pricing">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    icon={<ArrowRight className="w-5 h-5" />}
                                    iconPosition="right"
                                    className="min-w-[200px]"
                                >
                                    Get Started Now
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/extensions">
                                <Button variant="ghost" size="lg" className="min-w-[200px]">
                                    Browse Extensions
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-center">
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <motion.div
                                className="text-3xl font-bold text-cyan"
                                animate={{ textShadow: ["0 0 20px rgba(0,255,255,0.3)", "0 0 40px rgba(0,255,255,0.6)", "0 0 20px rgba(0,255,255,0.3)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                5,000+
                            </motion.div>
                            <div className="text-sm text-gray-500 group-hover:text-cyan transition-colors">Active Hunters</div>
                        </motion.div>
                        <div className="w-px bg-border" />
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <motion.div
                                className="text-3xl font-bold text-purple"
                                animate={{ textShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 40px rgba(139,92,246,0.6)", "0 0 20px rgba(139,92,246,0.3)"] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            >
                                $2.5M+
                            </motion.div>
                            <div className="text-sm text-gray-500 group-hover:text-purple transition-colors">Bounties Found</div>
                        </motion.div>
                        <div className="w-px bg-border" />
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <motion.div
                                className="text-3xl font-bold text-matrix"
                                animate={{ textShadow: ["0 0 20px rgba(0,255,65,0.3)", "0 0 40px rgba(0,255,65,0.6)", "0 0 20px rgba(0,255,65,0.3)"] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                            >
                                17
                            </motion.div>
                            <div className="text-sm text-gray-500 group-hover:text-matrix transition-colors">Pro Extensions</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTASection;
