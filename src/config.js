// Configuración general del sitio.

// Rutas a las dos versiones del CV por idioma: visual (principal) y ATS.
//
// Para activarlos, guarda los dos PDF en la carpeta public/ con estos nombres:
//   public/cv-mar-agramonte-es.pdf / public/cv-mar-agramonte-es-ats.pdf
//   public/cv-mar-agramonte-en.pdf / public/cv-mar-agramonte-en-ats.pdf
// Deja la cadena vacía ('') en un idioma para ocultar el botón solo en ese
// idioma (por ejemplo, si el CV en inglés todavía no está listo).
export const CV_URLS = {
  es: {
    visual: `${import.meta.env.BASE_URL}cv-mar-agramonte-es.pdf`,
    ats: `${import.meta.env.BASE_URL}cv-mar-agramonte-es-ats.pdf`,
  },
  en: {
    visual: `${import.meta.env.BASE_URL}cv-mar-agramonte-en.pdf`,
    ats: `${import.meta.env.BASE_URL}cv-mar-agramonte-en-ats.pdf`,
  },
}

// Devuelve las versiones disponibles del idioma pedido.
export function cvUrls(idioma) {
  return CV_URLS[idioma] ?? { visual: '', ats: '' }
}
