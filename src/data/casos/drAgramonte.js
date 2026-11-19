// Textos de la página de caso de Dr. Agramonte, en los dos idiomas.
//
// Todo lo que se afirma aquí sale del repositorio (docs/DECISIONES-TECNICAS.md,
// docs/PRUEBAS-Y-CALIDAD.md y el propio código), repasado el 2026-11-19. Si
// cambia el proyecto, se cambia aquí: un dato desfasado en un caso de estudio
// es lo primero que pilla quien lo lee con calma.
//
// El código de los bloques es el del repositorio tal cual, y por eso no se
// traduce: los nombres de las clases y los métodos están en castellano.

const REPO = 'https://github.com/maragramonte/dr-agramonte'

const CODIGO_BLOQUEO = `@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT h FROM Horario h WHERE h.medico.id = :medicoId " +
       "AND h.inicio = :fechaHora AND h.disponible = true")
Optional<Horario> findByMedicoIdAndInicioAndDisponibleTrueForUpdate(
        @Param("medicoId") Long medicoId,
        @Param("fechaHora") LocalDateTime fechaHora);`

const CODIGO_PRUEBA = `CyclicBarrier salida = new CyclicBarrier(2);
Future<Integer> reservaA = pool.submit(reservaConcurrente(pacienteA, franja, salida));
Future<Integer> reservaB = pool.submit(reservaConcurrente(pacienteB, franja, salida));

assertThat(List.of(reservaA.get(30, SECONDS), reservaB.get(30, SECONDS)))
        .containsExactlyInAnyOrder(201, 409);`

const ENLACES = {
  demo: 'https://maragramonte.github.io/dr-agramonte/',
  bloqueo: `${REPO}/blob/main/backend/src/main/java/com/saludybienestar/agramonte/repository/HorarioRepository.java`,
  prueba: `${REPO}/blob/main/backend/src/test/java/com/saludybienestar/agramonte/integration/ReservaPublicaIntegrationTest.java`,
  decision: `${REPO}/blob/main/docs/DECISIONES-TECNICAS.md#1-bloqueo-pesimista-contra-la-doble-reserva`,
  estrategia: `${REPO}/blob/main/docs/PRUEBAS-Y-CALIDAD.md`,
}

