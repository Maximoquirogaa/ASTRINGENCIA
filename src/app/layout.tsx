import type { Metadata } from 'next';
import { Cormorant_Garamond, Dancing_Script, DM_Sans } from 'next/font/google';
import './globals.css';
import { INFORMACION_NEGOCIO } from '@/estilos/tokens';
import BarraNavegacion from '@/componentes/layout/BarraNavegacion';
import PieDePagina from '@/componentes/layout/PieDePagina';
import BotonWhatsApp from '@/componentes/layout/BotonWhatsApp';
import DatosEstructurados from '@/componentes/seo/DatosEstructurados';
import ProveedorAnalytics from '@/componentes/analytics/ProveedorAnalytics';
import BannerCookies from '@/componentes/analytics/BannerCookies';

// Fuente serif elegante para titulos y display (Requirement 1)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--fuente-cormorant',
  display: 'swap',
  preload: true,
});

// Fuente script decorativa para taglines (Requirement 1)
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--fuente-dancing',
  display: 'swap',
  preload: true,
});

// Fuente sans-serif para cuerpo y UI (Requirement 1)
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--fuente-dm-sans',
  display: 'swap',
  preload: true,
});

// Metadatos SEO base del sitio (Requirement 14)
export const metadata: Metadata = {
  title: {
    default: 'Vinoteca Astringencia - La esquina del vino | Mendoza',
    template: '%s | Vinoteca Astringencia',
  },
  description:
    'Bar de vinos artesanal en Mendoza. Carta de vinos tintos, blancos, rosados y espumantes. Eventos de degustacion en el corazon de Mendoza, Argentina.',
  alternates: {
    canonical: `https://${INFORMACION_NEGOCIO.dominio}`,
    languages: {
      'es-AR': `https://${INFORMACION_NEGOCIO.dominio}`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: `https://${INFORMACION_NEGOCIO.dominio}`,
    siteName: INFORMACION_NEGOCIO.nombre,
    title: 'Vinoteca Astringencia - La esquina del vino | Mendoza',
    description:
      'Bar de vinos artesanal en Mendoza, Argentina. Carta de vinos seleccionados, eventos de degustacion y el mejor ambiente para explorar el mundo del vino.',
    images: [
      {
        url: `https://${INFORMACION_NEGOCIO.dominio}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vinoteca Astringencia — La esquina del vino en Mendoza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinoteca Astringencia - La esquina del vino',
    description: 'Bar de vinos artesanal en Mendoza, Argentina.',
    images: [`https://${INFORMACION_NEGOCIO.dominio}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  applicationName: INFORMACION_NEGOCIO.nombre,
  creator: 'Vinoteca Astringencia',
};

interface PropiedadesLayoutRaiz {
  children: React.ReactNode;
}

// Layout raiz: fuentes, metadatos, navegacion, analytics y pie de pagina globales.
export default function LayoutRaiz({ children }: PropiedadesLayoutRaiz) {
  return (
    <html
      lang="es-AR"
      className={`${cormorantGaramond.variable} ${dancingScript.variable} ${dmSans.variable}`}
    >
      <body className="fuente-cuerpo fondo-base antialiased">
        {/* Datos estructurados JSON-LD para SEO local (Requirement 14.1) */}
        <DatosEstructurados />

        {/* Enlace de saltar al contenido (Requirement 16: Accesibilidad WCAG 2.1) */}
        <a href="#contenido-principal" className="saltar-contenido">
          Saltar al contenido principal
        </a>

        {/* Proveedor de analytics: GA4 + Vercel Analytics + consentimiento cookies */}
        <ProveedorAnalytics>
          {/* Navegacion global */}
          <BarraNavegacion />

          {/* Contenido de cada pagina */}
          <main id="contenido-principal">
            {children}
          </main>

          {/* Pie de pagina global */}
          <PieDePagina />

          {/* Boton flotante de WhatsApp (Requirement 10) */}
          <BotonWhatsApp />

          {/* Banner de consentimiento de cookies (Requirement 20.5 - Ley 25.326) */}
          <BannerCookies />
        </ProveedorAnalytics>
      </body>
    </html>
  );
}
