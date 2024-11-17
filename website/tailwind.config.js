/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['../index.html', '../script.js'],
  theme: {
    extend: {
      fontFamily: {
        karantina: ['Karantina'],
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
}

