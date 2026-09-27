import { useEffect, useState } from 'react'

// Dos ayudantes para la navegación. Van juntos aquí porque los dos escuchan
// lo mismo (por dónde va la página) y solo los usa la barra lateral.

// Devuelve el id de la sección que se está viendo, para resaltarla en el menú.
//
// Usa IntersectionObserver en vez de un listener de scroll: el navegador avisa
// solo cuando una sección entra o sale, así que no se recalcula en cada píxel.
// El rootMargin recorta la mitad inferior de la pantalla para que la sección
// activa sea la que ocupa la parte de arriba, que es donde está mirando quien lee.
export function useSeccionActiva(ids, desfaseSuperior = 0) {
  const [activa, setActiva] = useState(ids[0])
  const clave = ids.join(',')

  useEffect(() => {
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (secciones.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        // De las secciones que tocan la franja, gana la que empieza más abajo:
        // es la que acaba de entrar por arriba y la que se está leyendo. Si se
        // ordenara al revés ganaría siempre la anterior, que viene de más arriba
        // y sigue asomando por el borde.
        const visibles = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

        if (visibles.length > 0) setActiva(visibles[0].target.id)
      },
      { rootMargin: `-${desfaseSuperior}px 0px -55% 0px`, threshold: 0 },
    )

    secciones.forEach((seccion) => observador.observe(seccion))
    return () => observador.disconnect()
    // `clave` es la lista de ids serializada: evita reconectar el observador en
    // cada render solo porque el array llega con otra identidad.
  }, [clave, desfaseSuperior]) // eslint-disable-line react-hooks/exhaustive-deps

  return activa
}

// Devuelve cuánto se ha recorrido la página, de 0 a 1, para la barra de progreso.
export function useProgresoLectura() {
  const [progreso, setProgreso] = useState(0)

  useEffect(() => {
    function calcular() {
      const alcance = document.documentElement.scrollHeight - window.innerHeight
      setProgreso(alcance > 0 ? Math.min(window.scrollY / alcance, 1) : 0)
    }

    calcular()
    // passive: true porque solo leemos la posición, nunca bloqueamos el scroll.
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [])

  return progreso
}
