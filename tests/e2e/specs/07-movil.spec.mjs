// En móvil la columna lateral se cambia por una barra fija con un panel
// desplegable. Es la parte de la web con más estado efímero —menú abierto,
// página bloqueada detrás, foco que hay que devolver— y la que nadie revisa
// a mano después de cada cambio.
import { esperarCondicion, evaluar, irALimpio, pulsar, raton, tecla, viewport } from '../lib/agente.mjs'
import { esCierto, esFalso, esIgual, estaVacia, noEsIgual } from '../lib/comprobar.mjs'

const MOVIL = [390, 844]
const ESCRITORIO = [1280, 900]
const BOTON_MENU = '.barra-movil .boton-menu'

const estado = () =>
  evaluar(`(() => {
    const boton = document.querySelector('${BOTON_MENU}')
    const menu = document.querySelector('#menu-movil')
    const estilo = getComputedStyle(menu)
    return {
      railVisible: getComputedStyle(document.querySelector('.rail')).display !== 'none',
      barraVisible: getComputedStyle(document.querySelector('.barra-movil')).display !== 'none',
      desplegado: boton.getAttribute('aria-expanded'),
      etiquetaBoton: boton.getAttribute('aria-label'),
      controla: boton.getAttribute('aria-controls'),
      menuOculto: menu.getAttribute('aria-hidden'),
      menuVisible: estilo.visibility === 'visible' && estilo.display !== 'none',
      paginaBloqueada: document.body.style.overflow === 'hidden',
      hayFondo: !!document.querySelector('.menu-fondo'),
      focoEnBoton: document.activeElement === boton,
      enlaces: menu.querySelectorAll('a[href^="#"]').length,
    }
  })()`)

const abrirEnMovil = (url) => {
  viewport(...MOVIL)
  irALimpio(url)
}

// El panel entra con una transición, así que después de pulsar hay que esperar
// a que sea visible antes de tocar nada de dentro.
const desplegarMenu = () => {
  pulsar(BOTON_MENU)
  esperarCondicion(`getComputedStyle(document.querySelector('#menu-movil')).visibility === 'visible'`)
}

const esperarCerrado = () =>
  esperarCondicion(`document.querySelector('${BOTON_MENU}').getAttribute('aria-expanded') === 'false'`)

