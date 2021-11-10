const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {},
  variants: {
    extends: {
        tableLayout: ['hover', 'focus'],
      }
  },
  plugins: [],
}
