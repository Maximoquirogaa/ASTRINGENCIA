import { Client } from '@notionhq/client';

/**
 * Cliente singleton de la API de Notion.
 * Se inicializa una sola vez durante el proceso de build para minimizar
 * la cantidad de conexiones abiertas.
 * Requirement 6.7: "cache Notion data during build time to minimize API calls"
 */
let clienteNotion: Client | null = null;

/**
 * Devuelve el cliente de Notion inicializado.
 * Lanza un error descriptivo si el token no está configurado.
 */
export function obtenerClienteNotion(): Client {
  if (clienteNotion) return clienteNotion;

  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error(
      '[Notion] La variable de entorno NOTION_TOKEN no está configurada. ' +
        'Copiá .env.local.example como .env.local y completá el token.'
    );
  }

  clienteNotion = new Client({
    auth: token,
    // Timeout de 10 segundos para no bloquear el build
    timeoutMs: 10_000,
  });

  return clienteNotion;
}

