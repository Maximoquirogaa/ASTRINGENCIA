import type { Evento } from '@/tipos';
import { obtenerClienteNotion } from './cliente';
import { mapearPaginaAEvento } from './mapeadores';
import { eventosDePrueba } from '@/datos/eventosDePrueba';
import { optimizarImagenNotion } from '../cloudinary';

/**
 * Obtiene todos los eventos publicados desde la base de datos de Notion,
 * ordenados cronológicamente de forma ascendente.
 *
 * Requirement 8.2: fetch al construir el sitio
 * Requirement 8.3: solo eventos en estado "publicado" se muestran
 * Requirement 8.4: eventos en estado "borrador" son excluidos
 * Requirement 8.5: ordenados por fecha ascendente
 * Requirement 8.6: imágenes faltantes usan placeholder (manejado en el componente)
 */
export async function obtenerEventos(): Promise<Evento[]> {
  const idBaseDatos = process.env.NOTION_ID_BASE_DATOS_EVENTOS;

  // Si no hay ID configurado, usar datos de prueba (entorno de desarrollo)
  if (!idBaseDatos) {
    console.warn(
      '[Notion/Eventos] NOTION_ID_BASE_DATOS_EVENTOS no configurado. ' +
        'Usando datos de prueba locales.'
    );
    return eventosDePrueba;
  }

  try {
    const cliente = obtenerClienteNotion();

    // Filtramos solo publicados y ordenamos por fecha (Requirement 8.3, 8.4, 8.5)
    const respuesta = await cliente.databases.query({
      database_id: idBaseDatos,
      filter: {
        property: 'Estado',
        select: {
          equals: 'publicado',
        },
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'ascending',
        },
      ],
    });

    let eventos = respuesta.results
      .map(mapearPaginaAEvento)
      .filter((evento): evento is Evento => evento !== null);

    // Optimizar imágenes subiéndolas a Cloudinary (Opción C)
    eventos = await Promise.all(
      eventos.map(async (evento) => {
        if (evento.urlImagen) {
          const urlOptimizada = await optimizarImagenNotion(evento.urlImagen, evento.id);
          return { ...evento, urlImagen: urlOptimizada };
        }
        return evento;
      })
    );

    console.log(`[Notion/Eventos] ${eventos.length} eventos obtenidos y optimizados correctamente.`);
    return eventos;
  } catch (error) {
    console.error(
      '[Notion/Eventos] Error al conectar con la API. Usando datos de prueba como fallback:',
      error
    );
    return eventosDePrueba;
  }
}

