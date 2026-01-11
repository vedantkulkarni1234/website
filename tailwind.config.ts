import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#0a0a0a",
                deep: "#0d0d0d",
                surface: {
                    DEFAULT: "#111111",
                    light: "#1a1a1a",
                },
                border: {
                    DEFAULT: "#262626",
                    light: "#333333",
                },
                cyan: {
                    DEFAULT: "#00ffff",
                    dim: "#00cccc",
                    glow: "rgba(0, 255, 255, 0.5)",
                },
                purple: {
                    DEFAULT: "#8b5cf6",
                    dim: "#7c3aed",
                    glow: "rgba(139, 92, 246, 0.5)",
                },
                matrix: {
                    DEFAULT: "#00ff41",
                    dim: "#00cc33",
                    glow: "rgba(0, 255, 65, 0.5)",
                },
                danger: {
                    DEFAULT: "#ff3333",
                    dim: "#cc2929",
                    glow: "rgba(255, 51, 51, 0.5)",
                },
                warning: "#ff6a00",
                success: "#00ff41",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
                sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "glitch": "glitch-skew 1s infinite linear alternate-reverse",
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float-slow 8s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "portal-spin": "portal-spin 20s linear infinite",
                "portal-pulse": "portal-pulse 2s ease-in-out infinite",
                "scan": "scan 3s linear infinite",
                "holographic": "holographic-shift 3s ease infinite",
                "cursor-blink": "cursor-blink 1s step-end infinite",
                "matrix-fall": "matrix-fall 20s linear infinite",
            },
            keyframes: {
                "glitch-skew": {
                    "0%": { transform: "skew(0deg)" },
                    "20%": { transform: "skew(0.5deg)" },
                    "40%": { transform: "skew(-0.5deg)" },
                    "60%": { transform: "skew(0.2deg)" },
                    "80%": { transform: "skew(-0.2deg)" },
                    "100%": { transform: "skew(0deg)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "float-slow": {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-10px) rotate(5deg)" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.5)" },
                },
                "portal-spin": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "portal-pulse": {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
                    "50%": { transform: "scale(1.1)", opacity: "1" },
                },
                scan: {
                    "0%": { top: "0", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": { top: "100%", opacity: "0" },
                },
                "holographic-shift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                "cursor-blink": {
                    "0%, 50%": { opacity: "1" },
                    "51%, 100%": { opacity: "0" },
                },
                "matrix-fall": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
            },
            backgroundImage: {
                "gradient-cyber": "linear-gradient(135deg, #00ffff, #8b5cf6)",
                "gradient-matrix": "linear-gradient(180deg, #00ff41, transparent)",
                "gradient-void": "radial-gradient(ellipse at center, #0d0d0d 0%, #0a0a0a 100%)",
                "grid-pattern": `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
            },
            boxShadow: {
                "glow-cyan": "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.2)",
                "glow-purple": "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)",
                "glow-matrix": "0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.2)",
            },
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "128": "32rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
