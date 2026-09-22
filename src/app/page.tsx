import type { Metadata } from 'next';
import SeccionHero from '@/componentes/secciones/SeccionHero';
import SeccionNosotros from '@/componentes/secciones/SeccionNosotros';
import SeccionShowroom from '@/componentes/showroom/SeccionShowroom';
import SeccionEventos from '@/componentes/eventos/SeccionEventos';
import SeccionVisitanos from '@/componentes/secciones/SeccionVisitanos';
import SeccionContacto from '@/componentes/secciones/SeccionContacto';
import {obtenerVinos, obtenerEventos} from '@/servicios/notion'
// ─── Metadatos de la página principal ────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Vinoteca Astringencia — La esquina del vino | Mendoza',
  description:
    'Descubrí Vinoteca Astringencia, tu bar de vinos artesanal en Mendoza. Carta de vinos seleccionados, eventos de degustación y el mejor ambiente para explorar el mundo del vino.',
};

/**
 * Página principal del sitio de Vinoteca Astringencia.
 * Composición de todas las secciones en orden vertical.
 * En el Paso 3, los datos de vinos y eventos vendrán de Notion CMS.
 */
export default async function PaginaPrincipal() {
    const vinos = await obtenerVinos();
    const eventos = await obtenerEventos();

  return (
    <>
      {/* 1. Hero — primera impresión (Requirement 2) */}
      <SeccionHero />

      {/* 2. Nosotros — historia y filosofía (Requirement 3) */}
      <SeccionNosotros />

      {/* 3. Showroom — carta de vinos con filtrado (Requirements 4, 5) */}
      <SeccionShowroom vinos={vinos} />

      {/* 4. Eventos — próximas degustaciones (Requirements 7, 8) */}
      <SeccionEventos eventos={eventos} />

      {/* 5. Visitanos — dirección y horarios (Requirement 9) */}
      <SeccionVisitanos />

      {/* 6. Contacto — WhatsApp y formulario (Requirements 10, 11) */}
      <SeccionContacto />
    </>
  );
}
