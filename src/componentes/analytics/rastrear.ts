/**
 * Utilidades de rastreo de eventos para Google Analytics 4.
 * Requirement 20.2: eventos personalizados para filtro de vinos,
 * clicks de WhatsApp y envio del formulario de contacto.
 * Requirement 20.4: respeta el ajuste Do Not Track del navegador.
 */

/** Verifica si el usuario activo el Do Not Track */
function doNotTrackActivo(): boolean {
  if (typeof navigator === 'undefined') return false;
  return navigator.doNotTrack === '1';
}

/** Verifica si gtag esta disponible (GA4 cargado) */
function gtagDisponible(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Registra un evento personalizado en GA4 */
function enviarEventoGA4(
  nombre: string,
  parametros?: Record<string, string | number>
): void {
  if (doNotTrackActivo() || !gtagDisponible()) return;
  try {
    window.gtag('event', nombre, parametros);
  } catch (error) {
    console.warn('[Analytics] Error al enviar evento:', error);
  }
}

// --- Eventos especificos del negocio ---

/** Req 20.2: rastrear cuando el visitante cambia el filtro de vinos */
export function rastrearFiltroVino(tipo: string): void {
  enviarEventoGA4('filtro_vino_usado', { tipo_vino: tipo });
}

/** Req 20.2: rastrear click en el boton de WhatsApp */
export function rastrearClickWhatsApp(origen: 'flotante' | 'contacto' | 'evento'): void {
  enviarEventoGA4('whatsapp_click', { origen });
}

/** Req 20.2: rastrear envio exitoso del formulario de contacto */
export function rastrearEnvioFormulario(): void {
  enviarEventoGA4('formulario_contacto_enviado');
}

/** Req 20.3: rastrear profundidad de scroll (25%, 50%, 75%, 100%) */
export function rastrearScroll(porcentaje: 25 | 50 | 75 | 100): void {
  enviarEventoGA4('scroll', { percent_scrolled: porcentaje });
}

// Extender el tipo global Window para gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

