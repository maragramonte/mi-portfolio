import { useId, useState } from 'react'
import { useIdioma } from '../i18n.js'
import { PEDIR_CV_URL } from '../config.js'

// Botón y formulario para pedir el CV. El CV no se publica: cada solicitud
// llega por correo (vía Formspree) y se responde a mano con el PDF.
// Si PEDIR_CV_URL está vacía o no es de Formspree, no se pinta nada.

const ENDPOINT_VALIDO = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/

export default function PedirCV() {
  const { idioma, t } = useIdioma()
  const x = t.contact.pedirCV
  const [abierto, setAbierto] = useState(false)
  const [estado, setEstado] = useState('inactivo') // inactivo | enviando | enviado | error
  const idFormulario = useId()

  if (!ENDPOINT_VALIDO.test(PEDIR_CV_URL)) return null

  async function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.currentTarget
    const datos = Object.fromEntries(new FormData(formulario))
    setEstado('enviando')

    try {
      const respuesta = await fetch(PEDIR_CV_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // El idioma va para saber en cuál contestar.
        body: JSON.stringify({ ...datos, idioma, _subject: 'Solicitud de CV desde el portfolio' }),
      })
      if (!respuesta.ok) throw new Error(String(respuesta.status))
      formulario.reset()
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="pedir-cv">
      <p className="pedir-cv__texto">{x.texto}</p>
      <button
        type="button"
        className="btn btn--primario"
        aria-expanded={abierto}
        aria-controls={idFormulario}
        onClick={() => setAbierto(!abierto)}
      >
        {x.boton}
      </button>

      <form id={idFormulario} className="pedir-cv__form" onSubmit={enviar} hidden={!abierto}>
        <label>
          <span>{x.nombre}</span>
          <input name="nombre" type="text" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          <span>{x.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={150} />
        </label>
        <label>
          <span>{x.empresa}</span>
          <input name="empresa" type="text" autoComplete="organization" maxLength={100} />
        </label>

        {/* Trampa para bots: una persona no lo ve ni lo rellena. */}
        <div className="pedir-cv__trampa" aria-hidden="true">
          <label>
            No rellenar
            <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button type="submit" className="btn" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? x.enviando : x.enviar}
        </button>

        <p className="pedir-cv__privacidad">{x.privacidad}</p>
        <p role="status" className={`pedir-cv__estado pedir-cv__estado--${estado}`}>
          {estado === 'enviado' && x.ok}
          {estado === 'error' && x.error}
        </p>
      </form>
    </div>
  )
}
