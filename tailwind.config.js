/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "customIvory": '#FFFBE9',
        "customPaleBeige": '#E3CAA5',
        "customSandyBrown": '#CEAB93',
        "customLightBrown": '#AD8B73',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

