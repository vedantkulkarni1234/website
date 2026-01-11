"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Github, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { SITE_CONFIG } from "@/lib/constants";
import { useCartStore } from "@/store";

interface NavItem {
    label: string;
    href: string;
    children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
    {
        label: "Extensions",
        href: "/extensions",
        children: [
            { label: "All Extensions", href: "/extensions", description: "Browse our complete collection" },
            { label: "Recon Tools", href: "/extensions?category=RECON", description: "Intelligence gathering" },
            { label: "Analysis Tools", href: "/extensions?category=ANALYSIS", description: "Deep inspection" },
            { label: "Tracking Tools", href: "/extensions?category=TRACKING", description: "Monitor behavior" },
        ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const cartItems = useCartStore((state) => state.items);
    const openCart = useCartStore((state) => state.openCart);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Mark as mounted after hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-void/90 backdrop-blur-xl border-b border-border/50 shadow-lg"
                    : "bg-transparent"
            )}
            suppressHydrationWarning
        >
            <nav className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-9 h-9 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <span className="text-xl font-bold text-white relative z-10">
                                ⬡
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-bold text-white tracking-tight leading-tight">
                                {SITE_CONFIG.name}
                            </span>
                            <span className="text-[10px] text-cyan font-mono uppercase tracking-widest">
                                {SITE_CONFIG.tagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                        pathname === item.href
                                            ? "text-cyan"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                "w-4 h-4 transition-transform duration-200",
                                                openDropdown === item.label && "rotate-180"
                                            )}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.children && openDropdown === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 pt-2 w-72"
                                        >
                                            <div className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-3 hover:bg-white/5 transition-colors"
                                                    >
                                                        <span className="block text-sm font-medium text-white">
                                                            {child.label}
                                                        </span>
                                                        {child.description && (
                                                            <span className="block text-xs text-gray-500 mt-0.5">
                                                                {child.description}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Link
                            href={SITE_CONFIG.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={openCart}
                            className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {isMounted && itemCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-cyan text-void text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        <div className="w-px h-6 bg-border mx-1" />

                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>

                        <Link href="/pricing">
                            <Button variant="primary" size="sm">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-surface border-t border-border overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {navItems.map((item) => (
                                <div key={item.label} className="mb-1">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                                            pathname === item.href
                                                ? "text-cyan bg-cyan/10"
                                                : "text-gray-300 hover:bg-white/5"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="pl-4 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                                <Link href="/login" className="flex-1">
                                    <Button variant="ghost" size="md" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/pricing" className="flex-1">
                                    <Button variant="primary" size="md" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navigation;
