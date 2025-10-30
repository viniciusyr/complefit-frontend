/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                orange: {
                    500: "#ff5500",
                },
                neutral: {
                    900: "#1a1a1a",
                },
            },
        },
    },
  plugins: [],
}