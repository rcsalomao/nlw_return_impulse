const tailwindcss = require("tailwindcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: { md: "4px" },
      colors: {
        brand: { 500: "#8257e6", 300: "#996dff" },
        background: "#09090A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
