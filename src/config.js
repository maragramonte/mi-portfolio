// Configuración general del sitio.

// Rutas a los CV en PDF, uno por idioma. El botón de descarga muestra siempre
// el que corresponde al idioma activo de la web: quien la lee en inglés se
// descarga el CV en inglés sin tener que buscarlo.
//
// Para activarlos, guarda los dos PDF en la carpeta public/ con estos nombres:
//   public/cv-mar-agramonte-es.pdf
//   public/cv-mar-agramonte-en.pdf
// Deja la cadena vacía ('') en un idioma para ocultar el botón solo en ese
// idioma (por ejemplo, si el CV en inglés todavía no está listo).
export const CV_URLS = {
  es: `${import.meta.env.BASE_URL}cv-mar-agramonte-es.pdf`,
  en: `${import.meta.env.BASE_URL}cv-mar-agramonte-en.pdf`,
}

// Devuelve el CV del idioma pedido, o cadena vacía si ese idioma no tiene uno.
// Quien llama solo comprueba si hay valor para decidir si pinta el botón.
export function cvUrl(idioma) {
  return CV_URLS[idioma] ?? ''
}
