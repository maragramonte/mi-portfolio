import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Technologies from './components/Technologies.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

// Temas disponibles, en el orden en que rota el botón.
// (Las paletas "amanecer" y "atardecer" siguen en index.css por si se quieren reactivar.)
const TEMAS = ['dia', 'noche']

export default function App() {
  const [tema, setTema] = useState(() => {
    const guardado = localStorage.getItem('tema')
    return TEMAS.includes(guardado) ? guardado : 'dia'
  })

  // Aplica el tema al <html> y lo guarda para la próxima visita.
  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem('tema', tema)
  }, [tema])

  function cambiarTema() {
    const siguiente = TEMAS[(TEMAS.indexOf(tema) + 1) % TEMAS.length]
    setTema(siguiente)
  }

  return (
    <>
      <Navbar tema={tema} onCambiarTema={cambiarTema} />

      <header id="top" className="hero">
        <div className="container">
          <h1>Mar Agramonte</h1>
          <p>Técnica Administrativa | Desarrolladora Full Stack en formación</p>
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
          © {new Date().getFullYear()} · Mar Agramonte · Hecho con React + Vite
        </div>
      </footer>
    </>
  )
}
