// Envoltorio sobre el CLI de agent-browser.
//
// Cada comando es un proceso aparte, pero el navegador sigue vivo entre
// llamadas: agent-browser mantiene un demonio por sesión. Por eso la suite
// comparte una sola sesión con nombre y se ejecuta en serie — dos pruebas a la
// vez se pisarían la misma pestaña.
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { rutaDelBin } from './binarios.mjs'

// agent-browser se instala con un lanzador .js que elige el binario nativo del
// sistema. Lo llamamos con el propio node en vez de confiar en el PATH: en
// Windows el atajo del paquete es un .cmd y spawn no puede ejecutarlo sin
// abrir un shell, lo que además rompería los argumentos con comillas.
const binario = (() => {
  try {
    return { orden: process.execPath, previos: [rutaDelBin('agent-browser')] }
  } catch {
    // Instalación global y sin dependencia local: queda el PATH.
    return { orden: 'agent-browser', previos: [], shell: process.platform === 'win32' }
  }
})()

// Un nombre de sesión estable por copia del repositorio, no uno por ejecución:
// cada nombre nuevo obliga a agent-browser a levantar otro Chrome, y encadenar
// ejecuciones iba dejando navegadores vivos hasta que se agotaba la máquina.
// Con este, las ejecuciones seguidas reutilizan el mismo. Dos a la vez sobre la
// misma copia se pisarían: para eso está --sesion.
const sesionDelProyecto = () =>
  `portfolio-e2e-${createHash('sha256').update(process.cwd()).digest('hex').slice(0, 8)}`

const opciones = {
  sesion: sesionDelProyecto(),
  headed: false,
  traza: false,
}

export function configurar(cambios) {
  Object.assign(opciones, cambios)
}

export const sesionActiva = () => opciones.sesion

export class ErrorDeAgente extends Error {}

// Ejecuta un comando y devuelve el campo `data` de su respuesta JSON.
export function ab(argumentos, { entrada, permitirFallo = false, timeout = 60_000 } = {}) {
  const globales = ['--session', opciones.sesion]
  if (opciones.headed) globales.push('--headed')

  const todos = [...binario.previos, ...globales, ...argumentos, '--json']
  if (opciones.traza) console.error(`    $ agent-browser ${[...globales, ...argumentos].join(' ')}`)

  const r = spawnSync(binario.orden, todos, {
    input: entrada,
    encoding: 'utf8',
    shell: binario.shell ?? false,
    timeout,
    maxBuffer: 64 * 1024 * 1024,
  })

  if (r.error) throw new ErrorDeAgente(`no se pudo lanzar agent-browser: ${r.error.message}`)

  const respuesta = ultimoJson(r.stdout ?? '')
  if (!respuesta) {
    throw new ErrorDeAgente(
      `agent-browser no devolvió JSON (código ${r.status}).\n` +
        `  orden: ${argumentos.join(' ')}\n` +
        `  salida: ${(r.stdout || r.stderr || '(vacía)').trim().slice(0, 500)}`,
    )
  }

  if (!respuesta.success && !permitirFallo) {
    throw new ErrorDeAgente(`${argumentos.join(' ')} → ${respuesta.error ?? 'error sin mensaje'}`)
  }

  return respuesta.data ?? {}
}

// El CLI puede escribir avisos antes del JSON (descargas, reconexiones del
// demonio), así que nos quedamos con el último objeto que parsee.
function ultimoJson(salida) {
  const lineas = salida.split(/\r?\n/).filter((l) => l.trim().startsWith('{'))
  for (let i = lineas.length - 1; i >= 0; i--) {
    try {
      return JSON.parse(lineas[i])
    } catch {
      // No era JSON: seguimos hacia arriba.
    }
  }
  return null
}

// ---------- Órdenes de uso corriente ----------

export const abrir = (url) => ab(['open', url])
export const recargar = () => ab(['reload'])
export const pulsar = (selector) => ab(['click', selector])
export const tecla = (nombre) => ab(['press', nombre])
export const enfocar = (selector) => ab(['focus', selector])
export const viewport = (ancho, alto) => ab(['set', 'viewport', String(ancho), String(alto)])
export const media = (...valores) => ab(['set', 'media', ...valores])
export const pausa = (ms) => ab(['wait', String(ms)])
export const esperarCarga = (evento = 'load') => ab(['wait', '--load', evento])
export const captura = (ruta) => ab(['screenshot', ruta], { permitirFallo: true })