export default {
  titulo: 'Menú en móvil',

  // Dejar la ventana como estaba: las pruebas de después dan por hecho el
  // escritorio, y el tamaño es estado compartido de la sesión del navegador.
  despues: () => viewport(...ESCRITORIO),

  pruebas: {
    'en pantalla estrecha la columna lateral deja paso a la barra con el menú'({ url }) {
      abrirEnMovil(url())
      const r = estado()

      esFalso(r.railVisible, 'la columna lateral se esconde en móvil')
      esCierto(r.barraVisible, 'aparece la barra fija de arriba')
      esIgual(r.controla, 'menu-movil', 'el botón declara qué panel abre')
      esIgual(r.desplegado, 'false', 'el menú arranca cerrado')
    },

    'con el menú cerrado sus enlaces no reciben el foco'({ url }) {
      // El panel se queda en el DOM con aria-hidden cuando está cerrado. Si se
      // esconde solo desplazándolo, sus enlaces siguen siendo alcanzables con
      // el tabulador y quien navega con teclado cae en un menú invisible.
      abrirEnMovil(url())

      const r = evaluar(`(() => {
        const menu = document.querySelector('#menu-movil')
        const enlace = menu.querySelector('a')
        enlace.focus()
        return {
          ariaHidden: menu.getAttribute('aria-hidden'),
          visibilidad: getComputedStyle(enlace).visibility,
          loHaCogido: document.activeElement === enlace,
        }
      })()`)

      esIgual(r.ariaHidden, 'true', 'el panel cerrado se marca como oculto')
      esIgual(r.visibilidad, 'hidden', 'y se esconde de verdad, no solo desplazado')
      esFalso(r.loHaCogido, 'sus enlaces no pueden recibir el foco')
    },

    'el botón abre el panel, lo anuncia y bloquea la página de detrás'({ url }) {
      abrirEnMovil(url())
      const cerrado = estado()

      desplegarMenu()
      const abierto = estado()

      esIgual(abierto.desplegado, 'true', 'el botón anuncia que el menú está abierto')
      esIgual(abierto.menuOculto, 'false', 'el panel deja de estar oculto')
      esCierto(abierto.menuVisible, 'el panel se ve')
      esCierto(abierto.paginaBloqueada, 'la página de detrás no se puede mover')
      esCierto(abierto.hayFondo, 'aparece la capa oscura para cerrar tocando fuera')
      noEsIgual(abierto.etiquetaBoton, cerrado.etiquetaBoton, 'la etiqueta del botón pasa de abrir a cerrar')
      esCierto(abierto.enlaces >= 5, 'el panel trae los enlaces de las secciones')
    },

    'Escape cierra el menú y devuelve el foco al botón'({ url }) {
      abrirEnMovil(url())
      desplegarMenu()

      tecla('Escape')
      esperarCerrado()
      const r = estado()

      esIgual(r.desplegado, 'false', 'Escape cierra el menú')
      esFalso(r.paginaBloqueada, 'la página vuelve a poder moverse')
      esCierto(r.focoEnBoton, 'quien cerró con el teclado recupera el foco en el botón')
    },

    'tocar fuera del panel lo cierra'({ url }) {
      abrirEnMovil(url())
      desplegarMenu()
      esCierto(estado().hayFondo, 'hay capa oscura que tocar')

      // El panel es un cajón pegado a la derecha y cubre el centro de la capa
      // oscura, así que no se puede pulsar por selector: hay que tocar un
      // punto que esté de verdad fuera del panel, como haría un dedo.
      const fuera = evaluar(`(() => {
        const caja = document.querySelector('#menu-movil').getBoundingClientRect()
        return { x: Math.round(caja.left / 2), y: Math.round(window.innerHeight / 2) }
      })()`)
      raton(fuera.x, fuera.y)
      esperarCerrado()
      const r = estado()

      esIgual(r.desplegado, 'false', 'tocar fuera cierra el menú')
      esFalso(r.hayFondo, 'la capa oscura desaparece con él')
      esFalso(r.paginaBloqueada, 'la página vuelve a poder moverse')
    },

    'elegir una sección cierra el menú y lleva hasta ella'({ url }) {
      abrirEnMovil(url())
      desplegarMenu()

      pulsar('#menu-movil a[href="#proyectos"]')
      esperarCerrado()
      const r = estado()
      const destino = evaluar(`(() => ({
        hash: location.hash,
        top: Math.round(document.getElementById('proyectos').getBoundingClientRect().top),
      }))()`)

      esIgual(r.desplegado, 'false', 'elegir una sección cierra el menú')
      esFalso(r.paginaBloqueada, 'y desbloquea la página')
      esIgual(destino.hash, '#proyectos', 'la navegación llega a la sección')
      esCierto(destino.top < 200, 'y la deja a la vista', `top = ${destino.top}px`)
    },

    'la marca de la barra devuelve al principio de la página'({ url }) {
      abrirEnMovil(url())

      // Bajar sin más: lo que se prueba es la marca de la barra, no cómo se
      // llegó hasta abajo. La columna con el menú no existe a esta anchura.
      evaluar(`window.scrollTo(0, document.documentElement.scrollHeight)`)
      esperarCondicion(`window.scrollY > 500`)

      pulsar('.barra-movil__marca')
      esperarCondicion(`window.scrollY < 120`)

      const r = evaluar(`({ hash: location.hash, scroll: Math.round(window.scrollY) })`)
      esIgual(r.hash, '#top', 'la marca apunta a la cabecera')
      esCierto(r.scroll < 120, 'y la página vuelve arriba', `scrollY = ${r.scroll}`)
    },

    'los ajustes de idioma y tema también están en la barra móvil'({ url }) {
      // Son los mismos componentes que en la columna lateral, pero si la barra
      // móvil dejara de pintarlos no habría forma de cambiar idioma o tema
      // desde el teléfono, que es por donde llega la mitad de las visitas.
      abrirEnMovil(url())

      const faltan = evaluar(`(() => {
        const barra = document.querySelector('.barra-movil')
        const esVisible = (el) => el && getComputedStyle(el).display !== 'none' && el.getClientRects().length > 0
        return [
          ['botón de idioma', barra.querySelector('button[aria-label^="Cambiar idioma"]')],
          ['selector de tema', barra.querySelector('.selector-tema > button')],
          ['botón de menú', barra.querySelector('.boton-menu')],
        ].filter(([, el]) => !esVisible(el)).map(([nombre]) => nombre)
      })()`)

      estaVacia(faltan, 'la barra móvil trae idioma, tema y menú', (n) => n)
    },
  },
}
