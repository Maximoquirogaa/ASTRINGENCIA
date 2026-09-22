import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary (solo se ejecutará en el servidor)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Recibe una URL de imagen (temporal de Notion) y la sube permanentemente a Cloudinary.
 * Si la imagen ya está en Cloudinary, devuelve la URL de Cloudinary intacta.
 *
 * @param urlImagen URL original proveniente de Notion (ej. AWS S3 temporal)
 * @param idRegistro ID único de la página de Notion (se usa como public_id para no duplicar)
 * @returns La URL segura de la imagen alojada en Cloudinary, o la URL original en caso de error.
 */
export async function optimizarImagenNotion(
  urlImagen: string | null,
  idRegistro: string
): Promise<string | null> {
  if (!urlImagen) return null;

  // Si la URL ya pertenece a Cloudinary, no hacemos nada (el administrador pudo pegar el link directo)
  if (urlImagen.includes('cloudinary.com')) {
    return urlImagen;
  }

  // Verificamos que las credenciales estén configuradas
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.warn(
      `[Cloudinary] Credenciales incompletas. Saltando optimización para registro ${idRegistro}.`
    );
    return urlImagen;
  }

  try {
    // Subimos la imagen a la carpeta 'astringencia' de Cloudinary
    // Usamos el idRegistro como public_id para sobreescribirla si se actualiza en Notion
    const respuesta = await cloudinary.uploader.upload(urlImagen, {
      folder: 'astringencia',
      public_id: idRegistro,
      overwrite: true,
    });

    console.log(`[Cloudinary] Imagen subida exitosamente para el registro ${idRegistro}`);
    return respuesta.secure_url;
  } catch (error) {
    console.error(
      `[Cloudinary] Error al intentar subir la imagen del registro ${idRegistro}. Usando URL original como fallback.`,
      error
    );
    // En caso de fallo, devolvemos la URL temporal para que al menos se vea momentáneamente
    return urlImagen;
  }
}

