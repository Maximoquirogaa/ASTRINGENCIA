import { INFORMACION_NEGOCIO } from '@/estilos/tokens';
import IndicadorAbierto from '@/componentes/ui/IndicadorAbierto';

/** Horarios del negocio para mostrar en la sección */
const horariosSemana = [
  { dias: 'Lunes a Jueves', horario: '18:00 – 00:00', abre: true },
  { dias: 'Viernes y Sábado', horario: '17:00 – 02:00', abre: true },
  { dias: 'Domingo', horario: 'Cerrado', abre: false },
] as const;

/** URL de Google Maps para la dirección del negocio */
const URL_GOOGLE_MAPS =
  'https://maps.google.com/?q=Astringencia+la+esquina+del+vino';
/** URL para embed del mapa de Google Maps */
const URL_MAPA_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4977478166975!2d-68.86019022552887!3d-32.885005768775784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0900219a4211%3A0x590eb40154833a15!2sAstringencia%20-%20la%20esquina%20del%20vino!5e0!3m2!1ses!2sar!4v1789783916359!5m2!1ses!2sar';

/**
 * Seccion Visitanos — direccion, horarios, mapa e indicador de apertura.
 * Requirement 9: direccion completa, horarios de apertura, mapa, enlace a Google Maps.
 */
export default function SeccionVisitanos() {
  return (
    <section
      id="visitanos"
      aria-labelledby="titulo-visitanos"
      className="seccion fondo-base"
    >
      <div className="contenedor flex flex-col gap-10">
        {/* Encabezado */}
        <header className="centro-seccion">
          <p
            className="fuente-decorativa text-[var(--color-acento)] text-xl mb-1"
            aria-hidden="true"
          >
            Vení a conocernos
          </p>
          <h2 id="titulo-visitanos" className="titulo-seccion">
            Visitanos
          </h2>
          <p className="fuente-cuerpo text-[var(--color-texto-suave)] text-base max-w-[52ch] leading-relaxed">
            Estamos en el corazón de Mendoza. Pasá cuando quieras o armá una reserva
            para grupos por WhatsApp.
          </p>
        </header>

        {/* Contenido en dos columnas */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-10 items-start">
          {/* Columna izquierda: info */}
          <div className="flex flex-col gap-8">
            {/* Direccion */}
            <div className="flex flex-col gap-3">
              <h3 className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)]">
                Dirección
              </h3>
              <div className="flex flex-col gap-1">
                <address className="not-italic">
                  <p className="fuente-display text-2xl font-semibold text-[var(--color-texto)] leading-snug">
                    {INFORMACION_NEGOCIO.direccion}
                  </p>
                </address>
                <IndicadorAbierto />
              </div>
              <a
                href={URL_GOOGLE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-primario w-fit text-sm mt-1"
                aria-label="Abrir ubicacion en Google Maps (abre en nueva pestana)"
              >
                Cómo llegar
              </a>
            </div>

            {/* Horarios */}
            <div className="flex flex-col gap-3">
              <h3 className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)]">
                Horarios
              </h3>
              <dl className="flex flex-col gap-2" aria-label="Horarios de apertura">
                {horariosSemana.map(({ dias, horario, abre }) => (
                  <div
                    key={dias}
                    className="flex justify-between items-center fuente-cuerpo text-sm border-b border-[var(--color-texto)]/10 pb-2"
                  >
                    <dt
                      className={`font-medium ${
                        abre ? 'text-[var(--color-texto)]' : 'text-[var(--color-texto)]/40'
                      }`}
                    >
                      {dias}
                    </dt>
                    <dd
                      className={`font-medium ${
                        abre ? 'text-[var(--color-primario)]' : 'text-[var(--color-texto)]/30 italic'
                      }`}
                    >
                      {horario}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="fuente-cuerpo text-xs text-[var(--color-texto)]/40 mt-1">
                * Los horarios pueden variar en fechas especiales y feriados.
              </p>
            </div>

            {/* Transporte */}
            <div className="flex flex-col gap-2">
              <h3 className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)]">
                Cómo llegar
              </h3>
              <ul className="flex flex-col gap-1.5" role="list">
                {[
                  { icono: '🚌', texto: 'Colectivo: líneas que pasan por Avellaneda' },
                  { icono: '🚗', texto: 'Estacionamiento en la zona (calle y playa)' },
                  { icono: '🚲', texto: 'Ciclovía a media cuadra' },
                ].map(({ icono, texto }) => (
                  <li
                    key={texto}
                    className="fuente-cuerpo text-sm text-[var(--color-texto)]/65 flex items-center gap-2"
                  >
                    <span aria-hidden="true">{icono}</span>
                    {texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha: mapa */}
          <div className="flex flex-col gap-3">
            <div
              className="w-full rounded-xl overflow-hidden shadow-md"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Google Maps embed - fallback con link si el iframe falla */}
              <iframe
                src={URL_MAPA_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion de Vinoteca Astringencia en Google Maps"
                aria-label="Mapa de Google Maps mostrando la ubicacion de Vinoteca Astringencia en N. Avellaneda 598, Mendoza"
              />
            </div>
            <p className="fuente-cuerpo text-xs text-[var(--color-texto)]/40 text-center">
              N. Avellaneda 598, La 5ta., Mendoza
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
