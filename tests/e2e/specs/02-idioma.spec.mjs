// El cambio de idioma es la parte con más reglas escritas del portfolio:
// hay dos HTML de entrada, un idioma guardado entre visitas y un título de
// pestaña que vive fuera de React. Estas pruebas fijan esas reglas.
import { abrir, esperarCondicion, evaluar, guardarEnAlmacenamiento, irALimpio, pulsar, recargar } from '../lib/agente.mjs'
import { contiene, esIgual, estaVacia, noEsIgual } from '../lib/comprobar.mjs'

// En escritorio los controles de la columna izquierda son los visibles; los de
// la barra móvil existen en el DOM pero están ocultos, así que hay que apuntar
// al contenedor y no solo al botón.
const BOTON_IDIOMA = '.rail .rail__ajustes button[aria-label^="Cambiar idioma"]'

const estado = () =>
  evaluar(`(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    descripcion: document.querySelector('meta[name=description]').content,
    guardado: localStorage.getItem('idioma'),
    rol: document.querySelector('.rail__rol').innerText.trim(),
    textoBoton: document.querySelector('${BOTON_IDIOMA}').textContent.trim(),
    enlacesNav: Array.from(document.querySelectorAll('.rail__nav .nav-enlace')).map((a) => a.innerText.trim()),
    descargarCV: document.querySelector('.rail__pie .btn--primario')?.innerText.trim(),
  }))()`)

export default {
  titulo: 'Idioma',

  pruebas: {
    'la raíz arranca en español cuando no hay visita anterior'({ url }) {
      irALimpio(url())

      const r = estado()
      esIgual(r.lang, 'es', 'el documento arranca en español')
      contiene(r.rol, 'Desarrolladora Backend', 'el rol está en español')
      esIgual(r.textoBoton, 'EN', 'el botón ofrece el idioma al que se puede cambiar')
    },

    'el botón de idioma pasa toda la interfaz a inglés'({ url }) {
      irALimpio(url())
      const antes = estado()

      pulsar(BOTON_IDIOMA)
      esperarCondicion(`document.documentElement.lang === 'en'`)
      const despues = estado()

      esIgual(despues.lang, 'en', 'el documento declara inglés')
      esIgual(despues.textoBoton, 'ES', 'el botón ahora ofrece volver al español')
      contiene(despues.rol, 'Backend Developer', 'el rol se traduce')
      contiene(despues.descargarCV, 'Download CV', 'el botón de CV se traduce')
      noEsIgual(despues.enlacesNav.join('|'), antes.enlacesNav.join('|'), 'el menú cambia de idioma')
      estaVacia(
        despues.enlacesNav.filter((t) => !t),
        'ningún enlace del menú se queda sin texto al traducirse',
      )
    },

    'al cambiar de idioma se reescriben el título y la descripción de la pestaña'({ url }) {
      // No es cosmético: el <title> y la meta descripción viven en index.html,
      // fuera de React, y es App.jsx quien los reescribe. Si ese efecto se
      // rompe, la web se ve en inglés pero se comparte en español.
      irALimpio(url())
      const antes = estado()

      pulsar(BOTON_IDIOMA)
      esperarCondicion(`document.documentElement.lang === 'en'`)
      const despues = estado()

      contiene(antes.title, 'Desarrolladora Backend', 'el título arranca en español')
      contiene(despues.title, 'Backend Developer', 'el título pasa a inglés')
      contiene(despues.descripcion, 'Portfolio of Mar Agramonte', 'la meta descripción pasa a inglés')
    },

    'el idioma elegido sobrevive a una recarga'({ url }) {
      irALimpio(url())
      pulsar(BOTON_IDIOMA)
      esperarCondicion(`document.documentElement.lang === 'en'`)
      esIgual(estado().guardado, 'en', 'el idioma queda guardado')

      recargar()
      const r = estado()
      esIgual(r.lang, 'en', 'tras recargar sigue en inglés')
      contiene(r.title, 'Backend Developer', 'y el título también')
    },

    'la raíz respeta el idioma de la visita anterior'({ url }) {
      irALimpio(url())
      guardarEnAlmacenamiento('idioma', 'en')
      recargar()

      esIgual(estado().lang, 'en', 'la raíz arranca en el idioma guardado')
    },

    '/en/ manda sobre el idioma guardado'({ url }) {
      // Quien recibe el enlace en inglés espera inglés, aunque su última
      // visita fuera en español. Lo consigue data-idioma-fijo en en/index.html.
      irALimpio(url())
      guardarEnAlmacenamiento('idioma', 'es')
      abrir(url('en/'))

      const r = estado()
      esIgual(r.lang, 'en', '/en/ arranca en inglés pese al español guardado')
      contiene(r.rol, 'Backend Developer', 'y los textos vienen en inglés')
    },

    '/en/ trae sus propias etiquetas para compartir el enlace'({ url }) {
      // Los bots de LinkedIn y WhatsApp no ejecutan JavaScript: leen el HTML
      // tal cual, así que estas etiquetas tienen que estar ya en el fichero.
      abrir(url('en/'))

      const r = evaluar(`(() => ({
        canonical: document.querySelector('link[rel=canonical]')?.href,
        ogLocale: document.querySelector('meta[property="og:locale"]')?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        hreflang: Array.from(document.querySelectorAll('link[rel=alternate][hreflang]')).map((l) => l.hreflang).sort(),
        langDeclarado: document.documentElement.getAttribute('lang'),
        idiomaFijo: document.documentElement.dataset.idiomaFijo,
      }))()`)

      contiene(r.canonical, '/en/', 'la canónica de /en/ apunta a sí misma')
      esIgual(r.ogLocale, 'en_GB', 'og:locale declara inglés')
      contiene(r.ogTitle, 'Backend Developer', 'og:title viene traducido en el propio HTML')
      esIgual(r.hreflang.join(','), 'en,es,x-default', 'las tres alternativas hreflang están declaradas')
      esIgual(r.idiomaFijo, 'en', 'el HTML fija el idioma para que la app arranque en inglés')
    },
  },
}
