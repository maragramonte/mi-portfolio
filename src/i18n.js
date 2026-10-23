import { createContext, useContext } from 'react'

// Idiomas disponibles, en el orden en que rota el botón.
export const IDIOMAS = ['es', 'en']

// Todos los textos de la web, agrupados por idioma y por sección.
// Para añadir un idioma nuevo, copia el bloque "es" y traduce los valores.
export const traducciones = {
  es: {
    // Título de la pestaña y descripción para buscadores. Duplican los valores
    // que index.html trae de serie (el idioma por defecto) porque esos son
    // estáticos: App.jsx los reescribe al cambiar de idioma.
    meta: {
      titulo: 'Mar Agramonte | Desarrolladora Backend · Java, Python y SQL',
      descripcion:
        'Portfolio de Mar Agramonte, desarrolladora Backend graduada en DAM. Java, Python, SQL y Docker. Palma de Mallorca, disponible para incorporación inmediata.',
    },
    nav: {
      principal: 'Navegación principal',
      progreso: 'Progreso de lectura',
      abrirMenu: 'Abrir menú',
      cerrarMenu: 'Cerrar menú',
      sobreMi: 'Sobre mí',
      experiencia: 'Experiencia',
      tecnologias: 'Tecnologías',
      proyectos: 'Proyectos',
      contacto: 'Contacto',
    },
    tema: {
      etiqueta: 'Tema',
      dia: 'Día',
      noche: 'Noche',
    },
    hero: {
      rol: 'Desarrolladora Backend · Graduada en DAM',
      stack: 'Java · Spring Boot · PostgreSQL · Docker',
      // Misma fórmula que en LinkedIn, a propósito: si un recruiter compara el
      // perfil con el portfolio, no debe encontrar dos disponibilidades.
      disponibilidad: 'Palma de Mallorca · Disponible para incorporación inmediata (remoto o híbrido, abierta a reubicación)',
      verProyectos: 'Ver proyectos',
      contactar: 'Contactar',
      descargarCV: 'Descargar CV',
    },
    about: {
      titulo: 'Sobre mí',
      parrafos: [
        'Graduada en DAM. Mi proyecto de fin de ciclo no se quedó en el aula: es una aplicación de gestión de citas para un internista real en Palma, con backend en Java 21 y Spring Boot 3.5 sobre PostgreSQL, autenticación JWT y migraciones versionadas en Flyway.',
        'El detalle que más me enseñó fue impedir que dos pacientes reservaran el mismo hueco, resuelto con bloqueo pesimista en base de datos y validado con un test de concurrencia real. Antes de eso, 400 horas de prácticas en Marlink Group haciendo testing de APIs, validaciones E2E y automatización con Python en un entorno SAFe.',
        'Vengo de administración, turismo y recursos humanos, y esa base me dio pensamiento estructurado y atención al detalle. En este portfolio comparto los proyectos que reflejan mi evolución como desarrolladora y mi interés por crear software útil, mantenible y de calidad.',
        // Lo dice ella misma antes de que nadie lo pregunte, y con la misma
        // fórmula que el README de Dr. Agramonte. Decirlo con los documentos
        // delante —cada decisión escrita, con su alternativa y sus límites—
        // convierte una sospecha habitual en un punto a favor.
        'Uso la IA como herramienta de trabajo, no como atajo: me ayuda a aprender más rápido y a desatascarme, y lo que me devuelve lo compruebo contra la documentación y las pruebas antes de darlo por bueno. Las decisiones técnicas de mis proyectos están escritas y razonadas una a una, con sus alternativas y sus límites, y las sé defender en una entrevista: cada tarjeta de abajo enlaza las suyas.',
      ],
    },
    experience: {
      titulo: 'Experiencia',
      intro: 'Prácticas y primeros pasos profesionales en desarrollo y QA.',
    },
    tech: {
      titulo: 'Tecnologías',
      pista: 'Las marcadas tienen un proyecto detrás. Pulsa una para verlo.',
    },
    projects: {
      titulo: 'Proyectos',
      intro: 'Aplicaciones reales, automatización y decisiones técnicas documentadas. Cada proyecto incluye una demo o su código, y explica el reto que resolvió.',
      focoTecnico: 'Reto técnico',
      verProyecto: 'Ver proyecto',
      verCodigo: 'Ver código',
      // Nombre por defecto del tercer enlace de la tarjeta. Un proyecto puede
      // cambiarlo con decisionesTexto si su documento se llama de otra forma.
      verDecisiones: 'Decisiones técnicas',
      filtradoPor: 'Proyectos con',
      quitarFiltro: 'Ver todos',
      masEtiquetas: 'Ver {n} más',
      verMenos: 'Ver menos',
    },
    contact: {
      titulo: 'Contacto',
      intro: '¿Tienes un proyecto en mente o quieres saber más sobre mi trabajo? Estaré encantada de hablar contigo.',
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Teléfono',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        CV: 'CV',
      },
    },
    footer: {
      hecho: 'Hecho con React + Vite',
    },
  },
  en: {
    meta: {
      titulo: 'Mar Agramonte | Backend Developer · Java, Python & SQL',
      descripcion:
        'Portfolio of Mar Agramonte, Backend Developer and Software Development graduate (DAM). Java, Python, SQL and Docker. Palma de Mallorca, Spain, available to start immediately.',
    },
    nav: {
      principal: 'Main navigation',
      progreso: 'Reading progress',
      abrirMenu: 'Open menu',
      cerrarMenu: 'Close menu',
      sobreMi: 'About me',
      experiencia: 'Experience',
      tecnologias: 'Technologies',
      proyectos: 'Projects',
      contacto: 'Contact',
    },
    tema: {
      etiqueta: 'Theme',
      dia: 'Day',
      noche: 'Night',
    },
    hero: {
      rol: 'Backend Developer · Software Development graduate (DAM)',
      stack: 'Java · Spring Boot · PostgreSQL · Docker',
      disponibilidad: 'Palma de Mallorca, Spain · Available to start immediately (remote or hybrid, open to relocation)',
      verProyectos: 'View projects',
      contactar: 'Get in touch',
      descargarCV: 'Download CV',
    },
    about: {
      titulo: 'About me',
      parrafos: [
        "DAM graduate. My final-year project didn't stay in the classroom: it's an appointment management app for a real internist in Palma, with a backend in Java 21 and Spring Boot 3.5 on PostgreSQL, JWT authentication and versioned Flyway migrations.",
        'The detail that taught me the most was preventing two patients from booking the same slot, solved with pessimistic database locking and validated with a real concurrency test. Before that, 400 hours interning at Marlink Group doing API testing, E2E validation and Python automation in a SAFe environment.',
        'I come from administration, tourism and HR, and that background gave me structured thinking and attention to detail. In this portfolio I share the projects that reflect my growth as a developer and my interest in building useful, maintainable and quality software.',
        'I use AI as a working tool, not as a shortcut: it helps me learn faster and get unstuck, and whatever it hands me I check against the documentation and the tests before I trust it. The technical decisions in my projects are written down and reasoned one by one, with their alternatives and their limits, and I can defend them in an interview: every card below links to its own.',
      ],
    },
    experience: {
      titulo: 'Experience',
      intro: 'Internships and first professional steps in development and QA.',
    },
    tech: {
      titulo: 'Technologies',
      pista: 'The marked ones have a project behind them. Tap one to see it.',
    },
    projects: {
      titulo: 'Projects',
      intro: 'Real world applications, automation and documented technical decisions. Each project links to a demo or its source code and explains the problem it solves.',
      focoTecnico: 'Technical highlight',
      verProyecto: 'View project',
      verCodigo: 'View code',
      verDecisiones: 'Technical decisions',
      filtradoPor: 'Projects using',
      quitarFiltro: 'Show all',
      masEtiquetas: 'Show {n} more',
      verMenos: 'Show less',
    },
    contact: {
      titulo: 'Contact',
      intro: 'Do you have a project in mind or want to know more about my work? I would be happy to talk with you.',
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Phone',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        CV: 'CV',
      },
    },
    footer: {
      hecho: 'Made with React + Vite',
    },
  },
}

// Contexto que comparte el idioma activo y los textos con toda la app,
// para no tener que pasarlos por props componente a componente.
export const IdiomaContext = createContext({
  idioma: 'es',
  t: traducciones.es,
  cambiarIdioma: () => {},
})

// Atajo para leer el contexto desde cualquier componente: const { t } = useIdioma()
export function useIdioma() {
  return useContext(IdiomaContext)
}
