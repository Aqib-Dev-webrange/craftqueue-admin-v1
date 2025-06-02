import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#745535",
                brand: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#e8dcc6",
          300: "#d4c19a",
          400: "#c4a373",
          500: "#b8925a",
          600: "#a37c4a",
          700: "#88653e",
          800: "#745535", // Your primary color
          900: "#5f452b",
        },
        // Warm neutrals from your palette
        warm: {
          50: "#fdfcfb",
          100: "#f7f4f0",
          200: "#ede6dc",
          300: "#ddd0c0",
          400: "#c9b59d",
          500: "#b8a082",
          600: "#a08866",
          700: "#887152",
          800: "#6b5940",
          900: "#54472f",
        }
      },
      fontFamily: {
        package: ["var(--font-geist-sans)"],
        poppins: ["Poppins", "sans-serif"],
        mono: ["var(--font-geist-mono)"],
      }
    },
  },
  plugins: [],
} satisfies Config;
