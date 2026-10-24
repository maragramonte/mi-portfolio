import { proyectos } from '../data/proyectos.js'
import { usaTecnologia } from '../data/tecnologias.js'
import ProjectCard from './ProjectCard.jsx'
import { useIdioma } from '../i18n.js'

// El título de un proyecto es una cadena cuando no hay nada que traducir (los
// nombres propios: "Farmàcia Agramonte" se llama igual en inglés) y { es, en }
// cuando sí. El español hace de clave de React, porque existe siempre y no
// cambia al cambiar de idioma: así el botón de idioma no rehace las tarjetas.
const tituloDe = (proyecto, idioma) =>
  typeof proyecto.titulo === 'string' ? proyecto.titulo : proyecto.titulo[idioma]

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

        <p className="section-intro">{t.projects.intro}</p>

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
              key={tituloDe(proyecto, 'es')}
              titulo={tituloDe(proyecto, idioma)}
              descripcion={proyecto.descripcion[idioma]}
              focoTecnico={proyecto.focoTecnico[idioma]}
              enlace={proyecto.enlace}
              enlaceTexto={proyecto.enlaceTexto?.[idioma] ?? t.projects.verProyecto}
              repo={proyecto.repo}
              repoTexto={t.projects.verCodigo}
              decisiones={proyecto.decisiones}
              decisionesTexto={proyecto.decisionesTexto?.[idioma] ?? t.projects.verDecisiones}
              imagen={proyecto.imagen}
              imagenAlt={proyecto.imagenAlt?.[idioma]}
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
