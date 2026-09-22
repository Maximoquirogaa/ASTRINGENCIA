import type { Vino } from '@/tipos';
import GrillaVinos from './GrillaVinos';

interface PropiedadesSeccionShowroom {
  /** Lista de vinos obtenida de Notion o datos de prueba */
  vinos: Vino[];
}

/**
 * Sección Showroom de Vinos.
 * Requirement 4: galería visual de vinos con filtrado.
 * Requirement 5: filtro por tipo (Todos, Tinto, Blanco, Rosado, Espumante, Naranja).
 */
export default function SeccionShowroom({ vinos }: PropiedadesSeccionShowroom) {
  return (
    <section
      id="vinos"
      aria-labelledby="titulo-showroom"
      className="seccion fondo-base"
    >
      <div className="contenedor flex flex-col gap-10">
        {/* Encabezado de sección */}
        <header className="centro-seccion">
          <p className="fuente-decorativa text-[var(--color-acento)] text-xl mb-1" aria-hidden="true">
            Nuestra selección
          </p>
          <h2
            id="titulo-showroom"
            className="titulo-seccion"
          >
            Carta de Vinos
          </h2>
          <p className="fuente-cuerpo text-[var(--color-texto-suave)] text-base max-w-[55ch] leading-relaxed">
            Vinos seleccionados de bodegas mendocinas y de todo el país.
            Nuestra carta se actualiza con las mejores cosechas de la temporada.
          </p>
        </header>

        {/* Grilla con filtro reactivo */}
        <GrillaVinos vinos={vinos} />
      </div>
    </section>
  );
}

