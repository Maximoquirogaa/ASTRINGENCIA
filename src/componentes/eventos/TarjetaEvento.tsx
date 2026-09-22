import type { Evento } from '@/tipos';
import { formatearFecha, formatearHora } from '@/utilidades/formato';
import ImagenConFallback from '@/componentes/ui/ImagenConFallback';

interface PropiedadesTarjetaEvento {
  evento: Evento;
}

/**
 * Tarjeta individual de evento o degustación.
 * Requirement 7: muestra nombre, fecha (DD/MM/YYYY), hora (24h), descripción e imagen.
 * Requirement 8: solo eventos en estado "publicado" llegan a este componente.
 */
export default function TarjetaEvento({ evento }: PropiedadesTarjetaEvento) {
  const fechaFormateada = formatearFecha(evento.fecha);
  const horaFormateada = formatearHora(evento.hora);

  // Extraer partes de la fecha para el display visual
  const [dia, mes] = fechaFormateada.split('/');

  /** Nombres de mes abreviados en español */
  const nombresMes = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC',
  ];
  const mesAbreviado = nombresMes[parseInt(mes, 10) - 1] ?? mes;

  return (
    <article
      className="tarjeta group flex flex-col tablet:flex-row overflow-hidden bg-white"
      aria-label={`Evento: ${evento.nombre}`}
    >
      {/* ── Imagen del evento ─────────────────────────────────────────────── */}
      <div className="relative w-full tablet:w-48 flex-shrink-0 aspect-video tablet:aspect-auto">
        <ImagenConFallback
          src={evento.urlImagen}
          alt={`Imagen del evento: ${evento.nombre}`}
          claseContenedor="w-full h-full min-h-[160px] tablet:min-h-0"
          claseImagen="group-hover:scale-105 transition-transform duration-500"
          textoPaceholder="Evento"
        />

        {/* Fecha superpuesta en la imagen (display visual) */}
        <div
          className="absolute top-3 left-3 flex flex-col items-center justify-center bg-[var(--color-primario)] text-[var(--color-fondo)] w-14 h-14 rounded-lg shadow-md"
          aria-hidden="true"
        >
          <span className="fuente-display text-2xl font-bold leading-none">{dia}</span>
          <span className="fuente-cuerpo text-xs font-semibold tracking-wider">{mesAbreviado}</span>
        </div>
      </div>

      {/* ── Información del evento ────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Fecha y hora accesibles en texto */}
        <p className="fuente-cuerpo text-xs font-semibold text-[var(--color-acento)] uppercase tracking-widest">
          <time dateTime={`${evento.fecha.split('T')[0]}T${evento.hora}`}>
            {fechaFormateada} · {horaFormateada} hs
          </time>
        </p>

        {/* Nombre del evento */}
        <h3 className="fuente-display text-xl font-semibold text-[var(--color-texto)] leading-snug">
          {evento.nombre}
        </h3>

        {/* Descripción */}
        <p className="fuente-cuerpo text-sm text-[var(--color-texto)]/65 leading-relaxed flex-1">
          {evento.descripcion}
        </p>

        {/* CTA de WhatsApp para reservar */}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? '5492611234567'}?text=${encodeURIComponent(`Hola! Me interesa reservar para el evento "${evento.nombre}" del ${fechaFormateada}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 fuente-cuerpo text-sm font-medium text-[var(--color-primario)] hover:text-[var(--color-acento)] transition-colors duration-[var(--duracion-hover)] mt-1"
          aria-label={`Reservar lugar en ${evento.nombre} por WhatsApp`}
        >
          Reservar lugar
          <span aria-hidden="true" className="text-xs">→</span>
        </a>
      </div>
    </article>
  );
}

