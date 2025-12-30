/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#FF0080",
          lime: "#CCFF00",
          cyan: "#00FFFF",
        },
        dark: {
          900: "#111111",
          800: "#222222",
        },
      },
    },
  },
  plugins: [],
};