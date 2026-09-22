/** @type {import('next').NextConfig} */
const configuracionNext = {
  // Excluir paquetes pesados del bundle de webpack para que Node.js los resuelva
  // en runtime directamente. Evita conflictos de chunks en Next.js 15.5.x (Req. 6.7)
  serverExternalPackages: ['@notionhq/client'],

  // Habilitar optimización de imágenes con WebP automático
  images: {
    formats: ['image/webp', 'image/avif'],
    // Dominios permitidos para imágenes externas (Notion, Cloudinary)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.notion.so',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Encabezados HTTP de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default configuracionNext;

