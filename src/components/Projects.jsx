import { proyectos } from '../data/proyectos.js'
import ProjectCard from './ProjectCard.jsx'
import { useIdioma } from '../i18n.js'

// Sección de proyectos: recorre la lista y crea una tarjeta por cada uno.
export default function Projects() {
  const { idioma, t } = useIdioma()

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2>{t.projects.titulo}</h2>
        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <ProjectCard
              key={proyecto.titulo}
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion[idioma]}
              enlace={proyecto.enlace}
              enlaceTexto={proyecto.enlaceTexto?.[idioma] ?? t.projects.verProyecto}
              imagen={proyecto.imagen}
              tecnologias={proyecto.tecnologias[idioma]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
