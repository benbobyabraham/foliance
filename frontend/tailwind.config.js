/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'foliance-blue': '#003366',
        'foliance-blue-dark': '#002244',
        'foliance-orange': '#C84A07',
        'foliance-orange-dark': '#A63D06',
        'foliance-light-gray': '#F5F5F5',
        'foliance-dark-gray': '#333333',
      },
    },
  },
  plugins: [],
}
