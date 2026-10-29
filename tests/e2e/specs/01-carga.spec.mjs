// Lo que tiene que ser cierto nada más abrir la página. Si algo de aquí falla,
// el resto de la suite no dice nada útil.
import { abrir, erroresDePagina, esperarAplicacion, esperarCarga, evaluar, limpiarAlmacenamiento, mensajesDeConsola, olvidarPeticiones, peticiones, recargar } from '../lib/agente.mjs'
import { contiene, esIgual, esMayorQue, estaVacia } from '../lib/comprobar.mjs'

export default {
  titulo: 'Carga y salud de la página',

  async antes({ url }) {
    // Primero se deja el almacén vacío y solo entonces se empieza a grabar la
    // red: la carga que miden las pruebas es la de después, ya limpia.
    abrir(url())
    limpiarAlmacenamiento()
    olvidarPeticiones()
    recargar()
    esperarCarga('load')
    esperarAplicacion()
  },

  pruebas: {
    'la portada en español llega con su título, su idioma y su h1'({ url }) {
      const r = evaluar(`(() => ({
        url: location.href,
        lang: document.documentElement.lang,
        title: document.title,
        h1: document.querySelectorAll('h1').length,
        nombre: document.querySelector('h1')?.textContent?.trim(),
      }))()`)

      esIgual(r.url, url(), 'la navegación acaba en la URL pedida')
      esIgual(r.lang, 'es', 'el documento declara el idioma español')
      contiene(r.title, 'Mar Agramonte', 'el título de la pestaña lleva el nombre')
      esIgual(r.h1, 1, 'la página tiene exactamente un h1')
      esIgual(r.nombre, 'Mar Agramonte', 'el h1 es el nombre')
    },

    'la portada dice rol, stack y disponibilidad'() {
      const r = evaluar(`(() => {
        const txt = (s) => document.querySelector(s)?.innerText?.trim() ?? ''
        return { rol: txt('.rail__rol'), stack: txt('.rail__stack'), disponibilidad: txt('.rail__disponibilidad') }
      })()`)

      contiene(r.rol, 'Backend', 'el rol menciona el perfil backend')
      contiene(r.stack, 'Java', 'el stack empieza por Java')
      contiene(r.disponibilidad, 'Palma de Mallorca', 'la disponibilidad dice dónde está')
    },

    'las cinco secciones del menú existen en la página'() {
      const faltan = evaluar(`(() => {
        const ids = ['sobre-mi', 'experiencia', 'tecnologias', 'proyectos', 'contacto']
        return ids.filter((id) => !document.getElementById(id))
      })()`)

      estaVacia(faltan, 'cada enlace del menú tiene su sección en la página', (id) => `#${id} no existe`)
    },

    'la rejilla pinta tarjetas de proyecto completas'() {
      const r = evaluar(`(() => {
        const cards = Array.from(document.querySelectorAll('.projects-grid .card'))
        return {
          total: cards.length,
          incompletas: cards
            .map((card) => ({
              titulo: card.querySelector('h3')?.textContent?.trim() ?? '(sin título)',
              tieneDescripcion: !!card.querySelector('.card__body p')?.textContent?.trim(),
              tieneEtiquetas: card.querySelectorAll('.card__tags .tag').length > 0,
              tieneEnlaces: card.querySelectorAll('.card__links a').length > 0,
            }))
            .filter((c) => !c.tieneDescripcion || !c.tieneEtiquetas || !c.tieneEnlaces),
        }
      })()`)

      esMayorQue(r.total, 0, 'la sección de proyectos no está vacía')
      estaVacia(
        r.incompletas,
        'cada tarjeta trae descripción, etiquetas y al menos un enlace',
        (c) => `"${c.titulo}" — descripción: ${c.tieneDescripcion}, etiquetas: ${c.tieneEtiquetas}, enlaces: ${c.tieneEnlaces}`,
      )
    },

    'la carga no deja errores de consola ni excepciones sin recoger'() {
      const graves = mensajesDeConsola().filter((m) => m.type === 'error')

      estaVacia(graves, 'la consola queda limpia de errores', (m) => m.text.slice(0, 160))
      estaVacia(erroresDePagina(), 'ninguna excepción llega sin recoger', (e) => e.text.slice(0, 160))
    },

    'ninguna petición del propio sitio responde con error'({ base }) {
      const origen = new URL(base).origin

      // Solo se exige del propio origen: las tipografías de Google son de un
      // tercero y su caída no es un fallo del portfolio, pero sí haría que la
      // suite fallara sin motivo.
      const malas = peticiones()
        .filter((p) => p.url?.startsWith(origen))
        .filter((p) => typeof p.status === 'number' && p.status >= 400)
        .map((p) => ({ url: p.url.replace(origen, ''), status: p.status }))

      estaVacia(malas, 'todos los recursos del sitio responden sin 4xx ni 5xx', (p) => `${p.status} ${p.url}`)
    },
  },
}
