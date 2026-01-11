"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Chrome,
    Star,
    Check,
    Download,
    Shield,
    Zap,
    RefreshCw,
    ShoppingCart,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { EXTENSIONS, CATEGORIES, CategoryKey } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";

export default function ExtensionDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addItem, openCart } = useCartStore();

    const extension = useMemo(
        () => EXTENSIONS.find((e) => e.slug === slug),
        [slug]
    );

    if (!extension) {
        notFound();
    }

    const category = CATEGORIES[extension.category as CategoryKey];

    // Get related extensions from same category
    const relatedExtensions = useMemo(
        () =>
            EXTENSIONS.filter(
                (e) => e.category === extension.category && e.id !== extension.id
            ).slice(0, 3),
        [extension]
    );

    const handleAddToCart = () => {
        addItem({
            id: extension.id,
            type: "extension",
            slug: extension.slug,
            name: extension.name,
            price: extension.salePrice || extension.price,
        });
        openCart();
    };

    return (
        <div className="min-h-screen pt-20 bg-void">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 lg:px-8 py-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link
                        href="/extensions"
                        className="flex items-center gap-1 text-gray-400 hover:text-cyan transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Extensions
                    </Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-400">{category.name}</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-white">{extension.name}</span>
                </nav>
            </div>

            {/* Main Content */}
            <section className="section pt-0">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column - Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div
                                        className="text-6xl p-4 rounded-xl bg-surface"
                                        style={{ boxShadow: `0 0 40px ${extension.color}30` }}
                                    >
                                        {extension.icon}
                                    </div>
                                    <div className="flex-1">
                                        {extension.featured && (
                                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple/10 border border-purple/30 rounded-full mb-2">
                                                <Star className="w-3 h-3 text-purple fill-purple" />
                                                <span className="text-xs text-purple font-mono uppercase">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                                            {extension.name}
                                        </h1>
                                        <div
                                            className="text-sm font-mono uppercase tracking-wider"
                                            style={{ color: extension.color }}
                                        >
                                            {category.name} • v{extension.version}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-300 mb-6">{extension.tagline}</p>
                                <p className="text-gray-400">{extension.description}</p>
                            </div>

                            {/* Features List */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {extension.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3 bg-surface rounded-lg border border-border"
                                        >
                                            <Check
                                                className="w-5 h-5 flex-shrink-0 mt-0.5"
                                                style={{ color: extension.color }}
                                            />
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Compatibility */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-white mb-4">Compatibility</h2>
                                <div className="flex gap-4">
                                    {extension.compatibility.map((browser) => (
                                        <div
                                            key={browser}
                                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border"
                                        >
                                            <Chrome className="w-5 h-5 text-cyan" />
                                            <span className="text-sm text-white capitalize">{browser}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-surface rounded-lg border border-border">
                                    <Shield className="w-6 h-6 text-matrix mx-auto mb-2" />
                                    <span className="text-xs text-gray-400">Privacy First</span>
                                </div>
                                <div className="text-center p-4 bg-surface rounded-lg border border-border">
                                    <Zap className="w-6 h-6 text-cyan mx-auto mb-2" />
                                    <span className="text-xs text-gray-400">Real-time</span>
                                </div>
                                <div className="text-center p-4 bg-surface rounded-lg border border-border">
                                    <RefreshCw className="w-6 h-6 text-purple mx-auto mb-2" />
                                    <span className="text-xs text-gray-400">Auto Updates</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Purchase Box */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="sticky top-24">
                                <Card variant="glow" padding="lg">
                                    {/* Price */}
                                    <div className="text-center mb-6">
                                        <div className="flex items-baseline justify-center gap-3 mb-2">
                                            {extension.salePrice && (
                                                <span className="text-xl text-gray-500 line-through">
                                                    {formatPrice(extension.price)}
                                                </span>
                                            )}
                                            <span
                                                className="text-5xl font-bold"
                                                style={{ color: extension.color }}
                                            >
                                                {formatPrice(extension.salePrice || extension.price)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">One-time purchase</p>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-3 mb-6">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            icon={<ShoppingCart className="w-5 h-5" />}
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Link href={`/checkout?extension=${extension.slug}`} className="block">
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="w-full"
                                                icon={<ArrowRight className="w-5 h-5" />}
                                                iconPosition="right"
                                            >
                                                Buy Now
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Trust indicators */}
                                    <div className="space-y-3 pt-6 border-t border-border">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-matrix" />
                                            30-day money-back guarantee
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-matrix" />
                                            Instant download after purchase
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-matrix" />
                                            Lifetime updates included
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-matrix" />
                                            Use on up to 3 devices
                                        </div>
                                    </div>
                                </Card>

                                {/* Bundle upsell */}
                                <Card variant="default" padding="md" className="mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-purple" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-white">
                                                Save 38% with Pro Hunter Bundle
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Get 8 extensions for {formatPrice(149.99)}
                                            </p>
                                        </div>
                                        <Link href="/pricing">
                                            <Button variant="ghost" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Extensions */}
            {relatedExtensions.length > 0 && (
                <section className="section bg-surface">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h2 className="text-2xl font-bold text-white mb-8">
                            Related Extensions
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedExtensions.map((ext, index) => (
                                <motion.div
                                    key={ext.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/extensions/${ext.slug}`}>
                                        <Card variant="default" padding="md" className="group h-full">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="text-3xl p-2 rounded-lg bg-surface-light"
                                                    style={{ boxShadow: `0 0 20px ${ext.color}20` }}
                                                >
                                                    {ext.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white group-hover:text-cyan transition-colors">
                                                        {ext.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                                        {ext.tagline}
                                                    </p>
                                                    <p
                                                        className="text-lg font-bold mt-2"
                                                        style={{ color: ext.color }}
                                                    >
                                                        {formatPrice(ext.salePrice || ext.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
