/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
        colors: {
          darkBg: "#0D0D0D",
          cardBg: "#1A1A2E",
          accent: "#7B3FE4",
          accentHover: "#9253FF",
        },
      },
    },
    plugins: [],
  };
  