import { INFORMACION_NEGOCIO } from '@/estilos/tokens';

/** Columnas de navegación del pie de página */
const columnaNavegacion = [
  {
    titulo: 'Navegación',
    enlaces: [
      { etiqueta: 'Nosotros', ancla: '#nosotros' },
      { etiqueta: 'Carta de Vinos', ancla: '#vinos' },
      { etiqueta: 'Eventos', ancla: '#eventos' },
      { etiqueta: 'Visitanos', ancla: '#visitanos' },
      { etiqueta: 'Contacto', ancla: '#contacto' },
    ],
  },
] as const;

/**
 * Pie de página del sitio.
 * Incluye información del negocio, navegación secundaria y créditos.
 */
export default function PieDePagina() {
  const anioActual = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-texto)] text-[var(--color-fondo)]"
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* ── Contenido principal del footer ────────────────────────────────── */}
      <div className="contenedor py-12 grid grid-cols-1 tablet:grid-cols-3 gap-8">
        {/* Columna 1: Identidad */}
        <div className="flex flex-col gap-3">
          <h2 className="fuente-display text-3xl font-semibold text-[var(--color-fondo)]">
            Astringencia
          </h2>
          <p className="fuente-decorativa text-[var(--color-acento)] text-lg">
            {INFORMACION_NEGOCIO.eslogan}
          </p>
          <p className="fuente-cuerpo text-sm text-[var(--color-fondo)]/70 leading-relaxed mt-1">
            Bar de vinos artesanal en el corazón de Mendoza.
            Un espacio para descubrir, aprender y disfrutar el vino.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        {columnaNavegacion.map((columna) => (
          <nav
            key={columna.titulo}
            aria-label={`Navegación: ${columna.titulo}`}
          >
            <h3 className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)] mb-4">
              {columna.titulo}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {columna.enlaces.map((enlace) => (
                <li key={enlace.ancla}>
                  <a
                    href={enlace.ancla}
                    className="fuente-cuerpo text-sm text-[var(--color-fondo)]/70 hover:text-[var(--color-acento)] transition-colors duration-[var(--duracion-hover)]"
                  >
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Columna 3: Contacto */}
        <div className="flex flex-col gap-3">
          <h3 className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)] mb-1">
            Encontranos
          </h3>
          <address className="not-italic flex flex-col gap-2">
            <p className="fuente-cuerpo text-sm text-[var(--color-fondo)]/70 leading-relaxed">
              {INFORMACION_NEGOCIO.direccion}
            </p>
            <a
              href="https://maps.google.com/?q=Astringencia+la+esquina+del+vino"
              target="_blank"
              rel="noopener noreferrer"
              className="fuente-cuerpo text-sm text-[var(--color-acento)] hover:underline inline-flex items-center gap-1"
              aria-label="Ver ubicación en Google Maps (abre en nueva pestaña)"
            >
              Ver en Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </address>
        </div>
      </div>

      {/* ── Separador ─────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="contenedor py-4 flex flex-col tablet:flex-row items-center justify-between gap-2">
          <p className="fuente-cuerpo text-xs text-[var(--color-fondo)]/40 text-center">
            © {anioActual} {INFORMACION_NEGOCIO.nombre}. Todos los derechos reservados.
          </p>
          <a
            href="/privacidad"
            className="fuente-cuerpo text-xs text-[var(--color-fondo)]/40 hover:text-[var(--color-acento)] transition-colors"
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

