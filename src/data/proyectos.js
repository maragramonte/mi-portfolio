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
    estado: { es: "En desarrollo", en: "Work in progress" },
    descripcion: {
      es: "Aplicación de citas para un internista en Palma, con agendas por centro, reservas sin registro y avisos por correo, Telegram y SMS. La demo usa datos ficticios.",
      en: "Appointment app for an internist in Palma, with schedules by clinic, booking without an account, and email, Telegram and SMS notifications. The demo uses fictional data.",
    },
    focoTecnico: {
      es: "Reservas simultáneas resueltas con bloqueo pesimista en PostgreSQL y un test de concurrencia real. Backend cubierto por 115 pruebas.",
      en: "Concurrent bookings handled with pessimistic locking in PostgreSQL and a real concurrency test. Backend covered by 115 tests.",
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
      es: "Web multilingüe para una farmacia familiar de Barcelona. El catálogo se genera desde el CSV del programa de gestión y los encargos se envían por WhatsApp; no se cobra en la web.",
      en: "Multilingual website for a family pharmacy in Barcelona. The catalog is generated from the management software's CSV, and orders are sent over WhatsApp; the site does not take payment.",
    },
    focoTecnico: {
      es: "Un script de Python genera 179 páginas estáticas en tres idiomas, sin publicar medicamentos ni precios.",
      en: "A Python script generates 179 static pages in three languages, without publishing medicines or prices.",
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
    titulo: "Task Manager",
    descripcion: {
      es: "Aplicación Android para gestionar tareas por usuario, con registro, inicio de sesión y sesión persistente.",
      en: "Android task management app with per-user tasks, sign-up, login and persistent sessions.",
    },
    focoTecnico: {
      es: "CRUD privado por usuario sobre SQLite, prioridades y navegación entre pantallas.",
      en: "Per-user CRUD over SQLite, task priorities and screen navigation.",
    },
    // Captura de la lista de tareas; se entiende mejor el CRUD que en Inicio.
    imagen: `${import.meta.env.BASE_URL}img/task-manager.png`,
    repo: "https://github.com/maragramonte/CESUR-github/tree/main/Dispositivos%20Moviles%20-%20TaskManager",
    tecnologias: {
      es: ["Kotlin", "Android", "SQLite", "Navigation Component", "Material Design"],
      en: ["Kotlin", "Android", "SQLite", "Navigation Component", "Material Design"],
    },
  },
  {
    titulo: "The WC Sequence",
    descripcion: {
      es: "Simulación visual en Java donde personas ejecutadas en hilos usan baños y pueden viajar entre dos ventanas conectadas.",
      en: "Java visual simulation where people running in threads use public bathrooms and can travel between two connected windows.",
    },
    focoTecnico: {
      es: "Sincronización con semáforos y envío de objetos serializados entre ventanas mediante sockets.",
      en: "Semaphore-based synchronization and serialized objects sent between windows over sockets.",
    },
    imagen: `${import.meta.env.BASE_URL}img/wc-sequence.png`,
    repo: "https://github.com/maragramonte/CESUR-github/tree/main/The%20WC%20Sequence",
    tecnologias: {
      es: ["Java", "Swing", "Hilos", "Semáforos", "Sockets", "Serialización"],
      en: ["Java", "Swing", "Threads", "Semaphores", "Sockets", "Serialization"],
    },
  },
  {
    titulo: { es: "Cena de los Filósofos", en: "Dining Philosophers" },
    descripcion: {
      es: "Simulación con interfaz Swing del problema clásico de concurrencia: seis filósofos comparten seis palillos.",
      en: "Swing simulation of the classic concurrency problem: six philosophers share six chopsticks.",
    },
    focoTecnico: {
      es: "La mesa coordina turnos y recursos con wait/notifyAll y un semáforo para evitar interbloqueos.",
      en: "The table coordinates turns and resources with wait/notifyAll and a semaphore to prevent deadlocks.",
    },
    repo: "https://github.com/maragramonte/CESUR-github/tree/main/hungry-philosophers",
    // Ilustración conceptual: el repositorio no incluye una captura de la app.
    imagen: `${import.meta.env.BASE_URL}img/dining-philosophers.svg`,
    imagenAlt: {
      es: "Ilustración de seis filósofos compartiendo seis palillos alrededor de una mesa.",
      en: "Illustration of six philosophers sharing six chopsticks around a table.",
    },
    tecnologias: {
      es: ["Java", "Swing", "Hilos", "Semáforos", "Sincronización"],
      en: ["Java", "Swing", "Threads", "Semaphores", "Synchronization"],
    },
  },
  {
    // La web que el visitante tiene delante. Va última a propósito: pesa menos
    // que las dos de arriba, pero es la única que se puede abrir por dentro en
    // el mismo momento en que se lee la tarjeta.
    titulo: { es: "Este portfolio", en: "This portfolio" },
    descripcion: {
      es: "Este portfolio, construido con React y Vite sin librerías de interfaz. Centraliza los textos de ambos idiomas y usa variables CSS para los temas de día y noche.",
      en: "This portfolio, built with React and Vite without a UI library. Text for both languages lives in one file, and CSS variables power its day and night themes.",
    },
    focoTecnico: {
      es: "IntersectionObserver controla la navegación; cada idioma tiene su propio HTML para que funcionen las previsualizaciones al compartir.",
      en: "IntersectionObserver drives navigation; each language has its own HTML entry so shared link previews work without JavaScript.",
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
