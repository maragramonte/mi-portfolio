import { proyectos } from '../data/proyectos.js'
import ProjectCard from './ProjectCard.jsx'

// Sección de proyectos: recorre la lista y crea una tarjeta por cada uno.
export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2>Proyectos</h2>
        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.titulo} {...proyecto} />
          ))}
        </div>
      </div>
    </section>
  )
}
