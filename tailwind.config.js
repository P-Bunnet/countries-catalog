/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          normal: "#CCD5AE",
          light: "#E0E5B6",
        },
        secondary: {
          normal: "#FAEDCE",
          light: "#FEFAE0",
        },
      },
    },
  },
  plugins: [],
};
