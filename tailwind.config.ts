import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#030303",
          900: "#080808",
          850: "#0d0d0d",
          800: "#111111",
          700: "#181818",
          600: "#232323",
          500: "#2c2c2c",
        },
        // grays tuned so every step passes WCAG AA (≥4.5:1) on the ink field
        mist: {
          600: "#838383",
          500: "#8E8E8E",
          400: "#A8A8A8",
          300: "#D4D4D4",
          200: "#E5E5E5",
          100: "#F5F5F5",
        },
        // champagne gold — signature accent of the black/gold identity
        accent: {
          DEFAULT: "#D6A544",
          soft: "#EAC97E",
          deep: "#A87C2C",
          glow: "rgba(214, 165, 68, 0.55)",
        },
        // deep bronze — the low warm tone of the atmosphere
        accent2: {
          DEFAULT: "#9A7434",
          soft: "#C09A58",
          deep: "#7C5A22",
          glow: "rgba(154, 116, 52, 0.5)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "1280px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px -20px rgba(0,0,0,0.8)",
        "glow-accent": "0 0 40px -10px rgba(214,165,68,0.4)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(3,3,3,0.9))",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
