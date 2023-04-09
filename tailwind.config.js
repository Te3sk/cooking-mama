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
    fontSize : {
      msgSize : "20px"
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      creambg: "#fff8f6",
      darkCreambg: "#fffbfa",
      orange: "#e9aa73",
      darkOrange: "#e9aa73",
      lightGray: "#cacaca",
      gray: "#7c7c7c"
    },
  },
  plugins: [],
};
