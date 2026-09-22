/**
 * Tipos TypeScript del dominio de Vinoteca Astringencia.
 * Todas las interfaces y tipos del modelo de datos del proyecto.
 */

import type { TipoVino } from '@/estilos/tokens';

// ─── Modelo de Vino (Requirements 4, 5, 6) ───────────────────────────────────

/** Representa un vino individual en la carta */
export interface Vino {
  /** Identificador único del vino (ID de Notion) */
  id: string;
  /** Nombre del vino */
  nombre: string;
  /** Bodega productora */
  bodega: string;
  /** Tipo/varietal del vino */
  tipo: Omit<TipoVino, 'Todos'>;
  /** Precio en pesos argentinos */
  precio: number;
  /** Descripción de notas de cata y características */
  descripcion: string;
  /** URL de la imagen de la botella */
  urlImagen: string | null;
  /** Indica si el vino está archivado (no mostrar) */
  archivado: boolean;
}

// ─── Modelo de Evento (Requirements 7, 8) ────────────────────────────────────

/** Estado de publicación de un evento */
export type EstadoEvento = 'publicado' | 'borrador';

/** Representa un evento o degustación */
export interface Evento {
  /** Identificador único del evento (ID de Notion) */
  id: string;
  /** Nombre del evento */
  nombre: string;
  /** Fecha del evento (ISO 8601) */
  fecha: string;
  /** Hora del evento en formato 24h (HH:MM) */
  hora: string;
  /** Descripción breve del evento */
  descripcion: string;
  /** URL de la imagen del evento */
  urlImagen: string | null;
  /** Estado de publicación en Notion */
  estado: EstadoEvento;
}

// ─── Modelo de Horario (Requirement 9) ───────────────────────────────────────

/** Días de la semana en español */
export type DiaSemana =
  | 'lunes'
  | 'martes'
  | 'miércoles'
  | 'jueves'
  | 'viernes'
  | 'sábado'
  | 'domingo';

/** Horario de apertura para un día específico */
export interface HorarioDia {
  /** Día de la semana */
  dia: DiaSemana;
  /** Hora de apertura en formato HH:MM (formato 24h) */
  apertura: string;
  /** Hora de cierre en formato HH:MM (formato 24h) */
  cierre: string;
  /** Indica si el local está cerrado ese día */
  cerrado: boolean;
}

// ─── Formulario de Contacto (Requirement 11) ─────────────────────────────────

/** Datos del formulario de contacto */
export interface DatosFormularioContacto {
  /** Nombre del visitante */
  nombre: string;
  /** Correo electrónico */
  email: string;
  /** Teléfono (opcional) */
  telefono?: string;
  /** Mensaje del visitante (mínimo 10 caracteres) */
  mensaje: string;
}

/** Estado del envío del formulario */
export type EstadoEnvio = 'inactivo' | 'enviando' | 'exitoso' | 'error';

// ─── Respuestas de la API de Notion ──────────────────────────────────────────

/** Respuesta genérica de la API de Notion al obtener datos */
export interface RespuestaNotion<T> {
  /** Datos obtenidos de Notion */
  datos: T[];
  /** Indica si hubo un error al obtener datos */
  error: boolean;
  /** Mensaje de error si corresponde */
  mensajeError?: string;
  /** Timestamp de la última actualización exitosa */
  ultimaActualizacion: string;
}

// ─── Props comunes de componentes ────────────────────────────────────────────

/** Props base para componentes de sección */
export interface PropiedadesSeccion {
  /** Clase CSS adicional opcional */
  claseAdicional?: string;
}

/** Props para la tarjeta de vino */
export interface PropiedadesTarjetaVino {
  vino: Vino;
}

/** Props para la tarjeta de evento */
export interface PropiedadesTarjetaEvento {
  evento: Evento;
}

/** Props para el filtro de vinos */
export interface PropiedadesFiltroVino {
  /** Filtro actualmente seleccionado */
  filtroActivo: TipoVino;
  /** Función que se llama al cambiar el filtro */
  alCambiarFiltro: (filtro: TipoVino) => void;
}

// ─── Metadatos del sitio (SEO) ────────────────────────────────────────────────

/** Metadatos Open Graph para una página */
export interface MetadatosOG {
  titulo: string;
  descripcion: string;
  urlImagen: string;
  url: string;
}

