// 👇 Esta es la lista de tus proyectos.
// Para añadir uno nuevo, copia un bloque { ... } y cambia los datos.
// Los textos que cambian de idioma se escriben como { es: "...", en: "..." }.
// El diseño de la tarjeta se genera solo a partir de esta información.
//
// Campos de cada proyecto:
//   titulo        obligatorio. Una cadena, o { es, en } cuando hay que
//                 traducirlo: los nombres propios no se traducen, "Este
//                 portfolio" sí.
//   descripcion   obligatorio, { es, en }
//   enlace        opcional, demo en vivo. Si falta, no se pinta el botón.
//   repo          opcional, código en GitHub. Si falta, no se pinta el botón.
//   decisiones    opcional, el documento donde explicas POR QUÉ está hecho así.
//                 Es el enlace que más dice de ti: el código enseña qué hace la
//                 aplicación y este enseña que las decisiones son tuyas, con sus
//                 alternativas y sus límites, y que las sabes defender.
//   decisionesTexto  opcional, { es, en }. El nombre de ese enlace, cuando el
//                 genérico ("Decisiones técnicas") no es el del documento.
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
//
// Los datos de abajo salen de los README de cada repositorio, repasados el
// 2026-10-21. Cuando cambie el proyecto, la fuente buena es su README.

