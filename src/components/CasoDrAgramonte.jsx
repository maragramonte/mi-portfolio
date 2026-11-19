import SelectorTema from './SelectorTema.jsx'
import { IdiomaContext, traducciones } from '../i18n.js'
import { TEMAS, useTema } from '../hooks/useTema.js'
import { caso } from '../data/casos/drAgramonte.js'

const BASE = import.meta.env.BASE_URL

// Cada idioma tiene su HTML, que lo fija con data-idioma-fijo. Aquí no hay botón
// que lo cambie en caliente: el enlace de idioma lleva a la otra página, que es
// la que tiene el título y la vista previa correctos para compartirla.
const idioma = document.documentElement.dataset.idiomaFijo === 'en' ? 'en' : 'es'

// Página de caso de estudio: una sola historia de Dr. Agramonte, la de la
// doble reserva, contada de principio a fin.
export default function CasoDrAgramonte() {
  const [tema, setTema] = useTema()
  const t = caso[idioma]
  const portfolio = idioma === 'en' ? `${BASE}en/` : BASE

  return (
    // El selector de tema lee sus textos del contexto de idioma del portfolio.
    <IdiomaContext.Provider value={{ idioma, t: traducciones[idioma], cambiarIdioma: () => {} }}>
      <div className="caso">
        <header className="caso__barra">
          <a className="caso__volver" href={`${portfolio}#proyectos`}>
            {t.volver}
          </a>
          <div className="caso__ajustes">
            <a
              className="caso__idioma"
              href={`${BASE}${t.otroIdioma.ruta}`}
              lang={t.otroIdioma.lang}
              hrefLang={t.otroIdioma.lang}
            >
              {t.otroIdioma.texto}
            </a>
            <SelectorTema temas={TEMAS} tema={tema} onElegir={setTema} />
          </div>
        </header>

        <main className="caso__contenido">
          <header className="caso__cabecera">
            <h1>{t.titulo}</h1>
            <p className="caso__entradilla">{t.entradilla}</p>
            <dl className="caso__ficha">
              {t.ficha.map(([termino, valor]) => (
                <div key={termino}>
                  <dt>{termino}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
          </header>

          <Seccion id="problema" titulo={t.problema.titulo}>
            <Parrafos lista={t.problema.parrafos} />
          </Seccion>

          <Seccion id="carrera" titulo={t.carrera.titulo}>
            <Carrera {...t.carrera} />
          </Seccion>

          <Seccion id="decision" titulo={t.decision.titulo}>
            <Parrafos lista={t.decision.parrafos} />
            <Codigo codigo={t.decision.codigo} pie={t.decision.codigoPie} />
            <h3>{t.decision.descartadas.titulo}</h3>
            <dl className="caso__descartadas">
              {t.decision.descartadas.opciones.map(([opcion, motivo]) => (
                <div key={opcion}>
                  <dt>{opcion}</dt>
                  <dd>{motivo}</dd>
                </div>
              ))}
            </dl>
          </Seccion>

          <Seccion id="prueba" titulo={t.prueba.titulo}>
            <Parrafos lista={t.prueba.parrafos} />
            <Codigo codigo={t.prueba.codigo} pie={t.prueba.codigoPie} />
          </Seccion>

          <Seccion id="paciente" titulo={t.paciente.titulo}>
            <Parrafos lista={t.paciente.parrafos} />
          </Seccion>

          <Seccion id="limites" titulo={t.limites.titulo}>
            <ul className="caso__limites">
              {t.limites.puntos.map((punto) => (
                <li key={punto}>{punto}</li>
              ))}
            </ul>
          </Seccion>

          <Seccion id="enlaces" titulo={t.enlaces.titulo}>
            <ul className="caso__enlaces">
              {t.enlaces.lista.map(([texto, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
          </Seccion>
        </main>
      </div>
    </IdiomaContext.Provider>
  )
}

function Seccion({ id, titulo, children }) {
  return (
    <section className="caso__seccion" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>{titulo}</h2>
      {children}
    </section>
  )
}

function Parrafos({ lista }) {
  return lista.map((parrafo) => <p key={parrafo}>{parrafo}</p>)
}

// tabIndex: en el móvil el código se desplaza en horizontal, y una zona que se
// desplaza tiene que poder alcanzarse con el teclado.
function Codigo({ codigo, pie }) {
  return (
    <figure className="caso__codigo">
      <pre tabIndex={0}>
        <code>{codigo}</code>
      </pre>
      <figcaption>{pie}</figcaption>
    </figure>
  )
}

// Las dos transacciones, momento a momento. Es una lista ordenada porque el
// orden es lo que importa; en escritorio cada paciente va en su columna.
function Carrera({ carriles, pasos, final }) {
  const [a, b] = carriles
  const momentos = [...pasos, final]

  return (
    <div className="carrera">
      <div className="carrera__carriles" aria-hidden="true">
        <span>{a}</span>
        <span>{b}</span>
      </div>
      <ol className="carrera__pasos">
        {momentos.map(([deA, deB], i) => {
          const esFinal = i === momentos.length - 1
          return (
            <li key={deA} className={esFinal ? 'carrera__paso carrera__paso--final' : 'carrera__paso'}>
              <p className={esFinal ? 'carrera__evento carrera__evento--gana' : 'carrera__evento'}>
                <span className="carrera__quien">{a}</span>
                {deA}
              </p>
              <p className={esFinal ? 'carrera__evento carrera__evento--pierde' : 'carrera__evento'}>
                <span className="carrera__quien">{b}</span>
                {deB}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
