/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#fcf8f8",
        background: "#fcf8f8",
        primary: "#080909",
        "on-primary": "#ffffff",
        "primary-container": "#1b1c1c",
        "on-primary-container": "#848483",
        secondary: "#0050d7",
        "secondary-container": "#2569fe",
        "surface-container": "#f1edec",
        "surface-container-low": "#f7f3f2",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#ebe7e7",
        "surface-container-highest": "#e5e2e1",
        "surface-variant": "#e5e2e1",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#444747",
        outline: "#747878",
        "outline-variant": "#e7e8ea",
        success: "#00C853",
        warning: "#F59E0B",
        danger: "#BA1A1A"
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        full: "9999px"
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
};
