/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'zinc-999': '#0D0D0D'
      },
      padding: {
        "18": "4.5rem",
        "30": "7.75rem"
      }
    },
  },
  plugins: [],
}