import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        mint: "#d8f3dc",
        coral: "#ef8354",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        sans: ["var(--font-manrope)"],
      },
    },
  },
  plugins: [],
};

export default config;
