import type { Evento } from '@/tipos';

/**
 * Datos de eventos de prueba para desarrollo en local.
 * Serán reemplazados por datos reales de Notion CMS en el Paso 3.
 * Requirement 7: solo se muestran máximo 3 eventos próximos no pasados.
 */
export const eventosDePrueba: Evento[] = [
  {
    id: 'e001',
    nombre: 'Cata de Malbec: Terroir Mendocino',
    fecha: '2026-10-15T00:00:00',
    hora: '19:00',
    descripcion:
      'Recorremos tres valles emblemáticos de Mendoza a través de seis expresiones de Malbec. Incluye maridaje con quesos artesanales.',
    urlImagen: null,
    estado: 'publicado',
  },
  {
    id: 'e002',
    nombre: 'Tarde de Vinos Naranjos',
    fecha: '2026-10-28T00:00:00',
    hora: '17:30',
    descripcion:
      'Exploramos el fascinante mundo de los vinos de maceración. Una tarde para redescubrir el vino blanco desde otro ángulo.',
    urlImagen: null,
    estado: 'publicado',
  },
  {
    id: 'e003',
    nombre: 'Maridaje: Vino y Chocolate Artesanal',
    fecha: '2026-11-08T00:00:00',
    hora: '18:00',
    descripcion:
      'Una experiencia sensorial única: los mejores vinos tintos de nuestra carta junto a chocolates artesanales de Mendoza.',
    urlImagen: null,
    estado: 'publicado',
  },
];

