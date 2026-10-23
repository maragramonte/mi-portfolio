import { mkdir, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const publicDir = path.join(root, 'public')
const tempDir = path.join(root, 'tmp', 'cv')

const copy = {
  es: {
    language: 'es', title: 'Mar Agramonte Campos', role: 'Desarrolladora Backend · QA Automation',
    contact: 'Palma de Mallorca · agramontecampos01@gmail.com · linkedin.com/in/maragramonte · github.com/maragramonte · maragramonte.github.io/mi-portfolio',
    profileTitle: 'Perfil', profile: 'Desarrolladora backend titulada en DAM. Mi proyecto de fin de ciclo es una aplicación de citas para la consulta real de un internista en Palma: Java 21, Spring Boot 3.5 y PostgreSQL, con 115 pruebas automatizadas y CI en cada push. Tengo 400 horas de prácticas en QA y APIs en Marlink Group. Inglés B2 con experiencia laboral en Irlanda. Busco puesto como desarrolladora backend o QA Automation, en Palma o en remoto.',
    experience: 'Experiencia en IT', marlink: 'Prácticas IT — Desarrollo y QA Testing', marlinkMeta: 'Marlink Group (OmniAccess) · Ene. 2026 – Mar. 2026 · 400 h',
    marlinkBullets: ['Pruebas funcionales de la API de Ucopia: diseño de casos, reproducción de fallos e informes técnicos en Jira.', 'Validaciones end-to-end en entornos simulados y de producción.', 'Scripts en Python para automatizar consultas a SQL y MongoDB desde Docker sobre WSL.', 'Trabajo en equipo SAFe y documentación técnica en Confluence.'],
    glad: 'Prácticas — Consultoría Tecnológica', gladMeta: 'GladToLink · Feb. 2025 · 100 h', gladText: 'Formularios XML y Java para digitalizar procesos de clientes.',
    projects: 'Proyectos', drTitle: 'Aplicación de Gestión de Citas Médicas · Proyecto de fin de ciclo',
    dr: 'Java 21, Spring Boot 3.5, PostgreSQL, JWT y Flyway. Bloqueo pesimista contra la doble reserva, validado con un test de concurrencia sobre PostgreSQL real. 115 pruebas (70 unitarias, 27 de API y 18 de integración con Testcontainers); CI con GitHub Actions. Docker Compose, Caddy y avisos por correo, Telegram y Twilio.',
    pharmacyTitle: 'Web Farmàcia Agramonte', pharmacy: 'Generador Python que crea 179 páginas estáticas en tres idiomas desde CSV del software de gestión. Importador con detección de codificación y separador, y simulación antes de escribir. SEO técnico sin publicar medicamentos ni precios.',
    skills: 'Habilidades técnicas', skillsText: 'Java 21 · Python · SQL · JavaScript · Spring Boot 3.5 · Spring Security · API REST · JWT · Flyway · PostgreSQL · MySQL · MongoDB · SQLite · JUnit 5 · Testcontainers · Postman · Docker · GitHub Actions · Linux · React · HTML · CSS · XML · Odoo XML-RPC · Jira · Confluence · SAFe · Scrum',
    education: 'Formación', educationText: 'CFGS Desarrollo de Aplicaciones Multiplataforma (DAM), CESUR Mallorca · 2024–2026<br/>CFGM Gestión Administrativa, Aula Balear · 2021–2022',
    other: 'Otra experiencia', otherText: 'Cajera, El Corte Inglés (2025) · Recepcionista VIP, Aena (2024) · Atención al cliente, The Ardilaun Hotel, Irlanda (2023–2024) · Prácticas RRHH, Urbia (2022)',
    languages: 'Idiomas', languagesText: 'Español y catalán nativos · Inglés B2 (experiencia laboral en Irlanda)',
    visualProjectDr: 'Gestión de citas para una consulta real. Java 21, Spring Boot, PostgreSQL; 115 pruebas automatizadas y protección frente a reservas simultáneas.',
    visualProjectPharmacy: 'Web de farmacia en tres idiomas. Generación de 179 páginas desde CSV, con importación segura y SEO técnico.',
  },
  en: {
    language: 'en', title: 'Mar Agramonte Campos', role: 'Backend Developer · QA Automation',
    contact: 'Palma de Mallorca, Spain · agramontecampos01@gmail.com · linkedin.com/in/maragramonte · github.com/maragramonte · maragramonte.github.io/mi-portfolio',
    profileTitle: 'Profile', profile: 'Backend developer and DAM graduate (Higher Vocational Degree in Multi-platform Application Development). My final-year project is an appointment app for a real internist in Palma, built with Java 21, Spring Boot 3.5 and PostgreSQL, with 115 automated tests and CI on every push. I completed a 400-hour internship in QA and APIs at Marlink Group. English B2, with work experience in Ireland. Seeking a Backend Developer or QA Automation role in Palma or remotely.',
    experience: 'IT experience', marlink: 'IT Internship — Development & QA Testing', marlinkMeta: 'Marlink Group (OmniAccess) · Jan 2026 – Mar 2026 · 400 h',
    marlinkBullets: ['Functional testing of the Ucopia API: test case design, bug reproduction and technical reports in Jira.', 'End-to-end validation in simulated and production environments.', 'Python scripts to automate SQL and MongoDB queries from Docker on WSL.', 'Worked in a SAFe team and documented technical work in Confluence.'],
    glad: 'Internship — Technology Consulting', gladMeta: 'GladToLink · Feb 2025 · 100 h', gladText: 'XML forms and Java interactions for client digitization processes.',
    projects: 'Projects', drTitle: 'Medical Appointment Management App · Final-year project',
    dr: 'Java 21, Spring Boot 3.5, PostgreSQL, JWT and Flyway. Pessimistic locking prevents double booking, validated by a concurrency test against real PostgreSQL. 115 tests (70 unit, 27 API and 18 integration tests with Testcontainers); GitHub Actions CI. Docker Compose, Caddy, and email, Telegram and Twilio notifications.',
    pharmacyTitle: 'Farmàcia Agramonte website', pharmacy: 'Python generator creates 179 static pages in three languages from the management software CSV. Importer detects encoding and delimiter and supports a dry run. Technical SEO; no medicines or prices are published.',
    skills: 'Technical skills', skillsText: 'Java 21 · Python · SQL · JavaScript · Spring Boot 3.5 · Spring Security · REST APIs · JWT · Flyway · PostgreSQL · MySQL · MongoDB · SQLite · JUnit 5 · Testcontainers · Postman · Docker · GitHub Actions · Linux · React · HTML · CSS · XML · Odoo XML-RPC · Jira · Confluence · SAFe · Scrum',
    education: 'Education', educationText: 'Higher Vocational Degree in Multi-platform Application Development (DAM), CESUR Mallorca · 2024–2026<br/>Vocational Degree in Business Administration, Aula Balear · 2021–2022',
    other: 'Other experience', otherText: 'Cashier, El Corte Inglés (2025) · VIP lounge receptionist, Aena (2024) · Customer service, The Ardilaun Hotel, Ireland (2023–2024) · HR internship, Urbia (2022)',
    languages: 'Languages', languagesText: 'Native Spanish and Catalan · English B2 (work experience in Ireland)',
    visualProjectDr: 'Appointment app for a real medical practice. Java 21, Spring Boot and PostgreSQL; 115 automated tests and protection against concurrent bookings.',
    visualProjectPharmacy: 'Three-language pharmacy website. Generates 179 pages from CSV with safe importing and technical SEO.',
  },
}

await mkdir(tempDir, { recursive: true })
await writeFile(path.join(tempDir, 'cv-copy.json'), JSON.stringify(copy, null, 2))
const python = 'C:/Users/marac/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
const result = spawnSync(python, [path.join(path.dirname(fileURLToPath(import.meta.url)), 'render-cv-pdfs.py'), tempDir, publicDir], { stdio: 'inherit' })
if (result.status !== 0) throw new Error('ReportLab failed to generate CV PDFs')
