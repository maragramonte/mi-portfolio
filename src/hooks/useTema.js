import { useEffect, useState } from 'react'

// Los dos temas de la web. Esta lista va a la par con TEMAS del script de
// cabecera de cada HTML, que elige el tema antes de pintar.
export const TEMAS = ['dia', 'noche']

// Color de la barra del navegador en móvil para cada tema.
const COLOR_DE_BARRA = { dia: '#f3f7fa', noche: '#0a0e1f' }

function temaInicial() {
  try {
    const guardado = localStorage.getItem('tema')
    if (TEMAS.includes(guardado)) return guardado
  } catch {
    // Si el navegador bloquea localStorage, se usa el tema elegido en el HTML.
  }

  // El HTML ya elige el tema del sistema antes de pintar la página.
  const inicial = document.documentElement.dataset.theme
  return TEMAS.includes(inicial) ? inicial : 'noche'
}

// Tema activo: lo aplica al <html>, lo guarda para la próxima visita y lo
// comparten todas las páginas del portfolio.
export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try {
      localStorage.setItem('tema', tema)
    } catch {
      // El tema sigue activo aunque el navegador no permita guardarlo.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLOR_DE_BARRA[tema])
  }, [tema])

  return [tema, setTema]
}
