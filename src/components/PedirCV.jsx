import { useIdioma } from '../i18n.js'
import { PEDIR_CV_URL } from '../config.js'

// Botón para pedir el CV. El CV no se publica: el botón abre un formulario de
// Google en otra pestaña y cada solicitud se contesta a mano con el PDF.
// Si PEDIR_CV_URL está vacía, no se pinta nada.
export default function PedirCV() {
  const { t } = useIdioma()
  const x = t.contact.pedirCV

  if (!PEDIR_CV_URL) return null

  return (
    <div className="pedir-cv">
      <p className="pedir-cv__texto">{x.texto}</p>
      <a className="btn btn--primario" href={PEDIR_CV_URL} target="_blank" rel="noreferrer">
        {x.boton}
      </a>
      <p className="pedir-cv__privacidad">{x.privacidad}</p>
    </div>
  )
}
