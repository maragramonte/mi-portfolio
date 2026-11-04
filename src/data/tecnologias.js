import { proyectos } from './proyectos.js'

// Lista de tecnologías, agrupadas por bloque. Edita estos arrays para añadir o quitar.
// El orden de los grupos es deliberado: primero lo que se busca en una oferta
// de backend, y las herramientas de apoyo al final.
//
// Vive aquí y no dentro del componente porque ya no es solo una lista que pintar:
// se cruza con las tecnologías de cada proyecto para saber cuáles tienen código
// detrás. Esa relación es dato, no presentación.
export const grupos = [
  { titulo: { es: "Lenguajes", en: "Languages" }, items: ["Java", "Kotlin", "Python", "SQL", "JavaScript"] },
  { titulo: { es: "Backend", en: "Backend" }, items: ["Spring Boot", "Spring Security", "Spring Data JPA", "API REST", "JWT", "Flyway", "Bucket4j", "Twilio", "Telegram Bot API"] },
  { titulo: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { titulo: { es: "Testing", en: "Testing" }, items: ["JUnit 5", "Testcontainers", "Postman", "E2E"] },
  { titulo: { es: "DevOps", en: "DevOps" }, items: ["Docker", "Git", "GitHub", "GitHub Actions", "GitHub Pages", "Caddy", "Render", "WSL"] },
  { titulo: { es: "Web", en: "Web" }, items: ["HTML", "CSS", "React", "Vite", "XML", "JSON-LD", "SEO hreflang", "Chart.js", "PWA"] },
  { titulo: { es: "Aplicaciones", en: "Applications" }, items: ["Android", "Swing", "Navigation Component", "Material Design"] },
  { titulo: { es: "Concurrencia y redes", en: "Concurrency & networking" }, items: ["Hilos", "Semáforos", "Sockets", "Serialización", "Sincronización"] },
  { titulo: { es: "Metodología y herramientas", en: "Methodology & tools" }, items: ["SAFe", "Scrum", "Jira", "Confluence", "DBeaver", "Pillow"] },
]

// Las pocas tecnologías cuyo nombre no es un nombre propio y sí se traduce.
// El resto se escribe igual en los dos idiomas ("Spring Boot", "Docker"), así
// que no hace falta listarlas. La clave es siempre el nombre español, que es
// el canónico en todo este fichero.
const enIngles = {
  "Hilos": "Threads",
  "Semáforos": "Semaphores",
  "Serialización": "Serialization",
  "Sincronización": "Synchronization",
}

// Cómo se escribe un chip en el idioma que se está viendo.
export const nombreDe = (tech, idioma) => (idioma === "en" ? enIngles[tech] ?? tech : tech)

// Un proyecto puede nombrar una tecnología con más detalle del que cabe en un
// chip: la ficha de Dr. Agramonte dice "Java 21" porque la versión importa ahí,
// pero el chip dice "Java". Esta tabla traduce de lo específico a lo genérico.
// Si crece mucho, la señal es que conviene unificar los nombres en origen.
//
// Las etiquetas de una tarjeta vienen en el idioma de su ficha, así que los
// nombres ingleses también tienen que saber volver a su chip: sin eso, en
// inglés el filtro no encuentra la etiqueta que lo ha provocado y la tarjeta
// se queda sin explicar por qué sigue en pantalla.
const equivalencias = {
  "Java 21": "Java",
  ...Object.fromEntries(Object.entries(enIngles).map(([es, en]) => [en, es])),
}

// A qué chip corresponde el nombre que usa un proyecto.
export const chipDe = (tech) => equivalencias[tech] ?? tech

// El cruce usa siempre el array español de la ficha como canónico: la mayoría
// de nombres son propios y coinciden en los dos idiomas, y los cuatro que no
// (ver enIngles) vuelven a su chip a través de equivalencias.
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
