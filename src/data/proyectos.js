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
// 2026-11-06. Cuando cambie el proyecto, la fuente buena es su README.

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
    // La demo apunta a GitHub Pages porque es la única versión pública: el README
    // del repo (repasado el 2026-11-06) dice que no hay dominio propio y que el
    // despliegue en VPS está preparado a la espera de levantar la máquina. Cuando
    // haya dominio, basta con cambiar esta línea.
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
    // Segunda a propósito: es el otro proyecto de backend en Java, y el único
    // que se puede probar en vivo contra la API desde la propia demo.
    titulo: "Photo Palette",
    estado: { es: "En desarrollo", en: "Work in progress" },
    descripcion: {
      es: "API que convierte una foto en una paleta de color lista para una web: HEX, RGB, porcentaje y un bloque :root para copiar. La foto se analiza en memoria y no se guarda.",
      en: "API that turns a photo into a web-ready color palette: HEX, RGB, share of the image and a copy-ready :root block. Photos are analyzed in memory and never stored.",
    },
    focoTecnico: {
      es: "K-means escrito a mano con semilla fija y un modo «vivos» que ordena por saturación. Límites por IP y por análisis simultáneo, 98 pruebas y un 97 % de cobertura de líneas.",
      en: "Hand-written k-means with a fixed seed and a «vivos» mode that ranks colors by saturation. Per-IP and concurrent-analysis limits, 98 tests and 97% line coverage.",
    },
    imagen: `${import.meta.env.BASE_URL}img/photo-palette.jpg`,
    imagenAlt: {
      es: "Portada de Photo Palette: el titular a la izquierda y la caja para subir una foto a la derecha, sobre fondo azul noche.",
      en: "Photo Palette home page: the headline on the left and the photo upload box on the right, on a dark blue background.",
    },
    enlaceTexto: { es: "Ver demo", en: "View demo" },
    // La API está en el plan gratis de Render y se duerme a los 15 minutos:
    // la primera subida tarda unos 30 s. La web lo avisa sola y el feed no
    // depende de la API, así que la demo nunca se ve rota.
    enlace: "https://maragramonte.github.io/photo-palette/",
    repo: "https://github.com/maragramonte/photo-palette",
    // La decisión que define el proyecto está en «Por qué lo hice»: la paleta
    // fiel no es la paleta útil, y por eso existen los dos modos. Antes la
    // sección se llamaba «El problema» (ancla comprobada el 2026-11-06).
    decisiones: "https://github.com/maragramonte/photo-palette#por-qué-lo-hice",
    decisionesTexto: { es: "Decisión de producto", en: "Product decision" },
    // Nombres tal y como aparecen en el pom.xml, el Dockerfile y los workflows. Sin Caddy:
    // solo entra con el VPS, y hoy la API corre en Render sin él.
    tecnologias: {
      es: ["Java 21", "Spring Boot", "API REST", "Bucket4j", "JUnit 5", "JaCoCo", "Docker", "JavaScript", "HTML", "CSS", "Render", "GitHub Actions", "GitHub Pages"],
      en: ["Java 21", "Spring Boot", "API REST", "Bucket4j", "JUnit 5", "JaCoCo", "Docker", "JavaScript", "HTML", "CSS", "Render", "GitHub Actions", "GitHub Pages"],
    },
  },
  {
    // «Farmacia» en castellano e inglés y «Farmàcia» en catalán, como en la propia
    // web desde su PR #17. Este portfolio solo tiene castellano e inglés.
    titulo: "Farmacia Agramonte",
    descripcion: {
      es: "Web en tres idiomas para una farmacia de barrio en El Born, Barcelona. Enseña lo que hay en el mostrador, deja apuntar un encargo en una cesta y lo manda por WhatsApp; en la web no se cobra.",
      en: "Three-language website for a neighborhood pharmacy in El Born, Barcelona. It shows what's on the counter, lets you build an order in a basket and sends it over WhatsApp; the site takes no payment.",
    },
    focoTecnico: {
      es: "Un script de Python genera 143 de sus 154 páginas estáticas desde el CSV del programa de gestión, sin publicar medicamentos ni precios. Los tests de pytest vigilan el catálogo y los enlaces.",
      en: "A Python script generates 143 of its 154 static pages from the management software's CSV, without publishing medicines or prices. pytest tests guard the catalog and the links.",
    },
    estado: { es: "En desarrollo", en: "Work in progress" },
    imagen: `${import.meta.env.BASE_URL}img/farmacia-agramonte.png`,
    imagenAlt: {
      es: "Portada de Farmacia Agramonte: cabecera con la cesta y el botón de pedir, una silueta de tejados y el lema «Consejo de siempre, de tu barrio» sobre fondo verde.",
      en: "Farmacia Agramonte home page: header with the basket and order button, a rooftop silhouette and the tagline «Consejo de siempre, de tu barrio» on a green background.",
    },
    enlaceTexto: { es: "Ver web", en: "View site" },
    enlace: "https://maragramonte.github.io/Farmacia-Agramonte/",
    repo: "https://github.com/maragramonte/Farmacia-Agramonte",
    // El README del repo razona cada decisión y también dice qué falta, en «El
    // estado real». La sección se llamaba «Decisiones de diseño» hasta que el
    // README se reorganizó; el ancla lleva la tilde tal cual, como la escribe
    // GitHub (comprobado el 2026-11-06).
    decisiones: "https://github.com/maragramonte/Farmacia-Agramonte#decisiones-técnicas",
    // Sin GitHub Actions a propósito: Pages publica la rama main tal cual
    // (.nojekyll), así que cada push republica sin pasar por un workflow.
    tecnologias: {
      es: ["HTML", "CSS", "JavaScript", "Python", "pytest", "Pillow", "JSON-LD", "SEO hreflang", "GitHub Pages"],
      en: ["HTML", "CSS", "JavaScript", "Python", "pytest", "Pillow", "JSON-LD", "SEO hreflang", "GitHub Pages"],
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
    repo: "https://github.com/maragramonte/proyectos-dam/tree/main/task-manager",
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
    repo: "https://github.com/maragramonte/proyectos-dam/tree/main/wc-sequence",
    tecnologias: {
      es: ["Java", "Swing", "Hilos", "Semáforos", "Sockets", "Serialización"],
      en: ["Java", "Swing", "Threads", "Semaphores", "Sockets", "Serialization"],
    },
  },
  {
    // Segunda solución del mismo enunciado, justo detrás de la primera para que
    // se lean juntas. Pesa más que ella: tiene un fallo de reparto medido,
    // corregido y vuelto a medir, y eso es lo que cuenta el foco técnico.
    titulo: { es: "The WC Sequence: turnos por género", en: "The WC Sequence: gender turns" },
    descripcion: {
      es: "Segunda solución de The WC Sequence: baños de mujeres y de hombres, con turnos alternos por grupos y las dos ventanas conectadas por red.",
      en: "Second solution to The WC Sequence: separate women's and men's bathrooms, alternating turns by group, and two windows connected over the network.",
    },
    focoTecnico: {
      es: "El turno cambia al servir a cada grupo, no al vaciarse los baños, para que un género no acapare. Prueba de estrés con 40 hilos y unas 460 entradas.",
      en: "The turn changes once each group is served, not when the bathrooms empty, so neither gender hogs them. Stress-tested with 40 threads and about 460 entries.",
    },
    // Recorte de la captura del servidor que trae el README del repositorio.
    imagen: `${import.meta.env.BASE_URL}img/wc-sequence-turnos.png`,
    imagenAlt: {
      es: "Ventana de la simulación: cuatro baños de mujeres arriba, cuatro de hombres abajo y el panel con el turno actual.",
      en: "Simulation window: four women's bathrooms on top, four men's below, and the panel showing whose turn it is.",
    },
    repo: "https://github.com/maragramonte/proyectos-dam/tree/main/wc-sequence-turnos-genero",
    // El apartado del README que explica por qué el turno cambia por grupos y
    // cómo se midió el fallo de la primera versión.
    decisiones: "https://github.com/maragramonte/proyectos-dam/tree/main/wc-sequence-turnos-genero#cómo-se-reparten-los-turnos",
    decisionesTexto: { es: "Cómo se reparten los turnos", en: "How turns are shared" },
    tecnologias: {
      es: ["Java", "Swing", "Hilos", "Semáforos", "Sincronización", "Sockets", "Serialización"],
      en: ["Java", "Swing", "Threads", "Semaphores", "Synchronization", "Sockets", "Serialization"],
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
    repo: "https://github.com/maragramonte/proyectos-dam/tree/main/cena-filosofos",
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
      es: "Cada idioma tiene su propio HTML para que funcionen las previsualizaciones al compartir. 55 pruebas de extremo a extremo en un Chrome real deciden si se publica.",
      en: "Each language has its own HTML entry so shared link previews work without JavaScript. 55 end-to-end tests in a real Chrome decide whether it ships.",
    },
    // Sin enlace de demo: la demo es esta misma página. Y sin captura a
    // propósito, porque una captura de lo que ya se está mirando no añade nada:
    // la tarjeta se queda con la portada de iniciales.
    repo: "https://github.com/maragramonte/mi-portfolio",
    tecnologias: {
      es: ["React", "Vite", "HTML", "CSS", "JavaScript", "agent-browser", "Python", "Pillow", "SEO hreflang", "GitHub Actions", "GitHub Pages"],
      en: ["React", "Vite", "HTML", "CSS", "JavaScript", "agent-browser", "Python", "Pillow", "SEO hreflang", "GitHub Actions", "GitHub Pages"],
    },
  },
]
