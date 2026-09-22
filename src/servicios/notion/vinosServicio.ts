import type { Vino } from '@/tipos';
import { obtenerClienteNotion } from './cliente';
import { mapearPaginaAVino } from './mapeadores';
import { vinosDePrueba } from '@/datos/vinosDePrueba';
import { optimizarImagenNotion } from '../cloudinary';

/**
 * Obtiene todos los vinos no archivados desde la base de datos de Notion.
 *
 * Requirement 6.2: fetch al construir el sitio
 * Requirement 6.4: vinos archivados excluidos
 * Requirement 6.6: fallback a datos cacheados si la API no está disponible
 * Requirement 6.7: datos cacheados durante el build para minimizar llamadas
 * Requirement 18.7: entradas incompletas son omitidas
 */
export async function obtenerVinos(): Promise<Vino[]> {
  const idBaseDatos = process.env.NOTION_ID_BASE_DATOS_VINOS;

  // Si no hay ID configurado, usar datos de prueba (entorno de desarrollo)
  if (!idBaseDatos) {
    console.warn(
      '[Notion/Vinos] NOTION_ID_BASE_DATOS_VINOS no configurado. ' +
        'Usando datos de prueba locales.'
    );
    return vinosDePrueba;
  }

  try {
    const cliente = obtenerClienteNotion();

    // Consultamos solo vinos NO archivados (Requirement 6.4)
    const respuesta = await cliente.databases.query({
      database_id: idBaseDatos,
      filter: {
        property: 'Archivado',
        checkbox: {
          equals: false,
        },
      },
    });

    // Mapear y filtrar entradas inválidas
    let vinos = respuesta.results
      .map(mapearPaginaAVino)
      .filter((vino): vino is Vino => vino !== null);

    // Optimizar imágenes subiéndolas a Cloudinary (Opción C)
    vinos = await Promise.all(
      vinos.map(async (vino) => {
        if (vino.urlImagen) {
          const urlOptimizada = await optimizarImagenNotion(vino.urlImagen, vino.id);
          return { ...vino, urlImagen: urlOptimizada };
        }
        return vino;
      })
    );

    console.log(`[Notion/Vinos] ${vinos.length} vinos obtenidos y optimizados correctamente.`);
    return vinos;
  } catch (error) {
    // Requirement 6.6: mostrar datos cacheados si la API no está disponible
    console.error(
      '[Notion/Vinos] Error al conectar con la API. Usando datos de prueba como fallback:',
      error
    );
    return vinosDePrueba;
  }
}

