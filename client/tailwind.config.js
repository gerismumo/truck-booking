/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': 'white',
      'dark' : '#323643',
      'lightBlue': '#93DEFF'
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lg1': '1182px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}

