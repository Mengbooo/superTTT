/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      minHeight: {
        'touch': '44px', // WCAG AAA touch target size
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
