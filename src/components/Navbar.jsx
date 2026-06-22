import { useIdioma } from '../i18n.js'

// Etiqueta (emoji + nombre) que muestra el botón según el tema activo.
const etiquetaTema = {
  amanecer: "🌄 Amanecer",
  dia: "☀️ Día",
  atardecer: "🌅 Atardecer",
  noche: "🌙 Noche",
}

export default function Navbar({ tema, onCambiarTema }) {
  const { t, cambiarIdioma } = useIdioma()

  // Barra de navegación fija. Los enlaces apuntan a los id de cada sección.
  const enlaces = [
    { href: "#sobre-mi", texto: t.nav.sobreMi },
    { href: "#tecnologias", texto: t.nav.tecnologias },
    { href: "#proyectos", texto: t.nav.proyectos },
    { href: "#contacto", texto: t.nav.contacto },
  ]

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">Mar Agramonte</a>
        <ul className="navbar__links">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a href={enlace.href}>{enlace.texto}</a>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <button
            className="theme-toggle"
            onClick={cambiarIdioma}
            title="Cambiar idioma / Switch language"
            aria-label="Cambiar idioma / Switch language"
          >
            {t.botonIdioma}
          </button>
          <button
            className="theme-toggle"
            onClick={onCambiarTema}
            title="Cambiar tema"
            aria-label="Cambiar tema de color"
          >
            {etiquetaTema[tema]}
          </button>
        </div>
      </div>
    </nav>
  )
}
