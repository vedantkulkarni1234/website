"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";

const footerLinks = {
    product: [
        { label: "All Extensions", href: "/extensions" },
        { label: "Pricing", href: "/pricing" },
        { label: "Bundles", href: "/pricing#bundles" },
        { label: "Enterprise", href: "/enterprise" },
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
        { label: "Blog", href: "/blog" },
        { label: "Changelog", href: "/changelog" },
        { label: "Roadmap", href: "/roadmap" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refunds" },
        { label: "License", href: "/license" },
    ],
};

export function Footer() {
    return (
        <footer className="relative bg-void border-t border-border" suppressHydrationWarning>
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            <div className="container relative mx-auto px-4 lg:px-8">
                {/* Main footer content */}
                <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-cyan to-purple rounded-xl">
                                <span className="text-xl font-bold text-void">⬡</span>
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white block leading-none">
                                    {SITE_CONFIG.name}
                                </span>
                                <span className="text-[10px] text-cyan font-mono uppercase tracking-widest mt-0.5 block">
                                    {SITE_CONFIG.tagline}
                                </span>
                            </div>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            Elite browser extensions for bug bounty hunters. Transform complex
                            workflows into powerful, streamlined operations.
                        </p>

                        {/* Social links */}
                        <div className="flex gap-2">
                            <a
                                href={SITE_CONFIG.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-surface border border-border rounded-lg text-gray-400 hover:text-cyan hover:border-cyan/50 transition-all"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href={`https://twitter.com/${SITE_CONFIG.twitter.replace("@", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-surface border border-border rounded-lg text-gray-400 hover:text-cyan hover:border-cyan/50 transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="p-2.5 bg-surface border border-border rounded-lg text-gray-400 hover:text-cyan hover:border-cyan/50 transition-all"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Product
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Resources
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-cyan transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Extension categories quick links */}
                <div className="py-6 border-t border-border">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(CATEGORIES).map(([key, category]) => (
                            <Link
                                key={key}
                                href={`/extensions?category=${key}`}
                                className="px-4 py-2 text-xs font-mono bg-surface border border-border rounded-full text-gray-400 hover:text-cyan hover:border-cyan/50 transition-all"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 font-mono leading-tight">
                        <span className="text-cyan">$</span> echo &quot;© 2024 {SITE_CONFIG.name}. All rights reserved.&quot;
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            All systems operational
                        </span>
                        <span className="font-mono">v2.1.0</span>
                    </div>
                </div>
            </div>

            {/* Decorative bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
        </footer>
    );
}

export default Footer;
