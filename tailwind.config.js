/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#94e3fe',
        secondary: '#35cbfb',
      },
    },
    fontFamily: {
      Roboto: ['Roboto, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [],
}
