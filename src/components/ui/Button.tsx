"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            loading = false,
            icon,
            iconPosition = "left",
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            "relative inline-flex items-center justify-center",
            "font-semibold tracking-wide rounded-md",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
            "overflow-hidden select-none"
        );

        const variants = {
            primary: cn(
                "bg-gradient-to-r from-cyan to-purple text-void font-bold",
                "hover:shadow-lg hover:shadow-cyan/25 hover:-translate-y-0.5",
                "active:translate-y-0 active:shadow-md"
            ),
            secondary: cn(
                "bg-transparent text-cyan border-2 border-cyan",
                "hover:bg-cyan hover:text-void hover:shadow-lg hover:shadow-cyan/25",
                "active:bg-cyan/90"
            ),
            ghost: cn(
                "bg-transparent text-gray-300 border border-border",
                "hover:text-white hover:border-gray-500 hover:bg-white/5",
                "active:bg-white/10"
            ),
            danger: cn(
                "bg-danger/10 text-danger border border-danger/50",
                "hover:bg-danger hover:text-white hover:border-danger",
                "active:bg-danger/90"
            ),
        };

        const sizes = {
            sm: "h-9 px-4 text-xs gap-1.5",
            md: "h-10 px-5 text-sm gap-2",
            lg: "h-12 px-6 text-base gap-2.5",
        };

        const iconSizes = {
            sm: "w-3.5 h-3.5",
            md: "w-4 h-4",
            lg: "w-5 h-5",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || loading}
                {...props}
            >
                {/* Shimmer effect on hover */}
                <span
                    className={cn(
                        "absolute inset-0 w-full h-full transition-transform duration-700",
                        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        "-translate-x-full group-hover:translate-x-full",
                        variant === "primary" ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Loading spinner */}
                {loading && (
                    <svg
                        className={cn("animate-spin", iconSizes[size])}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}

                {/* Icon left */}
                {icon && iconPosition === "left" && !loading && (
                    <span className={cn("flex-shrink-0", iconSizes[size])}>{icon}</span>
                )}

                {/* Content */}
                <span className="relative z-10">{children}</span>

                {/* Icon right */}
                {icon && iconPosition === "right" && !loading && (
                    <span className={cn("flex-shrink-0", iconSizes[size])}>{icon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
