// > tailwind.config

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          500: "#C8BCF6",
        },
        secondary: {
          500: "#22252A",
        },
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#101012",
        },
        light: {
          900: "#FFFFFF",
          800: "#F4F6F8",
          850: "#FDFDFD",
          700: "#DCE3F1",
          500: "#7B8EC8",
          400: "#858EAD",
        },
      },
      focus: {
        "primary-border-color": "#C8BCF6", // Replace with your desired focus border color
      },

      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },

      screens: {
        xs: "420px",
      },
    },
  },
};
