/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/user-app/src/**/*.{html,ts}',
    './apps/admin-app/src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#FFC107',
        'trust-blue': '#1976D2',
        'industrial-gray': {
          light: '#616161',
          DEFAULT: '#424242',
          dark: '#212121',
        },
        'background-light': '#F5F5F5',
        'background-dark': '#101922',
      },
      fontFamily: {
        'display': ['Work Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
