/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#5ac848',
          400: '#32a12d',
          500: '#298223',
          600: '#1f6119',
        },
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
