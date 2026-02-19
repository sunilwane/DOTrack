const { heroui } = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/skeleton.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      colors: {
        "primary": "#0d59f2",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
        "card-dark": "#161b25",
        "border-dark": "#282e39",
        "border-muted": "#3b4354",
        "surface-dark": "#1b1f27",
        "stats-dark": "#111318",
        "features-dark": "#0d1117",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [heroui()],
}
