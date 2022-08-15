/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        mount: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
