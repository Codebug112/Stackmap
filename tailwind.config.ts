import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sm: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          surface2: "var(--surface2)",
          border: "var(--border)",
          bright: "var(--border-bright)",
          accent: "var(--accent)",
          "accent-dim": "var(--accent-dim)",
          "accent-mid": "var(--accent-mid)",
          warn: "var(--warn)",
          "warn-dim": "var(--warn-dim)",
          danger: "var(--danger)",
          "danger-dim": "var(--danger-dim)",
          text: "var(--text)",
          dim: "var(--text-dim)",
          "text-bright": "var(--text-bright)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
