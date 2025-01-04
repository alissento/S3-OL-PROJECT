/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karantina: ['Karantina'],
        roboto: ['Roboto'],
        poppins: ['Poppins'],
        bricolage: ['Bricolage Grotesque'],
      },
    },
  },
  plugins: [],
};


