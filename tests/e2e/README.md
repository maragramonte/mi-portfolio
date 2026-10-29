# Pruebas de extremo a extremo

Conducen un Chrome de verdad sobre el portfolio ya compilado y comprueban lo
que ve quien entra: que el idioma cambia entero, que el tema sobrevive a una
recarga, que los PDF del CV se descargan, que el menú del móvil se cierra con
Escape y que no hay incumplimientos de accesibilidad.

Van sobre [agent-browser](https://github.com/vercel-labs/agent-browser), un CLI
de automatización de navegador. No hay más dependencias: el ejecutor, las
comprobaciones y el informe son unos cuantos ficheros de Node sin librerías.

## Ponerlas en marcha

```bash
npm install
npm run test:e2e:preparar   # una sola vez: descarga el Chrome de pruebas
npm run test:e2e
```

`npm run test:e2e` compila el proyecto, levanta `vite preview` en el puerto
4183, pasa las 54 pruebas y apaga el servidor. Tarda poco más de un minuto y
devuelve código de salida 1 si algo falla, que es lo que mira la acción de
GitHub.

## Opciones

```bash
npm run test:e2e -- --filtro idioma     # solo las pruebas que casen con el texto
npm run test:e2e -- --headed            # con la ventana del navegador a la vista
npm run test:e2e -- --sin-build         # reutiliza el dist/ que ya haya
npm run test:e2e -- --traza             # imprime cada orden que va al navegador
npm run test:e2e -- --puerto 5000       # otro puerto para el preview

# Contra el sitio ya publicado, sin compilar ni levantar nada:
npm run test:e2e -- --base https://maragramonte.github.io/mi-portfolio/
```

Cuando una prueba falla, el ejecutor guarda una captura de la pantalla en ese
momento en `tests/e2e/capturas/` y dice la ruta en el informe.

## Qué hay dentro

```
tests/e2e/
  run.mjs              orquestador: compila, levanta el preview, lanza y resume
  lib/
    agente.mjs         envoltorio sobre el CLI de agent-browser
    comprobar.mjs      comprobaciones, con mensajes que dicen qué debía pasar
    runner.mjs         recorre los bloques, informa y fija el código de salida
    servidor.mjs       arranque y parada de vite preview
    binarios.mjs       localiza los ejecutables dentro de node_modules
  specs/               un fichero por área de la web
  capturas/            lo que se ve cuando una prueba falla
```

Cada fichero de `specs/` exporta un objeto con el título del bloque y sus
pruebas, y opcionalmente `antes`/`despues` para preparar y recoger:

```js
export default {
  titulo: 'Idioma',
  pruebas: {
    'el botón de idioma pasa toda la interfaz a inglés'({ url }) {
      irALimpio(url())
      pulsar(BOTON_IDIOMA)
      esperarCondicion(`document.documentElement.lang === 'en'`)
      esIgual(evaluar(`document.documentElement.lang`), 'en', 'el documento declara inglés')
    },
  },
}
```

## Tres decisiones que conviene conocer antes de tocar nada

**Se prueba el resultado de `vite build`, no el modo desarrollo.** Lo que se
publica en GitHub Pages es `dist/`, y ahí es donde se rompen la base
`/mi-portfolio/`, el segundo HTML de `en/` y los PDF de `public/`.

**Las pruebas van en serie y comparten un navegador.** El estado que más se
rompe en esta web —tema e idioma guardados, filtro puesto, menú abierto— vive
en el navegador. Cada prueba empieza con `irALimpio()`, que abre la página,
vacía `localStorage` *estando ya en el origen* y recarga. Vaciarlo desde
`about:blank` vacía otro almacén y la prueba hereda el estado de la anterior.

**La suite corre con `prefers-reduced-motion: reduce`.** El scroll suave y la
transición del panel móvil hacen que el estado tarde en llegar; la web ya
declara que atiende esa preferencia. Lo que se comprueba es el resultado, no la
animación, y hay una prueba aparte que vigila que esa preferencia se siga
atendiendo.

## Nunca esperar por tiempo

Después de cada clic hay que esperar por el estado que se busca, no por un
número de milisegundos: `pulsar` vuelve en cuanto el navegador entrega el
evento, y React repinta después.

```js
pulsar('.filtro__quitar')
esperarCondicion(`!document.querySelector('.filtro')`)   // sí
pausa(500)                                               // no
```

## Cuidado con los escapes dentro de `evaluar`

El script que recibe `evaluar()` viaja dentro de una plantilla de JavaScript,
así que una secuencia como la de los espacios en una expresión regular se
pierde por el camino y el patrón deja de ser el que parece. Si hace falta
recortar o partir texto, se trae el texto crudo y se trabaja con él en Node.
