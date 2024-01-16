/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        airbnb: ["var(--font-airbnb)"],
        circular: ["var(--font-circular"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
