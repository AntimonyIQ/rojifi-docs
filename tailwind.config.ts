import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0C4592',
          50: '#E6EEF7',
          100: '#CCDDEF',
          200: '#99BBDF',
          300: '#6699CF',
          400: '#3377BF',
          500: '#0C4592',
          600: '#0A3A78',
          700: '#082E5E',
          800: '#062344',
          900: '#04172A',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
