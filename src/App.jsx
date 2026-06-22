import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Technologies from './components/Technologies.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import { IDIOMAS, IdiomaContext, traducciones } from './i18n.js'

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

  return (
    <IdiomaContext.Provider value={{ idioma, t, cambiarIdioma }}>
      <Navbar tema={tema} onCambiarTema={cambiarTema} />

      <header id="top" className="hero">
        <div className="container">
          <h1>Mar Agramonte</h1>
          <p>{t.hero.subtitulo}</p>
        </div>
      </header>

      <main>
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>

      <footer>
        <div className="container">
          © {new Date().getFullYear()} · Mar Agramonte · {t.footer.hecho}
        </div>
      </footer>
    </IdiomaContext.Provider>
  )
}
