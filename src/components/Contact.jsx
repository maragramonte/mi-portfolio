import { useIdioma } from '../i18n.js'
import { cvUrl } from '../config.js'
import { contactos } from '../data/contacto.js'

// Sección de contacto. Los canales salen de src/data/contacto.js, que es la
// misma lista que usa la columna lateral: así no hay dos sitios que tocar.

export default function Contact() {
  const { idioma, t } = useIdioma()

  // El CV se ofrece en el idioma en el que se esté leyendo la web.
  const cv = cvUrl(idioma)

  // El CV solo aparece si hay un PDF configurado en config.js
  const enlaces = cv
    ? [...contactos, { etiqueta: "CV", valor: idioma === "es" ? "PDF (español)" : "PDF (English)", href: cv, descarga: true }]
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
