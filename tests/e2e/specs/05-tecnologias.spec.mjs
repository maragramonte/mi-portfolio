// El filtro por tecnología es la única parte de la web con estado compartido
// entre dos secciones: se elige arriba, en Tecnologías, y se aplica abajo, en
// Proyectos. Lo que se prueba aquí es esa relación, no cada chip por separado.
import { esperarCondicion, evaluar, irALimpio, pulsar } from '../lib/agente.mjs'
import { contiene, esCierto, esIgual, esMayorQue, estaVacia } from '../lib/comprobar.mjs'

const CHIP_ENLAZADO = '.tech-chip--enlazada'

// El texto del aviso se recorta aquí y no en la página: dentro de una
// plantilla, un escape como el de los espacios se pierde antes de llegar al
// navegador y el patrón deja de ser el que parece.
const rejilla = () => {
  const r = evaluar(`(() => {
    const tarjetas = Array.from(document.querySelectorAll('.projects-grid .card'))
    const filtro = document.querySelector('.filtro')
    return {
      total: tarjetas.length,
      titulos: tarjetas.map((c) => c.querySelector('h3').textContent.trim()),
      conEtiquetaMarcada: tarjetas.filter((c) => c.querySelector('.tag--coincide')).length,
      aviso: filtro ? filtro.innerText : null,
      avisoRole: filtro?.getAttribute('role') ?? null,
      pulsados: Array.from(document.querySelectorAll('${CHIP_ENLAZADO}[aria-pressed="true"]')).map((b) => b.innerText.trim()),
    }
  })()`)

  return { ...r, aviso: r.aviso === null ? null : r.aviso.replace(/\s+/g, ' ').trim() }
}

// Elegir por texto y no por posición: el orden de los chips depende de los
// grupos de tecnologías, y una reordenación no debería romper las pruebas.
// Aquí el clic se lanza desde la página porque el recorrido pasa por todos los
// chips; las pruebas de una sola interacción usan `pulsar`, que mueve el ratón
// de verdad.
const elegirChip = (texto) =>
  evaluar(`(() => {
    const chip = Array.from(document.querySelectorAll('${CHIP_ENLAZADO}')).find(
      (b) => b.innerText.trim() === ${JSON.stringify(texto)},
    )
    if (!chip) throw new Error('no hay chip ' + ${JSON.stringify(texto)})
    if (chip.getAttribute('aria-pressed') !== 'true') chip.click()
    return 'ok'
  })()`)

const esperarFiltro = (texto) =>
  esperarCondicion(
    `document.querySelector('${CHIP_ENLAZADO}[aria-pressed="true"]')?.innerText.trim() === ${JSON.stringify(texto)}`,
  )

