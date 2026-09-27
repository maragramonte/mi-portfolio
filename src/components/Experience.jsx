import { experiencia } from '../data/experiencia.js'
import { useIdioma } from '../i18n.js'

// Sección de experiencia: una entrada por puesto, en orden del más reciente al
// más antiguo. Los datos salen de src/data/experiencia.js.
export default function Experience() {
  const { idioma, t } = useIdioma()

  return (
    <section id="experiencia" className="section">
      <div className="container">
        <h2>{t.experience.titulo}</h2>
        <p className="section-intro">{t.experience.intro}</p>

        <ol className="timeline">
          {experiencia.map((puesto) => (
            <li key={puesto.empresa} className="timeline__item">
              <h3 className="timeline__puesto">{puesto.puesto[idioma]}</h3>
              <p className="timeline__empresa">{puesto.empresa}</p>
              <p className="timeline__meta">
                {puesto.periodo[idioma]} · {puesto.lugar[idioma]}
              </p>

              <ul className="timeline__logros">
                {puesto.logros[idioma].map((logro) => (
                  <li key={logro}>{logro}</li>
                ))}
              </ul>

              {puesto.tecnologias?.length > 0 && (
                <div className="card__tags">
                  {puesto.tecnologias.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
