#!/usr/bin/env node
// Suite de pruebas de extremo a extremo del portfolio, sobre agent-browser.
//
//   npm run test:e2e                      compila, levanta preview y prueba
//   npm run test:e2e -- --filtro idioma   solo las pruebas que casen
//   npm run test:e2e -- --headed          con el navegador a la vista
//   npm run test:e2e -- --base https://maragramonte.github.io/mi-portfolio/
//                                         contra el sitio publicado
import { mkdir, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as agente from './lib/agente.mjs'
import { arrancarPreview, construir } from './lib/servidor.mjs'
import { colores as c, ejecutarBloques } from './lib/runner.mjs'

const aqui = dirname(fileURLToPath(import.meta.url))
const BASE_DEL_SITIO = '/mi-portfolio/'

const opciones = leerArgumentos(process.argv.slice(2))

const servidores = []
let salida = 1

try {
  let base = opciones.base

  if (!base) {
    if (!opciones.sinBuild) {
      process.stdout.write('Compilando… ')
      await construir()
      console.log('listo')
    }
    process.stdout.write(`Levantando preview en el puerto ${opciones.puerto}… `)
    const servidor = await arrancarPreview({ puerto: opciones.puerto, base: BASE_DEL_SITIO })
    servidores.push(servidor)
    base = servidor.url
    console.log('listo')
  }

  if (!base.endsWith('/')) base += '/'

  agente.configurar({ headed: opciones.headed, traza: opciones.traza })

  console.log(`\nProbando ${c.negrita(base)}`)
  if (opciones.sesion) agente.configurar({ sesion: opciones.sesion })
  console.log(c.gris(`sesión de navegador: ${agente.sesionActiva()}`))

  // Viewport fijo: varias pruebas miran si un elemento está en pantalla, y el
  // tamaño por defecto depende de la máquina.
  agente.viewport(1280, 900)

  // Punto de partida igual en todas las máquinas:
  //
  // - `dark` porque el tema por defecto de la web es noche, y el valor que
  //   trae Chrome sin emulación no es el mismo en todos los sistemas.
  // - `reduced-motion` porque el scroll suave y la transición del panel móvil
  //   hacen que el estado tarde casi un tercio de segundo en llegar, y la web
  //   ya declara que atiende esa preferencia. Lo que se prueba es el resultado,
  //   no la animación; la prueba de navegación comprueba aparte que la
  //   preferencia sigue atendida.
  agente.media('dark', 'reduced-motion')

  const contexto = {
    base,
    // La web se sirve bajo /mi-portfolio/, así que las rutas de las pruebas
    // son relativas a esa base y no absolutas.
    url: (ruta = '') => new URL(ruta, base).href,
    agente,
  }

  const capturasEn = resolve(aqui, 'capturas')
  await mkdir(capturasEn, { recursive: true })

  const bloques = await cargarBloques()
  const informe = await ejecutarBloques(bloques, contexto, { filtro: opciones.filtro, capturasEn })

  salida = informe.fallos === 0 ? 0 : 1
} catch (error) {
  console.error(`\n${c.rojo('La suite no pudo completarse:')} ${error.message}`)
  if (opciones.traza && error.stack) console.error(error.stack)
  salida = 1
} finally {
  try {
    agente.cerrar()
  } catch {
    // El navegador puede haberse ido ya; no cambia el resultado.
  }
  for (const s of servidores) await s.parar()
}

process.exit(salida)

// ---------- Apoyo ----------

async function cargarBloques() {
  const ficheros = (await readdir(resolve(aqui, 'specs'))).filter((f) => f.endsWith('.spec.mjs')).sort()
  const bloques = []
  for (const fichero of ficheros) {
    const modulo = await import(pathToFileURL(resolve(aqui, 'specs', fichero)).href)
    bloques.push(modulo.default)
  }
  return bloques
}

function leerArgumentos(argv) {
  const o = { puerto: 4183, headed: false, traza: false, sinBuild: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--headed') o.headed = true
    else if (a === '--traza' || a === '--verbose') o.traza = true
    else if (a === '--sin-build') o.sinBuild = true
    else if (a === '--filtro') o.filtro = argv[++i]
    else if (a === '--base') o.base = argv[++i]
    else if (a === '--puerto') o.puerto = Number(argv[++i])
    else if (a === '--sesion') o.sesion = argv[++i]
    else if (a === '--ayuda' || a === '-h') {
      console.log(AYUDA)
      process.exit(0)
    } else {
      console.error(`Opción desconocida: ${a}\n${AYUDA}`)
      process.exit(2)
    }
  }
  return o
}

const AYUDA = `
Uso: node tests/e2e/run.mjs [opciones]

  --filtro <texto>   solo las pruebas cuyo bloque o nombre contenga el texto
  --base <url>       probar una URL ya servida en vez de levantar preview
  --puerto <n>       puerto del preview local (por defecto 4183)
  --sin-build        no recompilar; usa el dist/ que ya haya
  --headed           mostrar la ventana del navegador
  --sesion <nombre>  reutilizar una sesión de agent-browser con nombre
  --traza            imprimir cada orden que se le manda al navegador
`.trim()
