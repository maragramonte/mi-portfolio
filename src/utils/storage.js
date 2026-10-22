// Acceso defensivo a preferencias: el navegador puede bloquear localStorage.
// Las preferencias son opcionales; si falla el almacenamiento, la app sigue funcionando.
export function leerPreferencia(clave) {
  try {
    return window.localStorage.getItem(clave)
  } catch {
    return null
  }
}

export function guardarPreferencia(clave, valor) {
  try {
    window.localStorage.setItem(clave, valor)
  } catch {
    // No persistir la preferencia no debe impedir usar la interfaz.
  }
}