export default {
  titulo: 'Filtro por tecnología',

  pruebas: {
    'solo las tecnologías con proyecto detrás son pulsables'({ url }) {
      irALimpio(url())

      const r = evaluar(`(() => {
        const q = (s) => Array.from(document.querySelectorAll(s))
        return {
          enlazadas: q('${CHIP_ENLAZADO}').map((el) => ({ texto: el.innerText.trim(), etiqueta: el.tagName })),
          sueltas: q('.tech-chip--suelta').map((el) => ({ texto: el.innerText.trim(), etiqueta: el.tagName, foco: el.tabIndex >= 0 })),
        }
      })()`)

      esMayorQue(r.enlazadas.length, 0, 'hay tecnologías con proyecto detrás')
      estaVacia(
        r.enlazadas.filter((c) => c.etiqueta !== 'BUTTON'),
        'las tecnologías con proyecto detrás son botones de verdad',
        (c) => `${c.texto} es un <${c.etiqueta.toLowerCase()}>`,
      )
      // Las que no tienen proyecto no deben invitar a pulsar: llevarían a una
      // rejilla vacía. Tampoco deben recibir el foco del teclado.
      estaVacia(
        r.sueltas.filter((c) => c.etiqueta === 'BUTTON' || c.foco),
        'las tecnologías sin proyecto detrás no son pulsables ni reciben el foco',
        (c) => `${c.texto} (<${c.etiqueta.toLowerCase()}>, foco: ${c.foco})`,
      )
    },

    'elegir una tecnología filtra los proyectos y lo anuncia'({ url }) {
      irALimpio(url())
      const todos = rejilla()

      pulsar(CHIP_ENLAZADO)
      esperarCondicion(`!!document.querySelector('.filtro')`)
      const filtrado = rejilla()
      const elegida = filtrado.pulsados[0]

      esIgual(filtrado.pulsados.length, 1, 'solo queda un chip marcado como activo')
      esMayorQue(filtrado.total, 0, 'el filtro deja al menos un proyecto')
      esCierto(
        filtrado.total <= todos.total,
        'el filtro nunca añade proyectos',
        `antes ${todos.total}, después ${filtrado.total}`,
      )
      esIgual(filtrado.avisoRole, 'status', 'el aviso del filtro se anuncia como estado')
      contiene(filtrado.aviso, elegida, 'el aviso dice por qué tecnología se está filtrando')
    },

    'cada proyecto que queda muestra marcada la etiqueta del filtro'({ url }) {
      // Es el invariante de la función: si una tarjeta sobrevive al filtro,
      // tiene que verse en ella por qué. Las etiquetas se pliegan a partir de
      // la sexta y la tarjeta las despliega sola cuando la coincidencia caería
      // fuera; si eso se rompe, quedan tarjetas sin explicación a la vista.
      //
      // Se recorre en los dos idiomas porque los nombres de concurrencia sí se
      // traducen ("Hilos" / "Threads"): en inglés las etiquetas de la tarjeta
      // vienen en inglés y tienen que saber volver a su chip.
      const sinExplicar = []

      for (const [idioma, ruta] of [['es', ''], ['en', 'en/']]) {
        irALimpio(url(ruta))

        const chips = evaluar(
          `Array.from(document.querySelectorAll('${CHIP_ENLAZADO}')).map((b) => b.innerText.trim())`,
        )
        esMayorQue(chips.length, 0, `en ${idioma} hay chips que probar`)

        for (const chip of chips) {
          elegirChip(chip)
          esperarFiltro(chip)
          const r = rejilla()

          if (r.pulsados[0] !== chip) sinExplicar.push(`${idioma} · ${chip}: el chip no quedó marcado`)
          else if (r.total === 0) sinExplicar.push(`${idioma} · ${chip}: el filtro deja la rejilla vacía`)
          else if (r.conEtiquetaMarcada !== r.total) {
            sinExplicar.push(
              `${idioma} · ${chip}: ${r.total - r.conEtiquetaMarcada} de ${r.total} tarjetas sin la etiqueta marcada`,
            )
          }
        }
      }

      estaVacia(sinExplicar, 'ninguna tarjeta filtrada se queda sin mostrar la etiqueta que la mantiene', (m) => m)
    },

    'en inglés los chips y el aviso del filtro salen traducidos'({ url }) {
      // El grupo de concurrencia llegó a listar los nombres españoles y los
      // ingleses como chips distintos: en /en/ salían "Hilos" y "Semáforos"
      // pulsables, sus equivalentes ingleses como texto muerto, y el aviso
      // decía "Projects using Hilos".
      irALimpio(url('en/'))

      const r = evaluar(`(() => {
        const chips = Array.from(document.querySelectorAll('.tech-chip'))
        const enEspanol = ['Hilos', 'Semáforos', 'Serialización', 'Sincronización']
        const enIngles = ['Threads', 'Semaphores', 'Serialization', 'Synchronization']
        const texto = (c) => c.innerText.trim()
        return {
          espanolesSueltos: chips.map(texto).filter((t) => enEspanol.includes(t)),
          inglesesInertes: chips.filter((c) => c.tagName !== 'BUTTON').map(texto).filter((t) => enIngles.includes(t)),
          inglesesPulsables: chips.filter((c) => c.tagName === 'BUTTON').map(texto).filter((t) => enIngles.includes(t)),
        }
      })()`)

      estaVacia(r.espanolesSueltos, 'en inglés no queda ningún chip con el nombre español', (t) => t)
      estaVacia(r.inglesesInertes, 'los nombres ingleses tienen su proyecto detrás y son pulsables', (t) => t)
      esIgual(r.inglesesPulsables.length, 4, 'las cuatro tecnologías de concurrencia se pueden filtrar en inglés')

      elegirChip('Threads')
      esperarFiltro('Threads')
      const filtrado = rejilla()

      contiene(filtrado.aviso, 'Projects using Threads', 'el aviso nombra la tecnología en inglés')
      esMayorQue(filtrado.total, 0, 'el filtro deja proyectos')
      esIgual(
        filtrado.conEtiquetaMarcada,
        filtrado.total,
        'cada tarjeta marca su etiqueta "Threads" pese a que el chip canónico sea "Hilos"',
      )
    },

    'elegir una tecnología baja hasta los proyectos'({ url }) {
      // La lista de chips es larga: desde los primeros grupos, la rejilla queda
      // fuera de pantalla y el filtro se aplicaría donde no se ve.
      irALimpio(url())

      pulsar(CHIP_ENLAZADO)
      esperarCondicion(`document.getElementById('proyectos').getBoundingClientRect().top < window.innerHeight`)

      const top = evaluar(`Math.round(document.getElementById('proyectos').getBoundingClientRect().top)`)
      esCierto(top < 120, 'la sección de proyectos queda a la vista tras filtrar', `top = ${top}px`)
    },

    '"Ver todos" deshace el filtro'({ url }) {
      irALimpio(url())
      const todos = rejilla()

      pulsar(CHIP_ENLAZADO)
      esperarCondicion(`!!document.querySelector('.filtro')`)
      const filtrado = rejilla()
      esCierto(filtrado.aviso !== null, 'el filtro está puesto antes de deshacerlo')

      pulsar('.filtro__quitar')
      esperarCondicion(`!document.querySelector('.filtro')`)
      const r = rejilla()

      esIgual(r.total, todos.total, 'vuelven todos los proyectos')
      esIgual(r.aviso, null, 'el aviso del filtro desaparece')
      estaVacia(r.pulsados, 'ningún chip se queda marcado', (p) => p)
    },

    'volver a pulsar el mismo chip quita el filtro'({ url }) {
      irALimpio(url())
      const todos = rejilla()

      pulsar(CHIP_ENLAZADO)
      esperarCondicion(`!!document.querySelector('.filtro')`)
      const elegida = rejilla().pulsados[0]

      pulsar(`${CHIP_ENLAZADO}[aria-pressed="true"]`)
      esperarCondicion(`!document.querySelector('.filtro')`)
      const r = rejilla()

      esIgual(r.total, todos.total, `volver a pulsar ${elegida} restaura la rejilla`)
      estaVacia(r.pulsados, 'el chip se suelta', (p) => p)
    },
  },
}
