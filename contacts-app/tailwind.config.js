const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        blue: colors.blue,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
      }
  },
  variants: {
  },
  plugins: [],
}
