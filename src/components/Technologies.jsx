import { useIdioma } from '../i18n.js'
import { grupos, nombreDe, proyectosPorTecnologia } from '../data/tecnologias.js'

// Sección de tecnologías. Las que tienen un proyecto detrás son pulsables y
// filtran la lista de proyectos; las que todavía no, se pintan como texto y no
// invitan a hacer clic, porque llevarían a una rejilla vacía.
export default function Technologies({ tecnologiaActiva, onElegirTecnologia }) {
  const { idioma, t } = useIdioma()

  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <h2>{t.tech.titulo}</h2>
        <p className="tech-pista">{t.tech.pista}</p>

        {grupos.map((grupo) => (
          <div key={grupo.titulo.es} className="tech-group">
            <h3 className="tech-group__titulo">{grupo.titulo[idioma]}</h3>
            <div className="tech-list">
              {grupo.items.map((tech) => {
                const respaldada = (proyectosPorTecnologia[tech] ?? 0) > 0
                // El chip se lee en el idioma activo, pero lo que viaja al
                // filtro es siempre el nombre canónico: es la clave con la que
                // se cruzan los proyectos.
                const nombre = nombreDe(tech, idioma)

                if (!respaldada) {
                  return (
                    <span key={tech} className="tech-chip tech-chip--suelta">
                      <span className="tech-chip__punto" aria-hidden="true" />
                      {nombre}
                    </span>
                  )
                }

                const activa = tecnologiaActiva === tech
                return (
                  <button
                    key={tech}
                    type="button"
                    className={`tech-chip tech-chip--enlazada${activa ? ' is-activa' : ''}`}
                    aria-pressed={activa}
                    onClick={() => onElegirTecnologia(activa ? null : tech)}
                  >
                    <span className="tech-chip__punto" aria-hidden="true" />
                    {nombre}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
