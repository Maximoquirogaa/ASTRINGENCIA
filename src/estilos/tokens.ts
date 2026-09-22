/**
 * Tokens de diseño de Vinoteca Astringencia
 * Fuente única de verdad para colores, tipografías y espaciados del sistema.
 * Usar siempre estas constantes en lugar de valores hardcodeados.
 */

// ─── Paleta de colores (Requirement 1) ──────────────────────────────────────

/** Colores principales de la marca */
export const COLORES = {
  /** Color primario: vino tinto #7B2030 */
  primario: '#7B2030',
  /** Fondo secundario: crema cálido #F5EFE0 */
  fondo: '#F5EFE0',
  /** Acento dorado para elementos interactivos #C9A87C */
  acento: '#C9A87C',
  /** Color de texto principal: marrón oscuro #2C1A0E */
  texto: '#2C1A0E',
  /** Variante oscura del primario */
  primarioOscuro: '#5C1824',
  /** Variante clara del primario */
  primarioClaro: '#9B3040',
  /** Variante oscura del acento */
  acentoOscuro: '#A8895A',
  /** Variante clara del acento */
  acentoClaro: '#E0C49A',
} as const;

// ─── Tipografías (Requirement 1) ────────────────────────────────────────────

/** Familias tipográficas del proyecto */
export const TIPOGRAFIAS = {
  /** Fuente para títulos y display: Cormorant Garamond (serif elegante) */
  display: '"Cormorant Garamond", Georgia, serif',
  /** Fuente decorativa para taglines: Dancing Script (script cursivo) */
  decorativa: '"Dancing Script", cursive',
  /** Fuente de cuerpo para UI y texto: DM Sans (sans-serif legible) */
  cuerpo: '"DM Sans", system-ui, sans-serif',
} as const;

// ─── Duraciones de animación (Requirement 15) ────────────────────────────────

/** Duraciones de transición en milisegundos */
export const DURACIONES = {
  /** Transición de hover para elementos interactivos (200-300ms) */
  hover: 250,
  /** Animación de tarjetas de vino y filtros */
  tarjeta: 300,
  /** Fade-in de secciones al hacer scroll */
  seccion: 600,
  /** Scroll suave al navegar entre secciones */
  desplazamiento: 800,
} as const;

// ─── Breakpoints (Requirements 4, 13) ────────────────────────────────────────

/** Puntos de quiebre responsivos en píxeles */
export const PUNTOS_QUIEBRE = {
  /** Viewport mínimo soportado */
  movil: 320,
  /** Inicio de tablet / desktop pequeño */
  tablet: 768,
  /** Inicio de desktop estándar */
  escritorio: 1024,
  /** Desktop amplio */
  escritorioXL: 1280,
} as const;

// ─── Espaciados de sección (Business Rules) ──────────────────────────────────

/** Ritmo vertical entre secciones en píxeles */
export const ESPACIADO_SECCION = {
  movil: 80,
  tablet: 100,
  escritorio: 120,
} as const;

/** Separación entre tarjetas */
export const GAP_TARJETAS = {
  movil: 24,
  escritorio: 32,
} as const;

// ─── Límites de contenido (Business Rules) ────────────────────────────────────

/** Restricciones de tamaño de recursos */
export const PRESUPUESTO_RENDIMIENTO = {
  /** Peso máximo de la página en bytes (2MB) */
  pesoMaximoPagina: 2 * 1024 * 1024,
  /** Tamaño máximo del bundle de JavaScript (200KB) */
  bundleJsMaximo: 200 * 1024,
  /** Tamaño máximo del CSS crítico (20KB) */
  cssMaximo: 20 * 1024,
  /** LCP máximo en milisegundos */
  lcpMaximo: 2500,
  /** TTI máximo en milisegundos */
  ttiMaximo: 4000,
} as const;

// ─── Información del negocio ──────────────────────────────────────────────────

/** Datos estáticos de Vinoteca Astringencia */
export const INFORMACION_NEGOCIO = {
  nombre: 'Vinoteca Astringencia',
  eslogan: 'La esquina del vino',
  direccion: 'N. Avellaneda 598, La 5ta., Mendoza, Argentina',
  ciudad: 'Mendoza',
  pais: 'Argentina',
  dominio: 'astringencia.com.ar',
  idioma: 'es-AR',
  anioFundacion: 2026,
} as const;

// ─── Tipos de vino (Requirement 5) ───────────────────────────────────────────

/** Categorías de vino disponibles para filtrado */
export const TIPOS_VINO = ['Todos', 'Tinto', 'Blanco', 'Rosado', 'Espumante'] as const;

/** Tipo derivado de las categorías de vino */
export type TipoVino = (typeof TIPOS_VINO)[number];

