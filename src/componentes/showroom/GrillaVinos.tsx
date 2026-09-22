'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Vino } from '@/tipos';
import type { TipoVino } from '@/estilos/tokens';
import FiltroVino from './FiltroVino';
import TarjetaVino from './TarjetaVino';

interface PropiedadesGrillaVinos {
  /** Lista completa de vinos a mostrar */
  vinos: Vino[];
}

/**
 * Grilla de vinos con filtrado reactivo por tipo.
 * Requirement 4: grilla responsiva 1/2/3 columnas según viewport.
 * Requirement 5: filtrado en < 300ms, actualiza URL hash, anima tarjetas.
 * Requirement 5: mensaje de estado vacío cuando no hay resultados.
 * Requirement 19: estado vacío amigable con mensaje en español.
 */
export default function GrillaVinos({ vinos }: PropiedadesGrillaVinos) {
  const [filtroActivo, setFiltroActivo] = useState<TipoVino>('Todos');
  const [vinosFiltrados, setVinosFiltrados] = useState<Vino[]>(vinos);
  const [animando, setAnimando] = useState(false);

  // Leer el filtro inicial desde el hash de la URL (Requirement 5)
  useEffect(() => {
    const hash = window.location.hash.replace('#filtro-', '');
    const esHashValido = ['Tinto', 'Blanco', 'Rosado', 'Espumante', 'Todos'].includes(hash);
    if (esHashValido) {
      setFiltroActivo(hash as TipoVino);
    }
  }, []);

  // Aplicar filtro con animación de fade (Requirement 5 y 15)
  const aplicarFiltro = useCallback(
    (nuevoFiltro: TipoVino) => {
      if (nuevoFiltro === filtroActivo) return;

      setAnimando(true);

      // Breve delay para que el fade-out sea visible antes de actualizar la lista
      setTimeout(() => {
        setFiltroActivo(nuevoFiltro);

        const filtrados =
          nuevoFiltro === 'Todos'
            ? vinos
            : vinos.filter((v) => v.tipo === nuevoFiltro);

        setVinosFiltrados(filtrados);

        // Actualizar URL hash para mantener estado al recargar (Requirement 5)
        const nuevoHash = nuevoFiltro === 'Todos' ? '#vinos' : `#filtro-${nuevoFiltro}`;
        window.history.replaceState(null, '', nuevoHash);

        setAnimando(false);
      }, 200); // 200ms de fade-out, total < 300ms (Requirement 5)
    },
    [filtroActivo, vinos]
  );

  // Inicializar lista filtrada cuando cambian los vinos prop
  useEffect(() => {
    const filtrados =
      filtroActivo === 'Todos'
        ? vinos
        : vinos.filter((v) => v.tipo === filtroActivo);
    setVinosFiltrados(filtrados);
  }, [vinos, filtroActivo]);

  return (
    <div className="flex flex-col gap-8">
      {/* Control de filtrado */}
      <FiltroVino filtroActivo={filtroActivo} alCambiarFiltro={aplicarFiltro} />

      {/* Grilla de tarjetas o mensaje de estado vacío */}
      <div
        className={`transition-opacity duration-200 ${animando ? 'opacity-0' : 'opacity-100'}`}
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Mostrando ${vinosFiltrados.length} vinos`}
      >
        {vinosFiltrados.length === 0 ? (
          /* Estado vacío (Requirement 5) */
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div
              aria-hidden="true"
              className="text-5xl opacity-30"
            >
              🍷
            </div>
            <p className="fuente-cuerpo text-[var(--color-texto)]/60 text-lg">
              No hay vinos de este tipo disponibles actualmente
            </p>
            <button
              onClick={() => aplicarFiltro('Todos')}
              className="boton-secundario text-sm mt-2"
              aria-label="Ver todos los vinos disponibles"
            >
              Ver todos los vinos
            </button>
          </div>
        ) : (
          /* Grilla responsiva (Requirement 4: 1 col mobile, 2 col tablet, 3 col desktop) */
          <ul
            className="grid grid-cols-1 tablet:grid-cols-2 escritorio:grid-cols-3 gap-[var(--tarjeta-gap-movil)] escritorio:gap-[var(--tarjeta-gap-escritorio)]"
            role="list"
            aria-label={`Carta de vinos${filtroActivo !== 'Todos' ? ` — ${filtroActivo}` : ''}`}
          >
            {vinosFiltrados.map((vino) => (
              <li key={vino.id}>
                <TarjetaVino vino={vino} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

