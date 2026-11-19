import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Technologies from './components/Technologies.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import { IDIOMAS, IdiomaContext, traducciones } from './i18n.js'
import { cvUrls } from './config.js'
import { useProgresoLectura } from './hooks/useNavegacion.js'
import { TEMAS, useTema } from './hooks/useTema.js'

export default function App() {
  const [tema, setTema] = useTema()

  // Tecnología elegida en la sección de arriba; filtra la de proyectos.
  // Vive aquí porque es lo único que comparten las dos secciones.
  const [tecnologiaActiva, setTecnologiaActiva] = useState(null)

  const [idioma, setIdioma] = useState(() => {
    // La página puede fijar el idioma: en/index.html trae data-idioma-fijo="en".
    // Manda sobre lo guardado, porque quien abre el enlace en inglés espera
    // inglés aunque su última visita fuera en español.
    const fijado = document.documentElement.dataset.idiomaFijo
    if (IDIOMAS.includes(fijado)) return fijado

    const guardado = localStorage.getItem('idioma')
    return IDIOMAS.includes(guardado) ? guardado : 'es'
  })

  // Al elegir una tecnología se sube a los proyectos, que van antes que la
  // lista de chips: sin esto el filtro se aplicaría donde no se ve.
  function elegirTecnologia(tech) {
    setTecnologiaActiva(tech)
    if (tech) document.getElementById('proyectos')?.scrollIntoView({ block: 'start' })
  }

  // Textos del idioma activo, disponibles para toda la app vía contexto.
  const t = traducciones[idioma]

  // Guarda el idioma y actualiza el atributo lang del documento.
  // El <title> y la descripción viven en index.html, fuera de React, así que
  // hay que reescribirlos aquí para que acompañen al cambio de idioma.
  useEffect(() => {
    document.documentElement.lang = idioma
    localStorage.setItem('idioma', idioma)

    document.title = t.meta.titulo
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.descripcion)
  }, [idioma, t])

  function cambiarIdioma() {
    const siguiente = IDIOMAS[(IDIOMAS.indexOf(idioma) + 1) % IDIOMAS.length]
    setIdioma(siguiente)
  }

  // Versiones del CV en el idioma activo.
  const cv = cvUrls(idioma)

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

        {/* El ancla a la que vuelve el nombre de la cabecera va aquí y no en
            la portada: en escritorio la portada está oculta, y un ancla con
            display:none no mueve la página. Este contenedor existe a las dos
            anchuras y es lo primero del documento. */}
        <div id="top" className="contenido">
          {/* Portada: en escritorio la identidad vive en la columna izquierda,
              así que esta cabecera solo se muestra en pantallas estrechas. */}
          <header className="hero">
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
                {/* Las descargas aparecen si el CV visual está configurado. */}
                {cv.visual && (
                  <>
                  <a className="btn" href={cv.visual} download>
                    {t.hero.descargarCV}
                  </a>
                  <a className="cv-ats-link" href={cv.ats} download>{t.hero.descargarCVATS}</a>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Los proyectos van primero: son lo que más dice de mí y lo primero que
              busca quien llega desde una oferta. Antes, la primera pantalla era el
              texto de «Sobre mí» y las capturas quedaban tres secciones más abajo. */}
          <main>
            <Projects
              tecnologiaActiva={tecnologiaActiva}
              onQuitarFiltro={() => setTecnologiaActiva(null)}
            />
            <Experience />
            <Technologies
              tecnologiaActiva={tecnologiaActiva}
              onElegirTecnologia={elegirTecnologia}
            />
            <About />
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
