/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(70,7,120,1) 50%, rgba(39,27,99,1) 100%)",
        "custom-gradient-2":
          "linear-gradient(72deg, rgba(0,14,115,1) 0%, rgba(55,55,218,1) 50%, rgba(0,75,171,1) 100%)",
      },
      colors: {
        "dark-background": "#000101",
        "dark-component": "#1f1f1f",
        "dark-text": "#dbdbda",
        "dark-selected": "#bb86fc",
        "light-background": "#e0fbfc",
        "light-text": "#293241",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
