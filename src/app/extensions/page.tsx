"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
    Search,
    ArrowRight,
    Chrome,
    Star,
    Check,
    Filter,
    Grid,
    List,
    X,
} from "lucide-react";
import {
    Button,
    Card,
    CardContent,
} from "@/components/ui";
import { EXTENSIONS, CATEGORIES, CategoryKey } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

export default function ExtensionsPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") as CategoryKey | null;

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<CategoryKey | "ALL">(
        initialCategory || "ALL"
    );
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">(
        "featured"
    );
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // Filter and sort extensions
    const filteredExtensions = useMemo(() => {
        let result = [...EXTENSIONS];

        // Category filter
        if (activeCategory !== "ALL") {
            result = result.filter((ext) => ext.category === activeCategory);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (ext) =>
                    ext.name.toLowerCase().includes(query) ||
                    ext.tagline.toLowerCase().includes(query) ||
                    ext.description.toLowerCase().includes(query)
            );
        }

        // Sorting
        switch (sortBy) {
            case "featured":
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [activeCategory, searchQuery, sortBy]);

    return (
        <div className="min-h-screen pt-20 bg-void">
            {/* Header */}
            <section className="section pb-8 relative">
                <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

                <div className="container relative mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-3 block">
              // Arsenal
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            All <span className="text-gradient">Extensions</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            17 powerful browser extensions designed for elite bug bounty hunters.
                            Each tool crafted to maximize your hunting efficiency.
                        </p>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Search bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search extensions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12 pr-10 py-3"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category filters */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory("ALL")}
                                className={cn(
                                    "px-4 py-2 text-sm font-mono rounded-lg transition-all",
                                    activeCategory === "ALL"
                                        ? "bg-cyan text-void"
                                        : "bg-surface text-gray-400 hover:text-white border border-border hover:border-cyan"
                                )}
                            >
                                All ({EXTENSIONS.length})
                            </button>
                            {Object.entries(CATEGORIES).map(([key, category]) => {
                                const count = EXTENSIONS.filter((e) => e.category === key).length;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(key as CategoryKey)}
                                        className={cn(
                                            "px-4 py-2 text-sm font-mono rounded-lg transition-all",
                                            activeCategory === key
                                                ? "bg-cyan text-void"
                                                : "bg-surface text-gray-400 hover:text-white border border-border hover:border-cyan"
                                        )}
                                    >
                                        {category.name} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Sort and view controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
                            <div className="text-sm text-gray-500">
                                Showing <span className="text-white">{filteredExtensions.length}</span> extensions
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                    className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name</option>
                                </select>

                                {/* View mode */}
                                <div className="flex border border-border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={cn(
                                            "p-2 transition-colors",
                                            viewMode === "grid"
                                                ? "bg-cyan text-void"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                        aria-label="Grid view"
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={cn(
                                            "p-2 transition-colors",
                                            viewMode === "list"
                                                ? "bg-cyan text-void"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                        aria-label="List view"
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Extensions Grid */}
            <section ref={sectionRef} className="pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {filteredExtensions.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg mb-4">
                                No extensions found matching your criteria.
                            </p>
                            <Button variant="ghost" onClick={() => {
                                setSearchQuery("");
                                setActiveCategory("ALL");
                            }}>
                                Clear filters
                            </Button>
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "gap-6",
                                viewMode === "grid"
                                    ? "grid sm:grid-cols-2 lg:grid-cols-3"
                                    : "flex flex-col"
                            )}
                        >
                            {filteredExtensions.map((extension, index) => (
                                <ExtensionCard
                                    key={extension.id}
                                    extension={extension}
                                    index={index}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

interface ExtensionCardProps {
    extension: (typeof EXTENSIONS)[0];
    index: number;
    viewMode: "grid" | "list";
}

function ExtensionCard({ extension, index, viewMode }: ExtensionCardProps) {
    const category = CATEGORIES[extension.category as CategoryKey];

    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
            >
                <Link href={`/extensions/${extension.slug}`}>
                    <Card variant="default" padding="none" className="group">
                        <div className="flex flex-col sm:flex-row items-start gap-4 p-5">
                            {/* Icon */}
                            <div
                                className="text-4xl p-3 rounded-lg bg-surface-light flex-shrink-0"
                                style={{ boxShadow: `0 0 20px ${extension.color}20` }}
                            >
                                {extension.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan transition-colors">
                                            {extension.name}
                                        </h3>
                                        <span
                                            className="text-xs font-mono uppercase tracking-wider"
                                            style={{ color: extension.color }}
                                        >
                                            {category.name}
                                        </span>
                                    </div>
                                    {extension.featured && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-purple/10 border border-purple/30 rounded-full flex-shrink-0">
                                            <Star className="w-3 h-3 text-purple fill-purple" />
                                            <span className="text-[10px] text-purple font-mono uppercase">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                                    {extension.tagline}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {extension.features.slice(0, 3).map((feature, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 text-xs bg-surface-light rounded-full text-gray-500"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <div className="text-right">
                                    <div
                                        className="text-xl font-bold"
                                        style={{ color: extension.color }}
                                    >
                                        {formatPrice(extension.salePrice || extension.price)}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Chrome className="w-3 h-3" />
                                        Chrome • Edge
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Card>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <Link href={`/extensions/${extension.slug}`}>
                <Card variant="default" padding="none" className="group cursor-pointer h-full">
                    <div
                        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                        style={{ backgroundColor: extension.color }}
                    />

                    <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="text-4xl p-2 rounded-lg bg-surface-light"
                                style={{ boxShadow: `0 0 20px ${extension.color}20` }}
                            >
                                {extension.icon}
                            </div>
                            {extension.featured && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-purple/10 border border-purple/30 rounded-full">
                                    <Star className="w-3 h-3 text-purple fill-purple" />
                                    <span className="text-[10px] text-purple font-mono uppercase">
                                        Featured
                                    </span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan transition-colors">
                            {extension.name}
                        </h3>
                        <div
                            className="text-xs font-mono uppercase tracking-wider mb-3"
                            style={{ color: extension.color }}
                        >
                            {category.name}
                        </div>

                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {extension.tagline}
                        </p>

                        <div className="space-y-1.5 mb-4">
                            {extension.features.slice(0, 3).map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                    <Check className="w-3 h-3 text-matrix" />
                                    <span className="line-clamp-1">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Chrome className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-500">Chrome • Edge</span>
                            </div>
                            <span
                                className="text-lg font-bold"
                                style={{ color: extension.color }}
                            >
                                {formatPrice(extension.salePrice || extension.price)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
