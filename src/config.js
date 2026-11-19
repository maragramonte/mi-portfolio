// Configuración general del sitio.

// El CV no se publica en la web: se envía por correo a quien lo pide desde el
// formulario de PEDIR_CV_URL. Con las rutas vacías no se pinta ningún botón de
// descarga.
// Para volver a publicarlo, guarda los PDF en public/ y pon aquí sus rutas.
export const CV_URLS = {
  es: { visual: '', ats: '' },
  en: { visual: '', ats: '' },
}

// Formulario de Google para pedir el CV. Las respuestas se quedan en Google
// Forms, que avisa por correo de cada una, así que ninguna dirección de correo
// aparece en este código público. Con la cadena vacía no se muestra el botón.
export const PEDIR_CV_URL = 'https://forms.gle/dUs98Lvra13gpzT97'

// Devuelve las versiones disponibles del idioma pedido.
export function cvUrls(idioma) {
  return CV_URLS[idioma] ?? { visual: '', ats: '' }
}
