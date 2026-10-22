import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Technologies from './components/Technologies.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import { IDIOMAS, IdiomaContext, traducciones } from './i18n.js'
import { cvUrl } from './config.js'
import { useProgresoLectura } from './hooks/useNavegacion.js'
import { leerPreferencia, guardarPreferencia } from './utils/storage.js'

// Temas disponibles, en el orden en que aparecen en el desplegable.
// El orden va del más claro al más oscuro, que es como se lee de un vistazo.
const TEMAS = ['dia', 'amanecer', 'atardecer', 'noche']

export default function App() {
  const [tema, setTema] = useState(() => {
    const guardado = leerPreferencia('tema')
    return TEMAS.includes(guardado) ? guardado : 'dia'
  })

  // Tecnología elegida en la sección de arriba; filtra la de proyectos.
  // Vive aquí porque es lo único que comparten las dos secciones.
  const [tecnologiaActiva, setTecnologiaActiva] = useState(null)

  const [idioma, setIdioma] = useState(() => {
    // La página puede fijar el idioma: en/index.html trae data-idioma-fijo="en".
    // Manda sobre lo guardado, porque quien abre el enlace en inglés espera
    // inglés aunque su última visita fuera en español.
    const fijado = document.documentElement.dataset.idiomaFijo
    if (IDIOMAS.includes(fijado)) return fijado

    const guardado = leerPreferencia('idioma')
    return IDIOMAS.includes(guardado) ? guardado : 'es'
  })

  // Al elegir una tecnología se baja a los proyectos: la lista de chips es
  // larga y, desde los primeros grupos, la rejilla queda fuera de pantalla.
  // Sin esto el filtro se aplicaría donde no se ve.
  function elegirTecnologia(tech) {
    setTecnologiaActiva(tech)
    if (tech) document.getElementById('proyectos')?.scrollIntoView({ block: 'start' })
  }

  // Textos del idioma activo, disponibles para toda la app vía contexto.
  const t = traducciones[idioma]

  // Aplica el tema al <html> y lo guarda para la próxima visita.
  useEffect(() => {
    document.documentElement.dataset.theme = tema
    guardarPreferencia('tema', tema)
  }, [tema])

  // Guarda el idioma y actualiza el atributo lang del documento.
  // El <title> y la descripción viven en index.html, fuera de React, así que
  // hay que reescribirlos aquí para que acompañen al cambio de idioma.
  useEffect(() => {
    document.documentElement.lang = idioma
    guardarPreferencia('idioma', idioma)

    document.title = t.meta.titulo
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.descripcion)
  }, [idioma, t])

  function cambiarIdioma() {
    const siguiente = IDIOMAS[(IDIOMAS.indexOf(idioma) + 1) % IDIOMAS.length]
    setIdioma(siguiente)
  }

  // CV del idioma activo: si ese idioma no tiene PDF, el botón no se pinta.
  const cv = cvUrl(idioma)

  const progreso = useProgresoLectura()

  return (
    <IdiomaContext.Provider value={{ idioma, t, cambiarIdioma }}>
      {/* Barra de progreso de lectura, pegada al borde superior de la ventana */}
      <div
        className="progreso"
        style={{ transform: `scaleX(${progreso})` }}
        role="progressbar"
        aria-label={t.nav.progreso}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progreso * 100)}
      />

      <div className="layout">
        <Sidebar temas={TEMAS} tema={tema} onElegirTema={setTema} />

        <div className="contenido">
          {/* Portada: en escritorio la identidad vive en la columna izquierda,
              así que esta cabecera solo se muestra en pantallas estrechas. */}
          <header id="top" className="hero">
            <div className="container">
              <h1>Mar Agramonte</h1>
              <p className="hero__rol">{t.hero.rol}</p>
              <p className="hero__stack">{t.hero.stack}</p>
              <p className="hero__disponibilidad">{t.hero.disponibilidad}</p>

              <div className="hero__acciones">
                <a className="btn btn--primario" href="#proyectos">
                  {t.hero.verProyectos}
                </a>
                <a className="btn" href="#contacto">
                  {t.hero.contactar}
                </a>
                {/* El botón de CV solo aparece cuando hay un PDF configurado en config.js */}
                {cv && (
                  <a className="btn" href={cv} download>
                    {t.hero.descargarCV}
                  </a>
                )}
              </div>
            </div>
          </header>

          <main>
            <About />
            <Experience />
            <Technologies
              tecnologiaActiva={tecnologiaActiva}
              onElegirTecnologia={elegirTecnologia}
            />
            <Projects
              tecnologiaActiva={tecnologiaActiva}
              onQuitarFiltro={() => setTecnologiaActiva(null)}
            />
            <Contact />
          </main>

          <footer>
            <div className="container">
              © {new Date().getFullYear()} · Mar Agramonte · {t.footer.hecho}
            </div>
          </footer>
        </div>
      </div>
    </IdiomaContext.Provider>
  )
}
