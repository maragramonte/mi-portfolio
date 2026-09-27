import { useEffect, useRef, useState } from 'react'
import { useIdioma } from '../i18n.js'
import { cvUrl } from '../config.js'
import { contactos } from '../data/contacto.js'
import { useSeccionActiva } from '../hooks/useNavegacion.js'
import Icono from './Icono.jsx'

// Secciones del menú, en el mismo orden en que aparecen en la página.
// `clave` es el nombre del texto dentro de t.nav (ver i18n.js).
const SECCIONES = [
  { id: 'sobre-mi', clave: 'sobreMi' },
  { id: 'experiencia', clave: 'experiencia' },
  { id: 'tecnologias', clave: 'tecnologias' },
  { id: 'proyectos', clave: 'proyectos' },
  { id: 'contacto', clave: 'contacto' },
]

const etiquetaTema = { dia: '☀️', noche: '🌙' }

// Columna izquierda en escritorio y cabecera + menú desplegable en móvil.
// Las dos versiones comparten los mismos datos; solo cambia cómo se colocan.
export default function Sidebar({ tema, onCambiarTema }) {
  const { idioma, t, cambiarIdioma } = useIdioma()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const botonMenu = useRef(null)
  const cv = cvUrl(idioma)

  // 64px es lo que ocupa la barra fija en móvil: sin ese desfase, la sección
  // activa cambiaría un poco antes de que el título llegue a verse.
  const activa = useSeccionActiva(SECCIONES.map((s) => s.id), 64)

  // Con el menú abierto, la página de detrás no debe poder moverse.
  useEffect(() => {
    if (!menuAbierto) return

    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function alPulsarTecla(evento) {
      if (evento.key === 'Escape') {
        setMenuAbierto(false)
        // Quien cerró con Escape sigue navegando con teclado: le devolvemos el foco.
        botonMenu.current?.focus()
      }
    }

    document.addEventListener('keydown', alPulsarTecla)
    return () => {
      document.body.style.overflow = anterior
      document.removeEventListener('keydown', alPulsarTecla)
    }
  }, [menuAbierto])

  const enlacesNav = (
    <ul className="nav-lista">
      {SECCIONES.map((seccion) => (
        <li key={seccion.id}>
          <a
            href={`#${seccion.id}`}
            className={activa === seccion.id ? 'nav-enlace nav-enlace--activo' : 'nav-enlace'}
            aria-current={activa === seccion.id ? 'true' : undefined}
            onClick={() => setMenuAbierto(false)}
          >
            <span className="nav-enlace__marca" aria-hidden="true" />
            {t.nav[seccion.clave]}
          </a>
        </li>
      ))}
    </ul>
  )

  const redes = (
    <ul className="rail__redes">
      {contactos.map((contacto) => {
        const externo = contacto.href.startsWith('http')
        return (
          <li key={contacto.etiqueta}>
            <a
              href={contacto.href}
              title={contacto.etiqueta}
              aria-label={contacto.etiqueta}
              {...(externo ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <Icono nombre={contacto.etiqueta} />
            </a>
          </li>
        )
      })}
    </ul>
  )

  const ajustes = (
    <div className="rail__ajustes">
      <button
        className="boton-icono"
        onClick={cambiarIdioma}
        title="Cambiar idioma / Switch language"
        aria-label="Cambiar idioma / Switch language"
      >
        {idioma === 'es' ? 'EN' : 'ES'}
      </button>
      <button
        className="boton-icono"
        onClick={onCambiarTema}
        title="Cambiar tema"
        aria-label="Cambiar tema de color"
      >
        {etiquetaTema[tema]}
      </button>
    </div>
  )

  return (
    <>
      {/* ---------- Escritorio: columna fija ---------- */}
      <aside className="rail">
        <div className="rail__identidad">
          <a href="#top" className="rail__nombre">Mar Agramonte</a>
          <p className="rail__rol">{t.hero.rol}</p>
          <p className="rail__stack">{t.hero.stack}</p>
          <p className="rail__disponibilidad">{t.hero.disponibilidad}</p>
        </div>

        <nav className="rail__nav" aria-label={t.nav.principal}>
          {enlacesNav}
        </nav>

        <div className="rail__pie">
          {cv && (
            <a className="btn btn--primario btn--bloque" href={cv} download>
              {t.hero.descargarCV}
            </a>
          )}
          <div className="rail__fila">
            {redes}
            {ajustes}
          </div>
        </div>
      </aside>

      {/* ---------- Móvil: barra fija + panel desplegable ---------- */}
      <header className="barra-movil">
        <a href="#top" className="barra-movil__marca">Mar Agramonte</a>
        <div className="barra-movil__acciones">
          {ajustes}
          <button
            ref={botonMenu}
            className="boton-icono boton-menu"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? t.nav.cerrarMenu : t.nav.abrirMenu}
          >
            <span className={menuAbierto ? 'hamburguesa hamburguesa--abierta' : 'hamburguesa'}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </header>

      {/* Capa oscura: cerrar tocando fuera del panel */}
      {menuAbierto && (
        <div className="menu-fondo" onClick={() => setMenuAbierto(false)} aria-hidden="true" />
      )}

      <nav
        id="menu-movil"
        className={menuAbierto ? 'menu-movil menu-movil--abierto' : 'menu-movil'}
        aria-label={t.nav.principal}
        aria-hidden={!menuAbierto}
      >
        {enlacesNav}
        {cv && (
          <a className="btn btn--primario btn--bloque" href={cv} download onClick={() => setMenuAbierto(false)}>
            {t.hero.descargarCV}
          </a>
        )}
        {redes}
      </nav>
    </>
  )
}
