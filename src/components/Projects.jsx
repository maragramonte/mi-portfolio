import { proyectos } from '../data/proyectos.js'
import { usaTecnologia } from '../data/tecnologias.js'
import ProjectCard from './ProjectCard.jsx'
import { useIdioma } from '../i18n.js'

// Sección de proyectos: recorre la lista y crea una tarjeta por cada uno.
// Si hay una tecnología elegida en la sección de arriba, solo muestra los
// proyectos que la usan y lo dice en un aviso, para que nadie piense que han
// desaparecido tarjetas.
export default function Projects({ tecnologiaActiva, onQuitarFiltro }) {
  const { idioma, t } = useIdioma()

  const visibles = tecnologiaActiva
    ? proyectos.filter((proyecto) => usaTecnologia(proyecto, tecnologiaActiva))
    : proyectos

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2>{t.projects.titulo}</h2>

        {tecnologiaActiva && (
          <div className="filtro" role="status">
            <span>
              {t.projects.filtradoPor} <strong>{tecnologiaActiva}</strong>
            </span>
            <button type="button" className="filtro__quitar" onClick={onQuitarFiltro}>
              {t.projects.quitarFiltro}
            </button>
          </div>
        )}

        <div className="projects-grid">
          {visibles.map((proyecto) => (
            <ProjectCard
              key={proyecto.titulo}
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion[idioma]}
              enlace={proyecto.enlace}
              enlaceTexto={proyecto.enlaceTexto?.[idioma] ?? t.projects.verProyecto}
              repo={proyecto.repo}
              repoTexto={t.projects.verCodigo}
              imagen={proyecto.imagen}
              estado={proyecto.estado?.[idioma]}
              tecnologias={proyecto.tecnologias[idioma]}
              destacar={tecnologiaActiva}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
