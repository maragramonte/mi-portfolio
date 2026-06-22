import { createContext, useContext } from 'react'

// Idiomas disponibles, en el orden en que rota el botón.
export const IDIOMAS = ['es', 'en']

// Todos los textos de la web, agrupados por idioma y por sección.
// Para añadir un idioma nuevo, copia el bloque "es" y traduce los valores.
export const traducciones = {
  es: {
    nav: {
      sobreMi: 'Sobre mí',
      tecnologias: 'Tecnologías',
      proyectos: 'Proyectos',
      contacto: 'Contacto',
    },
    botonIdioma: '🇬🇧 EN', // muestra el idioma al que se cambiará
    hero: {
      subtitulo: 'Técnica Administrativa | Desarrolladora Full Stack en formación',
    },
    about: {
      titulo: 'Sobre mí',
      parrafos: [
        'Graduada en DAM y con experiencia práctica en testing de APIs, validaciones E2E, bases de datos y desarrollo de software.',
        'Tras varios años de experiencia profesional en administración, turismo y recursos humanos, decidí reorientar mi carrera hacia el sector tecnológico. Hoy combino esa experiencia con conocimientos en Java, Python, SQL, MongoDB, Docker y metodologías ágiles.',
        'En este portfolio comparto los proyectos que reflejan mi evolución como desarrolladora y mi interés por crear software útil, mantenible y de calidad.',
      ],
    },
    tech: {
      titulo: 'Tecnologías',
    },
    projects: {
      titulo: 'Proyectos',
      verProyecto: 'Ver proyecto',
    },
    contact: {
      titulo: 'Contacto',
      intro: '¿Tienes un proyecto en mente o quieres saber más sobre mi trabajo? Estaré encantada de hablar contigo.',
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Teléfono',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        Indeed: 'Indeed',
        Instagram: 'Instagram',
        Discord: 'Discord',
      },
    },
    footer: {
      hecho: 'Hecho con React + Vite',
    },
  },
  en: {
    nav: {
      sobreMi: 'About me',
      tecnologias: 'Technologies',
      proyectos: 'Projects',
      contacto: 'Contact',
    },
    botonIdioma: '🇪🇸 ES',
    hero: {
      subtitulo: 'Administrative Technician | Full Stack Developer in training',
    },
    about: {
      titulo: 'About me',
      parrafos: [
        'DAM graduate with hands-on experience in API testing, E2E validation, databases and software development.',
        'After several years of professional experience in administration, tourism and human resources, I decided to redirect my career towards the tech sector. Today I combine that experience with knowledge of Java, Python, SQL, MongoDB, Docker and agile methodologies.',
        'In this portfolio I share the projects that reflect my growth as a developer and my interest in building useful, maintainable and quality software.',
      ],
    },
    tech: {
      titulo: 'Technologies',
    },
    projects: {
      titulo: 'Projects',
      verProyecto: 'View project',
    },
    contact: {
      titulo: 'Contact',
      intro: 'Do you have a project in mind or want to know more about my work? I would be happy to talk with you.',
      etiquetas: {
        Email: 'Email',
        Teléfono: 'Phone',
        LinkedIn: 'LinkedIn',
        GitHub: 'GitHub',
        Indeed: 'Indeed',
        Instagram: 'Instagram',
        Discord: 'Discord',
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
