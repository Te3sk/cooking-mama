/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    },
    fontFamily:{
      nunito : ["Nunito", "sans-serif"],
      kanit : ["Kanit","sans-serif"]
    },
    colors: {
      creambg: "#ffebe7",
      orange: "#e9aa73",
      darkOrange: "#e9aa73",
      lightGray: "#cacaca"
    },
  },
  plugins: [],
};
