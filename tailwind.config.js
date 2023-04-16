/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue, js, ts, jsx, tsx}',
    './node_modules/flowbite/**/*.js',
  ],
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
  },
  plugins: [require('flowbite/plugin')],
}
