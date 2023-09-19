/** @type {import('tailwindcss').Config} */
export default {
  content: ["./{pages,components,constants}/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'tribe': '#1c4587',
        'function': '#3c78d8',
        'area': '#15c',
        'PO': '#76909b',
        'global': '#c57c9f',
        'RB': '#0097a6'
      }
    },
  },
  plugins: [],
};
