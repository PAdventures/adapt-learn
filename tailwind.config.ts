import type { Config } from "tailwindcss"

const config = {
    darkMode: ["selector"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
	],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    dark: "hsl(var(--background-dark))",
                    darker: "hsl(var(--background-darker))"
                },
                foreground: {
                    DEFAULT: "hsl(var(--primary-colour-100))",
                    dark: "hsl(var(--primary-colour-200))",
                    darker: "hsl(var(--primary-colour-300))"
                },
                primary: {
                    DEFAULT: "hsl(291, 100%, 46%)",
                    foreground: {
                        DEFAULT: "hsl(291, 100%, 40%)",
                        dark: "hsl(291, 100%, 35%)"
                    },
                },
                secondary: {
                    DEFAULT: "hsl(var(--neutral-colour-500))",
                    foreground: "hsl(var(--neutral-colour-400))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--error-colour-500))",
                    foreground: "hsl(var(--error-colour-100))",
                },
                muted: {
                    DEFAULT: "hsl(var(--neutral-colour-300))",
                    foreground: "hsl(var(--neutral-colour-100))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                nav: {
                    DEFAULT: "hsl(var(--primary-colour-nav))"
                },
                neutral: {
                    DEFAULT: "hsl(var(--neutral-colour-500)))",
                    light: "hsl(var(--neutral-colour-100))"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config