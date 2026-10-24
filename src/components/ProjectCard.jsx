import { useState } from 'react'
import { chipDe } from '../data/tecnologias.js'
import { useIdioma } from '../i18n.js'

// Una tarjeta de proyecto. Recibe los datos por "props" y los pinta.
// Ambos enlaces son opcionales: si falta uno, ese botón no se muestra.

// A partir de aquí las etiquetas se pliegan. Seis caben en dos filas y dejan
// que la descripción siga siendo lo que más pesa en la tarjeta.
const VISIBLES = 6

// Iniciales del proyecto, para la portada de color cuando todavía no hay captura.
function iniciales(titulo) {
  return titulo
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()
}

export default function ProjectCard({
  titulo,
  descripcion,
  focoTecnico,
  enlace,
  enlaceTexto,
  repo,
  repoTexto,
  decisiones,
  decisionesTexto,
  imagen,
  imagenAlt,
  estado,
  tecnologias,
  destacar,
}) {
  const { t } = useIdioma()
  const [desplegado, setDesplegado] = useState(false)

  const total = tecnologias?.length ?? 0
  const sobran = total - VISIBLES

  // Si el filtro activo señala una etiqueta que quedaría plegada, se despliega
  // sola: esconder justo la que explica por qué la tarjeta sigue aquí sería
  // peor que no plegar nada.
  const posicionCoincidencia = destacar
    ? (tecnologias ?? []).findIndex((tech) => chipDe(tech) === destacar)
    : -1
  const forzado = posicionCoincidencia >= VISIBLES
  const abierto = desplegado || forzado

  const visibles = abierto ? tecnologias : tecnologias?.slice(0, VISIBLES)

  return (
    <article className="card">
      {imagen ? (
        <img
          className="card__img"
          src={imagen}
          alt={imagenAlt ?? `Captura del proyecto ${titulo}`}
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
        />
      ) : (
        // Sin captura todavía: portada con degradado e iniciales, en vez de un
        // rectángulo de relleno genérico.
        <div className="card__cover" aria-hidden="true">
          <span>{iniciales(titulo)}</span>
        </div>
      )}

      <div className="card__body">
        <div className="card__titulo">
          <h3>{titulo}</h3>
          {estado && <span className="card__estado">{estado}</span>}
        </div>
        <p>{descripcion}</p>

        {focoTecnico && (
          <p className="card__foco">
            <strong>{t.projects.focoTecnico}</strong>
            {focoTecnico}
          </p>
        )}

        {tecnologias?.length > 0 && (
          <div className="card__tecnologias">
            <div className="card__tags">
              {visibles.map((tech) => {
                // Con un filtro activo se marca la etiqueta que lo ha provocado,
                // para que se vea por qué esta tarjeta sigue en pantalla.
                const coincide = destacar && chipDe(tech) === destacar
                return (
                  <span key={tech} className={`tag${coincide ? ' tag--coincide' : ''}`}>
                    {tech}
                  </span>
                )
              })}
            </div>

            {sobran > 0 && !forzado && (
              <button
                type="button"
                className="card__desplegar"
                aria-expanded={abierto}
                onClick={() => setDesplegado(!desplegado)}
              >
                {abierto ? t.projects.verMenos : t.projects.masEtiquetas.replace('{n}', sobran)}
              </button>
            )}
          </div>
        )}

        {(enlace || repo || decisiones) && (
          <div className="card__links">
            {enlace && (
              <a className="card__link" href={enlace} target="_blank" rel="noreferrer">
                {enlaceTexto}
              </a>
            )}
            {repo && (
              <a className="card__link card__link--repo" href={repo} target="_blank" rel="noreferrer">
                {repoTexto}
              </a>
            )}
            {/* El tercero va al documento donde está razonada cada decisión.
                Último de la fila porque es el que menos gente pulsa y el que
                más dice de quien sí lo pulsa. */}
            {decisiones && (
              <a
                className="card__link card__link--decisiones"
                href={decisiones}
                target="_blank"
                rel="noreferrer"
              >
                {decisionesTexto}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
