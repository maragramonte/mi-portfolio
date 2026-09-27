import { createContext, useContext } from 'react'

// Idiomas disponibles, en el orden en que rota el botón.
export const IDIOMAS = ['es', 'en']

// Todos los textos de la web, agrupados por idioma y por sección.
// Para añadir un idioma nuevo, copia el bloque "es" y traduce los valores.
export const traducciones = {
  es: {
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
    hero: {
      rol: 'Desarrolladora Backend Junior · Graduada en DAM',
      stack: 'Java · Spring Boot · PostgreSQL · Docker',
      disponibilidad: 'Palma de Mallorca · Disponible para incorporación inmediata (presencial o remoto)',
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
      ],
    },
    experience: {
      titulo: 'Experiencia',
      intro: 'Prácticas y primeros pasos profesionales en desarrollo y QA.',
    },
    tech: {
      titulo: 'Tecnologías',
    },
    projects: {
      titulo: 'Proyectos',
      verProyecto: 'Ver proyecto',
      verCodigo: 'Ver código',
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
    hero: {
      rol: 'Junior Backend Developer · Software Development graduate (DAM)',
      stack: 'Java · Spring Boot · PostgreSQL · Docker',
      disponibilidad: 'Palma de Mallorca, Spain · Available to start immediately (on-site or remote)',
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
      ],
    },
    experience: {
      titulo: 'Experience',
      intro: 'Internships and first professional steps in development and QA.',
    },
    tech: {
      titulo: 'Technologies',
    },
    projects: {
      titulo: 'Projects',
      verProyecto: 'View project',
      verCodigo: 'View code',
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
