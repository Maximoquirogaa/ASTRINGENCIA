'use client';

import Script from 'next/script';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// --- Contexto de consentimiento de cookies ---

type EstadoConsentimiento = 'aceptado' | 'rechazado' | null;

const CLAVE_STORAGE = 'astringencia-cookies-v1';

interface ContextoTipo {
  consentimiento: EstadoConsentimiento;
  aceptar: () => void;
  rechazar: () => void;
}

const ContextoConsentimiento = createContext<ContextoTipo>({
  consentimiento: null,
  aceptar: () => {},
  rechazar: () => {},
});

export function useConsentimiento() {
  return useContext(ContextoConsentimiento);
}

// --- Proveedor de Analytics ---

interface Props {
  children: React.ReactNode;
}

/**
 * Proveedor central de analytics y consentimiento de cookies.
 * Requirement 20.1: Google Analytics 4.
 * Requirement 20.4: respeta Do Not Track.
 * Requirement 20.5: sistema de consentimiento.
 * Requirement 20.7: Vercel Analytics para Web Vitals.
 */
export default function ProveedorAnalytics({ children }: Props) {
  const [consentimiento, setConsentimiento] = useState<EstadoConsentimiento>(null);
  const idGA4 = process.env.NEXT_PUBLIC_GA4_ID;

  // Verificar Do Not Track y consentimiento guardado al montar
  useEffect(() => {
    const doNotTrack = navigator.doNotTrack === '1';
    if (doNotTrack) {
      setConsentimiento('rechazado');
      return;
    }
    const guardado = localStorage.getItem(CLAVE_STORAGE) as EstadoConsentimiento;
    setConsentimiento(guardado);
  }, []);

  const aceptar = useCallback(() => {
    setConsentimiento('aceptado');
    localStorage.setItem(CLAVE_STORAGE, 'aceptado');
  }, []);

  const rechazar = useCallback(() => {
    setConsentimiento('rechazado');
    localStorage.setItem(CLAVE_STORAGE, 'rechazado');
  }, []);

  const analiticaHabilitada = consentimiento === 'aceptado';

  return (
    <ContextoConsentimiento.Provider value={{ consentimiento, aceptar, rechazar }}>
      {/* Vercel Analytics - no requiere cookies personales */}
      <Analytics />
      {/* Vercel Speed Insights - Web Vitals */}
      <SpeedInsights />

      {/* GA4 - solo si hay consentimiento explicito */}
      {analiticaHabilitada && idGA4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${idGA4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${idGA4}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {children}
    </ContextoConsentimiento.Provider>
  );
}

