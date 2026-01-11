"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useCartStore } from "@/store";
import { cn, formatPrice } from "@/lib/utils";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } =
        useCartStore();

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-5 h-5 text-cyan" />
                                <h2 className="text-lg font-bold text-white">Cart</h2>
                                <span className="px-2 py-0.5 text-xs font-mono bg-cyan/10 text-cyan rounded-full">
                                    {itemCount}
                                </span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingCart className="w-12 h-12 text-gray-600 mb-4" />
                                    <p className="text-gray-400 mb-4">Your cart is empty</p>
                                    <Button variant="secondary" onClick={closeCart}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="flex gap-4 p-4 bg-void rounded-lg border border-border"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium text-white">{item.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">
                                                    {item.type}
                                                </p>
                                                <p className="text-cyan font-bold mt-1">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                {/* Quantity controls */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        className="p-1 text-gray-400 hover:text-white"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center text-white font-mono">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                        className="p-1 text-gray-400 hover:text-white"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-gray-500 hover:text-danger transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-4 border-t border-border space-y-4">
                                {/* Clear cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full text-sm text-gray-500 hover:text-danger transition-colors"
                                >
                                    Clear cart
                                </button>

                                {/* Summary */}
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-gray-400">Total</span>
                                    <span className="font-bold text-white">
                                        {formatPrice(totalPrice())}
                                    </span>
                                </div>

                                {/* Checkout button */}
                                <Link href="/checkout" onClick={closeCart}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                        icon={<ArrowRight className="w-5 h-5" />}
                                        iconPosition="right"
                                    >
                                        Checkout
                                    </Button>
                                </Link>

                                {/* Continue shopping */}
                                <button
                                    onClick={closeCart}
                                    className="w-full text-sm text-cyan hover:underline"
                                >
                                    Continue shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CartDrawer;
