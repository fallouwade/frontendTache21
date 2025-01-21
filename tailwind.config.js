/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',  // réutilise l'animation spin de base
      }
     },
  },
  plugins: [
    require('flowbite/plugin') // Ajout du plugin Flowbite
  ],
}
