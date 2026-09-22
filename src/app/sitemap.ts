import type { MetadataRoute } from 'next';

const DOMINIO = 'https://astringencia.com.ar';

/**
 * sitemap.xml generado automaticamente por Next.js.
 * Requirement 14.8: sitemap.xml para indexacion de buscadores.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMINIO,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${DOMINIO}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

