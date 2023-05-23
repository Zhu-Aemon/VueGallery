/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#94e3fe',
        secondary: '#35cbfb',
        qrbg: '#ebeffc',
      },
      lineHeight: {
        limited: '1.2em',
      },
      maxHeight: {
        limited: '5.9em', // Adjust this value based on the number of lines you want to display and the lineHeight
      },
    }, // Add closing brace here
    fontFamily: {
      Roboto: ['Roboto, sans-serif'],
    },
  },
  variants: {
    extend: {
      lineClamp: ['responsive'],
    },
  },
}
