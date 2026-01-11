"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Book,
    Code,
    Terminal as TerminalIcon,
    Zap,
    Shield,
    Settings,
    ChevronRight,
    Search,
    ExternalLink,
} from "lucide-react";
import { Button, Card, Terminal } from "@/components/ui";
import { EXTENSIONS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const docSections = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: Zap,
        items: [
            { title: "Installation", slug: "installation" },
            { title: "Quick Start Guide", slug: "quick-start" },
            { title: "Browser Setup", slug: "browser-setup" },
            { title: "License Activation", slug: "license-activation" },
        ],
    },
    {
        id: "core-concepts",
        title: "Core Concepts",
        icon: Book,
        items: [
            { title: "How Extensions Work", slug: "how-extensions-work" },
            { title: "Data Privacy", slug: "data-privacy" },
            { title: "Extension Communication", slug: "extension-communication" },
            { title: "Performance Tips", slug: "performance-tips" },
        ],
    },
    {
        id: "extensions",
        title: "Extension Guides",
        icon: Code,
        items: EXTENSIONS.slice(0, 6).map((ext) => ({
            title: ext.name,
            slug: `extensions/${ext.slug}`,
        })),
    },
    {
        id: "integration",
        title: "Integrations",
        icon: Settings,
        items: [
            { title: "Burp Suite", slug: "integrations/burp" },
            { title: "OWASP ZAP", slug: "integrations/zap" },
            { title: "Export Formats", slug: "integrations/exports" },
            { title: "API Reference", slug: "integrations/api" },
        ],
    },
    {
        id: "security",
        title: "Security",
        icon: Shield,
        items: [
            { title: "Best Practices", slug: "security/best-practices" },
            { title: "Scope Management", slug: "security/scope" },
            { title: "Responsible Disclosure", slug: "security/disclosure" },
        ],
    },
];

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSections = useMemo(() => {
        if (!searchQuery) return docSections;

        const query = searchQuery.toLowerCase();
        return docSections
            .map((section) => ({
                ...section,
                items: section.items.filter(
                    (item) =>
                        item.title.toLowerCase().includes(query) ||
                        section.title.toLowerCase().includes(query)
                ),
            }))
            .filter((section) => section.items.length > 0);
    }, [searchQuery]);

    return (
        <div className="min-h-screen pt-20 bg-void">
            {/* Background */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />

            <div className="container relative mx-auto px-4 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-3 block">
            // Documentation
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        HexStrike <span className="text-gradient">Docs</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Everything you need to master the HexStrike arsenal.
                        From installation to advanced techniques.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-12 py-3"
                        />
                    </div>
                </motion.div>

                {/* Quick Start Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <Card variant="glow" padding="none">
                        <div className="p-4 border-b border-border">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <TerminalIcon className="w-5 h-5 text-cyan" />
                                Quick Start
                            </h3>
                        </div>
                        <Terminal
                            lines={[
                                { type: "comment", content: "# Install HexStrike extension from Chrome Web Store" },
                                { type: "command", content: "1. Click 'Get Started' and purchase your extensions" },
                                { type: "command", content: "2. Download the .crx file from your dashboard" },
                                { type: "command", content: "3. Enable Developer Mode in chrome://extensions" },
                                { type: "command", content: "4. Drag and drop the extension file" },
                                { type: "success", content: "✓ Extension installed! Start hunting!" },
                            ]}
                            autoType
                            typeSpeed={25}
                        />
                    </Card>
                </motion.div>

                {/* Documentation Sections */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredSections.map((section, index) => {
                        const IconComponent = section.icon;

                        return (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card variant="default" padding="lg" className="h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                                            <IconComponent className="w-5 h-5 text-cyan" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">
                                            {section.title}
                                        </h3>
                                    </div>

                                    <ul className="space-y-2">
                                        {section.items.map((item) => (
                                            <li key={item.slug}>
                                                <Link
                                                    href={`/docs/${item.slug}`}
                                                    className="flex items-center gap-2 py-2 text-gray-400 hover:text-cyan transition-colors group"
                                                >
                                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    {section.items.length > 4 && (
                                        <Link
                                            href={`/docs/${section.id}`}
                                            className="inline-flex items-center gap-1 mt-4 text-sm text-cyan hover:underline"
                                        >
                                            View all
                                            <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    )}
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Help CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 mb-4">
                        Can't find what you're looking for?
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary">Contact Support</Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
