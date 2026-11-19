// La página de caso de Dr. Agramonte, en sus dos idiomas. Es otra entrada del
// build, con su propio HTML: si se cae de vite.config.js, el portfolio sigue
// funcionando y el enlace de la tarjeta da un 404 sin que nada más avise.
import { abrir, auditar, esperarCondicion, esquemaDelSistema, evaluar, limpiarAlmacenamiento, recargar } from '../lib/agente.mjs'
import { contiene, esIgual, estaVacia } from '../lib/comprobar.mjs'

const CASO = 'casos/dr-agramonte/'
const CASO_EN = `en/${CASO}`

// Como irALimpio, pero esperando a la página de caso: no tiene el menú del
// portfolio, que es lo que espera esperarAplicacion.
function irAlCaso(url) {
  abrir(url)
  limpiarAlmacenamiento()
  recargar()
  esperarCondicion(`!!document.querySelector('.caso h1') && document.readyState === 'complete'`)
}

const estado = () =>
  evaluar(`(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim(),
    idioma: document.querySelector('.caso__idioma')?.href,
    volver: document.querySelector('.caso__volver')?.href,
  }))()`)

const resumir = (i) => `${i.id} (${i.nodeCount}) — ${i.help}`

export default {
  titulo: 'Página de caso',

  // Las pruebas de axe cambian el esquema del sistema: se deja como lo pone run.mjs.
  despues: () => esquemaDelSistema('dark'),

  pruebas: {
    'el caso en español llega con su título, su idioma y su h1'({ url }) {
      irAlCaso(url(CASO))
      const r = estado()

      esIgual(r.lang, 'es', 'el documento está en español')
      contiene(r.title, 'Dos pacientes', 'el título de la pestaña es el del caso')
      esIgual(r.h1, 'Dos pacientes, la misma hora', 'el h1 es el titular del caso')
      esIgual(r.idioma, url(CASO_EN), 'el enlace de idioma lleva a la versión en inglés')
      esIgual(r.volver, `${url()}#proyectos`, 'volver lleva a los proyectos del portfolio')
    },

    'el caso en inglés está entero en inglés'({ url }) {
      irAlCaso(url(CASO_EN))
      const r = estado()

      esIgual(r.lang, 'en', 'the document is in English')
      esIgual(r.h1, 'Two patients, one time slot', 'the h1 is the case headline')
      esIgual(r.idioma, url(CASO), 'the language link goes back to Spanish')
      esIgual(r.volver, `${url('en/')}#proyectos`, 'back goes to the English portfolio')
    },

    'la tarjeta de Dr. Agramonte enlaza el caso en el idioma de la página'({ url }) {
      const enlaceDelCaso = (pagina) => {
        abrir(pagina)
        esperarCondicion(`!!document.querySelector('.card__link--caso')`)
        return evaluar(`document.querySelector('.card__link--caso').href`)
      }

      esIgual(enlaceDelCaso(url()), url(CASO), 'en español, la tarjeta enlaza el caso en español')
      esIgual(enlaceDelCaso(url('en/')), url(CASO_EN), 'en inglés, la tarjeta enlaza el caso en inglés')
    },

    'la carrera acaba con una cita guardada y otra rechazada'({ url }) {
      irAlCaso(url(CASO))
      const final = evaluar(`document.querySelector('.carrera__paso--final')?.textContent ?? ''`)

      contiene(final, '201', 'el paciente que llega primero recibe un 201')
      contiene(final, '409', 'el que llega segundo recibe un 409')
    },

    'los enlaces externos abren pestaña nueva con rel'({ url }) {
      irAlCaso(url(CASO))
      const sinRel = evaluar(`Array.from(document.querySelectorAll('a[target="_blank"]'))
        .filter((a) => !/noreferrer|noopener/.test(a.rel))
        .map((a) => a.href)`)

      estaVacia(sinRel, 'cada enlace a pestaña nueva lleva rel', (href) => href)
    },

    'el caso cumple WCAG 2 A y AA en los dos idiomas'({ url }) {
      irAlCaso(url(CASO))
      estaVacia(auditar().incumplimientos, 'axe no encuentra incumplimientos en español', resumir)

      irAlCaso(url(CASO_EN))
      estaVacia(auditar().incumplimientos, 'axe no encuentra incumplimientos en inglés', resumir)
    },

    'el caso cumple WCAG 2 A y AA con el tema día'({ url }) {
      esquemaDelSistema('light')
      irAlCaso(url(CASO))
      esIgual(evaluar(`document.documentElement.dataset.theme`), 'dia', 'el tema día está puesto')
      estaVacia(auditar().incumplimientos, 'axe no encuentra incumplimientos con el tema día', resumir)
    },
  },
}
