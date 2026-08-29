# Portfolio · Mar Agramonte

Portfolio personal desarrollado con **React + Vite**.

Incluye selector de tema **Día / Noche**, secciones de *Sobre mí*, *Tecnologías*,
*Proyectos* y *Contacto*.

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # generar versión de producción en /dist
npm run preview  # previsualizar la build de producción
```

## Estructura

```
public/                     # favicon, icono de la web y og.png (previsualización al compartir)
src/
├── App.jsx                 # estructura general + lógica de temas
├── config.js               # ruta al CV en PDF
├── i18n.js                 # todos los textos, en español e inglés
├── index.css               # estilos y paletas de color (temas)
├── data/proyectos.js       # datos de los proyectos
└── components/             # Navbar, About, Technologies, Projects, Contact...
```

## Cómo actualizar el contenido

**Añadir el CV:** guarda el PDF en `public/` y descomenta la ruta en `src/config.js`.
El botón de descarga aparece solo entonces, en el hero y en Contacto.

**Añadir un proyecto:** copia un bloque de `src/data/proyectos.js`. Los campos
`enlace` (demo), `repo` (código) e `imagen` son opcionales; si no hay imagen, la
tarjeta muestra una portada con las iniciales del proyecto.

**Añadir una captura:** guárdala en `public/img/` y en `proyectos.js` rellena
el campo `imagen` con una plantilla de cadena:

```js
imagen: `${import.meta.env.BASE_URL}img/nombre.png`,
```
