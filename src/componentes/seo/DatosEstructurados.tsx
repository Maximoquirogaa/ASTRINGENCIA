/**
 * Datos estructurados JSON-LD para Vinoteca Astringencia.
 * Requirement 14.1: Schema.org LocalBusiness con informacion completa.
 * Requirement 14.2: nombre, direccion, horarios y rango de precios.
 */

const datosNegocio = {
  '@context': 'https://schema.org',
  '@type': ['BarOrPub', 'LocalBusiness'],
  name: 'Vinoteca Astringencia',
  alternateName: 'Astringencia',
  description:
    'Bar de vinos artesanal en Mendoza, Argentina. Seleccion de vinos mendocinos y del pais para explorar con amigos.',
  url: 'https://astringencia.com.ar',
  logo: 'https://astringencia.com.ar/logo.png',
  image: 'https://astringencia.com.ar/og-image.jpg',
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? '',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'N. Avellaneda 598',
    addressLocality: 'Mendoza',
    addressRegion: 'Mendoza',
    postalCode: '5500',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -32.89,
    longitude: -68.85,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '18:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '17:00',
      closes: '02:00',
    },
  ],
  priceRange: '$$',
  servesCuisine: ['Wine Bar'],
  foundingDate: '2026',
  inLanguage: 'es-AR',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Cash, Credit Card',
  sameAs: [],
};

/**
 * Componente Server Component que inyecta JSON-LD en el <head>.
 * No renderiza nada visible - solo el script de datos estructurados.
 */
export default function DatosEstructurados() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datosNegocio) }}
    />
  );
}