// Pulsa en unas coordenadas en vez de sobre un selector. Hace falta cuando el
// elemento que se quiere tocar está parcialmente cubierto por otro —y
// `pulsar` entonces se niega, con razón, a mandar el clic al equivocado.
export function raton(x, y) {
  ab(['mouse', 'move', String(x), String(y)])
  ab(['mouse', 'down'])
  ab(['mouse', 'up'])
}
export const cerrar = () => ab(['close'], { permitirFallo: true })

// Ejecuta JavaScript en la página y devuelve su resultado.
// Va por stdin a propósito: el script lleva comillas, llaves y acentos, y como
// argumento tendría que escaparse distinto en cada sistema.
export function evaluar(script) {
  return ab(['eval', '--stdin'], { entrada: script }).result
}

// Espera hasta que una condición JavaScript sea cierta.
//
// Es la herramienta para leer el DOM después de una interacción: `pulsar`
// vuelve en cuanto el navegador entrega el evento, y el repintado de React
// llega más tarde, así que mirar el DOM al momento devuelve de vez en cuando
// el estado anterior. Siempre preferible a `pausa`, que fija un tiempo a ojo.
export const esperarCondicion = (expresion, timeout = 10_000) =>
  ab(['wait', '--fn', expresion, '--timeout', String(timeout)])

// Auditoría axe-core de la página actual.
export function auditar({ etiquetas = ['wcag2a', 'wcag2aa'] } = {}) {
  const datos = ab(['a11y', '--tags', etiquetas.join(',')], { timeout: 90_000 })
  return { incumplimientos: datos.violations ?? [], dudosos: datos.incomplete ?? [], recuento: datos.counts }
}

export const mensajesDeConsola = () => ab(['console']).messages ?? []
export const erroresDePagina = () => ab(['errors']).errors ?? []
export const peticiones = () => ab(['network', 'requests']).requests ?? []
export const olvidarPeticiones = () => ab(['network', 'requests', '--clear'])

// Vacía localStorage y sessionStorage. La usan las pruebas que dependen de no
// arrastrar el idioma o el tema de la prueba anterior.
export function limpiarAlmacenamiento() {
  evaluar(`(() => { try { localStorage.clear(); sessionStorage.clear() } catch {} ; return 'ok' })()`)
}

// Deja un valor en localStorage antes de abrir la página, para probar qué hace
// la web con una visita anterior guardada.
export function guardarEnAlmacenamiento(clave, valor) {
  evaluar(`(() => { localStorage.setItem(${JSON.stringify(clave)}, ${JSON.stringify(valor)}); return 'ok' })()`)
}

// Abre la página sin rastro de la prueba anterior.
//
// Los tres pasos importan y en este orden: localStorage pertenece al origen,
// así que hay que estar YA en la página para poder vaciarlo —hacerlo desde
// about:blank vacía otro almacén y no se nota hasta que una prueba hereda el
// idioma o el tema de la de antes—, y después hay que recargar para que la
// aplicación vuelva a arrancar con el almacén limpio.
export function irALimpio(url) {
  abrir(url)
  limpiarAlmacenamiento()
  recargar()
  esperarAplicacion()
}

// Espera a que React haya montado la página.
//
// `abrir` y `recargar` vuelven con el documento cargado, pero la aplicación se
// pinta después: sin esta espera, un clic puede llegar a un menú que todavía
// no existe, o adelantarse al IntersectionObserver que marca la sección
// activa. Se nota sobre todo al encadenar ejecuciones, cuando el navegador
// acaba de arrancar y va más lento.
export const esperarAplicacion = () =>
  esperarCondicion(`!!document.querySelector('.rail__nav .nav-enlace') && document.readyState === 'complete'`)

// La suite corre con las animaciones reducidas (ver run.mjs), de modo que
// cambiar el esquema de color del sistema tiene que volver a pedirlo: `set
// media` sustituye toda la emulación, no la va acumulando.
export const esquemaDelSistema = (valor) => media(valor, 'reduced-motion')

