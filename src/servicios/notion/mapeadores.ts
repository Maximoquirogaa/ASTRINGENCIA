/**
 * Mapeadores de respuesta de la API de Notion a tipos TypeScript del dominio.
 * Requirement 18.7: valida campos requeridos y omite entradas incompletas.
 * Requirement 18.8: loguea errores claros cuando los datos de Notion son malformados.
 */

// Usamos 'any' aquí de forma controlada porque la API de Notion
// devuelve tipos de propiedades muy heterogéneos que no podemos tipar estrictamente
// sin replicar la totalidad de los tipos del SDK.
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Vino, Evento } from '@/tipos';

// ─── Extractores de valores por tipo de propiedad ────────────────────────────

/**
 * Extrae texto plano de propiedades de tipo "title" o "rich_text"
 */
function extraerTexto(propiedad: any): string {
  if (!propiedad) return '';
  if (propiedad.type === 'title') {
    return propiedad.title?.map((bloque: any) => bloque.plain_text).join('') ?? '';
  }
  if (propiedad.type === 'rich_text') {
    return propiedad.rich_text?.map((bloque: any) => bloque.plain_text).join('') ?? '';
  }
  return '';
}

/**
 * Extrae el nombre de la opción seleccionada en propiedades de tipo "select"
 */
function extraerSeleccion(propiedad: any): string {
  if (!propiedad || propiedad.type !== 'select') return '';
  return propiedad.select?.name ?? '';
}

/**
 * Extrae el valor numérico de propiedades de tipo "number"
 */
function extraerNumero(propiedad: any): number {
  if (!propiedad || propiedad.type !== 'number') return 0;
  return propiedad.number ?? 0;
}

/**
 * Extrae el valor booleano de propiedades de tipo "checkbox"
 */
function extraerCheckbox(propiedad: any): boolean {
  if (!propiedad || propiedad.type !== 'checkbox') return false;
  return propiedad.checkbox ?? false;
}

/**
 * Extrae la URL de imagen de propiedades de tipo "files" o "url".
 * Las imágenes en Notion pueden ser archivos subidos o URLs externas.
 */
function extraerUrlImagen(propiedad: any): string | null {
  if (!propiedad) return null;

  // Propiedad de tipo "files" (archivos subidos o links externos en Notion)
  if (propiedad.type === 'files' && Array.isArray(propiedad.files) && propiedad.files.length > 0) {
    const primerArchivo = propiedad.files[0];
    if (primerArchivo.type === 'file') return primerArchivo.file?.url ?? null;
    if (primerArchivo.type === 'external') return primerArchivo.external?.url ?? null;
  }

  // Propiedad de tipo "url" (texto de URL directo)
  if (propiedad.type === 'url') return propiedad.url ?? null;

  return null;
}

/**
 * Extrae la fecha ISO 8601 de propiedades de tipo "date"
 */
function extraerFecha(propiedad: any): string {
  if (!propiedad || propiedad.type !== 'date') return '';
  return propiedad.date?.start ?? '';
}

// ─── Tipos de vino válidos (Requirement 5) ───────────────────────────────────

const TIPOS_VINO_VALIDOS = ['Tinto', 'Blanco', 'Rosado', 'Espumante'] as const;

// ─── Mapeadores principales ───────────────────────────────────────────────────

/**
 * Convierte una página de la base de datos de vinos de Notion
 * en un objeto Vino del dominio.
 * Devuelve null si los campos requeridos están incompletos.
 */
export function mapearPaginaAVino(pagina: any): Vino | null {
  try {
    const props = pagina.properties as any;

    // Campo requerido: Nombre (título de la página)
    const nombre = extraerTexto(props['Nombre'] ?? props['Name']);
    if (!nombre.trim()) {
      console.warn(`[Notion] Vino omitido — falta campo "Nombre" en página ${pagina.id}`);
      return null;
    }

    // Campo requerido: Tipo (debe ser uno de los valores válidos)
    const tipo = extraerSeleccion(props['Tipo'] ?? props['Type']);
    if (!TIPOS_VINO_VALIDOS.includes(tipo as any)) {
      console.warn(
        `[Notion] Vino "${nombre}" omitido — tipo "${tipo}" no es válido. ` +
          `Opciones válidas: ${TIPOS_VINO_VALIDOS.join(', ')}`
      );
      return null;
    }

    return {
      id: pagina.id,
      nombre,
      bodega: extraerTexto(props['Bodega'] ?? props['Winery']) || 'Bodega sin especificar',
      tipo: tipo as Vino['tipo'],
      precio: extraerNumero(props['Precio'] ?? props['Price']),
      descripcion: extraerTexto(props['Descripcion'] ?? props['Description']),
      urlImagen: extraerUrlImagen(props['Imagen'] ?? props['Image']),
      archivado: extraerCheckbox(props['Archivado'] ?? props['Archived']),
    };
  } catch (error) {
    // Requirement 18.8: loguear errores claros
    console.error(`[Notion] Error al mapear vino con página ID ${pagina.id}:`, error);
    return null;
  }
}

/**
 * Convierte una página de la base de datos de eventos de Notion
 * en un objeto Evento del dominio.
 * Devuelve null si los campos requeridos están incompletos.
 */
export function mapearPaginaAEvento(pagina: any): Evento | null {
  try {
    const props = pagina.properties as any;

    // Campo requerido: Nombre
    const nombre = extraerTexto(props['Nombre'] ?? props['Name']);
    if (!nombre.trim()) {
      console.warn(`[Notion] Evento omitido — falta campo "Nombre" en página ${pagina.id}`);
      return null;
    }

    // Campo requerido: Fecha
    const fecha = extraerFecha(props['Fecha'] ?? props['Date']);
    if (!fecha) {
      console.warn(`[Notion] Evento "${nombre}" omitido — falta campo "Fecha"`);
      return null;
    }

    // Estado: normalizar entre español e inglés
    const estadoCrudo = extraerSeleccion(props['Estado'] ?? props['Status']).toLowerCase();
    const estado: Evento['estado'] =
      estadoCrudo === 'publicado' || estadoCrudo === 'published' ? 'publicado' : 'borrador';

    return {
      id: pagina.id,
      nombre,
      fecha,
      hora: extraerTexto(props['Hora'] ?? props['Time']) || '20:00',
      descripcion: extraerTexto(props['Descripcion'] ?? props['Description']),
      urlImagen: extraerUrlImagen(props['Imagen'] ?? props['Image']),
      estado,
    };
  } catch (error) {
    console.error(`[Notion] Error al mapear evento con página ID ${pagina.id}:`, error);
    return null;
  }
}

