/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "luxury", "nord"],
  },
  theme: {
    extend: {
      colors: { whiteish: "var(--whiteish)" },
    },
  },
  plugins: [require("daisyui")],
};
