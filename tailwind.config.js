/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,html,ts}', './*.html'],
  theme: {
    screens: {
      xs: '480px',
      sm: '672px',
      md: '768px',
      lg: '1024px',
    },
    extend: {},
  },
  plugins: [],
};
