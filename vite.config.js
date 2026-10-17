import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Necesario para GitHub Pages: la web se sirve en /mi-portfolio/
  base: '/mi-portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Dos páginas para la misma aplicación. en/index.html solo cambia las
      // etiquetas de la cabecera, y existe porque los bots que generan la
      // previsualización al compartir el enlace no ejecutan JavaScript: sin un
      // HTML propio, el portfolio se compartía siempre con el título en
      // español. Sin declararla aquí, el build no la incluiría.
      input: {
        es: resolve(import.meta.dirname, 'index.html'),
        en: resolve(import.meta.dirname, 'en/index.html'),
      },
    },
  },
})