export const caso = {
  es: {
    volver: 'Volver al portfolio',
    otroIdioma: { texto: 'English', lang: 'en', ruta: 'en/casos/dr-agramonte/' },
    titulo: 'Dos pacientes, la misma hora',
    entradilla:
      'Cómo evité que la web de citas del Dr. Agramonte diera la misma hora a dos personas, cómo lo compruebo y qué queda sin cubrir.',
    ficha: [
      ['Proyecto', 'La web de citas de la consulta de un internista en Palma. Nació como mi proyecto de fin de ciclo de DAM.'],
      ['Mi papel', 'Todo: modelo de datos, API, frontend, pruebas y CI.'],
      ['Stack', 'Java 21, Spring Boot 3.5, PostgreSQL, JUnit 5 y Testcontainers.'],
    ],
    problema: {
      titulo: 'El problema',
      parrafos: [
        'En la web se reserva sin cuenta: se elige centro, día y hora, y listo. Eso hace que sea rápida, y también que dos personas puedan pulsar «Reservar» sobre el mismo hueco en el mismo segundo.',
        'Sin control, las dos reservas se guardan y el médico se encuentra a dos pacientes citados a las diez. Es el fallo que más duele en una agenda y el que menos se ve probando a mano, porque a mano nunca se pulsa a la vez.',
      ],
    },
    carrera: {
      titulo: 'Qué pasa cuando chocan',
      carriles: ['Paciente A', 'Paciente B'],
      pasos: [
        ['Pulsa «Reservar» a las 10:00.', 'Pulsa «Reservar» a las 10:00, en el mismo instante.'],
        ['Su transacción bloquea la fila de ese hueco en PostgreSQL.', 'Su transacción espera: la fila está bloqueada.'],
        ['Guarda la cita, marca el hueco como ocupado y suelta el bloqueo.', 'Lee la fila. El hueco ya no está libre.'],
      ],
      final: ['201 Created: cita guardada.', '409 Conflict: no se guarda nada.'],
    },
    decision: {
      titulo: 'La decisión',
      parrafos: [
        'La reserva bloquea la fila del hueco con SELECT … FOR UPDATE dentro de la transacción. Debajo hay un índice único por médico y hora, por si algún camino se saltara el bloqueo.',
        'El bloqueo dura lo que tarda en guardarse una cita. El código se lee de arriba abajo, sin bucles de reintento, y el 409 es justo lo que significa en HTTP: ese recurso ya no está disponible.',
      ],
      codigo: CODIGO_BLOQUEO,
      codigoPie: 'HorarioRepository.java: la consulta que bloquea el hueco.',
      descartadas: {
        titulo: 'Lo que descarté',
        opciones: [
          ['Bloqueo optimista', 'Más barato con poca contención, pero obliga a reintentar y el paciente notaría esperas que cambian de una vez a otra.'],
          ['Solo el índice único', 'Funciona, pero convierte una regla del negocio en un error de base de datos que hay que traducir.'],
          ['Una cola de reservas', 'Quita la concurrencia de raíz a cambio de una pieza más que mantener. Demasiado para una consulta.'],
        ],
      },
    },
    prueba: {
      titulo: 'Cómo lo pruebo',
      parrafos: [
        'Dos hilos esperan en una barrera y salen a la vez contra el mismo hueco. La prueba exige un 201 y un 409, ni más ni menos. Si un día alguien quita el bloqueo, salen dos 201 y el CI se pone en rojo.',
        'Corre contra un PostgreSQL de verdad, levantado con Testcontainers. Con H2 en memoria pasaría igual, pero no demostraría nada: H2 no bloquea las filas como PostgreSQL. Y como esas pruebas se saltan si no hay Docker, el CI falla si alguna se queda sin ejecutar.',
      ],
      codigo: CODIGO_PRUEBA,
      codigoPie: 'ReservaPublicaIntegrationTest.java, resumido.',
    },
    paciente: {
      titulo: 'Lo que ve el paciente',
      parrafos: [
        'El backend ya lo resolvía, pero al paciente que llegaba segundo le salía «Horario no disponible» con la hora todavía marcada. Si volvía a pulsar, le salía el mismo error.',
        'Ahora, ante un 409, la web vuelve a pedir la agenda. Si la hora ya no está, la desmarca, le enseña las que quedan y se lo explica. Una prueba con Playwright simula el choque en el navegador y lo comprueba.',
      ],
    },
    limites: {
      titulo: 'Lo que no cubre',
      puntos: [
        'El bloqueo pone en fila a quien pide el mismo hueco. Para una consulta no se nota; con miles de personas a la vez habría que medirlo, y no hay pruebas de carga.',
        'La demo pública corre entera en el navegador, sin servidor: ahí no hay bloqueo que ver. Para verlo hay que levantar la aplicación con Docker.',
      ],
    },
    enlaces: {
      titulo: 'Para comprobarlo',
      lista: [
        ['La demo', ENLACES.demo],
        ['El código del bloqueo', ENLACES.bloqueo],
        ['La prueba de concurrencia', ENLACES.prueba],
        ['La decisión, con sus alternativas', ENLACES.decision],
        ['La estrategia de pruebas completa', ENLACES.estrategia],
      ],
    },
  },

  en: {
    volver: 'Back to the portfolio',
    otroIdioma: { texto: 'Español', lang: 'es', ruta: 'casos/dr-agramonte/' },
    titulo: 'Two patients, one time slot',
    entradilla:
      "How I stopped Dr. Agramonte’s booking site from giving the same time slot to two people, how I test it, and what it still doesn’t cover.",
    ficha: [
      ['Project', 'The booking site for an internist’s practice in Palma. It started as my final project for my software development degree (DAM).'],
      ['My role', 'All of it: data model, API, frontend, tests and CI.'],
      ['Stack', 'Java 21, Spring Boot 3.5, PostgreSQL, JUnit 5 and Testcontainers.'],
    ],
    problema: {
      titulo: 'The problem',
      parrafos: [
        'Patients book without an account: pick a clinic, a day and a time, and that’s it. That keeps it fast, and it also means two people can hit “Book” on the same slot in the same second.',
        'Without a guard, both bookings get saved and the doctor ends up with two patients at ten o’clock. It’s the worst bug a calendar can have, and the hardest to catch by hand, because by hand you never click at the same time.',
      ],
    },
    carrera: {
      titulo: 'What happens when they collide',
      carriles: ['Patient A', 'Patient B'],
      pasos: [
        ['Hits “Book” for 10:00.', 'Hits “Book” for 10:00 at the same instant.'],
        ['Their transaction locks that slot’s row in PostgreSQL.', 'Their transaction waits: the row is locked.'],
        ['Saves the appointment, marks the slot as taken and releases the lock.', 'Reads the row. The slot is no longer free.'],
      ],
      final: ['201 Created: appointment saved.', '409 Conflict: nothing is saved.'],
    },
    decision: {
      titulo: 'The decision',
      parrafos: [
        'The booking locks the slot’s row with SELECT … FOR UPDATE inside the transaction. Underneath there’s a unique index on doctor and time, in case any code path ever skipped the lock.',
        'The lock lasts as long as saving one appointment takes. The code reads top to bottom, with no retry loops, and the 409 means exactly what it means in HTTP: that resource is no longer available.',
      ],
      codigo: CODIGO_BLOQUEO,
      codigoPie: 'HorarioRepository.java: the query that locks the slot.',
      descartadas: {
        titulo: 'What I ruled out',
        opciones: [
          ['Optimistic locking', 'Cheaper under low contention, but it needs retries, and patients would notice waits that change from one try to the next.'],
          ['The unique index alone', 'It works, but it turns a business rule into a database error that has to be translated.'],
          ['A booking queue', 'It removes concurrency altogether, at the cost of one more moving part. Too much for a medical practice.'],
        ],
      },
    },
    prueba: {
      titulo: 'How I test it',
      parrafos: [
        'Two threads wait at a barrier and go for the same slot at once. The test expects one 201 and one 409, no more and no less. If someone ever removes the lock, two 201s come back and CI turns red.',
        'It runs against a real PostgreSQL started with Testcontainers. With an in-memory H2 it would pass just the same and prove nothing, because H2 doesn’t lock rows the way PostgreSQL does. And since those tests are skipped when Docker isn’t available, CI fails if any of them didn’t run.',
      ],
      codigo: CODIGO_PRUEBA,
      codigoPie: 'ReservaPublicaIntegrationTest.java, trimmed.',
    },
    paciente: {
      titulo: 'What the patient sees',
      parrafos: [
        'The backend already handled it, but the patient who came second got “Horario no disponible” (time slot unavailable) with the time still selected. Clicking again gave the same error.',
        'Now, on a 409, the site asks for the calendar again. If the time is gone, it deselects it, shows the slots that are left and explains why. A Playwright test simulates the collision in the browser and checks it.',
      ],
    },
    limites: {
      titulo: 'What it doesn’t cover',
      puntos: [
        'The lock queues up anyone asking for the same slot. For one practice it’s unnoticeable; with thousands of people at once it would need measuring, and there are no load tests.',
        'The public demo runs entirely in the browser, with no server: there’s no lock to see there. To see it, you have to run the app with Docker.',
      ],
    },
    enlaces: {
      titulo: 'Check it yourself',
      lista: [
        ['The demo', ENLACES.demo],
        ['The locking code', ENLACES.bloqueo],
        ['The concurrency test', ENLACES.prueba],
        ['The decision, with its alternatives', ENLACES.decision],
        ['The full test strategy', ENLACES.estrategia],
      ],
    },
  },
}
