// Una tarjeta de proyecto. Recibe los datos por "props" y los pinta.
// El enlace es opcional: si no hay "enlace", no se muestra el botón.
export default function ProjectCard({
  titulo,
  descripcion,
  enlace,
  enlaceTexto = "Ver proyecto",
  imagen,
  tecnologias,
}) {
  return (
    <article className="card">
      {imagen && <img className="card__img" src={imagen} alt={titulo} />}
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

        {enlace && (
          <a className="card__link" href={enlace} target="_blank" rel="noreferrer">
            {enlaceTexto}
          </a>
        )}
      </div>
    </article>
  )
}
