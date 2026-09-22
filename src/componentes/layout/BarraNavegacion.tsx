'use client';

import { useState, useEffect } from 'react';
import { INFORMACION_NEGOCIO } from '@/estilos/tokens';

/** Elementos del menú de navegación */
const elementosNavegacion = [
  { etiqueta: 'Nosotros', ancla: '#nosotros' },
  { etiqueta: 'Vinos', ancla: '#vinos' },
  { etiqueta: 'Eventos', ancla: '#eventos' },
  { etiqueta: 'Visitanos', ancla: '#visitanos' },
  { etiqueta: 'Contacto', ancla: '#contacto' },
] as const;

/**
 * Barra de navegación principal del sitio.
 * Requirement 13: hamburguesa en mobile, horizontal en desktop.
 * Se vuelve sólida al hacer scroll para mantener legibilidad.
 */
export default function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  // Detectar si el usuario hizo scroll para cambiar el fondo de la barra
  useEffect(() => {
    const alDesplazar = () => {
      setDesplazado(window.scrollY > 120);
    };

    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  // Cerrar menú móvil al cambiar el tamaño de pantalla a desktop
  useEffect(() => {
    const alRedimensionar = () => {
      if (window.innerWidth >= 768) {
        setMenuAbierto(false);
      }
    };
    window.addEventListener('resize', alRedimensionar);
    return () => window.removeEventListener('resize', alRedimensionar);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAbierto]);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        desplazado || menuAbierto
          ? 'bg-[var(--color-primario)] shadow-lg'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
      role="banner"
    >
      <nav
        className="contenedor flex items-center justify-between py-4"
        aria-label="Navegación principal"
      >
        {/* ── Logo ──────────────────────────────────────────────────────────── */}
        <a
          href="#inicio"
          onClick={cerrarMenu}
          aria-label={`Ir al inicio — ${INFORMACION_NEGOCIO.nombre}`}
          className="flex flex-col leading-none group"
        >
          <span className="fuente-display text-[var(--color-fondo)] text-2xl font-semibold group-hover:text-[var(--color-acento)] transition-colors duration-[var(--duracion-hover)]">
            Astringencia
          </span>
          <span className="fuente-decorativa text-[var(--color-acento)] text-sm -mt-0.5">
            {INFORMACION_NEGOCIO.eslogan}
          </span>
        </a>

        {/* ── Navegación desktop ────────────────────────────────────────────── */}
        <ul
          className="hidden tablet:flex gap-8 items-center"
          role="list"
          aria-label="Menú principal"
        >
          {elementosNavegacion.map((elemento) => (
            <li key={elemento.ancla}>
              <a
                href={elemento.ancla}
                className="fuente-cuerpo text-[var(--color-fondo)] text-sm font-medium tracking-widest uppercase hover:text-[var(--color-acento)] transition-colors duration-[var(--duracion-hover)] relative group"
              >
                {elemento.etiqueta}
                {/* Subrayado animado en hover */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-acento)] group-hover:w-full transition-all duration-[var(--duracion-hover)]" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Botón hamburguesa (mobile) ────────────────────────────────────── */}
        <button
          className="tablet:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center rounded"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          {/* Las 3 líneas del ícono hamburguesa se animan en X al abrir */}
          <span
            className={`block w-6 h-0.5 bg-[var(--color-fondo)] origin-center transition-all duration-300 ${
              menuAbierto ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--color-fondo)] transition-all duration-300 ${
              menuAbierto ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--color-fondo)] origin-center transition-all duration-300 ${
              menuAbierto ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* ── Menú móvil desplegable ─────────────────────────────────────────── */}
      <div
        id="menu-movil"
        role="navigation"
        aria-label="Menú móvil"
        aria-hidden={!menuAbierto}
        className={`tablet:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuAbierto ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <ul className="contenedor flex flex-col pb-6 pt-2 gap-1" role="list">
          {elementosNavegacion.map((elemento) => (
            <li key={elemento.ancla}>
              <a
                href={elemento.ancla}
                onClick={cerrarMenu}
                className="flex items-center py-3 fuente-cuerpo text-[var(--color-fondo)] text-lg font-medium hover:text-[var(--color-acento)] transition-colors border-b border-white/10 gap-2"
              >
                <span className="text-[var(--color-acento)] text-xs">◆</span>
                {elemento.etiqueta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

