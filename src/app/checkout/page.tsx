"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    CreditCard,
    Lock,
    Check,
    ArrowLeft,
    Trash2,
    Tag,
} from "lucide-react";
import { Button, Card, GlitchText } from "@/components/ui";
import { EXTENSIONS, BUNDLES } from "@/lib/constants";
import { useCartStore } from "@/store";
import { cn, formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const extensionSlug = searchParams.get("extension");
    const bundleSlug = searchParams.get("bundle");

    const { items, removeItem, totalPrice, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [email, setEmail] = useState("");

    // Check if coming from direct purchase link
    const directPurchase = useMemo(() => {
        if (extensionSlug) {
            return EXTENSIONS.find((e) => e.slug === extensionSlug);
        }
        if (bundleSlug) {
            return BUNDLES.find((b) => b.slug === bundleSlug);
        }
        return null;
    }, [extensionSlug, bundleSlug]);

    // Determine checkout items
    const checkoutItems = useMemo(() => {
        if (directPurchase) {
            return [
                {
                    id: directPurchase.id ?? directPurchase.slug,
                    type: bundleSlug ? ("bundle" as const) : ("extension" as const),
                    name: directPurchase.name,
                    price: directPurchase.price,
                    quantity: 1,
                },
            ];
        }
        return items;
    }, [directPurchase, items, bundleSlug]);

    const subtotal = useMemo(() => {
        return checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [checkoutItems]);

    const discount = promoApplied ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    const handleApplyPromo = () => {
        if (promoCode.toLowerCase() === "hunter10") {
            setPromoApplied(true);
        }
    };

    const handleCheckout = async () => {
        if (!email) return;

        setIsProcessing(true);

        // Simulate Stripe checkout redirect
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In production, this would create a Stripe Checkout session and redirect
        // window.location.href = checkoutSession.url;

        setIsProcessing(false);
    };

    if (checkoutItems.length === 0 && !directPurchase) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-void">
                <div className="text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
                    <p className="text-gray-400 mb-6">Add some extensions to get started.</p>
                    <Link href="/extensions">
                        <Button variant="primary">Browse Extensions</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-void">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

            <div className="container relative mx-auto px-4 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <Link
                        href="/extensions"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue shopping
                    </Link>
                    <h1 className="text-3xl font-bold text-white">
                        <GlitchText text="Checkout" className="text-cyan" glitchOnHover intensity="low" />
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <Card variant="default" padding="lg">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-cyan" />
                                Order Items
                            </h2>

                            <div className="space-y-4">
                                {checkoutItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-4 bg-void rounded-lg border border-border"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white">{item.name}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-cyan font-bold">{formatPrice(item.price)}</p>
                                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                                        </div>
                                        {!directPurchase && (
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-gray-500 hover:text-danger"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Promo Code */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            disabled={promoApplied}
                                            className="input pl-10"
                                        />
                                    </div>
                                    <Button
                                        variant="secondary"
                                        onClick={handleApplyPromo}
                                        disabled={promoApplied || !promoCode}
                                    >
                                        {promoApplied ? "Applied!" : "Apply"}
                                    </Button>
                                </div>
                                {promoApplied && (
                                    <p className="text-sm text-matrix mt-2 flex items-center gap-1">
                                        <Check className="w-4 h-4" />
                                        10% discount applied!
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                    Try <code className="text-cyan">HUNTER10</code> for 10% off
                                </p>
                            </div>
                        </Card>

                        {/* Email for receipt */}
                        <Card variant="default" padding="lg" className="mt-6">
                            <h2 className="text-xl font-bold text-white mb-4">Email</h2>
                            <p className="text-sm text-gray-400 mb-4">
                                We'll send your license keys and receipt to this address.
                            </p>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                required
                            />
                        </Card>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card variant="glow" padding="lg" className="sticky top-24">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-matrix">
                                        <span>Discount (10%)</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="pt-3 border-t border-border flex justify-between text-lg font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-cyan">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mb-4"
                                loading={isProcessing}
                                onClick={handleCheckout}
                                disabled={!email}
                                icon={<CreditCard className="w-5 h-5" />}
                            >
                                {isProcessing ? "Processing..." : "Pay with Stripe"}
                            </Button>

                            {/* Trust indicators */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Lock className="w-4 h-4 text-matrix" />
                                    Secure 256-bit SSL encryption
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Check className="w-4 h-4 text-matrix" />
                                    30-day money-back guarantee
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Check className="w-4 h-4 text-matrix" />
                                    Instant download access
                                </div>
                            </div>

                            {/* Payment methods */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <p className="text-xs text-gray-500 text-center">
                                    Secure payments powered by
                                </p>
                                <div className="flex justify-center gap-3 mt-2 text-gray-600">
                                    <span className="text-xs font-mono">VISA</span>
                                    <span className="text-xs font-mono">MASTERCARD</span>
                                    <span className="text-xs font-mono">AMEX</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
