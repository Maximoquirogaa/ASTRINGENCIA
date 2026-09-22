import type { Config } from 'tailwindcss';

// Configuración de Tailwind CSS con los tokens de diseño de Vinoteca Astringencia
const configuracion: Config = {
  // Archivos donde Tailwind detecta clases utilizadas
  content: [
    './src/paginas/**/*.{js,ts,jsx,tsx,mdx}',
    './src/componentes/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ─── Paleta de colores de marca (Requirement 1) ───────────────────
      colors: {
        // Color primario de marca: vino tinto
        primario: '#7B2030',
        // Color de fondo secundario: crema cálido
        fondo: '#F5EFE0',
        // Color de acento para elementos interactivos: dorado
        acento: '#C9A87C',
        // Color de texto principal: marrón oscuro
        texto: '#2C1A0E',
        // Variantes del color primario
        'primario-oscuro': '#5C1824',
        'primario-claro': '#9B3040',
        // Variantes del acento
        'acento-oscuro': '#A8895A',
        'acento-claro': '#E0C49A',
      },

      // ─── Tipografía (Requirement 1) ───────────────────────────────────
      fontFamily: {
        // Fuente para títulos principales y display
        display: ['var(--fuente-cormorant)', 'Georgia', 'serif'],
        // Fuente decorativa para taglines y texto ornamental
        decorativa: ['var(--fuente-dancing)', 'cursive'],
        // Fuente para cuerpo de texto y elementos de UI
        cuerpo: ['var(--fuente-dm-sans)', 'system-ui', 'sans-serif'],
      },

      // ─── Escala tipográfica fluida (Requirement 13) ───────────────────
      fontSize: {
        // Tamaños fluidos: mobile 14px → desktop 18px para cuerpo
        'cuerpo-sm': ['0.875rem', { lineHeight: '1.6' }],
        'cuerpo-base': ['1rem', { lineHeight: '1.65' }],
        'cuerpo-lg': ['1.125rem', { lineHeight: '1.7' }],
        // Escala de títulos con ratio 1.25 (mobile) / 1.333 (desktop)
        'titulo-xs': ['1.25rem', { lineHeight: '1.3' }],
        'titulo-sm': ['1.5rem', { lineHeight: '1.25' }],
        'titulo-md': ['2rem', { lineHeight: '1.2' }],
        'titulo-lg': ['2.5rem', { lineHeight: '1.15' }],
        'titulo-xl': ['3.5rem', { lineHeight: '1.1' }],
        'titulo-2xl': ['4.5rem', { lineHeight: '1.05' }],
      },

      // ─── Espaciado (Business Rules: ritmo vertical 80-120px) ──────────
      spacing: {
        // Ritmo vertical entre secciones
        'seccion-sm': '80px',
        'seccion-md': '100px',
        'seccion-lg': '120px',
        // Separación entre tarjetas (24px mobile, 32px desktop)
        'tarjeta-gap-movil': '24px',
        'tarjeta-gap-escritorio': '32px',
      },

      // ─── Breakpoints responsivos (Requirement 4, 13) ──────────────────
      screens: {
        // Mobile viewport: < 768px (manejado por defecto en Tailwind)
        // Tablet: 768px - 1024px
        tablet: '768px',
        // Desktop: > 1024px
        escritorio: '1024px',
        // Desktop amplio
        'escritorio-xl': '1280px',
      },

      // ─── Animaciones y transiciones (Requirement 15) ──────────────────
      transitionDuration: {
        // Transición para hover de elementos interactivos
        hover: '250ms',
        // Animación de tarjetas de vino
        tarjeta: '300ms',
        // Fade-in de secciones al hacer scroll
        seccion: '600ms',
        // Scroll suave al navegar
        desplazamiento: '800ms',
      },

      keyframes: {
        // Aparición gradual para secciones al hacer scroll
        'aparecer-suave': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Desvanecimiento de tarjetas al cambiar filtro
        'desvanecer-entrada': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'desvanecer-salida': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },

      animation: {
        'aparecer-suave': 'aparecer-suave 600ms ease-out forwards',
        'desvanecer-entrada': 'desvanecer-entrada 300ms ease-out forwards',
        'desvanecer-salida': 'desvanecer-salida 300ms ease-in forwards',
      },

      // ─── Anchos máximos de contenido ──────────────────────────────────
      maxWidth: {
        // Ancho máximo de contenido principal
        contenido: '1200px',
        // Ancho máximo de párrafos (Requirement 3: 65 caracteres ≈ 65ch)
        parrafo: '65ch',
        // Ancho máximo de formularios
        formulario: '600px',
      },
    },
  },

  plugins: [],
};

export default configuracion;

