// 👇 Esta es la lista de tus proyectos.
// Para añadir uno nuevo, copia un bloque { ... } y cambia los datos.
// Los textos que cambian de idioma se escriben como { es: "...", en: "..." }.
// El diseño de la tarjeta se genera solo a partir de esta información.
//
// Campos de cada proyecto:
//   titulo        obligatorio
//   descripcion   obligatorio, { es, en }
//   enlace        opcional, demo en vivo. Si falta, no se pinta el botón.
//   repo          opcional, código en GitHub. Si falta, no se pinta el botón.
//   imagen        opcional, captura real del proyecto. Guárdala en public/img/
//                 y referénciala como `${import.meta.env.BASE_URL}img/nombre.png`.
//                 Si falta, la tarjeta muestra una portada con las iniciales.
//   tecnologias   opcional, { es: [...], en: [...] }
//   estado        opcional, { es, en }. Distintivo para proyectos vivos ("En
//                 desarrollo"). Decirlo tú misma juega a favor: el visitante
//                 entiende que lo que ve es una versión en marcha, no algo a medias.
//
// El orden importa: el primero es el que más se mira, así que va el proyecto
// con más peso técnico.

export const proyectos = [
  {
    titulo: "Web Dr. Agramonte",
    descripcion: {
      es: "Proyecto de fin de ciclo: aplicación de gestión de citas para un internista real en Palma. Backend en Java 21 y Spring Boot 3.5 sobre PostgreSQL, con autenticación JWT y migraciones versionadas en Flyway. Para que dos pacientes no pudieran reservar el mismo hueco apliqué bloqueo pesimista en base de datos, validado con un test de concurrencia real. CI/CD con GitHub Actions, despliegue con Docker Compose y Caddy (HTTPS automático) y avisos a pacientes vía Twilio y Telegram. La demo funciona solo en el navegador, con datos ficticios: el backend completo está en el repositorio.",
      en: "Final-year project: appointment management app for a real internist in Palma. Backend in Java 21 and Spring Boot 3.5 on PostgreSQL, with JWT authentication and versioned Flyway migrations. To stop two patients booking the same slot I applied pessimistic database locking, validated with a real concurrency test. CI/CD with GitHub Actions, deployment with Docker Compose and Caddy (automatic HTTPS) and patient notifications via Twilio and Telegram. The demo runs in the browser only, with fictional data: the full backend lives in the repository.",
    },
    imagen: `${import.meta.env.BASE_URL}img/dr-agramonte.png`,
    enlaceTexto: { es: "Ver demo", en: "View demo" },
    // La demo apunta a GitHub Pages, no al dominio propio: www.dragramonte.com
    // sigue devolviendo un 404 del servidor (comprobado el 2026-09-27) y no tiene
    // sentido mandar a nadie a una página de error. Cuando el dominio vuelva,
    // basta con cambiar esta línea.
    enlace: "https://maragramonte.github.io/dr-agramonte/",
    repo: "https://github.com/maragramonte/dr-agramonte",
    tecnologias: {
      es: ["Java 21", "Spring Boot", "PostgreSQL", "JWT", "Flyway", "Docker", "GitHub Actions"],
      en: ["Java 21", "Spring Boot", "PostgreSQL", "JWT", "Flyway", "Docker", "GitHub Actions"],
    },
  },
  {
    titulo: "Farmàcia Agramonte",
    descripcion: {
      es: "Web de la farmacia familiar, en la Plaça de la Llana (El Born, Barcelona). Sitio estático en HTML y CSS, sin frameworks ni paso de compilación, con un catálogo de producto generado en Python a partir de un JSON y un script que importa los datos desde el programa de gestión de la farmacia (CSV de Farmatic/Unycop). Cumple la normativa española de parafarmacia: sin medicamentos en el catálogo y sin precios expuestos al público. Se despliega solo con GitHub Pages.",
      en: "Website for the family pharmacy in Plaça de la Llana (El Born, Barcelona). A static HTML and CSS site with no framework or build step, with a product catalog generated in Python from a JSON file and a script that imports the data from the pharmacy's management software (Farmatic/Unycop CSV). Built to comply with Spanish parapharmacy regulations: no medications in the catalog and no prices shown publicly. Deploys automatically via GitHub Pages.",
    },
    estado: { es: "En desarrollo", en: "Work in progress" },
    imagen: `${import.meta.env.BASE_URL}img/farmacia-agramonte.png`,
    enlaceTexto: { es: "Ver web", en: "View site" },
    enlace: "https://maragramonte.github.io/Farmacia-Agramonte/",
    repo: "https://github.com/maragramonte/Farmacia-Agramonte",
    tecnologias: {
      es: ["HTML", "CSS", "Python", "GitHub Pages"],
      en: ["HTML", "CSS", "Python", "GitHub Pages"],
    },
  },
  {
    titulo: "Un paseo por Asia (LaTeX)",
    descripcion: {
      es: "Mi primer documento serio en LaTeX: un recorrido por las culturas hindú, coreana, japonesa, china y tailandesa. Practiqué secciones, índice, tablas, fórmulas matemáticas, referencias cruzadas, inclusión condicional de imágenes (\\IfFileExists) y una bibliografía básica.",
      en: "My first serious LaTeX document: a journey through Hindu, Korean, Japanese, Chinese and Thai cultures. I practised sections, table of contents, tables, math formulas, cross-references, conditional image inclusion (\\IfFileExists) and a basic bibliography.",
    },
    enlace: "https://www.overleaf.com/read/hyqnjmbrhknh#831915",
    enlaceTexto: { es: "Ver documento", en: "View document" },
    tecnologias: {
      es: ["LaTeX", "Overleaf", "Documentación"],
      en: ["LaTeX", "Overleaf", "Documentation"],
    },
  },
]
