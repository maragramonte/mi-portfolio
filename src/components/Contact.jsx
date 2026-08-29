import { useIdioma } from '../i18n.js'
import { CV_URL } from '../config.js'

// Sección de contacto. Edita los enlaces con los tuyos.
//
// Se muestran solo los canales profesionales: es lo que busca quien viene a
// contratarte. Instagram, Discord e Indeed se retiraron de aquí (Indeed apuntaba
// a la home genérica y el enlace de Discord no era una invitación válida).
const contactos = [
  {
    etiqueta: "Email",
    valor: "agramontemar@gmail.com",
    href: "mailto:agramontemar@gmail.com",
  },
  {
    etiqueta: "LinkedIn",
    valor: "in/mar-agramonte",
    href: "https://www.linkedin.com/in/mar-agramonte-9b9644367/",
  },
  {
    etiqueta: "GitHub",
    valor: "github.com/maragramonte",
    href: "https://github.com/maragramonte",
  },
]

export default function Contact() {
  const { t } = useIdioma()

  // El CV solo aparece si hay un PDF configurado en config.js
  const enlaces = CV_URL
    ? [...contactos, { etiqueta: "CV", valor: "PDF", href: CV_URL, descarga: true }]
    : contactos

  return (
    <section id="contacto" className="section">
      <div className="container">
        <h2>{t.contact.titulo}</h2>
        <p className="contact-intro">{t.contact.intro}</p>
        <ul className="contact-list">
          {enlaces.map((c) => {
            // mailto: y tel: se abren en la misma pestaña; el resto, en una nueva.
            const externo = c.href.startsWith("http")
            return (
              <li key={c.etiqueta}>
                <a
                  href={c.href}
                  {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(c.descarga ? { download: true } : {})}
                >
                  <span className="contact-label">{t.contact.etiquetas[c.etiqueta] ?? c.etiqueta}</span>
                  <span className="contact-value">{c.valor}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
