"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Mail, ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { Button, Card, GlitchText } from "@/components/ui";
import type { Metadata } from "next";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement authentication
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleGitHubLogin = () => {
        // TODO: Implement GitHub OAuth
        window.location.href = "/api/auth/github";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-void pt-20 px-4">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-30" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan to-purple rounded-lg">
                            <span className="text-2xl font-bold text-void">⬡</span>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">
                        Sign in to access your{" "}
                        <GlitchText text="arsenal" className="text-cyan" glitchOnHover intensity="low" />
                    </p>
                </div>

                <Card variant="glow" padding="lg">
                    {/* GitHub OAuth */}
                    <button
                        onClick={handleGitHubLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface hover:bg-surface-light border border-border rounded-lg text-white font-medium transition-all hover:border-cyan"
                    >
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-surface px-3 text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="hunter@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="input pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="input pl-11 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-border bg-surface text-cyan focus:ring-cyan"
                                />
                                <span className="text-sm text-gray-400">Remember me</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-cyan hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={isLoading}
                            icon={<ArrowRight className="w-5 h-5" />}
                            iconPosition="right"
                        >
                            Sign In
                        </Button>
                    </form>
                </Card>

                {/* Register link */}
                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-cyan hover:underline">
                        Create one
                    </Link>
                </p>

                {/* Security note */}
                <div className="text-center mt-6">
                    <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                        <Lock className="w-3 h-3" />
                        Secured with 256-bit encryption
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
