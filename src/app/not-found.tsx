"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import { Button, Terminal } from "@/components/ui";

export default function NotFoundPage() {
    const terminalLines = [
        { type: "command" as const, content: "hexstrike find-page --url=/requested-path" },
        { type: "output" as const, content: "Searching..." },
        { type: "error" as const, content: "ERROR: Page not found in arsenal" },
        { type: "output" as const, content: "Status: 404" },
        { type: "comment" as const, content: "# The page you're looking for doesn't exist" },
        { type: "success" as const, content: "Suggestion: Return to base" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-void pt-20 px-4">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Glitch 404 */}
                    <div className="relative mb-8">
                        <h1 className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple leading-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[150px] sm:text-[200px] font-bold text-cyan/10 animate-pulse">
                                404
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Looks like you've ventured into uncharted territory.
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Terminal */}
                    <div className="mb-8">
                        <Terminal lines={terminalLines} autoType typeSpeed={20} />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button
                                variant="primary"
                                icon={<Home className="w-5 h-5" />}
                            >
                                Back to Home
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            icon={<ArrowLeft className="w-5 h-5" />}
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
