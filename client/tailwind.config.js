/** @type {import('tailwindcss').Config} */
export default {
    // ... content paths ...
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'), // <--- It belongs HERE
    ],
  }