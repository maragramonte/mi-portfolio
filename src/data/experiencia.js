// Experiencia profesional relevante para desarrollo y QA.
//
// Se listan solo los puestos técnicos: es lo que busca quien viene a contratarte.
// La trayectoria previa en administración, turismo y recursos humanos se cuenta
// en "Sobre mí", que es donde aporta contexto sin restar foco.
//
// Campos de cada puesto:
//   puesto        obligatorio, { es, en }
//   empresa       obligatorio
//   periodo       obligatorio, { es, en }
//   lugar         obligatorio, { es, en }
//   logros        obligatorio, { es: [...], en: [...] }
//   tecnologias   opcional, lista de etiquetas (no se traducen)

export const experiencia = [
  {
    puesto: {
      es: 'Prácticas IT — Desarrollo y QA Testing',
      en: 'IT Internship — Development & QA Testing',
    },
    empresa: 'Marlink Group (OmniAccess)',
    periodo: {
      es: 'Enero 2026 – Marzo 2026 · 400 horas',
      en: 'January 2026 – March 2026 · 400 hours',
    },
    lugar: {
      es: 'Palma de Mallorca (Parc Bit) · Presencial',
      en: 'Palma de Mallorca (Parc Bit) · On-site',
    },
    logros: {
      es: [
        'Pruebas funcionales sobre la API de Ucopia: diseño de casos, reproducción de fallos y reportes técnicos en Jira.',
        'Validaciones end-to-end en entornos simulados y de producción.',
        'Scripts en Python para automatizar consultas a bases de datos SQL y MongoDB desde contenedores Docker sobre WSL.',
        'Participación en Daily, Sprint Planning y PI Planning, con documentación técnica en Confluence.',
      ],
      en: [
        'Functional testing of the Ucopia API: test case design, bug reproduction and technical reports in Jira.',
        'End-to-end validation in both simulated and production environments.',
        'Python scripts to automate SQL and MongoDB queries from Docker containers on WSL.',
        'Took part in Daily, Sprint Planning and PI Planning, with technical documentation in Confluence.',
      ],
    },
    tecnologias: ['Python', 'SQL', 'MongoDB', 'Docker', 'WSL', 'Jira', 'Confluence', 'SAFe'],
  },
  {
    puesto: {
      es: 'Prácticas — Consultoría Tecnológica',
      en: 'Internship — Technology Consulting',
    },
    empresa: 'GladToLink',
    periodo: {
      es: 'Febrero 2025 · 100 horas',
      en: 'February 2025 · 100 hours',
    },
    lugar: {
      es: 'Palma de Mallorca · Presencial',
      en: 'Palma de Mallorca · On-site',
    },
    logros: {
      es: [
        'Creación de formularios y maquetación en XML dentro de procesos de digitalización de clientes.',
        'Java aplicado a la creación de botones e interacciones.',
        'Herramientas Adobe para la gestión documental de formularios.',
      ],
      en: [
        'Built forms and XML markup as part of client digitization processes.',
        'Java applied to buttons and interactions.',
        'Adobe tools for form document management.',
      ],
    },
    tecnologias: ['XML', 'Java', 'Adobe'],
  },
]
