// Las descargas del CV son lo que de verdad se viene a buscar al portfolio, y
// son también lo más fácil de romper sin enterarse: los PDF se generan con un
// script aparte y viven en public/, fuera del control de React. Un enlace roto
// aquí no da error en pantalla, solo una página en blanco.
import { evaluar, irALimpio, pulsar } from '../lib/agente.mjs'
import { contiene, esIgual, esMayorQue, estaVacia } from '../lib/comprobar.mjs'

const BOTON_IDIOMA = '.rail .rail__ajustes button[aria-label^="Cambiar idioma"]'

// Pide cada PDF desde la propia página, que es lo que hará el navegador de
// quien pulse. Devuelve el estado y el tipo que contesta el servidor.
const comprobarDescargas = () =>
  evaluar(`(async () => {
    const enlaces = Array.from(document.querySelectorAll('a[download]'))
    const vistos = new Map()
    for (const a of enlaces) {
      const href = a.getAttribute('href')
      if (vistos.has(href)) continue
      const r = await fetch(a.href)
      const cabecera = new Uint8Array(await r.clone().arrayBuffer()).slice(0, 5)
      vistos.set(href, {
        href,
        texto: a.innerText.trim(),
        status: r.status,
        tipo: r.headers.get('content-type'),
        firma: String.fromCharCode(...cabecera),
      })
    }
    return [...vistos.values()]
  })()`)

export default {
  titulo: 'Descargas de CV',

  pruebas: {
    'los dos CV en español se descargan y son PDF de verdad'({ url }) {
      irALimpio(url())
      const descargas = comprobarDescargas()

      esMayorQue(descargas.length, 1, 'la portada ofrece el CV visual y la versión ATS')
      estaVacia(
        descargas.filter((d) => !d.href.includes('-es')),
        'en español se enlazan los PDF en español',
        (d) => `${d.texto} → ${d.href}`,
      )
      estaVacia(
        descargas.filter((d) => d.status !== 200),
        'los PDF del CV en español responden 200',
        (d) => `${d.status} ${d.href}`,
      )
      estaVacia(
        descargas.filter((d) => !String(d.tipo).startsWith('application/pdf')),
        'el servidor los entrega como PDF',
        (d) => `${d.href} llega como ${d.tipo}`,
      )
      // La comprobación que de verdad importa: un servidor puede contestar 200
      // y entregar otra cosa —la página de error de GitHub Pages cuando el
      // fichero no se publicó, por ejemplo—, y eso solo se ve en el contenido.
      estaVacia(
        descargas.filter((d) => !d.firma.startsWith('%PDF')),
        'lo que llega por cada enlace es de verdad un PDF',
        (d) => `${d.href} empieza por ${JSON.stringify(d.firma)}`,
      )
    },

    'los dos CV en inglés se descargan y son PDF de verdad'({ url }) {
      irALimpio(url('en/'))
      const descargas = comprobarDescargas()

      esMayorQue(descargas.length, 1, 'la versión en inglés también ofrece las dos')
      estaVacia(
        descargas.filter((d) => !d.href.includes('-en')),
        'en inglés se enlazan los PDF en inglés',
        (d) => `${d.texto} → ${d.href}`,
      )
      estaVacia(
        descargas.filter(
          (d) => d.status !== 200 || !String(d.tipo).startsWith('application/pdf') || !d.firma.startsWith('%PDF'),
        ),
        'los PDF del CV en inglés responden 200 y son PDF de verdad',
        (d) => `${d.status} ${d.tipo} ${JSON.stringify(d.firma)} ${d.href}`,
      )
    },

    'el enlace del CV cambia de idioma con la interfaz'({ url }) {
      irALimpio(url())

      const antes = evaluar(`document.querySelector('.rail__pie .btn--primario').getAttribute('href')`)
      pulsar(BOTON_IDIOMA)
      const despues = evaluar(`document.querySelector('.rail__pie .btn--primario').getAttribute('href')`)

      contiene(antes, 'cv-mar-agramonte-es', 'en español apunta al CV en español')
      contiene(despues, 'cv-mar-agramonte-en', 'al cambiar de idioma apunta al CV en inglés')
    },

    'la versión ATS se ofrece junto a la visual en los tres sitios'({ url }) {
      // Columna lateral, portada y menú móvil repiten el par de enlaces. Si uno
      // se queda sin la versión ATS, hay recruiters que no encuentran la que
      // leen sus filtros automáticos.
      irALimpio(url())

      const r = evaluar(`(() => {
        const par = (contenedor) => {
          const raiz = document.querySelector(contenedor)
          if (!raiz) return null
          return {
            // En la portada el botón destacado es "Ver proyectos", así que
            // el CV visual es el enlace de descarga que no es el ATS.
            visual: !!raiz.querySelector('a.btn[download]:not(.cv-ats-link)'),
            ats: !!raiz.querySelector('a.cv-ats-link[download]'),
          }
        }
        return { columna: par('.rail__pie'), portada: par('.hero__acciones'), menuMovil: par('#menu-movil') }
      })()`)

      for (const [sitio, par] of Object.entries(r)) {
        esIgual(par?.visual, true, `${sitio}: ofrece el CV visual`)
        esIgual(par?.ats, true, `${sitio}: ofrece la versión ATS`)
      }
    },
  },
}
