import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'tribe': '#1c4587',
        'function': '#3c78d8',
        'area': '#15c'
      }
    },
  },
  plugins: [],
} satisfies Config;
