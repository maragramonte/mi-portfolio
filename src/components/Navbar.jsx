// Barra de navegación fija. Los enlaces apuntan a los id de cada sección.
const enlaces = [
  { href: "#sobre-mi", texto: "Sobre mí" },
  { href: "#tecnologias", texto: "Tecnologías" },
  { href: "#proyectos", texto: "Proyectos" },
  { href: "#contacto", texto: "Contacto" },
]

// Etiqueta (emoji + nombre) que muestra el botón según el tema activo.
const etiquetaTema = {
  amanecer: "🌄 Amanecer",
  dia: "☀️ Día",
  atardecer: "🌅 Atardecer",
  noche: "🌙 Noche",
}

export default function Navbar({ tema, onCambiarTema }) {
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
        <button
          className="theme-toggle"
          onClick={onCambiarTema}
          title="Cambiar tema"
          aria-label="Cambiar tema de color"
        >
          {etiquetaTema[tema]}
        </button>
      </div>
    </nav>
  )
}
