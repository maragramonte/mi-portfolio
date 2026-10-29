# Portfolio · Mar Agramonte

**Web en vivo → [maragramonte.github.io/mi-portfolio](https://maragramonte.github.io/mi-portfolio/)**

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
├── config.js               # rutas a los CV en PDF (uno por idioma)
├── i18n.js                 # todos los textos, en español e inglés
├── index.css               # estilos y paletas de color (temas)
├── layout.css              # armazón: columna lateral, barra y menú de móvil
├── hooks/useNavegacion.js  # sección activa del menú y progreso de lectura
├── data/proyectos.js       # datos de los proyectos
├── data/experiencia.js     # puestos de la sección Experiencia
├── data/contacto.js        # canales de contacto (columna lateral + sección)
└── components/             # Sidebar, About, Experience, Technologies, Projects, Contact...
```

## Cómo actualizar el contenido

**Añadir el CV:** guarda los PDF en `public/` como `cv-mar-agramonte-es.pdf` y
`cv-mar-agramonte-en.pdf`. El botón de descarga ofrece el del idioma activo; si un
idioma no tiene CV, pon su entrada a `''` en `src/config.js` y ahí no se muestra.
El botón aparece en el hero y en la sección de Contacto.

**Añadir un proyecto:** copia un bloque de `src/data/proyectos.js`. Los campos
`enlace` (demo), `repo` (código), `decisiones` e `imagen` son opcionales; si no
hay imagen, la tarjeta muestra una portada con las iniciales del proyecto. El
`titulo` puede ser una cadena o `{ es, en }` cuando haya que traducirlo.

**El enlace de decisiones** es el tercero de la tarjeta y apunta al documento
donde explico las decisiones técnicas del proyecto (en Dr. Agramonte,
`docs/DECISIONES-TECNICAS.md`; en la farmacia, el apartado del README). Si el
documento se llama de otra forma, cambia el texto del enlace con `decisionesTexto`.

**Añadir una captura:** guárdala en `public/img/` y en `proyectos.js` rellena
el campo `imagen` con una plantilla de cadena:

```js
imagen: `${import.meta.env.BASE_URL}img/nombre.png`,
```
