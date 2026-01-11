"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { BUNDLES, EXTENSIONS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

interface PricingCardProps {
    bundle: (typeof BUNDLES)[0];
    index: number;
}

function PricingCard({ bundle, index }: PricingCardProps) {
    const bundleExtensions = EXTENSIONS.filter((ext) =>
        bundle.extensions.includes(ext.slug)
    );

    const colorClasses = {
        cyan: {
            bg: "bg-cyan/10",
            border: "border-cyan/50",
            text: "text-cyan",
            icon: "text-cyan",
        },
        purple: {
            bg: "bg-purple/10",
            border: "border-purple/50",
            text: "text-purple",
            icon: "text-purple",
        },
        matrix: {
            bg: "bg-green-500/10",
            border: "border-green-500/50",
            text: "text-green-400",
            icon: "text-green-400",
        },
    };

    const colors = colorClasses[bundle.color as keyof typeof colorClasses];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={cn(
                "relative",
                bundle.popular && "lg:-mt-6 lg:mb-6"
            )}
        >
            {/* Popular badge */}
            {bundle.popular && (
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-purple rounded-full shadow-lg shadow-purple/30">
                        <Crown className="w-4 h-4 text-void" />
                        <span className="text-xs font-bold text-void uppercase tracking-wide">
                            Most Popular
                        </span>
                    </div>
                </motion.div>
            )}

            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Card
                    variant={bundle.popular ? "glow" : "default"}
                    padding="none"
                    hover={false}
                    className={cn(
                        "h-full card-lift relative overflow-hidden",
                        bundle.popular && "border-purple/50 shadow-xl shadow-purple/10"
                    )}
                >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${bundle.color}/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                    <div className="p-6 lg:p-8 relative">
                        {/* Header */}
                        <div className="text-center mb-5">
                            <motion.h3
                                className={cn("text-2xl font-bold mb-2", colors.text)}
                                whileHover={{ scale: 1.05 }}
                            >
                                {bundle.name}
                            </motion.h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{bundle.description}</p>
                        </div>

                        {/* Pricing */}
                        <div className="text-center mb-6">
                            <motion.div
                                className="flex items-baseline justify-center gap-3"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-lg text-gray-500 line-through">
                                    {formatPrice(bundle.originalPrice)}
                                </span>
                                <span className={cn("text-4xl lg:text-5xl font-bold", colors.text)}>
                                    {formatPrice(bundle.price)}
                                </span>
                            </motion.div>
                            <div className="flex items-center justify-center gap-3 mt-3">
                                <span className={cn("px-3 py-1 text-xs font-bold rounded-full", colors.bg, colors.text)}>
                                    SAVE {bundle.savings}%
                                </span>
                                <span className="text-xs text-gray-500">One-time payment</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link href={`/checkout?bundle=${bundle.slug}`}>
                            <Button
                                variant={bundle.popular ? "primary" : "secondary"}
                                size="lg"
                                className="w-full mb-6"
                                icon={<ArrowRight className="w-5 h-5" />}
                                iconPosition="right"
                            >
                                Get {bundle.name}
                            </Button>
                        </Link>

                        {/* Included Extensions */}
                        <div className="border-t border-border pt-5">
                            <div className="flex items-center gap-2 mb-5">
                                <Zap className={cn("w-4 h-4", colors.icon)} />
                                <span className="text-sm font-semibold text-white">
                                    {bundleExtensions.length} Extensions Included
                                </span>
                            </div>

                            <ul className="space-y-3">
                                {bundleExtensions.slice(0, 5).map((ext) => (
                                    <motion.li
                                        key={ext.id}
                                        className="flex items-start gap-3 group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.icon)} />
                                        <div className="flex-1 flex items-baseline justify-between gap-2">
                                            <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{ext.name}</span>
                                            <span className="text-xs text-gray-500 font-mono">
                                                {formatPrice(ext.price)}
                                            </span>
                                        </div>
                                    </motion.li>
                                ))}
                                {bundleExtensions.length > 5 && (
                                    <li className="text-sm text-gray-400 pl-7">
                                        +{bundleExtensions.length - 5} more extensions
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}

export function PricingSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="section relative bg-surface">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface to-void pointer-events-none" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-purple uppercase tracking-widest mb-3 block">
                        {/* Pricing */}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Choose Your <span className="text-gradient">Arsenal</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        One-time purchase. Lifetime updates. No subscriptions.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
                    {BUNDLES.map((bundle, index) => (
                        <PricingCard key={bundle.id} bundle={bundle} index={index} />
                    ))}
                </div>

                {/* Individual pricing note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Want individual extensions?{" "}
                        <Link href="/extensions" className="text-cyan hover:underline font-medium">
                            Browse and buy separately
                        </Link>
                    </p>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-4 h-4 text-green-400" />
                            30-day money-back guarantee
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-4 h-4 text-green-400" />
                            Secure payment via Stripe
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-4 h-4 text-green-400" />
                            Instant download access
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default PricingSection;
