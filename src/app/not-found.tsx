import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada — Vinoteca Astringencia',
};

/**
 * Página 404 personalizada con branding de la vinoteca.
 * Requirement 19: "THE Website SHALL implement a custom 404 page with
 * branding and navigation back to home".
 */
export default function PaginaNoEncontrada() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: '80vh' }}
      aria-labelledby="titulo-404"
    >
      {/* Número de error decorativo */}
      <p
        className="fuente-display font-bold text-[var(--color-primario)] select-none"
        style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', lineHeight: 1, opacity: 0.15 }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Mensaje principal */}
      <div className="-mt-8 flex flex-col items-center gap-4">
        <p className="fuente-decorativa text-[var(--color-acento)] text-2xl">
          Ay, perdiste el camino...
        </p>
        <h1
          id="titulo-404"
          className="fuente-display text-[var(--color-texto)] font-semibold"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          Esta página no existe
        </h1>
        <p className="fuente-cuerpo text-[var(--color-texto-suave)] max-w-[45ch] leading-relaxed">
          Pero tranqui — la carta de vinos sí existe y te está esperando.
        </p>

        {/* CTA de regreso */}
        <a
          href="/"
          className="boton-primario mt-4 text-base"
          aria-label="Volver al inicio de Vinoteca Astringencia"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}

