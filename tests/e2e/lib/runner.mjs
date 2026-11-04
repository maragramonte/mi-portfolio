// Ejecutor de la suite: recorre los bloques, informa y decide el código de salida.
//
// Las pruebas van en serie y comparten un único navegador. Es a propósito: el
// estado que más se rompe en esta web (tema e idioma guardados, filtro activo,
// menú abierto) vive en el navegador, así que cada prueba deja su rastro y
// tiene que empezar limpiando lo que necesita. Paralelizar obligaría a abrir
// una sesión por prueba y multiplicaría por diez lo que tarda.
import { ErrorDeComprobacion } from './comprobar.mjs'
import { captura } from './agente.mjs'

const color = process.stdout.isTTY && !process.env.NO_COLOR
const c = {
  verde: (s) => (color ? `\x1b[32m${s}\x1b[0m` : s),
  rojo: (s) => (color ? `\x1b[31m${s}\x1b[0m` : s),
  gris: (s) => (color ? `\x1b[90m${s}\x1b[0m` : s),
  negrita: (s) => (color ? `\x1b[1m${s}\x1b[0m` : s),
  amarillo: (s) => (color ? `\x1b[33m${s}\x1b[0m` : s),
}

export async function ejecutarBloques(bloques, contexto, { filtro, capturasEn } = {}) {
  const resultados = []
  const empezado = Date.now()

  for (const bloque of bloques) {
    const pruebas = Object.entries(bloque.pruebas).filter(
      ([nombre]) => !filtro || `${bloque.titulo} ${nombre}`.toLowerCase().includes(filtro.toLowerCase()),
    )
    if (pruebas.length === 0) continue

    console.log(`\n${c.negrita(bloque.titulo)}`)

    if (bloque.antes) {
      try {
        await bloque.antes(contexto)
      } catch (error) {
        // Si la preparación del bloque falla, sus pruebas no han llegado a
        // correr: se marcan todas como fallidas con la misma causa, en vez de
        // dejar un bloque vacío que parece que no había nada que probar.
        for (const [nombre] of pruebas) {
          console.log(`  ${c.rojo('✗')} ${nombre}`)
          resultados.push({ bloque: bloque.titulo, nombre, estado: 'fallo', error, ms: 0 })
        }
        console.log(`    ${c.rojo('preparación del bloque:')} ${error.message}`)
        continue
      }
    }

    for (const [nombre, prueba] of pruebas) {
      const t0 = Date.now()
      try {
        await prueba(contexto)
        const ms = Date.now() - t0
        console.log(`  ${c.verde('✓')} ${nombre} ${c.gris(`${ms} ms`)}`)
        resultados.push({ bloque: bloque.titulo, nombre, estado: 'pasa', ms })
      } catch (error) {
        const ms = Date.now() - t0
        console.log(`  ${c.rojo('✗')} ${nombre} ${c.gris(`${ms} ms`)}`)
        console.log(sangrar(error instanceof ErrorDeComprobacion ? error.message : `${error.name}: ${error.message}`))

        // Una captura del momento del fallo ahorra reproducirlo a mano.
        let imagen
        if (capturasEn) {
          const ruta = `${capturasEn}/${archivoDe(bloque.titulo, nombre)}.png`
          try {
            captura(ruta)
            imagen = ruta
            console.log(`      ${c.gris(`captura: ${ruta}`)}`)
          } catch {
            // Si el navegador ya no responde, el fallo original importa más.
          }
        }

        resultados.push({ bloque: bloque.titulo, nombre, estado: 'fallo', error, ms, imagen })
      }
    }

    // El navegador es compartido, así que un bloque que cambia algo global
    // (el tamaño de la ventana, por ejemplo) tiene que devolverlo a su sitio
    // aunque sus pruebas hayan fallado.
    if (bloque.despues) {
      try {
        await bloque.despues(contexto)
      } catch (error) {
        console.log(`    ${c.amarillo('aviso:')} la limpieza del bloque falló: ${error.message}`)
      }
    }
  }

  return informar(resultados, Date.now() - empezado)
}

function informar(resultados, ms) {
  const fallos = resultados.filter((r) => r.estado === 'fallo')
  const pasan = resultados.length - fallos.length

  console.log(`\n${'─'.repeat(60)}`)
  if (fallos.length === 0) {
    console.log(`${c.verde(`${pasan} pruebas pasan`)} ${c.gris(`en ${(ms / 1000).toFixed(1)} s`)}`)
  } else {
    console.log(
      `${c.verde(`${pasan} pasan`)}, ${c.rojo(`${fallos.length} fallan`)} ${c.gris(`en ${(ms / 1000).toFixed(1)} s`)}`,
    )
    console.log(`\n${c.negrita('Fallos:')}`)
    for (const f of fallos) console.log(`  ${c.rojo('✗')} ${f.bloque} › ${f.nombre}`)
  }

  return { total: resultados.length, pasan, fallos: fallos.length, resultados, ms }
}

const sangrar = (texto) => texto.split('\n').map((l) => (l.startsWith('      ') ? l : `    ${l}`)).join('\n')

const archivoDe = (bloque, nombre) =>
  `${bloque}-${nombre}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, '-') // tras NFD los acentos quedan sueltos y caen aquí
    .replace(/^-|-$/g, '')
    .slice(0, 80)

export { c as colores }
