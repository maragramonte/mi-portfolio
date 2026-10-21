import { proyectos } from './proyectos.js'

// Lista de tecnologías, agrupadas por bloque. Edita estos arrays para añadir o quitar.
// El orden de los grupos es deliberado: primero lo que se busca en una oferta
// de backend, y las herramientas de apoyo al final.
//
// Vive aquí y no dentro del componente porque ya no es solo una lista que pintar:
// se cruza con las tecnologías de cada proyecto para saber cuáles tienen código
// detrás. Esa relación es dato, no presentación.
export const grupos = [
  { titulo: { es: "Lenguajes", en: "Languages" }, items: ["Java", "Python", "SQL", "JavaScript"] },
  { titulo: { es: "Backend", en: "Backend" }, items: ["Spring Boot", "Spring Security", "Spring Data JPA", "API REST", "JWT", "Flyway", "Twilio", "Telegram Bot API"] },
  { titulo: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { titulo: { es: "Testing", en: "Testing" }, items: ["JUnit 5", "Testcontainers", "Postman", "E2E"] },
  { titulo: { es: "DevOps", en: "DevOps" }, items: ["Docker", "Git", "GitHub", "GitHub Actions", "GitHub Pages", "Caddy", "WSL"] },
  { titulo: { es: "Web", en: "Web" }, items: ["HTML", "CSS", "React", "Vite", "XML", "JSON-LD", "SEO hreflang", "Chart.js", "PWA"] },
  { titulo: { es: "Metodología y herramientas", en: "Methodology & tools" }, items: ["SAFe", "Scrum", "Jira", "Confluence", "DBeaver", "Pillow"] },
]

// Un proyecto puede nombrar una tecnología con más detalle del que cabe en un
// chip: la ficha de Dr. Agramonte dice "Java 21" porque la versión importa ahí,
// pero el chip dice "Java". Esta tabla traduce de lo específico a lo genérico.
// Si crece mucho, la señal es que conviene unificar los nombres en origen.
const equivalencias = {
  "Java 21": "Java",
}

// A qué chip corresponde el nombre que usa un proyecto.
export const chipDe = (tech) => equivalencias[tech] ?? tech

// Las tecnologías de un proyecto son las mismas en los dos idiomas (son nombres
// propios), así que el cruce usa siempre el array español como canónico.
const tecnologiasDe = (proyecto) => proyecto.tecnologias?.es ?? []

// Cuántos proyectos respaldan cada tecnología. Se calcula una vez al cargar.
export const proyectosPorTecnologia = proyectos.reduce((indice, proyecto) => {
  for (const tech of tecnologiasDe(proyecto)) {
    const clave = chipDe(tech)
    indice[clave] = (indice[clave] ?? 0) + 1
  }
  return indice
}, {})

// ¿Este proyecto usa esta tecnología? Lo pregunta la sección de proyectos al filtrar.
export function usaTecnologia(proyecto, tech) {
  return tecnologiasDe(proyecto).some((propia) => chipDe(propia) === tech)
}
