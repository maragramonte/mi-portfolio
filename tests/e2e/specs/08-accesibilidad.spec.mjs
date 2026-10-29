// Accesibilidad. Dos capas: la auditoría automática de axe-core, que cubre lo
// que una máquina sabe comprobar, y unas cuantas reglas propias que axe no
// puede saber —si un enlace externo lleva rel, si el texto alternativo dice
// algo— pero que se rompen en cuanto se añade una tarjeta sin revisar.
import { auditar, esperarCondicion, evaluar, irALimpio, media, pulsar, viewport } from '../lib/agente.mjs'
import { esCierto, esIgual, estaVacia } from '../lib/comprobar.mjs'

const ESCRITORIO = [1280, 900]
const BOTON_IDIOMA = '.rail .rail__ajustes button[aria-label^="Cambiar idioma"]'
const BOTON_TEMA = '.rail .selector-tema > button'

// axe devuelve mucho contexto por incumplimiento; para el informe basta la
// regla, cuántos elementos la rompen y el primero de ellos.
const resumir = (i) => `${i.id} (${i.nodeCount}) — ${i.help}${primerNodo(i)}`
const primerNodo = (i) => {
  const nodo = i.nodes?.[0]
  const donde = nodo?.target?.join(' ') ?? nodo?.selector
  return donde ? `\n          en ${donde}` : ''
}

const auditarPagina = (que) => {
  const { incumplimientos } = auditar()
  estaVacia(incumplimientos, que, resumir)
}

export default {
  titulo: 'Accesibilidad',

  // Devolver la sesión al punto de partida de la suite.
  despues: () => {
    viewport(...ESCRITORIO)
    media('dark', 'reduced-motion')
  },

  pruebas: {
    'la portada en español cumple WCAG 2 A y AA'({ url }) {
      irALimpio(url())
      auditarPagina('axe no encuentra incumplimientos en la portada en español')
    },

    'la portada en inglés cumple WCAG 2 A y AA'({ url }) {
      irALimpio(url('en/'))
      auditarPagina('axe no encuentra incumplimientos en la portada en inglés')
    },

    'el tema día cumple WCAG 2 A y AA'({ url }) {
      // El tema claro tiene su propia paleta: un contraste que pasa en noche
      // puede no pasar en día.
      irALimpio(url())
      pulsar(BOTON_TEMA)
      pulsar('.rail .selector-tema__opcion:not(.selector-tema__opcion--activa)')
      esperarCondicion(`document.documentElement.dataset.theme === 'dia'`)
      esIgual(evaluar(`document.documentElement.dataset.theme`), 'dia', 'el tema día está puesto')

      auditarPagina('axe no encuentra incumplimientos con el tema día')
    },

    'la sección de proyectos filtrada cumple WCAG 2 A y AA'({ url }) {
      // Con el filtro puesto aparece un aviso con role="status" y cambian las
      // tarjetas: es el estado de la web que menos se mira.
      irALimpio(url())
      pulsar('.tech-chip--enlazada')
      esperarCondicion(`!!document.querySelector('.filtro')`)

      auditarPagina('axe no encuentra incumplimientos con el filtro de tecnología puesto')
    },

    'el menú móvil abierto cumple WCAG 2 A y AA'({ url }) {
      viewport(390, 844)
      irALimpio(url())
      pulsar('.barra-movil .boton-menu')
      esperarCondicion(`getComputedStyle(document.querySelector('#menu-movil')).visibility === 'visible'`)
      esIgual(
        evaluar(`document.querySelector('.barra-movil .boton-menu').getAttribute('aria-expanded')`),
        'true',
        'el menú está abierto',
      )

      auditarPagina('axe no encuentra incumplimientos con el menú móvil abierto')
      viewport(...ESCRITORIO)
    },

    'todas las imágenes dicen algo en su texto alternativo'({ url }) {
      irALimpio(url())

      const mudas = evaluar(`(() => {
        return Array.from(document.querySelectorAll('img'))
          .filter((img) => img.getAttribute('aria-hidden') !== 'true')
          .map((img) => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') }))
          .filter((i) => !i.alt || i.alt.trim().length < 5)
      })()`)

      estaVacia(mudas, 'ninguna imagen se queda sin texto alternativo útil', (i) => `${i.src} → alt=${JSON.stringify(i.alt)}`)
    },

    'todos los enlaces que abren pestaña nueva llevan rel'({ url }) {
      // Sin rel, la página que se abre puede manipular la que la abrió. Es la
      // clase de detalle que se olvida al añadir una tarjeta de proyecto.
      irALimpio(url())

      const sinRel = evaluar(`(() => {
        return Array.from(document.querySelectorAll('a[target="_blank"]'))
          .map((a) => ({ href: a.getAttribute('href'), rel: a.getAttribute('rel') ?? '' }))
          .filter((a) => !/noreferrer|noopener/.test(a.rel))
      })()`)

      estaVacia(sinRel, 'cada enlace a pestaña nueva declara rel noreferrer o noopener', (a) => `${a.href} (rel="${a.rel}")`)
    },

    'los encabezados forman un esquema sin saltos'({ url }) {
      // axe solo lo avisa como buena práctica, fuera de las etiquetas WCAG,
      // pero es lo que usa un lector de pantalla para recorrer la página.
      irALimpio(url())

      const r = evaluar(`(() => {
        const visibles = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(
          (h) => h.getClientRects().length > 0 || getComputedStyle(h).display !== 'none',
        )
        const saltos = []
        for (let i = 1; i < visibles.length; i++) {
          const antes = Number(visibles[i - 1].tagName[1])
          const ahora = Number(visibles[i].tagName[1])
          if (ahora - antes > 1) {
            saltos.push(visibles[i - 1].tagName + ' "' + visibles[i - 1].innerText.slice(0, 30) + '" → ' + visibles[i].tagName + ' "' + visibles[i].innerText.slice(0, 30) + '"')
          }
        }
        return { h1: document.querySelectorAll('h1').length, total: visibles.length, saltos }
      })()`)

      esIgual(r.h1, 1, 'la página tiene exactamente un h1')
      esCierto(r.total > 5, 'la página tiene un esquema de encabezados', `solo ${r.total} encabezados`)
      estaVacia(r.saltos, 'ningún encabezado se salta un nivel', (s) => s)
    },

    'todos los controles tienen nombre accesible en los dos idiomas'({ url }) {
      const nombreVacio = `(() => {
        return Array.from(document.querySelectorAll('button, a[href]'))
          .filter((el) => el.getClientRects().length > 0)
          .filter((el) => {
            const nombre = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title') || '').trim()
            return nombre.length === 0
          })
          .map((el) => el.outerHTML.slice(0, 100))
      })()`

      irALimpio(url())
      estaVacia(evaluar(nombreVacio), 'en español ningún botón ni enlace se queda sin nombre', (h) => h)

      pulsar(BOTON_IDIOMA)
      esperarCondicion(`document.documentElement.lang === 'en'`)
      estaVacia(evaluar(nombreVacio), 'en inglés ningún botón ni enlace se queda sin nombre', (h) => h)
    },
  },
}
