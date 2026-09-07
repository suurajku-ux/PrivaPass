/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#050508",
          900: "#0a0a0f",
          850: "#0d0c15",
          800: "#12111f",
          700: "#1c192f",
          600: "#272340",
        },
        violet: {
          glow: "#8b5cf6",
          electric: "#a855f7",
          neon: "#c084fc",
          deep: "#6d28d9",
        },
        cyber: {
          cyan: "#06b6d4",
          emerald: "#10b981",
          pink: "#ec4899",
          amber: "#f59e0b",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "neon-violet": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
        "neon-glow": "0 0 35px -5px rgba(139, 92, 246, 0.6)",
        "neon-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "radar-sweep": "radar-sweep 4s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "glow-pulse": {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))" },
          "100%": { opacity: "1", filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))" },
        }
      }
    },
  },
  plugins: [],
};
