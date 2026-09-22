import type { Evento } from '@/tipos';
import { eventoPasado } from '@/utilidades/formato';
import TarjetaEvento from './TarjetaEvento';

interface PropiedadesSeccionEventos {
  /** Lista de eventos obtenida de Notion o datos de prueba */
  eventos: Evento[];
}

/**
 * Sección de próximos eventos y degustaciones.
 * Requirement 7: filtra automáticamente eventos pasados.
 * Requirement 7: muestra máximo 3 eventos próximos en orden cronológico.
 * Requirement 8: excluye eventos en estado "borrador".
 */
export default function SeccionEventos({ eventos }: PropiedadesSeccionEventos) {
  // Filtrar: solo publicados, no pasados, máximo 3
  const eventosProximos = eventos
    .filter((e) => e.estado === 'publicado' && !eventoPasado(e.fecha, e.hora))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 3);

  return (
    <section
      id="eventos"
      aria-labelledby="titulo-eventos"
      className="seccion"
      style={{ backgroundColor: 'var(--color-texto)' }}
    >
      <div className="contenedor flex flex-col gap-10">
        {/* Encabezado */}
        <header className="centro-seccion">
          <p
            className="fuente-decorativa text-[var(--color-acento)] text-xl mb-1"
            aria-hidden="true"
          >
            Próximos encuentros
          </p>
          <h2
            id="titulo-eventos"
            className="fuente-display text-[var(--color-fondo)] text-center font-semibold"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Eventos y Degustaciones
          </h2>
          <p className="fuente-cuerpo text-[var(--color-prueba)] opacity-80 text-base max-w-[55ch] leading-relaxed text-center mt-2">
            Experiencias para conocer el vino desde adentro.
            Cada evento es una historia diferente en copa.
          </p>
        </header>

        {/* Lista de eventos o estado vacío */}
        {eventosProximos.length === 0 ? (
          /* Estado vacío (Requirement 7) */
          <div className="flex flex-col items-center py-12 gap-3 text-center">
            <p
              className="fuente-cuerpo text-[var(--color-fondo)] opacity-75 text-lg"
              aria-live="polite"
            >
              Próximamente nuevos eventos
            </p>
            <p className="fuente-cuerpo text-[var(--color-fondo)] opacity-70 text-sm">
              Seguinos en redes para enterarte primero
            </p>
          </div>
        ) : (
          /* Lista de tarjetas (Requirement 8: apiladas verticalmente en mobile) */
          <ul
            className="flex flex-col gap-6"
            role="list"
            aria-label="Próximos eventos"
          >
            {eventosProximos.map((evento) => (
              <li key={evento.id}>
                <TarjetaEvento evento={evento} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

