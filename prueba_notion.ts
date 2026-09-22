import { config } from 'dotenv';

config({ path: '.env.local.example' });// Carga las variables del .env

// 1. Pega aquí directamente los IDs de tus dos bases de datos
const id_base_vino: string ="190059f3ae308255ac0a015961a6839f";
const id_base_eventos: string ="ea5059f3ae308268bc17019bdb0ce8a7";

// 2. Agregamos los tipos (string y Promise<void>) a la función
async function consultarBaseDatos(id_objetivo: string, nombre_referencia: string): Promise<void> {
    const token_notion: string | undefined = process.env.NOTION_TOKEN;
    
    // TypeScript requiere que nos aseguremos de que el token existe
    if (!token_notion) {
        console.error("Falta el NOTION_TOKEN en tu archivo .env local.");
        return;
    }

    const direccion_api: string = `https://api.notion.com/v1/databases/${id_objetivo}/query`;

    const cabeceras: Record<string, string> = {
        "Authorization": `Bearer ${token_notion}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    };

    // Usamos RequestInit para tipar las opciones de fetch
    const opciones_peticion: RequestInit = {
        method: 'POST',
        headers: cabeceras
    };

    try {
        const respuesta: Response = await fetch(direccion_api, opciones_peticion);
        const datos: any = await respuesta.json();

        if (respuesta.ok) {
            console.log(`\n--- ¡Éxito leyendo la base de datos: ${nombre_referencia}! ---`);
            console.log(datos); 
        } else {
            console.error(`\n--- Error en ${nombre_referencia} ---`);
            console.error(datos);
        }
    } catch (error_conexion) {
        console.error("Fallo la petición de red:", error_conexion);
    }
}

// 3. Ejecutamos la prueba
consultarBaseDatos(id_base_vino, "Vinos");
consultarBaseDatos(id_base_eventos, "Eventos");