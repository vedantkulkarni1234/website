"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
    className?: string;
    lines?: TerminalLine[];
    autoType?: boolean;
    typeSpeed?: number;
    showPrompt?: boolean;
    onComplete?: () => void;
}

interface TerminalLine {
    type: "command" | "output" | "error" | "success" | "comment";
    content: string;
    delay?: number;
}

const defaultLines: TerminalLine[] = [
    { type: "comment", content: "# HexStrike AI - The Hacker's Arsenal" },
    { type: "command", content: "hexstrike init --profile=hunter" },
    { type: "success", content: "✓ Profile initialized: hunter" },
    { type: "command", content: "hexstrike scan --target=*.example.com" },
    { type: "output", content: "→ Loading JS Recon Radar..." },
    { type: "output", content: "→ Analyzing 47 JavaScript files..." },
    { type: "success", content: "✓ Found 23 hidden endpoints" },
    { type: "success", content: "✓ Detected 3 API keys in source" },
    { type: "command", content: "hexstrike report --format=markdown" },
    { type: "success", content: "✓ Report generated: ./recon-report.md" },
];

export function Terminal({
    className,
    lines = defaultLines,
    autoType = true,
    typeSpeed = 30,
    showPrompt = true,
    onComplete,
}: TerminalProps) {
    const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(autoType);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isTyping || currentLineIndex >= lines.length) {
            if (currentLineIndex >= lines.length) {
                onComplete?.();
            }
            return;
        }

        const currentLine = lines[currentLineIndex];
        const lineDelay = currentLine.delay || 0;

        if (currentCharIndex === 0 && lineDelay > 0) {
            const delayTimeout = setTimeout(() => {
                setCurrentCharIndex(1);
            }, lineDelay);
            return () => clearTimeout(delayTimeout);
        }

        if (currentCharIndex <= currentLine.content.length) {
            const timeout = setTimeout(
                () => {
                    setDisplayedLines((prev) => {
                        const newLines = [...prev];
                        if (newLines[currentLineIndex]) {
                            newLines[currentLineIndex] = {
                                ...currentLine,
                                content: currentLine.content.slice(0, currentCharIndex),
                            };
                        } else {
                            newLines.push({
                                ...currentLine,
                                content: currentLine.content.slice(0, currentCharIndex),
                            });
                        }
                        return newLines;
                    });
                    setCurrentCharIndex((prev) => prev + 1);
                },
                currentLine.type === "command" ? typeSpeed : typeSpeed / 3
            );

            return () => clearTimeout(timeout);
        } else {
            // Move to next line
            const nextLineTimeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 300);

            return () => clearTimeout(nextLineTimeout);
        }
    }, [isTyping, currentLineIndex, currentCharIndex, lines, typeSpeed, onComplete]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [displayedLines]);

    const getLineStyle = (type: TerminalLine["type"]) => {
        switch (type) {
            case "command":
                return "text-cyan";
            case "output":
                return "text-gray-400";
            case "error":
                return "text-red-400";
            case "success":
                return "text-green-400";
            case "comment":
                return "text-gray-500";
            default:
                return "text-white";
        }
    };

    return (
        <div
            className={cn(
                "bg-void/95 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-xl",
                className
            )}
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface/80 border-b border-border">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs text-gray-500 font-mono">
                        hexstrike — terminal
                    </span>
                </div>
                <div className="w-12" /> {/* Spacer for symmetry */}
            </div>

            {/* Terminal content */}
            <div
                ref={terminalRef}
                className="p-5 h-72 overflow-y-auto font-mono text-sm leading-relaxed"
            >
                {displayedLines.map((line, index) => (
                    <div
                        key={index}
                        className={cn(
                            "py-0.5",
                            getLineStyle(line.type)
                        )}
                    >
                        {line.type === "command" && showPrompt && (
                            <span className="text-purple-400 mr-2 select-none">❯</span>
                        )}
                        {line.content}
                        {index === displayedLines.length - 1 &&
                            currentCharIndex <= lines[currentLineIndex]?.content.length && (
                                <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse align-text-bottom" />
                            )}
                    </div>
                ))}
                {currentLineIndex >= lines.length && (
                    <div className="py-0.5 text-cyan">
                        <span className="text-purple-400 mr-2 select-none">❯</span>
                        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse align-text-bottom" />
                    </div>
                )}
            </div>
        </div>
    );
}

// Mini terminal for inline code display
interface MiniTerminalProps {
    command: string;
    output?: string;
    className?: string;
}

export function MiniTerminal({ command, output, className }: MiniTerminalProps) {
    return (
        <div
            className={cn(
                "bg-void border border-border rounded-lg p-4 font-mono text-sm",
                className
            )}
        >
            <div className="flex items-center gap-2 text-cyan">
                <span className="text-purple-400 select-none">$</span>
                <span>{command}</span>
            </div>
            {output && (
                <div className="mt-2 text-gray-400 pl-5">{output}</div>
            )}
        </div>
    );
}

export default Terminal;
