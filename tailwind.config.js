/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3A5A40",
          200: "#344E41",
        },
        secondary: "#A3B18A",
        accent: "#588157",
        surface: "#DAD7CD",
        highlight: "#588157",
      },
    },
  },
  plugins: [],
};
