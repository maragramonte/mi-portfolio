import { useIdioma } from '../i18n.js'

// Sección de contacto. Edita los enlaces con los tuyos.
const contactos = [
  {
    etiqueta: "Email",
    valor: "agramontemar@gmail.com",
    href: "mailto:agramontemar@gmail.com",
  },
  {
    etiqueta: "Teléfono",
    valor: "+34 654 873 028",
    href: "tel:+34654873028",
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
  {
    etiqueta: "Indeed",
    valor: "indeed.com",
    href: "https://www.indeed.com/",
  },
  {
    etiqueta: "Instagram",
    valor: "@m.agramonte_",
    href: "https://www.instagram.com/m.agramonte_",
  },
  {
    etiqueta: "Discord",
    valor: "m.agramonte01",
    href: "https://discord.gg/m.agramonte01",
  },
]

export default function Contact() {
  const { t } = useIdioma()

  return (
    <section id="contacto" className="section">
      <div className="container">
        <h2>{t.contact.titulo}</h2>
        <p className="contact-intro">{t.contact.intro}</p>
        <ul className="contact-list">
          {contactos.map((c) => (
            <li key={c.etiqueta}>
              <a href={c.href} target="_blank" rel="noreferrer">
                <span className="contact-label">{t.contact.etiquetas[c.etiqueta] ?? c.etiqueta}</span>
                <span className="contact-value">{c.valor}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
