"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button, GlitchText } from "@/components/ui";

export function CTASection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="section relative bg-void overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />
            </div>

            <div className="container relative mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan to-purple mb-8">
                        <Zap className="w-8 h-8 text-void" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
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
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Join thousands of elite security researchers who are finding
                        more bugs, faster, with HexStrike's powerful browser extensions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
                        <Link href="/extensions">
                            <Button variant="ghost" size="lg" className="min-w-[200px]">
                                Browse Extensions
                            </Button>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-cyan">5,000+</div>
                            <div className="text-sm text-gray-500">Active Hunters</div>
                        </div>
                        <div className="w-px bg-border" />
                        <div>
                            <div className="text-3xl font-bold text-purple">$2.5M+</div>
                            <div className="text-sm text-gray-500">Bounties Found</div>
                        </div>
                        <div className="w-px bg-border" />
                        <div>
                            <div className="text-3xl font-bold text-matrix">17</div>
                            <div className="text-sm text-gray-500">Pro Extensions</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTASection;
