import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 2000, // Définit la limite à 1000 kB (par exemple)
  },
})





