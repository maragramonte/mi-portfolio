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
  return (
    <section id="tecnologias" className="section">
      <div className="container">
        <h2>Tecnologías</h2>
        <div className="tech-list">
          {tecnologias.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
