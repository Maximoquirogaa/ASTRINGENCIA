/**
 * Seccion Nosotros — historia, fundadoras y filosofia de la vinoteca.
 * Requirement 3: historia del negocio, info de las fundadoras y filosofia.
 * Requirement 3: ancho maximo de 65ch para parrafos de lectura.
 */
export default function SeccionNosotros() {
  return (
    <section
      id="nosotros"
      aria-labelledby="titulo-nosotros"
      className="seccion"
      style={{ backgroundColor: 'var(--color-primario)' }}
    >
      <div className="contenedor">
        {/* Layout de dos columnas en tablet+ */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="flex flex-col gap-8 order-2 tablet:order-1">
            <header>
              <p
                className="fuente-decorativa text-[var(--color-acento)] text-xl mb-2"
                aria-hidden="true"
              >
                Quiénes somos
              </p>
              <h2
                id="titulo-nosotros"
                className="fuente-display text-[var(--color-fondo)] font-semibold leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                Nosotros
              </h2>
            </header>

            {/* Historia — max 65ch por Requirement 3 */}
            <div
              className="flex flex-col gap-5"
              style={{ maxWidth: '65ch' }}
            >
              <p className="fuente-cuerpo text-[var(--color-fondo)] opacity-75 text-base leading-relaxed">
                Astringencia nació en 2026 de la mano de dos mendocinas que se cansaron
                de buscar un lugar donde el vino se cuente de verdad. Sin protocolo ni
                pretensión, solo buenos vinos y ganas de compartirlos.
              </p>
              <p className="fuente-cuerpo text-[var(--color-fondo)] opacity-75 text-base leading-relaxed">
                El nombre lo elegimos porque la astringencia es esa sensación que te deja
                huella — como una buena conversación, como un vino que no olvidás. Así
                queremos que sea cada visita: que te lleves algo.
              </p>
              <p className="fuente-cuerpo text-[var(--color-fondo)] opacity-75 text-base leading-relaxed">
                Seleccionamos cada botella pensando en quién la va a abrir. Trabajamos
                directo con bodegas pequeñas y productores independientes de Mendoza y
                el resto del país que comparten nuestra forma de entender el vino.
              </p>
            </div>

            {/* Valores / filosofia */}
            <div className="grid grid-cols-1 escritorio:grid-cols-3 gap-4 mt-2">
              {[
                {
                  titulo: 'Selección',
                  descripcion: 'Cada vino elegido con criterio y curiosidad',
                  icono: '🍷',
                },
                {
                  titulo: 'Comunidad',
                  descripcion: 'Un espacio para compartir y aprender',
                  icono: '🤝',
                },
                {
                  titulo: 'Territorio',
                  descripcion: 'Bodegueros mendocinos y de todo el país',
                  icono: '🗻',
                },
              ].map(({ titulo, descripcion, icono }) => (
                <div
                  key={titulo}
                  className="flex flex-col gap-2 p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(245,239,224,0.08)' }}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {icono}
                  </span>
                  <h3 className="fuente-cuerpo text-[var(--color-acento)] text-sm font-semibold uppercase tracking-wide">
                    {titulo}
                  </h3>
                  <p className="fuente-cuerpo text-[var(--color-fondo)]/65 text-sm leading-relaxed">
                    {descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de imagen */}
          <div
            className="order-1 tablet:order-2 w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,124,0.15) 0%, rgba(123,32,48,0.3) 100%)',
              border: '1px solid rgba(201,168,124,0.2)',
            }}
            aria-label="Foto de las fundadoras de Vinoteca Astringencia"
            role="img"
          >
            <div className="flex flex-col items-center gap-4 text-center px-8">
              {/* Placeholder elegante para foto de las fundadoras */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,168,124,0.2)' }}
                aria-hidden="true"
              >
                <span className="text-4xl opacity-60">📸</span>
              </div>
              <p className="fuente-decorativa text-[var(--color-acento)] text-lg">
                Las fundadoras
              </p>
              <p className="fuente-cuerpo text-[var(--color-fondo)]/40 text-xs max-w-[30ch]">
                Foto disponible próximamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
