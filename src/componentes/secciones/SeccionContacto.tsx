import FormularioContacto from '@/componentes/secciones/FormularioContacto';

/** Numero de WhatsApp para el CTA de contacto rapido */
const NUMERO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? '5492614000000';
const MENSAJE_WHATSAPP = encodeURIComponent(
  'Hola! Me gustaría obtener más información sobre Vinoteca Astringencia.'
);

/**
 * Seccion Contacto — CTA de WhatsApp rapido + formulario de contacto completo.
 * Requirement 10: boton de WhatsApp en homepage con mensaje pre-completado.
 * Requirement 11: formulario de contacto con nombre, email y mensaje.
 */
export default function SeccionContacto() {
  return (
    <section
      id="contacto"
      aria-labelledby="titulo-contacto"
      className="seccion"
      style={{ backgroundColor: 'var(--color-primario)' }}
    >
      <div className="contenedor">
        {/* Encabezado */}
        <header className="centro-seccion mb-12">
          <p
            className="fuente-decorativa text-[var(--color-acento)] text-xl mb-2"
            aria-hidden="true"
          >
            Escribinos cuando quieras
          </p>
          <h2
            id="titulo-contacto"
            className="fuente-display text-[var(--color-fondo)] font-semibold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Contacto
          </h2>
          <p className="fuente-cuerpo text-[var(--color-fondo)]/65 text-base max-w-[50ch] leading-relaxed">
            Para reservas, consultas sobre nuestra carta o simplemente para saludar.
            Respondemos rápido.
          </p>
        </header>

        {/* Contenido: WhatsApp + formulario */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-start">
          {/* WhatsApp — opcion rapida */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span
                className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)]"
              >
                Contacto rápido
              </span>
              <h3 className="fuente-display text-[var(--color-fondo)] text-2xl font-medium">
                WhatsApp
              </h3>
              <p className="fuente-cuerpo text-[var(--color-fondo)]/65 text-sm leading-relaxed max-w-[38ch]">
                Para reservas y consultas urgentes, WhatsApp es la forma más rápida de
                contactarnos. Respondemos en el día.
              </p>
            </div>

            <a
              href={`https://wa.me/${NUMERO_WHATSAPP}?text=${MENSAJE_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-acento w-fit text-base"
              aria-label="Contactar por WhatsApp (abre en nueva pestana)"
            >
              {/* Icono WhatsApp */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>

            {/* Separador visual */}
            <div
              className="flex items-center gap-4 my-2"
              aria-hidden="true"
            >
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(245,239,224,0.12)' }} />
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(245,239,224,0.12)' }} />
            </div>

            {/* Horario de respuesta */}
            <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ backgroundColor: 'rgba(245,239,224,0.06)' }}>
              <p className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-acento)]">
                Tiempo de respuesta
              </p>
              <ul className="flex flex-col gap-1.5" role="list">
                {[
                  { medio: 'WhatsApp', tiempo: 'Mismo día en horario de apertura' },
                  { medio: 'Formulario', tiempo: 'Dentro de las 24 hs hábiles' },
                ].map(({ medio, tiempo }) => (
                  <li key={medio} className="fuente-cuerpo text-sm text-[var(--color-fondo)]/60">
                    <span className="font-medium text-[var(--color-fondo)]/85">{medio}:</span>{' '}
                    {tiempo}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="fuente-display text-[var(--color-fondo)] text-2xl font-medium">
              Formulario
            </h3>
            <FormularioContacto />
          </div>
        </div>
      </div>
    </section>
  );
}
