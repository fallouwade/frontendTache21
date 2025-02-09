import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    target: "esnext", // Assure une compatibilité avec les nouvelles versions d'ES
    sourcemap: true, // Génère une map pour le debug
    minify: "esbuild", // Utilise esbuild pour une build plus rapide
  }
})






