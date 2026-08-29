import { useIdioma } from '../i18n.js'

// Lista de tecnologías, agrupadas por bloque. Edita estos arrays para añadir o quitar.
const grupos = [
  { titulo: { es: "Lenguajes", en: "Languages" }, items: ["Java", "Python", "JavaScript", "SQL"] },
  { titulo: { es: "Web", en: "Web" }, items: ["HTML", "CSS", "React", "Vite"] },
  { titulo: { es: "Datos y herramientas", en: "Data & tools" }, items: ["MongoDB", "Docker", "Git", "GitHub", "Postman"] },
  { titulo: { es: "Metodología", en: "Methodology" }, items: ["Scrum", "Jira", "Confluence"] },
]

export default function Technologies() {
  const { idioma, t } = useIdioma()

  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <h2>{t.tech.titulo}</h2>
        {grupos.map((grupo) => (
          <div key={grupo.titulo.es} className="tech-group">
            <h3 className="tech-group__titulo">{grupo.titulo[idioma]}</h3>
            <div className="tech-list">
              {grupo.items.map((tech) => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
