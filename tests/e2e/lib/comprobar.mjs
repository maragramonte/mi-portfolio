// Comprobaciones de las pruebas.
//
// No usamos node:assert porque sus mensajes describen valores, no intenciones:
// "Expected values to be strictly equal: 'es' !== 'en'" obliga a abrir el
// fichero para saber qué se rompió. Aquí cada comprobación recibe la frase que
// debería ser verdad, y es esa frase la que sale en el informe.

export class ErrorDeComprobacion extends Error {}

const texto = (valor) =>
  typeof valor === 'string' ? JSON.stringify(valor) : JSON.stringify(valor) ?? String(valor)

function fallar(que, detalle) {
  throw new ErrorDeComprobacion(detalle ? `${que}\n${detalle}` : que)
}

export function esIgual(obtenido, esperado, que) {
  if (!Object.is(obtenido, esperado)) {
    fallar(que, `      esperado: ${texto(esperado)}\n      obtenido: ${texto(obtenido)}`)
  }
}

export function noEsIgual(obtenido, inesperado, que) {
  if (Object.is(obtenido, inesperado)) fallar(que, `      no debería valer ${texto(inesperado)}`)
}

export function contiene(obtenido, fragmento, que) {
  if (typeof obtenido !== 'string' || !obtenido.includes(fragmento)) {
    fallar(que, `      debía contener: ${texto(fragmento)}\n      obtenido:       ${texto(recortar(obtenido))}`)
  }
}

export function esCierto(condicion, que, detalle) {
  if (!condicion) fallar(que, detalle ? `      ${detalle}` : undefined)
}

export function esFalso(condicion, que, detalle) {
  esCierto(!condicion, que, detalle)
}

// Para las comprobaciones de "no debería haber ninguno": el informe necesita
// ver los culpables, no solo que había tres.
export function estaVacia(lista, que, describir = (x) => texto(x)) {
  if (!Array.isArray(lista)) fallar(que, `      no era una lista: ${texto(lista)}`)
  if (lista.length > 0) {
    const muestra = lista.slice(0, 5).map((x) => `        · ${describir(x)}`).join('\n')
    const resto = lista.length > 5 ? `\n        … y ${lista.length - 5} más` : ''
    fallar(que, `      encontrados ${lista.length}:\n${muestra}${resto}`)
  }
}

export function esMayorQue(obtenido, minimo, que) {
  if (!(obtenido > minimo)) fallar(que, `      debía ser mayor que ${texto(minimo)}, y es ${texto(obtenido)}`)
}

export function estaEntre(obtenido, minimo, maximo, que) {
  if (!(obtenido >= minimo && obtenido <= maximo)) {
    fallar(que, `      debía estar entre ${minimo} y ${maximo}, y es ${texto(obtenido)}`)
  }
}

const recortar = (v) => (typeof v === 'string' && v.length > 160 ? `${v.slice(0, 160)}…` : v)
