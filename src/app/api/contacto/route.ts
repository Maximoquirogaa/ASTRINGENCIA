import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { DatosFormularioContacto } from '@/tipos';

// Ruta dinamica - no pre-renderizar (es un endpoint de API)
export const dynamic = 'force-dynamic';

/** Valida los datos del formulario de contacto */
function validarDatos(datos: Partial<DatosFormularioContacto>): string | null {
  if (!datos.nombre || datos.nombre.trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    return 'El email ingresado no es valido';
  }
  if (!datos.mensaje || datos.mensaje.trim().length < 10) {
    return 'El mensaje debe tener al menos 10 caracteres';
  }
  return null;
}

/**
 * Endpoint para el formulario de contacto.
 * Requirement 11: recibe nombre, email y mensaje. Valida y procesa el envio.
 * TODO Paso 5: integrar con servicio de email (Resend, SendGrid, Nodemailer).
 */
export async function POST(solicitud: NextRequest) {
  let datos: Partial<DatosFormularioContacto>;

  // Parsear el cuerpo de la solicitud
  try {
    datos = await solicitud.json();
  } catch {
    return NextResponse.json(
      { exito: false, mensaje: 'Formato de datos invalido' },
      { status: 400 }
    );
  }

  // Validar los campos del formulario
  const errorValidacion = validarDatos(datos);
  if (errorValidacion) {
    return NextResponse.json(
      { exito: false, mensaje: errorValidacion },
      { status: 422 }
    );
  }

  // Loguear el contacto recibido (en produccion aqui va el envio de email)
  console.log('[Contacto] Nuevo mensaje recibido:', {
    nombre: datos.nombre,
    email: datos.email,
    mensajePreview: datos.mensaje!.substring(0, 50),
    momento: new Date().toISOString(),
  });

  // Inicializar Resend con la API Key del archivo .env
  const resend = new Resend(process.env.SERVICIO_EMAIL_API_KEY);

  try {
    // TODO: Ajustar el "from" según la decisión en el Paso 4
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Correo temporal para pruebas
      to: process.env.EMAIL_DESTINO as string,
      subject: `Nuevo contacto de ${datos.nombre}`,
      text: `Nombre: ${datos.nombre}\nEmail: ${datos.email}\nMensaje: ${datos.mensaje}`,
    });
  } catch (error) {
    console.error('[Contacto] Error enviando email con Resend:', error);
    return NextResponse.json(
      { exito: false, mensaje: 'Hubo un error al enviar el mensaje. Inténtalo más tarde.' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    exito: true,
    mensaje: 'Tu mensaje fue enviado correctamente. Te respondemos pronto.',
  });
}

