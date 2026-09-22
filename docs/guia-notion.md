# Guía de Notion CMS — Vinoteca Astringencia

Esta guía explica cómo gestionar el contenido del sitio desde Notion sin tocar código.
Todas las actualizaciones de vinos y eventos se hacen desde acá.

---

## Configuración inicial (una sola vez)

### 1. Crear la integración de Notion

1. Ir a [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Hacer clic en **"Nueva integración"**
3. Nombre: `Vinoteca Astringencia`
4. Asociar al workspace correcto
5. Copiar el **Token secreto** → pegarlo como `NOTION_TOKEN` en `.env.local`

### 2. Crear las bases de datos

Crear dos bases de datos en Notion: una para **Vinos** y otra para **Eventos**.

> **Importante**: los nombres de las propiedades deben ser exactamente como se indican abajo (respetan mayúsculas y acentos).

---

## Base de datos de Vinos

### Propiedades requeridas

| Propiedad | Tipo en Notion | Descripción |
|---|---|---|
| `Nombre` | **Título** (automático) | Nombre del vino |
| `Bodega` | Texto | Nombre de la bodega productora |
| `Tipo` | Selección | Opciones: `Tinto`, `Blanco`, `Rosado`, `Espumante` |
| `Precio` | Número | Precio en pesos argentinos (solo el número, ej: `4500`) |
| `Descripcion` | Texto enriquecido | Notas de cata y descripción del vino |
| `Imagen` | Archivos y multimedia | Foto de la botella (subir imagen o pegar URL) |
| `Archivado` | Casilla de verificación | ✅ marcado = NO aparece en el sitio |

### Cómo agregar un vino

1. Abrir la base de datos de Vinos en Notion
2. Hacer clic en **"+ Nuevo"**
3. Completar todos los campos
4. Dejar `Archivado` **desmarcado** para que aparezca en el sitio
5. El vino aparecerá en el sitio después del próximo build

### Cómo archivar un vino (sacarlo del menú temporalmente)

- Marcar la casilla `Archivado` ✅ en la entrada del vino
- El vino desaparecerá del sitio en el próximo build
- **No borrar** la entrada — así conservás el historial

### Cómo actualizar el precio

- Editar el campo `Precio` directamente en la base de datos
- El nuevo precio se refleja en el próximo build

---

## Base de datos de Eventos

### Propiedades requeridas

| Propiedad | Tipo en Notion | Descripción |
|---|---|---|
| `Nombre` | **Título** (automático) | Nombre del evento o degustación |
| `Fecha` | Fecha | Fecha del evento (Notion maneja el formato automáticamente) |
| `Hora` | Texto | Hora en formato 24h, ej: `19:00` |
| `Descripcion` | Texto enriquecido | Descripción breve del evento |
| `Imagen` | Archivos y multimedia | Foto o flyer del evento |
| `Estado` | Selección | `publicado` = visible · `borrador` = oculto |

### Cómo publicar un evento

1. Crear una nueva entrada con todos los campos completos
2. Cambiar `Estado` a **`publicado`**
3. El evento aparecerá en el sitio (máximo 3 próximos, en orden de fecha)

### Eventos pasados

Los eventos cuya `Fecha` ya pasó se ocultan automáticamente del sitio.
No es necesario hacer nada — el filtrado es automático.

---

## Cómo conectar las bases de datos al sitio

### Paso 1: Obtener los IDs de las bases de datos

1. Abrir la base de datos en Notion
2. Copiar la URL del navegador, que tiene este formato:
   ```
   https://www.notion.so/tu-workspace/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?v=...
   ```
3. El ID es la parte de 32 caracteres antes del `?v=`

### Paso 2: Configurar las variables de entorno

En el archivo `.env.local` (o en Vercel → Settings → Environment Variables):

```
NOTION_TOKEN=secret_...
NOTION_ID_BASE_DATOS_VINOS=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_ID_BASE_DATOS_EVENTOS=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Paso 3: Compartir las bases de datos con la integración

Para cada base de datos:
1. Hacer clic en `···` (menú superior derecho)
2. Ir a **"Conexiones"**
3. Agregar la integración **"Vinoteca Astringencia"**

---

## Actualización automática del sitio (webhook)

El sitio se puede configurar para actualizarse automáticamente cuando cambiás algo en Notion.

### Configurar el webhook en Notion

1. En la integración de Notion, ir a **"Capabilities"**
2. Activar **"Read content"**
3. En tu servidor o tablero de Notion, agregar un webhook que apunte a:
   ```
   POST https://astringencia.com.ar/api/revalidar
   Header: x-webhook-secret: [valor de WEBHOOK_SECRET en tus variables de entorno]
   ```

### Sin webhook: actualización manual

Si no configurás el webhook, el sitio igual se actualiza de dos formas:
- **Automáticamente cada hora** (ISR de Next.js)
- **Manualmente**: entrando al panel de Vercel → botón **"Redeploy"**

---

## Solución de problemas

### "No aparece el vino que acabo de agregar"
- Verificar que `Archivado` está **desmarcado**
- Verificar que el campo `Tipo` tiene una de las opciones válidas
- Esperar el próximo build automático (máx. 1 hora) o disparar un redeploy manual

### "El evento no aparece"
- Verificar que `Estado` está en **`publicado`**
- Verificar que la `Fecha` es futura (eventos pasados se ocultan automáticamente)
- El sitio muestra máximo 3 eventos próximos

### "Cambié el precio pero el sitio muestra el anterior"
- El sitio se actualiza en el próximo build — puede tardar hasta 1 hora
- Para actualización inmediata: ir a Vercel → Redeploy

---

## Soporte

Si algo no funciona como se espera, contactar al equipo de desarrollo.

