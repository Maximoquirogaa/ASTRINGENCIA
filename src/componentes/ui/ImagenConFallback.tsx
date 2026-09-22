'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropiedadesImagenConFallback {
  /** URL de la imagen principal */
  src: string | null;
  /** Texto alternativo para accesibilidad */
  alt: string;
  /** Clases CSS adicionales para el contenedor */
  claseContenedor?: string;
  /** Clases CSS adicionales para la imagen */
  claseImagen?: string;
  /** Texto que se muestra en el placeholder cuando no hay imagen */
  textoPaceholder?: string;
}

/**
 * Componente de imagen con fallback elegante usando colores de marca.
 * Requirement 4: "WHEN a Wine_Card image fails to load, THE Website SHALL
 * display a placeholder image with the brand colors"
 */
export default function ImagenConFallback({
  src,
  alt,
  claseContenedor = '',
  claseImagen = '',
  textoPaceholder,
}: PropiedadesImagenConFallback) {
  const [errorCarga, setErrorCarga] = useState(false);

  // Mostrar placeholder si no hay src o si falló la carga
  if (!src || errorCarga) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#7B2030] to-[#5C1824] ${claseContenedor}`}
        aria-label={alt}
        role="img"
      >
        {/* Ícono decorativo de copa de vino */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className="opacity-40"
        >
          <path
            d="M14 6h20l-4 16a6 6 0 01-12 0L14 6z"
            stroke="#F5EFE0"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 28v8M18 36h12"
            stroke="#F5EFE0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="42" r="1" fill="#C9A87C" />
        </svg>

        {textoPaceholder && (
          <span className="mt-2 text-xs text-[var(--color-fondo)] opacity-60 fuente-cuerpo px-2 text-center">
            {textoPaceholder}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${claseContenedor}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${claseImagen}`}
        onError={() => setErrorCarga(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}

