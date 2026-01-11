"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Layers, Download, RefreshCw, Headphones } from "lucide-react";
import { Card, GlowingLine } from "@/components/ui";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    Shield,
    Layers,
    Download,
    RefreshCw,
    HeadphonesIcon: Headphones,
};

export function FeaturesSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="section relative bg-void overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-matrix uppercase tracking-widest mb-3 block">
                        {/* Why HexStrike */}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Built for <span className="animated-gradient-text">Professionals</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Every feature designed with bug bounty hunters in mind.
                        No bloat, just power.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {FEATURES.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    variant="default"
                                    padding="lg"
                                    className="h-full group card-lift relative overflow-hidden"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative">
                                        {/* Icon */}
                                        <motion.div
                                           className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan/10 border border-cyan/30 mb-4 group-hover:bg-cyan/20 group-hover:scale-110 transition-all duration-300"
                                           whileHover={{ rotate: 5 }}
                                        >
                                           {IconComponent && (
                                               <IconComponent className="w-7 h-7 text-cyan" />
                                           )}
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors leading-tight">
                                           {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                                           {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom graphic - Workflow visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 lg:mt-20"
                >
                    <div className="relative max-w-4xl mx-auto">
                        {/* Connection lines */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

                        {/* Workflow steps */}
                        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
                            {[
                                { step: "01", label: "Install", desc: "Add to browser" },
                                { step: "02", label: "Browse", desc: "Extensions work passively" },
                                { step: "03", label: "Discover", desc: "Find vulnerabilities" },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    className="text-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="relative inline-block group">
                                       <motion.div
                                           className="w-20 h-20 rounded-2xl bg-surface border-2 border-cyan/50 flex items-center justify-center mb-4 mx-auto card-lift"
                                           whileHover={{ borderColor: "#00ffff", rotate: 5 }}
                                       >
                                           <span className="text-2xl font-bold text-cyan font-mono group-hover:text-white transition-colors">
                                               {item.step}
                                           </span>
                                       </motion.div>
                                       {/* Pulse effect */}
                                       <motion.div
                                           className="absolute inset-0 w-20 h-20 rounded-2xl border-2 border-cyan animate-ping opacity-20 mx-auto"
                                           transition={{ duration: 2, repeat: Infinity }}
                                       />
                                    </div>
                                    <h4 className="text-white font-bold mb-1 group-hover:text-cyan transition-colors">{item.label}</h4>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors leading-tight">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Glowing Line Divider */}
                <div className="mt-16 lg:mt-20">
                    <GlowingLine />
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
