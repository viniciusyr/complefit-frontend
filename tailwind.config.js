/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
//    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: "#FF6B35",
        accentDark: "#E04E1F",
        slate: "#0F1724",
        card: "#0B1020",
        soft: "#F7F8FA",
        green: "#00C48C",
      },
      fontFamily: {
        heading: ["System"],
        body: ["System"],
      },
    },
  },
  plugins: [],
};