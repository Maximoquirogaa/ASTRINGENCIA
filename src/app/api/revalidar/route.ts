import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Forzar ruta dinamica (no pre-renderizar este endpoint)
export const dynamic = 'force-dynamic';

/**
 * POST /api/revalidar
 * Webhook para revalidar el sitio cuando Notion actualiza contenido.
 * Requirement 18.4: webhook de Notion dispara builds automaticos.
 * Requirement 18.5: rebuild completado en menos de 2 minutos.
 *
 * Configuracion en Notion:
 * 1. Ir a la integracion de Notion -> Connections
 * 2. Agregar webhook apuntando a: https://astringencia.com.ar/api/revalidar
 * 3. Metodo: POST, Header: x-webhook-secret: [valor de WEBHOOK_SECRET en .env]
 *
 * Estrategia dual:
 * - revalidatePath('/') -> ISR: regenera la pagina en la proxima solicitud
 * - Deploy hook de Vercel -> rebuild completo para cambios grandes
 */
export async function POST(solicitud: NextRequest) {
  // Validacion de seguridad por header secreto
  const claveEnviada = solicitud.headers.get('x-webhook-secret');
  const claveEsperada = process.env.WEBHOOK_SECRET;

  if (claveEsperada && claveEnviada !== claveEsperada) {
    console.warn('[Webhook] Intento de acceso con secret invalido');
    return NextResponse.json(
      { error: 'No autorizado', mensaje: 'Secret de webhook invalido' },
      { status: 401 }
    );
  }

  // Leer cuerpo del webhook (para logging)
  let cuerpoWebhook: Record<string, unknown> = {};
  try {
    cuerpoWebhook = await solicitud.json();
  } catch {
    // El cuerpo puede estar vacio - no es error critico
  }

  const momento = new Date().toISOString();
  console.log(`[Webhook] Revalidacion disparada a las ${momento}`, {
    origen: cuerpoWebhook?.source ?? 'desconocido',
  });

  try {
    // Estrategia 1: ISR - revalida la pagina principal inmediatamente
    revalidatePath('/');
    console.log('[Webhook] Revalidacion ISR de "/" completada');

    // Estrategia 2 (opcional): Deploy hook de Vercel para rebuild completo
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (deployHookUrl) {
      const respuestaVercel = await fetch(deployHookUrl, { method: 'POST' });
      if (respuestaVercel.ok) {
        console.log('[Webhook] Deploy hook de Vercel disparado exitosamente');
      } else {
        console.warn('[Webhook] Deploy hook respondio con error:', respuestaVercel.status);
      }
    }

    return NextResponse.json({
      revalidado: true,
      momento,
      estrategia: deployHookUrl ? 'ISR + deploy hook' : 'ISR',
      mensaje: 'Sitio revalidado correctamente. Los cambios apareceran en breve.',
    });
  } catch (error) {
    const mensajeError = error instanceof Error ? error.message : String(error);
    console.error('[Webhook] Error al revalidar:', mensajeError);

    return NextResponse.json(
      {
        revalidado: false,
        momento,
        error: 'Error interno al revalidar el sitio',
        detalle: mensajeError,
      },
      { status: 500 }
    );
  }
}

// GET /api/revalidar - endpoint de salud para verificar que el webhook esta activo
export async function GET() {
  return NextResponse.json({
    estado: 'activo',
    endpoint: '/api/revalidar',
    descripcion: 'Webhook de revalidacion de Vinoteca Astringencia',
    uso: 'Enviar POST con header x-webhook-secret para revalidar el sitio',
  });
}
