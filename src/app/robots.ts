import type { MetadataRoute } from 'next';

/**
 * robots.txt generado automaticamente.
 * Requirement 14.9: robots.txt permitiendo todos los buscadores.
 * Bloquea las rutas de API para que no sean indexadas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://astringencia.com.ar/sitemap.xml',
    host: 'https://astringencia.com.ar',
  };
}

