/**
 * Barrel export del módulo de servicios de Notion.
 * Importar desde aquí en lugar de los archivos individuales.
 *
 * Uso:
 *   import { obtenerVinos, obtenerEventos } from '@/servicios/notion';
 */
export { obtenerVinos } from './vinosServicio';
export { obtenerEventos } from './eventosServicio';
export { obtenerClienteNotion } from './cliente';
export { mapearPaginaAVino, mapearPaginaAEvento } from './mapeadores';

