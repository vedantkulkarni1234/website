"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight, Search } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const blogPosts = [
    {
        id: 1,
        slug: "top-10-reconnaissance-techniques-2024",
        title: "Top 10 Reconnaissance Techniques for 2024",
        excerpt:
            "Master the latest recon methodologies that elite bug bounty hunters use to find high-impact vulnerabilities.",
        coverImage: "/blog/recon-2024.jpg",
        author: "Alex Chen",
        authorImage: "AC",
        date: "2024-01-15",
        readTime: "8 min read",
        tags: ["Recon", "Techniques", "Tutorial"],
        featured: true,
    },
    {
        id: 2,
        slug: "how-js-recon-radar-found-critical-bug",
        title: "How JS Recon Radar Helped Find a $15,000 Critical Bug",
        excerpt:
            "A real-world case study of how automated JavaScript analysis uncovered a critical vulnerability in a major platform.",
        coverImage: "/blog/case-study.jpg",
        author: "Sarah Mitchell",
        authorImage: "SM",
        date: "2024-01-10",
        readTime: "12 min read",
        tags: ["Case Study", "JS Recon Radar", "Critical"],
        featured: true,
    },
    {
        id: 3,
        slug: "understanding-authentication-flows",
        title: "Understanding Modern Authentication Flows",
        excerpt:
            "Deep dive into OAuth, OIDC, and session management - and how to identify common misconfigurations.",
        coverImage: "/blog/auth-flows.jpg",
        author: "David Park",
        authorImage: "DP",
        date: "2024-01-05",
        readTime: "10 min read",
        tags: ["Authentication", "OAuth", "Tutorial"],
        featured: false,
    },
    {
        id: 4,
        slug: "dom-xss-complete-guide",
        title: "The Complete Guide to DOM-based XSS",
        excerpt:
            "Learn how to identify, exploit, and report DOM XSS vulnerabilities with practical examples.",
        coverImage: "/blog/dom-xss.jpg",
        author: "Maria Garcia",
        authorImage: "MG",
        date: "2023-12-28",
        readTime: "15 min read",
        tags: ["XSS", "DOM", "Tutorial"],
        featured: false,
    },
    {
        id: 5,
        slug: "automating-bug-bounty-workflow",
        title: "Automating Your Bug Bounty Workflow in 2024",
        excerpt:
            "How to combine HexStrike extensions with other tools for maximum efficiency and higher payouts.",
        coverImage: "/blog/automation.jpg",
        author: "James Wilson",
        authorImage: "JW",
        date: "2023-12-20",
        readTime: "7 min read",
        tags: ["Automation", "Workflow", "Productivity"],
        featured: false,
    },
    {
        id: 6,
        slug: "api-security-testing-essentials",
        title: "API Security Testing Essentials",
        excerpt:
            "Everything you need to know about testing REST and GraphQL APIs for common security issues.",
        coverImage: "/blog/api-security.jpg",
        author: "Lisa Zhang",
        authorImage: "LZ",
        date: "2023-12-15",
        readTime: "11 min read",
        tags: ["API", "Testing", "Tutorial"],
        featured: false,
    },
];

const tags = ["All", "Tutorial", "Case Study", "Recon", "XSS", "API", "Automation", "Authentication"];

export default function BlogPage() {
    const [selectedTag, setSelectedTag] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter((post) => {
        const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
        const matchesSearch =
            !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const featuredPosts = blogPosts.filter((p) => p.featured);

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
                    <span className="text-xs font-mono text-purple uppercase tracking-widest mb-3 block">
            // Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Security <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Tutorials, case studies, and tips from the bug bounty trenches.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6 mb-12"
                >
                    {/* Search */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-12 py-3"
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={cn(
                                    "px-4 py-2 text-sm font-mono rounded-lg transition-all",
                                    selectedTag === tag
                                        ? "bg-purple text-void"
                                        : "bg-surface text-gray-400 hover:text-white border border-border hover:border-purple"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Posts */}
                {selectedTag === "All" && !searchQuery && (
                    <div className="grid lg:grid-cols-2 gap-6 mb-12">
                        {featuredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <Card variant="glow" padding="none" className="group h-full">
                                        {/* Placeholder image */}
                                        <div className="h-48 bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center">
                                            <span className="text-4xl opacity-50">📝</span>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 text-xs font-mono bg-purple/10 text-purple rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan to-purple flex items-center justify-center text-void text-xs font-bold">
                                                        {post.authorImage}
                                                    </div>
                                                    <span className="text-sm text-gray-400">
                                                        {post.author}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* All Posts Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts
                        .filter((p) => selectedTag !== "All" || searchQuery || !p.featured)
                        .map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <Card variant="default" padding="md" className="group h-full">
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-[10px] font-mono bg-surface-light text-gray-500 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-white mb-2 group-hover:text-cyan transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{post.author}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No articles found matching your criteria.</p>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setSelectedTag("All");
                                setSearchQuery("");
                            }}
                            className="mt-4"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16"
                >
                    <Card variant="gradient" padding="lg" className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Get the latest security insights and HexStrike updates delivered
                            to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="input flex-1"
                            />
                            <Button variant="primary">Subscribe</Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
