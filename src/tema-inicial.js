/*
 * Aplica el tema y el idioma guardados ANTES de pintar la página. Sin esto,
 * quien tenga elegido el tema "noche" ve un fogonazo blanco en cada visita.
 *
 * No se importa desde ningún módulo: vite.config.js lo copia en línea en el
 * <head> de cada HTML, donde está el marcador <!-- tema-inicial -->. Así corre
 * antes del primer pintado sin una petición más, y la regla vive en un solo
 * sitio aunque el portfolio tenga varias páginas.
 */
(function () {
  /* Esta lista debe ir a la par con TEMAS en src/hooks/useTema.js. */
  var TEMAS = ['dia', 'noche']
  var raiz = document.documentElement
  var tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'dia'
    : 'noche'
  raiz.dataset.theme = tema
  try {
    var guardado = localStorage.getItem('tema')
    if (TEMAS.indexOf(guardado) !== -1) tema = guardado
    raiz.dataset.theme = tema
    /* En las páginas que fijan idioma (las de /en/) manda el de la página, no
       el guardado: quien abre el enlace en inglés espera inglés aunque su
       última visita fuera en español. */
    if (!raiz.dataset.idiomaFijo) {
      var idioma = localStorage.getItem('idioma')
      if (idioma === 'es' || idioma === 'en') raiz.lang = idioma
    }
  } catch (e) {
    /* localStorage bloqueado (modo incógnito): se queda el tema por defecto */
  }
  var barra = document.querySelector('meta[name="theme-color"]')
  if (barra) barra.setAttribute('content', tema === 'dia' ? '#f3f7fa' : '#0a0e1f')
})()