export const proyectos = [
  {
    titulo: "Web Dr. Agramonte",
    descripcion: {
      es: "Gestión de citas para un internista real en Palma: agenda repartida por centro, reserva sin registro previo y avisos automáticos de confirmación, cancelación y recordatorio por correo, Telegram y SMS. El reto fue impedir que dos pacientes reservaran el mismo hueco: bloqueo pesimista en base de datos, validado con un test de concurrencia real sobre PostgreSQL. 115 pruebas en el backend; la demo va con datos ficticios.",
      en: "Appointment management for a real internist in Palma: scheduling split by clinic, booking without signing up, and automatic confirmation, cancellation and reminder notices by email, Telegram and SMS. The challenge was stopping two patients from booking the same slot: pessimistic database locking, validated with a real concurrency test against PostgreSQL. 115 backend tests; the demo runs on fictional data.",
    },
    imagen: `${import.meta.env.BASE_URL}img/dr-agramonte.png`,
    enlaceTexto: { es: "Ver demo", en: "View demo" },
    // La demo apunta a GitHub Pages, no al dominio propio: www.dragramonte.com
    // está registrado pero hoy no sirve la aplicación (el alojamiento anterior se
    // retiró y el despliegue en VPS está preparado, a la espera de levantar la
    // máquina; lo dice el README del repo, repasado el 2026-10-21). No tiene
    // sentido mandar a nadie a una página de error: cuando el dominio vuelva,
    // basta con cambiar esta línea.
    enlace: "https://maragramonte.github.io/dr-agramonte/",
    repo: "https://github.com/maragramonte/dr-agramonte",
    // Doce decisiones, cada una con la alternativa que descartaste y sus
    // límites. Es lo que distingue un proyecto que has pensado de uno copiado.
    decisiones: "https://github.com/maragramonte/dr-agramonte/blob/main/docs/DECISIONES-TECNICAS.md",
    // Nombres tal y como aparecen en el pom.xml y el compose del repositorio.
    // Los seis primeros son los que se ven sin desplegar la tarjeta, así que
    // van los que más pesan en una oferta de backend.
    tecnologias: {
      es: ["Java 21", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "API REST", "Spring Data JPA", "Flyway", "SQL", "MySQL", "JUnit 5", "Testcontainers", "Postman", "Docker", "Caddy", "GitHub Actions", "Twilio", "Telegram Bot API", "Chart.js", "PWA"],
      en: ["Java 21", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "API REST", "Spring Data JPA", "Flyway", "SQL", "MySQL", "JUnit 5", "Testcontainers", "Postman", "Docker", "Caddy", "GitHub Actions", "Twilio", "Telegram Bot API", "Chart.js", "PWA"],
    },
  },
  {
    titulo: "Farmàcia Agramonte",
    descripcion: {
      es: "Web de la farmacia familiar en El Born (Barcelona): estática, sin dependencias y en tres idiomas (castellano, catalán e inglés). Un script de Python genera las 179 páginas del catálogo desde el CSV del programa de gestión de la farmacia, cumpliendo la normativa: sin medicamentos ni precios públicos. La cesta se guarda en el navegador y el encargo se manda por WhatsApp; aquí no se cobra nada.",
      en: "Website for the family pharmacy in El Born, Barcelona: static, dependency-free and in three languages (Spanish, Catalan and English). A Python script generates the catalog's 179 pages from the pharmacy's own management-software CSV, within the rules: no medications, no public prices. The basket lives in the browser and the order goes out over WhatsApp; nothing is charged here.",
    },
    estado: { es: "En desarrollo", en: "Work in progress" },
    imagen: `${import.meta.env.BASE_URL}img/farmacia-agramonte.png`,
    enlaceTexto: { es: "Ver web", en: "View site" },
    enlace: "https://maragramonte.github.io/Farmacia-Agramonte/",
    repo: "https://github.com/maragramonte/Farmacia-Agramonte",
    // El README del repo razona cada decisión de diseño, y también dice qué
    // falta: un apartado "Qué falta" propio dice más que una web impecable.
    // El ancla va con la eñe tal cual, que es como la escribe GitHub en su
    // propio índice del README (comprobado el 2026-10-21).
    decisiones: "https://github.com/maragramonte/Farmacia-Agramonte#decisiones-de-diseño",
    decisionesTexto: { es: "Decisiones de diseño", en: "Design decisions" },
    // Sin GitHub Actions a propósito: Pages publica la rama main tal cual
    // (.nojekyll), así que cada push republica sin pasar por un workflow.
    tecnologias: {
      es: ["HTML", "CSS", "JavaScript", "Python", "Pillow", "JSON-LD", "SEO hreflang", "GitHub Pages"],
      en: ["HTML", "CSS", "JavaScript", "Python", "Pillow", "JSON-LD", "SEO hreflang", "GitHub Pages"],
    },
  },
  {
    // La web que el visitante tiene delante. Va última a propósito: pesa menos
    // que las dos de arriba, pero es la única que se puede abrir por dentro en
    // el mismo momento en que se lee la tarjeta.
    titulo: { es: "Este portfolio", en: "This portfolio" },
    descripcion: {
      es: "La web que estás viendo. React y Vite sin librerías de interfaz: los dos idiomas salen de un único fichero de textos, los cuatro temas son variables CSS y la sección activa se detecta con IntersectionObserver en vez de escuchando el scroll. Hay un HTML de entrada por idioma porque los bots que generan la previsualización al compartir el enlace no ejecutan JavaScript, y esas tarjetas las dibuja un script de Python. Cada push a main la publica.",
      en: "The site you are looking at. React and Vite with no UI library: both languages come from a single file of texts, the four themes are CSS variables, and the active section is detected with IntersectionObserver instead of by listening to scroll. There is one entry HTML per language because the bots that build link previews do not run JavaScript, and those preview cards are drawn by a Python script. Every push to main publishes it.",
    },
    // Sin enlace de demo: la demo es esta misma página. Y sin captura a
    // propósito, porque una captura de lo que ya se está mirando no añade nada:
    // la tarjeta se queda con la portada de iniciales.
    repo: "https://github.com/maragramonte/mi-portfolio",
    tecnologias: {
      es: ["React", "Vite", "HTML", "CSS", "JavaScript", "Python", "Pillow", "SEO hreflang", "GitHub Actions", "GitHub Pages"],
      en: ["React", "Vite", "HTML", "CSS", "JavaScript", "Python", "Pillow", "SEO hreflang", "GitHub Actions", "GitHub Pages"],
    },
  },
]
