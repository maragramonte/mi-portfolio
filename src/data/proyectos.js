// 👇 Esta es la lista de tus proyectos.
// Para añadir uno nuevo, copia un bloque { ... } y cambia los datos.
// Los textos que cambian de idioma se escriben como { es: "...", en: "..." }.
// El diseño de la tarjeta se genera solo a partir de esta información.

export const proyectos = [
  {
    titulo: "Web Dr. Agramonte",
    descripcion: {
      es: "Sitio web para un especialista en Medicina Interna en Palma de Mallorca: presentación del doctor, servicios, testimonios, reserva de citas, telemedicina y soporte multiidioma (ES/CA).",
      en: "Website for an Internal Medicine specialist in Palma de Mallorca: doctor introduction, services, testimonials, appointment booking, telemedicine and multilingual support (ES/CA).",
    },
    enlace: "https://www.dragramonte.com/",
    imagen: "https://placehold.co/400x300/181b22/6c8cff?text=Dr.+Agramonte",
    tecnologias: {
      es: ["Web", "Multiidioma", "Reserva de citas"],
      en: ["Web", "Multilingual", "Appointment booking"],
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
    imagen: "https://placehold.co/400x300/181b22/6c8cff?text=LaTeX",
    tecnologias: {
      es: ["LaTeX", "Overleaf", "Documentación"],
      en: ["LaTeX", "Overleaf", "Documentation"],
    },
  },
]
