// Arranca y para el servidor de preview de Vite para la suite.
//
// Se prueba contra `vite preview` y no contra `vite dev` a propósito: lo que se
// publica en GitHub Pages es el resultado de `vite build`, y es ahí donde
// aparecen los fallos que el modo desarrollo esconde (rutas con la base
// /mi-portfolio/, los dos HTML de entrada, los PDF de public/).
import { spawn } from 'node:child_process'
import { rutaDelBin } from './binarios.mjs'

const vite = () => rutaDelBin('vite')

export async function construir() {
  await ejecutar([vite(), 'build'], 'vite build')
}

export async function arrancarPreview({ puerto, base }) {
  const proceso = spawn(process.execPath, [vite(), 'preview', '--port', String(puerto), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let salida = ''
  proceso.stdout.on('data', (d) => (salida += d))
  proceso.stderr.on('data', (d) => (salida += d))

  const url = `http://localhost:${puerto}${base}`
  const murio = new Promise((_, rechazar) =>
    proceso.once('exit', (codigo) =>
      rechazar(new Error(`vite preview terminó con código ${codigo}:\n${salida.trim()}`)),
    ),
  )

  await Promise.race([esperarRespuesta(url), murio])

  return {
    url,
    async parar() {
      if (proceso.exitCode !== null) return
      proceso.kill()
      await new Promise((listo) => proceso.once('exit', listo))
    },
  }
}

// Sondea hasta que el servidor contesta. Sin esto la primera prueba fallaría
// de vez en cuando por correr antes de que Vite abra el puerto.
async function esperarRespuesta(url, intentos = 60) {
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(2000) })
      if (r.ok) return
    } catch {
      // Todavía no escucha.
    }
    await new Promise((listo) => setTimeout(listo, 250))
  }
  throw new Error(`el servidor no respondió en ${url} tras ${intentos} intentos`)
}

function ejecutar(argumentos, nombre) {
  return new Promise((listo, fallo) => {
    const p = spawn(process.execPath, argumentos, { stdio: ['ignore', 'pipe', 'pipe'] })
    let salida = ''
    p.stdout.on('data', (d) => (salida += d))
    p.stderr.on('data', (d) => (salida += d))
    p.once('exit', (codigo) =>
      codigo === 0 ? listo() : fallo(new Error(`${nombre} falló con código ${codigo}:\n${salida.trim()}`)),
    )
  })
}
