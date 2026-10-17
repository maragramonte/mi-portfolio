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
      es: "Gestión de citas para un internista real en Palma. El reto fue impedir que dos pacientes reservaran el mismo hueco: bloqueo pesimista en base de datos, validado con un test de concurrencia real. La demo va con datos ficticios.",
      en: "Appointment management for a real internist in Palma. The challenge was stopping two patients from booking the same slot: pessimistic database locking, validated with a real concurrency test. The demo runs on fictional data.",
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
      es: "Web de la farmacia familiar en El Born (Barcelona). El catálogo se genera en Python desde el CSV del programa de gestión de la farmacia, cumpliendo la normativa: sin medicamentos ni precios públicos.",
      en: "Website for the family pharmacy in El Born, Barcelona. The catalog is generated in Python from the pharmacy's own management-software CSV, within the rules: no medications, no public prices.",
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
      es: "Mi primer documento serio en LaTeX: un recorrido por cinco culturas asiáticas, con índice, tablas, fórmulas, referencias cruzadas y bibliografía.",
      en: "My first serious LaTeX document: a tour of five Asian cultures, with table of contents, tables, formulas, cross-references and a bibliography.",
    },
    enlace: "https://www.overleaf.com/read/hyqnjmbrhknh#831915",
    enlaceTexto: { es: "Ver documento", en: "View document" },
    tecnologias: {
      es: ["LaTeX", "Overleaf", "Documentación"],
      en: ["LaTeX", "Overleaf", "Documentation"],
    },
  },
]
