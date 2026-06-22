import { useIdioma } from '../i18n.js'

// Sección "Sobre mí".
export default function About() {
  const { t } = useIdioma()

  return (
    <section id="sobre-mi" className="section">
      <div className="container prose">
        <h2>{t.about.titulo}</h2>
        {t.about.parrafos.map((parrafo, i) => (
          <p key={i}>{parrafo}</p>
        ))}
      </div>
    </section>
  )
}
