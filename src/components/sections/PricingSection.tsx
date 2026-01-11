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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-purple rounded-full shadow-lg">
                        <Crown className="w-4 h-4 text-void" />
                        <span className="text-xs font-bold text-void uppercase tracking-wide">
                            Most Popular
                        </span>
                    </div>
                </div>
            )}

            <Card
                variant={bundle.popular ? "glow" : "default"}
                padding="none"
                hover={false}
                className={cn(
                    "h-full",
                    bundle.popular && "border-purple/50 shadow-xl shadow-purple/10"
                )}
            >
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h3 className={cn("text-2xl font-bold mb-2", colors.text)}>
                            {bundle.name}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{bundle.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                        <div className="flex items-baseline justify-center gap-3">
                            <span className="text-lg text-gray-500 line-through">
                                {formatPrice(bundle.originalPrice)}
                            </span>
                            <span className={cn("text-4xl lg:text-5xl font-bold", colors.text)}>
                                {formatPrice(bundle.price)}
                            </span>
                        </div>
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
                            className="w-full mb-8"
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            Get {bundle.name}
                        </Button>
                    </Link>

                    {/* Included Extensions */}
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Zap className={cn("w-4 h-4", colors.icon)} />
                            <span className="text-sm font-semibold text-white">
                                {bundleExtensions.length} Extensions Included
                            </span>
                        </div>

                        <ul className="space-y-3">
                            {bundleExtensions.slice(0, 5).map((ext) => (
                                <li key={ext.id} className="flex items-start gap-3">
                                    <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.icon)} />
                                    <div className="flex-1 flex items-baseline justify-between gap-2">
                                        <span className="text-sm text-gray-200">{ext.name}</span>
                                        <span className="text-xs text-gray-500 font-mono">
                                            {formatPrice(ext.price)}
                                        </span>
                                    </div>
                                </li>
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
                    className="text-center mb-14"
                >
                    <span className="text-xs font-mono text-purple uppercase tracking-widest mb-4 block">
            // Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                        Choose Your <span className="text-gradient">Arsenal</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        One-time purchase. Lifetime updates. No subscriptions.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {BUNDLES.map((bundle, index) => (
                        <PricingCard key={bundle.id} bundle={bundle} index={index} />
                    ))}
                </div>

                {/* Individual pricing note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-14 text-center"
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
