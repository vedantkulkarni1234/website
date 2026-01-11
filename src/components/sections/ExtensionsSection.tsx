"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Chrome, Star, Check } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { EXTENSIONS, CATEGORIES, CategoryKey } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

interface ExtensionCardProps {
    extension: (typeof EXTENSIONS)[0];
    index: number;
}

function ExtensionCard({ extension, index }: ExtensionCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const category = CATEGORIES[extension.category as CategoryKey];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
        >
            <Link href={`/extensions/${extension.slug}`}>
                <Card
                    variant="default"
                    padding="none"
                    className="group cursor-pointer h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Top accent bar */}
                    <div
                        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                        style={{ backgroundColor: extension.color }}
                    />

                    <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="text-3xl p-3 rounded-xl bg-surface"
                                style={{ boxShadow: `0 0 30px ${extension.color}15` }}
                            >
                                {extension.icon}
                            </div>
                            {extension.featured && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple/10 border border-purple/30 rounded-full">
                                    <Star className="w-3 h-3 text-purple fill-purple" />
                                    <span className="text-[10px] text-purple font-semibold uppercase tracking-wide">
                                        Featured
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Title & Category */}
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan transition-colors">
                            {extension.name}
                        </h3>
                        <div
                            className="text-xs font-semibold uppercase tracking-wider mb-3"
                            style={{ color: category.color === "cyan" ? "#00ffff" : `var(--color-${category.color})` }}
                        >
                            {category.name}
                        </div>

                        {/* Tagline */}
                        <p className="text-sm text-gray-400 mb-5 line-clamp-2 leading-relaxed">
                            {extension.tagline}
                        </p>

                        {/* Features preview */}
                        <div className="space-y-2 mb-5">
                            {extension.features.slice(0, 3).map((feature, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-400">
                                    <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                    <span className="line-clamp-1">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Chrome className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-500">Chrome • Edge</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {extension.salePrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        {formatPrice(extension.price)}
                                    </span>
                                )}
                                <span
                                    className="text-lg font-bold"
                                    style={{ color: extension.color }}
                                >
                                    {formatPrice(extension.salePrice || extension.price)}
                                </span>
                            </div>
                        </div>

                        {/* Hover reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                            className="mt-5"
                        >
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full"
                                icon={<ArrowRight className="w-4 h-4" />}
                                iconPosition="right"
                            >
                                View Details
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export function ExtensionsSection() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey | "ALL">("ALL");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const filteredExtensions =
        activeCategory === "ALL"
            ? EXTENSIONS.slice(0, 6) // Show first 6 on homepage
            : EXTENSIONS.filter((ext) => ext.category === activeCategory).slice(0, 6);

    return (
        <section ref={sectionRef} className="section relative bg-void">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-4 block">
            // Our Arsenal
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                        Powerful Extensions for{" "}
                        <span className="text-gradient">Elite Hunters</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Each extension is crafted for a specific hunting workflow.
                        Use them individually or combine for maximum effectiveness.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    <button
                        onClick={() => setActiveCategory("ALL")}
                        className={cn(
                            "px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeCategory === "ALL"
                                ? "bg-cyan text-void"
                                : "bg-surface text-gray-400 hover:text-white border border-border hover:border-cyan/50"
                        )}
                    >
                        All
                    </button>
                    {Object.entries(CATEGORIES).map(([key, category]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key as CategoryKey)}
                            className={cn(
                                "px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                                activeCategory === key
                                    ? "bg-cyan text-void"
                                    : "bg-surface text-gray-400 hover:text-white border border-border hover:border-cyan/50"
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Extensions Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
                    {filteredExtensions.map((extension, index) => (
                        <ExtensionCard key={extension.id} extension={extension} index={index} />
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <Link href="/extensions">
                        <Button
                            variant="secondary"
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            View All 17 Extensions
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default ExtensionsSection;
