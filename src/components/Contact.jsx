import { useIdioma } from '../i18n.js'
import { cvUrls } from '../config.js'
import { contactos } from '../data/contacto.js'

// Sección de contacto. Los canales salen de src/data/contacto.js, que es la
// misma lista que usa la columna lateral: así no hay dos sitios que tocar.

export default function Contact() {
  const { idioma, t } = useIdioma()

  // El CV se ofrece en el idioma en el que se esté leyendo la web.
  const cv = cvUrls(idioma)

  // Las dos descargas aparecen si el CV visual está configurado.
  const enlaces = cv.visual
    ? [...contactos,
      { etiqueta: "CV", valor: idioma === "es" ? "PDF visual · Español" : "Visual PDF · English", href: cv.visual, descarga: true },
      { etiqueta: "CV ATS", valor: idioma === "es" ? "PDF compatible con ATS · Español" : "ATS-friendly PDF · English", href: cv.ats, descarga: true },
    ]
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
