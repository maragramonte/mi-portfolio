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
      titulo: 'Mar Agramonte | Desarrolladora Backend y QA Automation · Java y Python',
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
      rol: 'Desarrolladora backend y QA Automation',
      stack: 'Construyo servicios con Java y Spring Boot, y automatizo pruebas con Python.',
      disponibilidad: 'Palma de Mallorca · Presencial o híbrido, remoto o reubicación · Incorporación inmediata',
      verProyectos: 'Ver proyectos',
      contactar: 'Contactar',
      descargarCV: 'Descargar CV',
      descargarCVATS: 'Versión ATS',
    },
    about: {
      titulo: 'Sobre mí',
      parrafos: [
        'Soy graduada en DAM. Mi proyecto de fin de ciclo no se quedó en el aula: es una aplicación de gestión de citas para la consulta de un internista en Palma, con backend en Java 21 y Spring Boot 3.5 sobre PostgreSQL, autenticación JWT y migraciones versionadas con Flyway.',
        'Lo que más me enseñó fue impedir que dos pacientes reservaran el mismo hueco. Lo resolví con un bloqueo pesimista en la base de datos y lo comprobé con un test de concurrencia real. Antes hice 400 horas de prácticas en Marlink Group, donde probé APIs, hice validaciones E2E y automaticé pruebas con Python en un entorno SAFe.',
        'Vengo de la administración, el turismo y los recursos humanos, y de esa etapa traigo el orden y el trato con las personas. En mi tiempo libre fotografío el cielo de noche, y la luna y las estrellas del tema de noche de esta web son fotos mías.',
        'Utilizo la IA como una herramienta más y contrasto lo que me propone con la documentación y las pruebas antes de darlo por bueno. Dejo mis decisiones técnicas por escrito y razonadas, y cada proyecto enlaza las suyas para que se puedan revisar.',
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
      capturaDe: 'Captura del proyecto',
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
      intro: 'Busco puesto como desarrolladora backend o en QA Automation, en Palma (presencial o híbrido), en remoto o con reubicación. Escríbeme por correo o por LinkedIn y te respondo.',
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Teléfono',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        CV: 'CV',
        'CV ATS': 'CV ATS',
      },
    },
    footer: {
      hecho: 'Hecho con React + Vite',
    },
  },
  en: {
    meta: {
      titulo: 'Mar Agramonte | Backend Developer & QA Automation · Java and Python',
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
      rol: 'Backend & QA Automation Developer',
      stack: 'I build services with Java and Spring Boot, and automate tests with Python.',
      disponibilidad: 'Palma de Mallorca, Spain · On-site or hybrid, remote or relocation · Available now',
      verProyectos: 'View projects',
      contactar: 'Get in touch',
      descargarCV: 'Download CV',
      descargarCVATS: 'ATS version',
    },
    about: {
      titulo: 'About me',
      parrafos: [
        "I'm a DAM graduate. My final-year project didn't stay in the classroom: it's an appointment management app for an internist's practice in Palma, with a backend in Java 21 and Spring Boot 3.5 on PostgreSQL, JWT authentication and versioned Flyway migrations.",
        'What taught me the most was preventing two patients from booking the same slot. I solved it with pessimistic locking in the database and verified it with a real concurrency test. Before that, I completed a 400-hour internship at Marlink Group, testing APIs, running E2E validations and automating tests with Python in a SAFe environment.',
        'I come from administration, tourism and human resources, and from that stage I bring organisation and a good way with people. In my free time I photograph the night sky, and the moon and the stars in this site\'s night theme are my own photos.',
        'I use AI as one more tool, and I check what it suggests against the documentation and the tests before relying on it. I write down and justify my technical decisions, and each project links to its own so they can be reviewed.',
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
      capturaDe: 'Screenshot of',
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
      intro: "I'm looking for a backend or QA Automation role, in Palma (on-site or hybrid), remote or with relocation. Drop me an email or a message on LinkedIn and I'll get back to you.",
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Phone',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        CV: 'CV',
        'CV ATS': 'CV ATS',
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
