"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glow" | "gradient" | "holographic";
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = "default",
            hover = true,
            padding = "md",
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = cn(
            "relative rounded-xl overflow-hidden",
            "transition-all duration-300 ease-out"
        );

        const variants = {
            default: cn(
                "bg-surface border border-border",
                hover && "hover:border-cyan/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan/5"
            ),
            glow: cn(
                "bg-surface border border-cyan/30",
                "shadow-lg shadow-cyan/10",
                hover && "hover:border-cyan/60 hover:shadow-xl hover:shadow-cyan/20"
            ),
            gradient: cn(
                "bg-gradient-to-br from-surface via-surface-light to-surface",
                "border border-purple/30",
                hover && "hover:-translate-y-1 hover:shadow-xl hover:shadow-purple/20 hover:border-purple/50"
            ),
            holographic: cn(
                "bg-surface border border-border",
                hover && [
                    "hover:border-transparent",
                    "hover:bg-gradient-to-br hover:from-cyan/5 hover:via-purple/5 hover:to-cyan/5",
                    "hover:shadow-xl hover:shadow-cyan/10"
                ]
            ),
        };

        const paddings = {
            none: "",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        };

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variants[variant], paddings[padding], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col gap-1.5 mb-4", className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, as: Component = "h3", children, ...props }, ref) => (
        <Component
            ref={ref}
            className={cn(
                "text-lg font-bold text-white tracking-tight leading-tight",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
);

CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-sm text-gray-400 leading-relaxed", className)}
            {...props}
        >
            {children}
        </p>
    )
);

CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn("", className)} {...props}>
            {children}
        </div>
    )
);

CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex items-center mt-6 pt-4 border-t border-border", className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};
