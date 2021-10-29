module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        'pokemon': ['Pokemon Solid', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {
      maxHeight: ['focus'],
      opacity: ['disabled'],
      animation: ['hover', 'focus'],
    },
  },
  plugins: [],
}
