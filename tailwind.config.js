// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color) / <alpha-value>)",
        secondary: "rgb(var(--secondary-color) / <alpha-value>)",
        background: "rgb(var(--background-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};