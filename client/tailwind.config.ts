import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d',
        },
        earth: {
          50: '#fdf8f0', 100: '#faebd7', 300: '#e8b86d', 500: '#b87333', 700: '#7c4a1e',
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06)',
        'card-md': '0 4px 12px 0 rgba(0,0,0,0.08)',
        'green': '0 4px 12px rgba(34,197,94,0.25)',
        'modal': '0 25px 50px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
