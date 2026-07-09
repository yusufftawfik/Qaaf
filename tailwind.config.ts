import type { Config } from "tailwindcss";

/**
 * Ummat Al-Quran design tokens.
 * Palette: deep navy (authority), warm gold (emphasis/hierarchy),
 * ivory-parchment (surface), refined emerald green (living knowledge).
 * These are placeholders derived from the brief; refine against the
 * final brand-identity PDF when available.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061423",
          900: "#0A1D33",
          800: "#0E2740",
          700: "#14324F",
          600: "#1D4368",
          500: "#2A567F",
        },
        gold: {
          700: "#8C6B22",
          600: "#A9842E",
          500: "#C7A24C",
          400: "#D9BE79",
          300: "#E8D6A6",
          200: "#F2E7C9",
        },
        parchment: {
          50: "#FBF8F1",
          100: "#F6F0E2",
          200: "#EEE4CE",
          300: "#E3D4B4",
        },
        emerald: {
          800: "#123D30",
          700: "#1A5140",
          600: "#226B54",
          500: "#2E8267",
          400: "#4CA184",
          300: "#7DBFA9",
          200: "#A9D6C6",
        },
        ink: {
          DEFAULT: "#1A1E26",
          soft: "#4A5160",
          faint: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Reem Kufi", "serif"],
        sans: ["var(--font-sans)", "IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Amiri", "serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,29,51,0.04), 0 12px 32px -12px rgba(10,29,51,0.16)",
        "card-hover": "0 2px 6px rgba(10,29,51,0.06), 0 22px 48px -18px rgba(10,29,51,0.28)",
        glow: "0 0 0 1px rgba(199,162,76,0.5), 0 8px 30px -8px rgba(199,162,76,0.35)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "geo-navy":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C7A24C' stroke-opacity='0.10' stroke-width='1'%3E%3Cpath d='M30 2 L45 15 L58 30 L45 45 L30 58 L15 45 L2 30 L15 15 Z'/%3E%3Cpath d='M30 12 L48 30 L30 48 L12 30 Z'/%3E%3C/g%3E%3C/svg%3E\")",
        "geo-parchment":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230E2740' stroke-opacity='0.05' stroke-width='1'%3E%3Cpath d='M30 2 L45 15 L58 30 L45 45 L30 58 L15 45 L2 30 L15 15 Z'/%3E%3Cpath d='M30 12 L48 30 L30 48 L12 30 Z'/%3E%3C/g%3E%3C/svg%3E\")",
        "gold-fade": "linear-gradient(90deg, transparent, #C7A24C, transparent)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
