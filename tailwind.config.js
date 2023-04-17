/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xlmin: { min: "1535px" },
      // => @media (min-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "821px" },
      // => @media (max-width: 821px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "390px" },
      // => @media (max-width: 390px) { ... }
    },
    extend: {
      colors: {
        primary: "#ffe03a",
        secondary: "#000000",
        tertiary: "#d6d6d6",
      },
    },
  },
  plugins: [],
};
