/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        gellatio:['Dancing Script', 'cursive'],
        bumbbled: ['Bumbbled', 'handwriting'],
        museo: ['Museo Sans Rounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// tailwind.config.js




