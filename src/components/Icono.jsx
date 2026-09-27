// Iconos en línea (SVG) para los enlaces de la columna lateral.
//
// Van dentro del código y no como imágenes sueltas por dos razones: heredan el
// color del texto con currentColor (así cambian solos con el tema) y no añaden
// ni una petición más al cargar la página.

const trazos = {
  Email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2.5" />
      <path d="M7 10v7" />
      <circle cx="7" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2.6 2.6 0 0 1 5.2 0v4" />
    </>
  ),
  GitHub: (
    <path d="M9 19c-4 1.4-4-2.3-5.6-2.8M17 21v-3.5c0-1 .1-1.7-.5-2.3 2.3-.3 4.6-1.2 4.6-5.1a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.3-3 1.1a10.3 10.3 0 0 0-5.4 0C9.4 4.2 8.5 4.5 8.5 4.5a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 7.3 10c0 3.9 2.3 4.8 4.5 5.1-.4.4-.5.9-.5 1.5V21" />
  ),
}

export default function Icono({ nombre }) {
  const trazo = trazos[nombre]
  if (!trazo) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {trazo}
    </svg>
  )
}
