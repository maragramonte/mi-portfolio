import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './layout.css'
import './caso.css'
import CasoDrAgramonte from './components/CasoDrAgramonte.jsx'

// Entrada de las páginas de caso (casos/dr-agramonte/ y su versión en inglés).
// Comparte estilos, temas y textos con el portfolio, pero no su estructura.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CasoDrAgramonte />
  </StrictMode>,
)
