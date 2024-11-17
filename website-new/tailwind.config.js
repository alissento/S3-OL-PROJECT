/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,svelte}'],
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

