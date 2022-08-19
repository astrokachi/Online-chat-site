/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'start': '#1c1b6f',
        'end': '#1e1e1e',
        'purp': '#9747FF'
      } 
    },
    fontFamily: {
      'sans':  ["'Inter, sans-serif'", ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}