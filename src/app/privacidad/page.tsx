import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad - Vinoteca Astringencia',
  description:
    'Politica de privacidad y proteccion de datos personales de Vinoteca Astringencia, Mendoza, Argentina.',
  robots: { index: false, follow: false },
};

/**
 * Pagina de politica de privacidad.
 * Requirement 20.6: pagina de privacidad explicando recoleccion de datos.
 * Cumplimiento Ley 25.326 - Proteccion de Datos Personales (Argentina).
 */
export default function PaginaPrivacidad() {
  return (
    <main className="seccion fondo-base" id="contenido-principal">
      <div className="contenedor" style={{ maxWidth: '65ch', margin: '0 auto' }}>
        <header className="mb-10">
          <h1 className="titulo-seccion mb-4">Politica de Privacidad</h1>
          <p className="fuente-cuerpo text-sm text-[var(--color-texto)]/50">
            Ultima actualizacion: Septiembre 2026
          </p>
        </header>

        <div className="flex flex-col gap-8 fuente-cuerpo text-[var(--color-texto)] leading-relaxed">
          <section aria-labelledby="responsable">
            <h2 id="responsable" className="fuente-display text-xl font-semibold mb-3">
              Responsable del tratamiento
            </h2>
            <p>
              Vinoteca Astringencia, con domicilio en N. Avellaneda 598, La 5ta., Mendoza, Argentina,
              es responsable del tratamiento de los datos personales recopilados a traves de este
              sitio web (astringencia.com.ar).
            </p>
          </section>

          <section aria-labelledby="datos-recopilados">
            <h2 id="datos-recopilados" className="fuente-display text-xl font-semibold mb-3">
              Datos que recopilamos
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>
                <strong>Formulario de contacto:</strong> nombre y direccion de email cuando
                nos escribis voluntariamente.
              </li>
              <li>
                <strong>Google Analytics 4</strong> (solo con tu consentimiento): datos de
                navegacion anonimizados como paginas visitadas, tiempo de sesion y tipo de
                dispositivo. Las IPs son anonimizadas.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> metricas de rendimiento (Core Web Vitals)
                sin datos personales identificables.
              </li>
            </ul>
          </section>

          <section aria-labelledby="finalidad">
            <h2 id="finalidad" className="fuente-display text-xl font-semibold mb-3">
              Para que usamos tus datos
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>Responder consultas enviadas a traves del formulario de contacto.</li>
              <li>Mejorar la experiencia del sitio web y el rendimiento tecnico.</li>
              <li>Entender como los visitantes usan el sitio para optimizar el contenido.</li>
            </ul>
          </section>

          <section aria-labelledby="derechos">
            <h2 id="derechos" className="fuente-display text-xl font-semibold mb-3">
              Tus derechos (Ley 25.326)
            </h2>
            <p className="mb-3">
              De acuerdo con la Ley 25.326 de Proteccion de Datos Personales de Argentina,
              tenes derecho a:
            </p>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>Acceder a tus datos personales.</li>
              <li>Rectificar datos inexactos.</li>
              <li>Solicitar la supresion de tus datos.</li>
              <li>Oponerte al tratamiento de tus datos.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, escribinos a traves del{' '}
              <a href="/#contacto" className="text-[var(--color-primario)] underline hover:text-[var(--color-acento)] transition-colors">
                formulario de contacto
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="fuente-display text-xl font-semibold mb-3">
              Cookies y tecnologias de seguimiento
            </h2>
            <p className="mb-3">
              Usamos Google Analytics 4 unicamente si das tu consentimiento explicito a
              traves del banner de cookies. Podes retirar tu consentimiento en cualquier
              momento borrando las cookies del sitio o usando la opcion de Do Not Track
              de tu navegador.
            </p>
            <p>
              Vercel Analytics recopila metricas de rendimiento anonimas sin cookies
              de seguimiento personal.
            </p>
          </section>

          <section aria-labelledby="contacto-privacidad">
            <h2 id="contacto-privacidad" className="fuente-display text-xl font-semibold mb-3">
              Contacto
            </h2>
            <p>
              Si tenes preguntas sobre esta politica, escribinos a traves del{' '}
              <a href="/#contacto" className="text-[var(--color-primario)] underline hover:text-[var(--color-acento)] transition-colors">
                formulario de contacto
              </a>{' '}
              del sitio.
            </p>
          </section>

          <div className="pt-4 border-t border-[var(--color-texto)]/10">
            <a
              href="/"
              className="boton-secundario w-fit text-sm"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

