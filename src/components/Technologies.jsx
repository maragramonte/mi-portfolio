import { useIdioma } from '../i18n.js'

// Lista de tecnologías, agrupadas por bloque. Edita estos arrays para añadir o quitar.
// El orden de los grupos es deliberado: primero lo que se busca en una oferta
// de backend junior, y las herramientas de apoyo al final.
const grupos = [
  { titulo: { es: "Lenguajes", en: "Languages" }, items: ["Java", "Python", "SQL", "JavaScript"] },
  { titulo: { es: "Backend", en: "Backend" }, items: ["Spring Boot", "Spring Security", "API REST", "JWT", "Flyway"] },
  { titulo: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { titulo: { es: "Testing", en: "Testing" }, items: ["JUnit 5", "Testcontainers", "Postman", "E2E"] },
  { titulo: { es: "DevOps", en: "DevOps" }, items: ["Docker", "Git", "GitHub", "GitHub Actions", "WSL"] },
  { titulo: { es: "Web", en: "Web" }, items: ["HTML", "CSS", "React", "Vite", "XML"] },
  { titulo: { es: "Metodología y herramientas", en: "Methodology & tools" }, items: ["SAFe", "Scrum", "Jira", "Confluence", "DBeaver"] },
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
