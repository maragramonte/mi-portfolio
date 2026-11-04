// Navegación por anclas, marcado de la sección activa y barra de progreso.
// La sección activa no se calcula con el scroll sino con un
// IntersectionObserver, así que estas pruebas esperan a que el navegador avise
// en vez de dar por hecho que el cambio es inmediato.
import { esperarCondicion, evaluar, irALimpio, media, pulsar } from '../lib/agente.mjs'
import { esCierto, esIgual, estaEntre, estaVacia } from '../lib/comprobar.mjs'

const SECCIONES = ['sobre-mi', 'experiencia', 'tecnologias', 'proyectos', 'contacto']

export default {
  titulo: 'Navegación',

  pruebas: {
    'cada enlace del menú deja su sección arriba de la pantalla'({ url }) {
      irALimpio(url())

      const mal = []
      for (const id of SECCIONES) {
        pulsar(`.rail__nav a[href="#${id}"]`)

        // El salto puede no haber terminado cuando `pulsar` vuelve, así que se
        // espera a que la sección llegue arriba en vez de medir al momento. El
        // margen es generoso a propósito: lo que importa es que la sección esté
        // arriba, no el píxel exacto, que depende del scroll-margin y de la
        // tipografía.
        try {
          esperarCondicion(
            `(() => { const t = document.getElementById('${id}').getBoundingClientRect().top; return t > -40 && t < window.innerHeight / 2 })()`,
            5000,
          )
        } catch {
          // El detalle lo da la medición de abajo.
        }

        const r = evaluar(`(() => {
          const caja = document.getElementById('${id}').getBoundingClientRect()
          return { hash: location.hash, top: Math.round(caja.top), alto: window.innerHeight }
        })()`)

        if (r.hash !== `#${id}`) mal.push(`#${id}: el hash quedó en "${r.hash}"`)
        else if (r.top < -40 || r.top > r.alto / 2) mal.push(`#${id}: la sección quedó a ${r.top}px del borde`)
      }

      estaVacia(mal, 'los cinco enlaces del menú llevan a su sección', (m) => m)
    },

    'el menú marca con aria-current la sección que se está viendo'({ url }) {
      irALimpio(url())

      // Esperar a que el observador haya marcado algo antes de saltar: así se
      // comprueba que la marca se mueve, no que llega por primera vez.
      esperarCondicion(`!!document.querySelector('.rail__nav a[aria-current="true"]')`)
      pulsar('.rail__nav a[href="#proyectos"]')

      // Y el observador avisa un instante después del salto.
      esperarCondicion(`document.querySelector('.rail__nav a[aria-current="true"]')?.hash === '#proyectos'`)

      const marcados = evaluar(
        `Array.from(document.querySelectorAll('.rail__nav a[aria-current="true"]')).map((a) => a.hash)`,
      )
      esIgual(marcados.length, 1, 'solo una sección aparece como activa')
      esIgual(marcados[0], '#proyectos', 'la marcada es la que se está viendo')
    },

    'el nombre de la columna devuelve al principio'({ url }) {
      // #top estuvo colgado de la portada, que en escritorio se esconde con
      // display:none: el enlace cambiaba el hash y la página no se movía. Esta
      // prueba vigila que el ancla siga en un elemento que exista a esta
      // anchura, no solo que el enlace apunte a algún sitio.
      irALimpio(url())
      pulsar('.rail__nav a[href="#contacto"]')
      esperarCondicion(`window.scrollY > 1000`)

      pulsar('.rail__nombre')
      esperarCondicion(`window.scrollY < 120`)

      const r = evaluar(`(() => {
        const destino = document.getElementById('top')
        return {
          hash: location.hash,
          scroll: Math.round(window.scrollY),
          seVe: !!destino && getComputedStyle(destino).display !== 'none',
        }
      })()`)

      esIgual(r.hash, '#top', 'el nombre de la columna apunta al principio')
      esCierto(r.seVe, 'el ancla #top está en un elemento que esta anchura no esconde')
      esCierto(r.scroll < 120, 'la página vuelve arriba', `scrollY = ${r.scroll}`)
    },

    'la barra de progreso va de 0 a 100 al recorrer la página'({ url }) {
      irALimpio(url())

      const inicio = evaluar(`(() => {
        const b = document.querySelector('[role=progressbar]')
        return { ahora: Number(b.getAttribute('aria-valuenow')), min: b.getAttribute('aria-valuemin'), max: b.getAttribute('aria-valuemax'), etiqueta: b.getAttribute('aria-label') }
      })()`)

      esIgual(inicio.ahora, 0, 'arranca a cero')
      esIgual(inicio.min, '0', 'declara su mínimo')
      esIgual(inicio.max, '100', 'declara su máximo')
      esCierto(!!inicio.etiqueta, 'la barra tiene nombre accesible')

      evaluar(`window.scrollTo(0, document.documentElement.scrollHeight)`)
      esperarCondicion(`Number(document.querySelector('[role=progressbar]').getAttribute('aria-valuenow')) > 90`)

      const fin = evaluar(`Number(document.querySelector('[role=progressbar]').getAttribute('aria-valuenow'))`)
      estaEntre(fin, 95, 100, 'al final de la página la barra está completa')
    },

    'todos los enlaces internos del menú tienen destino'({ url }) {
      irALimpio(url())

      const rotos = evaluar(`(() => {
        return Array.from(document.querySelectorAll('a[href^="#"]'))
          .map((a) => a.getAttribute('href'))
          .filter((href) => href !== '#' && !document.getElementById(href.slice(1)))
      })()`)

      estaVacia(rotos, 'ningún enlace de ancla apunta a una sección que no existe', (h) => h)
    },

    'el scroll suave se desactiva para quien pide menos animación'({ url }) {
      // El resto de la suite corre con la animación reducida para que el
      // estado llegue sin esperas, así que esta es la prueba que vigila que la
      // preferencia del sistema siga atendida de verdad.
      media('dark')
      irALimpio(url())
      esIgual(
        evaluar(`getComputedStyle(document.documentElement).scrollBehavior`),
        'smooth',
        'sin preferencia declarada, el salto entre secciones es suave',
      )

      media('dark', 'reduced-motion')
      irALimpio(url())
      esIgual(
        evaluar(`getComputedStyle(document.documentElement).scrollBehavior`),
        'auto',
        'quien pide menos animación salta sin desplazamiento suave',
      )
    },
  },

  // Dejar la emulación como la encontró: es estado de la sesión del navegador
  // y lo heredarían los bloques siguientes.
  despues: () => media('dark', 'reduced-motion'),
}
