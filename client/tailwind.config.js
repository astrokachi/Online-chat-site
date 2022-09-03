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
      }, 
      boxShadow: {
        '3xl': '0px 0px 27px 1px rgba(255,255,255,0.2)',
      },
      TransitionEvent: {
        'btrans': 'transition-all ease duration-200 hover:scale-95'
      }
    },
    fontFamily: {
      'sans':  ["'Inter, sans-serif'", ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}