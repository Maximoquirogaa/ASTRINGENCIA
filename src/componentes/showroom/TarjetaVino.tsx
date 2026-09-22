import type { Vino } from '@/tipos';
import { TIPOS_VINO } from '@/estilos/tokens';
import ImagenConFallback from '@/componentes/ui/ImagenConFallback';
import { formatearPrecio } from '@/utilidades/formato';

/** Colores de indicador visual por tipo de vino (Requirement 4) */
const colorPorTipoVino: Record<string, { fondo: string; texto: string; etiqueta: string }> = {
  Tinto: { fondo: '#7B2030', texto: '#F5EFE0', etiqueta: 'Tinto' },
  Blanco: { fondo: '#C9A87C', texto: '#2C1A0E', etiqueta: 'Blanco' },
  Rosado: { fondo: '#D4829A', texto: '#2C1A0E', etiqueta: 'Rosado' },
  Espumante: { fondo: '#B5A642', texto: '#2C1A0E', etiqueta: 'Espumante' },
};

interface PropiedadesTarjetaVino {
  vino: Vino;
}

/**
 * Tarjeta individual de vino para el showroom.
 * Requirement 4: muestra nombre, bodega, tipo, precio e imagen.
 * Requirement 4: indicador de color por tipo de vino.
 * Requirement 4: elevación sutil en hover con transición de 300ms.
 */
export default function TarjetaVino({ vino }: PropiedadesTarjetaVino) {
  const tipoStr = vino.tipo as string;
  const colorTipo = colorPorTipoVino[tipoStr] ?? {
    fondo: '#7B2030',
    texto: '#F5EFE0',
    etiqueta: tipoStr,
  };

  // Verificar que el tipo existe en TIPOS_VINO (excluyendo "Todos")
  const tipoValido = TIPOS_VINO.slice(1).includes(vino.tipo as never);
  if (!tipoValido) return null;

  return (
    <article
      className="tarjeta group flex flex-col bg-white"
      aria-label={`${vino.nombre} — ${vino.bodega}`}
    >
      {/* ── Imagen de la botella ──────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImagenConFallback
          src={vino.urlImagen}
          alt={`Botella de ${vino.nombre} — ${vino.bodega}`}
          claseContenedor="w-full h-full"
          claseImagen="group-hover:scale-105 transition-transform duration-500"
          textoPaceholder={vino.nombre}
        />

        {/* Indicador de tipo de vino (Requirement 4: color coding) */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold fuente-cuerpo tracking-wide"
          style={{
            backgroundColor: colorTipo.fondo,
            color: colorTipo.texto,
          }}
          aria-label={`Tipo: ${colorTipo.etiqueta}`}
        >
          {colorTipo.etiqueta}
        </div>
      </div>

      {/* ── Información del vino ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        {/* Nombre del vino */}
        <h3 className="fuente-display text-xl font-semibold text-[var(--color-texto)] leading-snug">
          {vino.nombre}
        </h3>

        {/* Bodega */}
        <p className="fuente-cuerpo text-sm text-[var(--color-texto-suave)] font-medium">
          {vino.bodega}
        </p>

        {/* Descripción (opcional, visible en hover en desktop) */}
        {vino.descripcion && (
          <p className="fuente-cuerpo text-xs text-[var(--color-texto)]/60 leading-relaxed mt-1 line-clamp-2">
            {vino.descripcion}
          </p>
        )}

        {/* Separador y precio */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-fondo)]">
          <span
            className="fuente-display text-2xl font-semibold text-[var(--color-primario)]"
            aria-label={`Precio: ${formatearPrecio(vino.precio)} pesos argentinos`}
          >
            {formatearPrecio(vino.precio)}
          </span>
          <span
            className="text-xs fuente-cuerpo text-[var(--color-texto)]/40 uppercase tracking-wide"
            aria-hidden="true"
          >
            ARS
          </span>
        </div>
      </div>
    </article>
  );
}

