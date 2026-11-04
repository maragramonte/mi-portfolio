// Localiza el ejecutable de un paquete de node_modules.
//
// No se resuelve la subruta directamente (`paquete/bin/x.js`) porque los
// paquetes con mapa de "exports" —Vite entre ellos— solo publican lo que
// declaran ahí, y el bin no suele estar. El package.json sí es siempre
// accesible, y de él sale la ruta real del lanzador.
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'

const require_ = createRequire(import.meta.url)

export function rutaDelBin(paquete, nombre = paquete) {
  const manifiesto = require_.resolve(`${paquete}/package.json`)
  const { bin } = require_(manifiesto)
  const relativa = typeof bin === 'string' ? bin : bin?.[nombre]
  if (!relativa) throw new Error(`el paquete ${paquete} no declara un ejecutable "${nombre}"`)
  return resolve(dirname(manifiesto), relativa)
}
