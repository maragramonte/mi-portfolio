import test from 'node:test'
import assert from 'node:assert/strict'
import { leerPreferencia, guardarPreferencia } from './storage.js'

test('lee y guarda una preferencia cuando localStorage está disponible', () => {
  const valores = new Map()
  globalThis.window = { localStorage: {
    getItem: (clave) => valores.get(clave) ?? null,
    setItem: (clave, valor) => valores.set(clave, String(valor)),
  } }

  guardarPreferencia('tema', 'noche')
  assert.equal(leerPreferencia('tema'), 'noche')
  assert.equal(leerPreferencia('idioma'), null)
  delete globalThis.window
})

test('tolera que localStorage lance una excepción al leer o escribir', () => {
  globalThis.window = { get localStorage() { throw new Error('Acceso bloqueado') } }
  assert.equal(leerPreferencia('tema'), null)
  assert.doesNotThrow(() => guardarPreferencia('tema', 'noche'))
  delete globalThis.window
})
