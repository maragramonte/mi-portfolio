// El tema se guarda entre visitas y se aplica en el <html> antes de que React
// monte, para que quien tenga elegido "noche" no vea un fogonazo blanco. Eso
// reparte la lógica entre un script en el <head> y App.jsx, así que las
// pruebas vigilan las dos mitades y que sigan de acuerdo.
import { esperarCondicion, esquemaDelSistema, evaluar, guardarEnAlmacenamiento, irALimpio, pulsar, recargar, tecla } from '../lib/agente.mjs'
import { contiene, esCierto, esIgual, estaVacia } from '../lib/comprobar.mjs'

const BOTON_TEMA = '.rail .selector-tema > button'
const OPCIONES = '.rail .selector-tema__opcion'

const estado = () =>
  evaluar(`(() => {
    const boton = document.querySelector('${BOTON_TEMA}')
    return {
      tema: document.documentElement.dataset.theme,
      guardado: localStorage.getItem('tema'),
      colorBarra: document.querySelector('meta[name=theme-color]').content,
      desplegado: boton.getAttribute('aria-expanded'),
      opciones: Array.from(document.querySelectorAll('${OPCIONES}')).map((o) => ({
        texto: Array.from(o.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent)
          .join('')
          .trim(),
        activa: o.getAttribute('aria-pressed'),
      })),
      focoEnBoton: document.activeElement === boton,
    }
  })()`)

export default {
  titulo: 'Tema',

  pruebas: {
    'el selector despliega las dos opciones y marca la activa'({ url }) {
      irALimpio(url())
      esIgual(estado().desplegado, 'false', 'el selector arranca cerrado')

      pulsar(BOTON_TEMA)
      esperarCondicion(`document.querySelector('${BOTON_TEMA}').getAttribute('aria-expanded') === 'true'`)
      const r = estado()

      esIgual(r.desplegado, 'true', 'el botón anuncia que está desplegado')
      esIgual(r.opciones.length, 2, 'hay dos temas que elegir')
      esIgual(
        r.opciones.filter((o) => o.activa === 'true').length,
        1,
        'exactamente una opción aparece como la activa',
      )
      esIgual(
        r.opciones.find((o) => o.activa === 'true').texto,
        'Noche',
        'la marcada es la que está puesta',
      )
    },

    'elegir "Día" cambia el tema, el color de la barra del navegador y lo guarda'({ url }) {
      irALimpio(url())
      pulsar(BOTON_TEMA)
      pulsar(`${OPCIONES}:not(.selector-tema__opcion--activa)`)
      esperarCondicion(`document.documentElement.dataset.theme === 'dia'`)

      const r = estado()
      esIgual(r.tema, 'dia', 'el <html> pasa al tema día')
      esIgual(r.guardado, 'dia', 'el tema queda guardado para la próxima visita')
      esIgual(r.colorBarra, '#fafafa', 'el color de la barra del navegador acompaña al tema')
      esIgual(r.desplegado, 'false', 'elegir cierra el desplegable')
      esCierto(r.focoEnBoton, 'tras elegir, el foco vuelve al botón que abrió el selector')
    },

    'el tema guardado sigue puesto tras recargar'({ url }) {
      irALimpio(url())
      guardarEnAlmacenamiento('tema', 'dia')
      recargar()

      const r = estado()
      esIgual(r.tema, 'dia', 'la página vuelve con el tema guardado')
      esIgual(r.colorBarra, '#fafafa', 'y con su color de barra')
    },

    'el tema se aplica en el <html> antes de cargar la aplicación'({ url }) {
      // Esta es la prueba que impide el fogonazo blanco: si alguien mueve la
      // lógica del tema a React y quita el script del <head>, el atributo
      // dejaría de estar puesto antes de pintar y esto fallaría.
      const html = evaluar(`fetch(${JSON.stringify(url())}).then((r) => r.text())`)

      const posicionInline = html.indexOf('dataset.theme')
      const posicionModulo = html.indexOf('type="module"')

      esCierto(posicionInline !== -1, 'el HTML servido trae el script que fija el tema')
      esCierto(posicionModulo !== -1, 'el HTML servido carga la aplicación como módulo')
      esCierto(
        posicionInline < posicionModulo,
        'el tema se fija antes de cargar la aplicación',
        `script del tema en ${posicionInline}, módulo en ${posicionModulo}`,
      )
    },

    'la lista de temas del <head> no se separa de la de la aplicación'({ url }) {
      // index.html repite los nombres de los temas porque su script corre
      // antes que React. Si una lista crece y la otra no, el tema nuevo no
      // sobreviviría a una recarga.
      const html = evaluar(`fetch(${JSON.stringify(url())}).then((r) => r.text())`)
      irALimpio(url())
      pulsar(BOTON_TEMA)

      const temasEnLaApp = evaluar(`document.querySelectorAll('${OPCIONES}').length`)

      const declarados = html.match(/var TEMAS = \[([^\]]*)\]/)
      esCierto(declarados !== null, 'el <head> declara su lista de temas')

      const nombres = declarados[1].split(',').map((t) => t.trim().replace(/'/g, '')).filter(Boolean)
      esIgual(nombres.length, temasEnLaApp, 'el <head> y la aplicación ofrecen los mismos temas')
      estaVacia(
        nombres.filter((n) => !['dia', 'noche'].includes(n)),
        'los temas declarados en el <head> son los conocidos',
      )
    },

    'Escape cierra el selector y devuelve el foco al botón'({ url }) {
      irALimpio(url())
      pulsar(BOTON_TEMA)
      esIgual(estado().desplegado, 'true', 'el selector está abierto antes de pulsar Escape')

      tecla('Escape')
      esperarCondicion(`document.querySelector('${BOTON_TEMA}').getAttribute('aria-expanded') === 'false'`)
      const r = estado()

      esIgual(r.desplegado, 'false', 'Escape cierra el selector')
      esIgual(r.opciones.length, 0, 'las opciones salen del DOM')
      esCierto(r.focoEnBoton, 'quien cerró con el teclado recupera el foco en el botón')
    },

    'pulsar fuera cierra el selector sin cambiar el tema'({ url }) {
      irALimpio(url())
      const temaInicial = estado().tema
      pulsar(BOTON_TEMA)

      pulsar('main h2')
      esperarCondicion(`document.querySelector('${BOTON_TEMA}').getAttribute('aria-expanded') === 'false'`)

      const r = estado()
      esIgual(r.desplegado, 'false', 'pulsar fuera cierra el selector')
      esIgual(r.tema, temaInicial, 'y no cambia el tema')
    },

    'sin visita anterior el tema sale de la preferencia del sistema'({ url }) {
      esquemaDelSistema('light')
      irALimpio(url())
      esIgual(estado().tema, 'dia', 'con el sistema en claro arranca en día')

      esquemaDelSistema('dark')
      irALimpio(url())
      esIgual(estado().tema, 'noche', 'con el sistema en oscuro arranca en noche')

      // Lo guardado manda sobre el sistema: es una elección explícita.
      guardarEnAlmacenamiento('tema', 'dia')
      recargar()
      esIgual(estado().tema, 'dia', 'el tema elegido a mano manda sobre la preferencia del sistema')

      // La suite sigue con el esquema oscuro de partida.
      esquemaDelSistema('dark')
    },
  },
}
