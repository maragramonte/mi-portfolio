import { useIdioma } from '../i18n.js'

// Lista de tecnologías. Edita este array para añadir o quitar.
const tecnologias = [
  "Java",
  "Python",
  "SQL",
  "MongoDB",
  "Docker",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "JavaScript",
  "Jira",
  "Confluence",
]

export default function Technologies() {
  const { t } = useIdioma()

  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <h2>{t.tech.titulo}</h2>
        <div className="tech-list">
          {tecnologias.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
