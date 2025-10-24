import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        muted: "hsl(var(--muted))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        glow: "hsl(var(--glow))",
        outline: "hsl(var(--outline))",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 20% 20%, rgba(255,243,244,0.9), transparent 55%), radial-gradient(circle at 80% 0%, rgba(226,239,255,0.8), transparent 55%), radial-gradient(circle at 10% 80%, rgba(255,255,214,0.6), transparent 60%), radial-gradient(circle at 90% 90%, rgba(255,231,255,0.5), transparent 55%)",
        "mesh-dark":
          "radial-gradient(circle at 20% 20%, rgba(27,38,59,0.96), transparent 55%), radial-gradient(circle at 80% 0%, rgba(45,18,66,0.68), transparent 55%), radial-gradient(circle at 10% 80%, rgba(19,48,41,0.72), transparent 60%), radial-gradient(circle at 90% 90%, rgba(88,35,117,0.62), transparent 55%)",
      },
      boxShadow: {
        "glow-accent":
          "0 0 40px rgba(var(--glow-rgb), 0.35), 0 0 70px rgba(var(--glow-rgb), 0.25)",
        "inner-strong": "inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      borderRadius: {
        lg: "1.5rem",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-16px) scale(1.01)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(var(--glow-rgb), 0.3)" },
          "50%": { boxShadow: "0 0 28px rgba(var(--glow-rgb), 0.45)" },
        },
        "shine-left": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 12s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "shine-left": "shine-left 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
