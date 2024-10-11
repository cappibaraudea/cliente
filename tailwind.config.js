/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        "gradient-green": "#69E37B",
        "input-gray-text": "#BABABA",
        "input-gray": "#F3EFF5",
        "green-button": "#47B53E",
      },
      fontFamily: {
        custom: ["klik", "sans-serif"],
        logo: ["folks", "sans-serif"],
      },
    },
  },
  plugins: [],
};
