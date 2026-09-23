'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { INFORMACION_NEGOCIO } from '@/estilos/tokens';

/**
 * Sección Hero — primera impresión del sitio.
 * Requirement 2: viewport completo, logo, tagline, CTAs, indicador de scroll.
 * Requirement 15: parallax en el fondo (máx. 100px), respeta prefers-reduced-motion.
 */
export default function SeccionHero() {
  const fondoRef = useRef<HTMLDivElement>(null);

  // Efecto parallax suave en el fondo (Requirement 15)
  useEffect(() => {
    const preferencia = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preferencia.matches) return; // Respetar preferencias del usuario

    const alDesplazar = () => {
      if (!fondoRef.current) return;
      // Desplazamiento máximo: 100px (Requirement 15)
      const desplazamiento = Math.min(window.scrollY * 0.3, 100);
      fondoRef.current.style.transform = `translateY(${desplazamiento}px)`;
    };

    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  /** Navegar suavemente a una sección por su ID */
  const irASeccion = (idSeccion: string) => {
    const elemento = document.getElementById(idSeccion);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      aria-label="Inicio — Vinoteca Astringencia"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Fondo con gradiente de marca (placeholder para imagen/video real) ── */}
      {/*
        TODO: Reemplazar este gradiente con la imagen/video real del local.
        Colocar la imagen en public/imagenes/hero-fondo.jpg y usar:
        style={{ backgroundImage: "url('/imagenes/hero-fondo.jpg')" }}
      */}
      <div
        ref={fondoRef}
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        style={{
          background: `
            linear-gradient(
              160deg,
              #2C1A0E 0%,
              #5C1824 30%,
              #7B2030 55%,
              #9B3040 75%,
              #2C1A0E 100%
            )
          `,
        }}
      >
        {/* Textura decorativa: círculos difusos de luz */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 20% 30%, rgba(201,168,124,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 40% 60% at 80% 70%, rgba(245,239,224,0.06) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      {/* ── Capa de oscurecimiento para legibilidad del texto ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/20"
      />

      {/* ── Contenido del Hero ────────────────────────────────────────────── */}
      <div className="relative z-10 contenedor flex flex-col items-center justify-center text-center min-h-screen py-24 gap-6">

        {/* Detalle decorativo superior */}
        <div
          aria-hidden="true"
          className="w-px h-16 bg-gradient-to-b from-transparent to-[var(--color-acento)] mb-2"
        />

        {/* Nombre del negocio (Logo prominente) */}
        <h1 className="sr-only">
          {INFORMACION_NEGOCIO.nombre} - {INFORMACION_NEGOCIO.eslogan}
        </h1>
        
        <Image
          src="/imagenes/logo-astringencia-claro-sin-uvas.png"
          alt="Logo Vinoteca Astringencia"
          width={816}
          height={258}
          className="w-[90vw] max-w-[400px] sm:max-w-[500px] h-auto object-contain mb-6"
          priority
        />

        {/* Descripción breve */}
        <p
          className="fuente-cuerpo text-[var(--color-fondo)] opacity-75 text-base tablet:text-lg max-w-[50ch] leading-relaxed"
        >
          Bar de vinos artesanal en Mendoza.
          <br />
          Un espacio para descubrir el mundo del vino con las fundadoras.
        </p>

        {/* Separador decorativo */}
        <div
          aria-hidden="true"
          className="flex items-center gap-4 my-2"
        >
          <div className="w-12 h-px bg-[var(--color-acento)]/50" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-acento)]" />
          <div className="w-12 h-px bg-[var(--color-acento)]/50" />
        </div>

        {/* CTAs (Requirement 2: "Ver Vinos" y "Visitanos") */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={() => irASeccion('vinos')}
            className="boton-secundario text-base px-8"
            style={{
              color: 'var(--color-fondo)',
              borderColor: 'var(--color-fondo)',
            }}
            aria-label="Ver la carta de vinos"
          >
            Ver Vinos
          </button>
          <button
            onClick={() => irASeccion('visitanos')}
            className="boton-secundario text-base px-8"
            style={{
              color: 'var(--color-fondo)',
              borderColor: 'var(--color-fondo)',
            }}
            aria-label="Ver información para visitarnos"
          >
            Visitanos
          </button>
        </div>
      </div>

      {/* ── Indicador de scroll (Requirement 2) ──────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >

        {/* Flecha animada con bouncing CSS */}
        <div
          className="w-6 h-6 border-r-2 border-b-2 border-[var(--color-acento)] rotate-45 animate-bounce opacity-70"
          style={{ animationDuration: '4.5s' }}
        />
      </div>
    </section>
  );
}

