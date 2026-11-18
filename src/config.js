// Configuración general del sitio.

// El CV no se publica en la web: se envía por correo o LinkedIn cuando alguien
// lo pide. Con las rutas vacías no se pinta ningún botón de descarga.
// Para volver a publicarlo, guarda los PDF en public/ y pon aquí sus rutas.
export const CV_URLS = {
  es: { visual: '', ats: '' },
  en: { visual: '', ats: '' },
}

// Devuelve las versiones disponibles del idioma pedido.
export function cvUrls(idioma) {
  return CV_URLS[idioma] ?? { visual: '', ats: '' }
}
