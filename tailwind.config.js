/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        indie: ["Indie Flower", "cursive"],
      },
      colors: {
        primary: "#e63a16",
      },
    },
  },
  plugins: [],
};
