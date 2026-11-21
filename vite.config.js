import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const raiz = (ruta) => resolve(import.meta.dirname, ruta)

// El script que elige el tema antes de pintar tiene que ir en línea en el
// <head>: como módulo llegaría tarde y habría un fogonazo del tema equivocado.
// Vive en src/tema-inicial.js y este plugin lo copia en cada HTML, en el
// marcador <!-- tema-inicial -->, para no mantener una copia por página.
function temaInicialEnLinea() {
  const codigo = readFileSync(raiz('src/tema-inicial.js'), 'utf8')
  return {
    name: 'tema-inicial-en-linea',
    transformIndexHtml: (html) => html.replace('<!-- tema-inicial -->', `<script>${codigo}</script>`),
  }
}

// https://vite.dev/config/
export default defineConfig({
  // La web se sirve en la raíz de maragramonte.com. Si algún día vuelve a una
  // subcarpeta (como /mi-portfolio/ en github.io), hay que cambiarlo aquí y en
  // BASE_DEL_SITIO de tests/e2e/run.mjs.
  base: '/',
  plugins: [react(), temaInicialEnLinea()],
  build: {
    rollupOptions: {
      // Cada idioma tiene su HTML porque los bots que generan la
      // previsualización al compartir un enlace no ejecutan JavaScript: sin un
      // HTML propio, todo se compartiría con el título en español. Una página
      // que no se declare aquí no entra en el build.
      input: {
        es: raiz('index.html'),
        en: raiz('en/index.html'),
        casoEs: raiz('casos/dr-agramonte/index.html'),
        casoEn: raiz('en/casos/dr-agramonte/index.html'),
      },
    },
  },
})
