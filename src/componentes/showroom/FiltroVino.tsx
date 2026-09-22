'use client';

import { TIPOS_VINO, type TipoVino } from '@/estilos/tokens';
import type { PropiedadesFiltroVino } from '@/tipos';
import { rastrearFiltroVino } from '@/componentes/analytics/rastrear';

/**
 * Control de filtrado de vinos por tipo.
 * Requirement 5: botones para cada tipo + "Todos". Activo resaltado en acento.
 * Requirement 5: debe ser navegable por teclado.
 * Requirement 5: la opción activa se comunica con aria-pressed.
 */
export default function FiltroVino({ filtroActivo, alCambiarFiltro }: PropiedadesFiltroVino) {
  return (
    <div
      role="group"
      aria-label="Filtrar vinos por tipo"
      className="flex flex-wrap gap-2 justify-center"
    >
      {TIPOS_VINO.map((tipo) => {
        const estaActivo = filtroActivo === tipo;

        return (
          <button
            key={tipo}
            onClick={() => {
              alCambiarFiltro(tipo as TipoVino);
              rastrearFiltroVino(tipo);
            }}
            aria-pressed={estaActivo}
            aria-label={`${estaActivo ? 'Filtro activo: ' : 'Filtrar por '}${tipo}`}
            className={`
              fuente-cuerpo text-sm font-medium
              px-5 py-2 rounded-full
              border-2 transition-all duration-[var(--duracion-tarjeta)]
              min-h-[44px]
              ${
                estaActivo
                  ? 'bg-[var(--color-acento)] border-[var(--color-acento)] text-[var(--color-texto)] scale-105 shadow-md'
                  : 'bg-transparent border-[var(--color-texto)]/20 text-[var(--color-texto)] hover:border-[var(--color-acento)] hover:text-[var(--color-primario)]'
              }
            `}
          >
            {tipo}
          </button>
        );
      })}
    </div>
  );
}

