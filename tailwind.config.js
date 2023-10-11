/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        marker: ["Permanent Marker", "sans-serif"],
      },
      colors: {
        primary: "#e63a16",
        secondary: "#00acb6",
        background: "#242424"
      },
    },
  },
  plugins: [],
};
