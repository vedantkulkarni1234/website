"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    glitchOnHover?: boolean;
    continuous?: boolean;
    intensity?: "low" | "medium" | "high";
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";

export function GlitchText({
    text,
    className,
    as: Component = "span",
    glitchOnHover = false,
    continuous = false,
    intensity = "medium",
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(continuous);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const intensityConfig = {
        low: { interval: 150, probability: 0.08, duration: 100 },
        medium: { interval: 100, probability: 0.15, duration: 80 },
        high: { interval: 50, probability: 0.25, duration: 50 },
    };

    const config = intensityConfig[intensity];

    useEffect(() => {
        if (!isGlitching) {
            setDisplayText(text);
            return;
        }

        const glitch = () => {
            const chars = text.split("");
            const glitched = chars.map((char) => {
                if (char === " ") return char;
                if (Math.random() < config.probability) {
                    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                }
                return char;
            });
            setDisplayText(glitched.join(""));

            // Reset after short delay
            setTimeout(() => setDisplayText(text), config.duration);
        };

        intervalRef.current = setInterval(glitch, config.interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isGlitching, text, config]);

    const handleMouseEnter = () => {
        if (glitchOnHover) {
            setIsGlitching(true);
        }
    };

    const handleMouseLeave = () => {
        if (glitchOnHover && !continuous) {
            setIsGlitching(false);
        }
    };

    return (
        <Component
            className={cn("relative inline-block", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-text={text}
        >
            {/* Main text */}
            <span className="relative z-10">{displayText}</span>

            {/* Glitch layers */}
            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 w-full text-cyan/70"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                            transform: "translateX(-2px)",
                        }}
                        aria-hidden="true"
                    >
                        {displayText}
                    </span>
                    <span
                        className="absolute top-0 left-0 w-full text-purple/70"
                        style={{
                            clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                            transform: "translateX(2px)",
                        }}
                        aria-hidden="true"
                    >
                        {displayText}
                    </span>
                </>
            )}
        </Component>
    );
}

// Typewriter with glitch effect
interface TypewriterGlitchProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
}

export function TypewriterGlitch({
    text,
    className,
    speed = 50,
    delay = 0,
    onComplete,
}: TypewriterGlitchProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isTyping) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                // Random glitch during typing
                if (Math.random() < 0.1) {
                    const glitchChar =
                        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    setDisplayText(text.slice(0, currentIndex) + glitchChar);
                    setTimeout(() => {
                        setDisplayText(text.slice(0, currentIndex + 1));
                        setCurrentIndex((prev) => prev + 1);
                    }, 50);
                } else {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    setCurrentIndex((prev) => prev + 1);
                }
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            onComplete?.();
        }
    }, [currentIndex, isTyping, text, speed, onComplete]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className={cn("", className)}>
            {displayText}
            <span
                className={cn(
                    "inline-block w-0.5 h-[1em] bg-green-400 ml-0.5 align-text-bottom transition-opacity duration-100",
                    showCursor ? "opacity-100" : "opacity-0"
                )}
            />
        </span>
    );
}

export default GlitchText;
