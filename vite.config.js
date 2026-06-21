import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Necesario para GitHub Pages: la web se sirve en /mi-portfolio/
  base: '/mi-portfolio/',
  plugins: [react()],
})
