// Una tarjeta de proyecto. Recibe los datos por "props" y los pinta.
// Ambos enlaces son opcionales: si falta uno, ese botón no se muestra.

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
  enlace,
  enlaceTexto,
  repo,
  repoTexto,
  imagen,
  tecnologias,
}) {
  return (
    <article className="card">
      {imagen ? (
        <img
          className="card__img"
          src={imagen}
          alt={`Captura del proyecto ${titulo}`}
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
        <h3>{titulo}</h3>
        <p>{descripcion}</p>

        {tecnologias?.length > 0 && (
          <div className="card__tags">
            {tecnologias.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}

        {(enlace || repo) && (
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
          </div>
        )}
      </div>
    </article>
  )
}
