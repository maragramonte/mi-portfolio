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

// Temas disponibles, en el orden en que rota el botón.
// (Las paletas "amanecer" y "atardecer" siguen en index.css por si se quieren reactivar.)
const TEMAS = ['dia', 'noche']

export default function App() {
  const [tema, setTema] = useState(() => {
    const guardado = localStorage.getItem('tema')
    return TEMAS.includes(guardado) ? guardado : 'dia'
  })

  const [idioma, setIdioma] = useState(() => {
    const guardado = localStorage.getItem('idioma')
    return IDIOMAS.includes(guardado) ? guardado : 'es'
  })

  // Aplica el tema al <html> y lo guarda para la próxima visita.
  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem('tema', tema)
  }, [tema])

  // Guarda el idioma y actualiza el atributo lang del documento.
  useEffect(() => {
    document.documentElement.lang = idioma
    localStorage.setItem('idioma', idioma)
  }, [idioma])

  function cambiarTema() {
    const siguiente = TEMAS[(TEMAS.indexOf(tema) + 1) % TEMAS.length]
    setTema(siguiente)
  }

  function cambiarIdioma() {
    const siguiente = IDIOMAS[(IDIOMAS.indexOf(idioma) + 1) % IDIOMAS.length]
    setIdioma(siguiente)
  }

  // Textos del idioma activo, disponibles para toda la app vía contexto.
  const t = traducciones[idioma]

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
        <Sidebar tema={tema} onCambiarTema={cambiarTema} />

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
            <Technologies />
            <Projects />
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
