import { useEffect, useRef, useState } from 'react'
import { useIdioma } from '../i18n.js'

// Emoji de cada tema: es lo único que distingue al botón cuando está cerrado.
const ICONO = { dia: '☀️', noche: '🌙', amanecer: '🌄', atardecer: '🌇' }

// Botón que despliega la lista de temas.
//
// Sustituye al botón que rotaba en círculo. Con dos temas rotar era cómodo,
// pero con cuatro había que pulsar hasta tres veces para llegar al que querías
// y el icono solo decía dónde estabas, no a dónde ibas. Aquí se ven los cuatro
// y se va a cualquiera de un toque.
export default function SelectorTema({ temas, tema, onElegir }) {
  const { t } = useIdioma()
  const [abierto, setAbierto] = useState(false)
  const caja = useRef(null)
  const boton = useRef(null)

  useEffect(() => {
    if (!abierto) return

    function alPulsarFuera(evento) {
      if (!caja.current?.contains(evento.target)) setAbierto(false)
    }

    function alPulsarTecla(evento) {
      if (evento.key === 'Escape') {
        setAbierto(false)
        // Quien cerró con Escape sigue navegando con teclado: le devolvemos el foco.
        boton.current?.focus()
      }
    }

    document.addEventListener('pointerdown', alPulsarFuera)
    document.addEventListener('keydown', alPulsarTecla)
    return () => {
      document.removeEventListener('pointerdown', alPulsarFuera)
      document.removeEventListener('keydown', alPulsarTecla)
    }
  }, [abierto])

  function elegir(id) {
    onElegir(id)
    setAbierto(false)
    boton.current?.focus()
  }

  return (
    <div className="selector-tema" ref={caja}>
      <button
        ref={boton}
        className="boton-icono"
        onClick={() => setAbierto((estaba) => !estaba)}
        aria-expanded={abierto}
        aria-label={t.tema.etiqueta}
        title={t.tema.etiqueta}
      >
        <span aria-hidden="true">{ICONO[tema]}</span>
      </button>

      {abierto && (
        // Botones sueltos con aria-pressed en vez de role="menu": un menú de
        // verdad promete navegación con flechas, y aquí el Tab nativo basta.
        <div className="selector-tema__lista" role="group" aria-label={t.tema.etiqueta}>
          {temas.map((id) => (
            <button
              key={id}
              type="button"
              className={
                id === tema
                  ? 'selector-tema__opcion selector-tema__opcion--activa'
                  : 'selector-tema__opcion'
              }
              aria-pressed={id === tema}
              onClick={() => elegir(id)}
            >
              <span aria-hidden="true">{ICONO[id]}</span>
              {t.tema[id]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
