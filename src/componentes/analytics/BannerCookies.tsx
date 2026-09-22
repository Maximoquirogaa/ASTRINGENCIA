'use client';

import { useState, useEffect } from 'react';
import { useConsentimiento } from '@/componentes/analytics/ProveedorAnalytics';

/**
 * Banner de consentimiento de cookies.
 * Requirement 20.5: cumplimiento con Ley 25.326 de Proteccion de Datos (Argentina).
 * Se oculta si el usuario ya eligio o si activo Do Not Track.
 */
export default function BannerCookies() {
  const { consentimiento, aceptar, rechazar } = useConsentimiento();
  const [visible, setVisible] = useState(false);

  // Mostrar solo si aun no eligio (y despues de hidratacion para evitar mismatch)
  useEffect(() => {
    setVisible(consentimiento === null);
  }, [consentimiento]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Banner de consentimiento de cookies"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-40 p-4 tablet:p-6"
      style={{ backgroundColor: 'var(--color-texto)' }}
    >
      <div className="contenedor">
        <div className="flex flex-col tablet:flex-row items-start tablet:items-center gap-4 tablet:gap-6 justify-between">
          {/* Texto */}
          <div className="flex flex-col gap-1.5 max-w-[70ch]">
            <p className="fuente-cuerpo text-sm tablet:text-base text-[var(--color-fondo)] font-semibold">
              Usamos cookies para mejorar tu experiencia
            </p>
            <p className="fuente-cuerpo text-xs tablet:text-sm text-[var(--color-fondo)] opacity-80 leading-relaxed">
              Usamos Google Analytics para entender cómo usan el sitio nuestros visitantes.
            </p>
          </div>

          {/* Acciones (Enlace + Botones) */}
          <div className="flex flex-wrap items-center gap-4 shrink-0 w-full tablet:w-auto">
            <a
              href="/privacidad"
              className="fuente-cuerpo text-xs tablet:text-sm underline text-[var(--color-acento)] hover:text-[var(--color-fondo)] transition-colors mr-auto tablet:mr-2"
            >
              Política de privacidad
            </a>
            <div className="flex items-center gap-3 tablet:gap-4">
              <button
                onClick={() => {
                  rechazar();
                  setVisible(false);
                }}
                className="boton-acento text-sm py-2 px-5"
                aria-label="Rechazar cookies de analitica"
              >
                Rechazar
              </button>
              <button
                onClick={() => {
                  aceptar();
                  setVisible(false);
                }}
                className="boton-acento text-sm py-2 px-5"
                aria-label="Aceptar cookies de analitica"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

