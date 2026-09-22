# Guia de Deploy — Vinoteca Astringencia

## Prerequisitos

- Cuenta en [Vercel](https://vercel.com) (plan gratuito alcanza)
- Cuenta en [GitHub](https://github.com) con el repositorio del proyecto
- Variables de entorno del archivo `.env.local.example` con valores reales
- Dominio `astringencia.com.ar` con acceso al panel de DNS

---

## Paso 1: Subir el codigo a GitHub

```bash
git init
git add .
git commit -m "feat: sitio inicial de Vinoteca Astringencia"
git branch -M main
git remote add origin https://github.com/tu-usuario/astringencia.git
git push -u origin main
```

---

## Paso 2: Conectar con Vercel

1. Ir a [vercel.com](https://vercel.com) e iniciar sesion con GitHub
2. Hacer clic en **"Add New Project"**
3. Importar el repositorio `astringencia`
4. Vercel detecta Next.js automaticamente — no cambiar nada
5. Hacer clic en **"Deploy"**

El primer deploy demora 2-3 minutos.

---

## Paso 3: Configurar Variables de Entorno en Vercel

En el dashboard de Vercel → **Settings** → **Environment Variables**, agregar:

| Variable | Descripcion | Donde obtenerlo |
|---|---|---|
| `NOTION_TOKEN` | Token de integracion Notion | notion.so/my-integrations |
| `NOTION_ID_BASE_DATOS_VINOS` | ID de la DB de vinos | URL de la base de datos en Notion |
| `NOTION_ID_BASE_DATOS_EVENTOS` | ID de la DB de eventos | URL de la base de datos en Notion |
| `NEXT_PUBLIC_WHATSAPP_NUMERO` | Numero sin + ni espacios | Tu numero de WA |
| `WEBHOOK_SECRET` | Clave aleatoria para el webhook | Generarla con el comando de abajo |
| `NEXT_PUBLIC_GA4_ID` | ID de Google Analytics 4 | analytics.google.com |
| `VERCEL_DEPLOY_HOOK_URL` | URL del deploy hook | Vercel → Settings → Git |

### Generar WEBHOOK_SECRET

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Paso 4: Conectar el Dominio

1. En Vercel → **Settings** → **Domains** → agregar `astringencia.com.ar`
2. Vercel te dara dos registros DNS para configurar en tu registrador:

```
Tipo: A     | Nombre: @          | Valor: 76.76.21.21
Tipo: CNAME | Nombre: www        | Valor: cname.vercel-dns.com
```

3. En el panel DNS de tu registrador, agregar esos dos registros
4. Esperar 5-30 minutos para que propague

---

## Paso 5: Configurar Webhook de Notion (revalidacion automatica)

Para que el sitio se actualice automaticamente cuando editas contenido en Notion:

1. En Vercel → **Settings** → **Git** → **Deploy Hooks**
2. Crear un hook llamado "Notion Rebuild" para la rama `main`
3. Copiar la URL generada (empieza con `https://api.vercel.com/...`)
4. Guardarla como `VERCEL_DEPLOY_HOOK_URL` en las env vars de Vercel
5. En Notion → tu integracion → **Webhooks**:
   - URL: `https://astringencia.com.ar/api/revalidar`
   - Metodo: POST
   - Header: `x-webhook-secret: [tu WEBHOOK_SECRET]`

---

## Paso 6: Verificar el Deploy

Despues de configurar el dominio, verificar:

- [ ] El sitio carga en `https://astringencia.com.ar`
- [ ] El certificado HTTPS esta activo (candado verde en el navegador)
- [ ] Los vinos se cargan desde Notion (o los datos de prueba si Notion no esta configurado)
- [ ] El formulario de WhatsApp funciona
- [ ] El sitemap esta en `https://astringencia.com.ar/sitemap.xml`
- [ ] Los datos estructurados estan en `https://astringencia.com.ar` (usar Rich Results Test de Google)

---

## Actualizacion de Contenido

Para actualizar vinos o eventos en el sitio:

1. Editar la informacion en Notion
2. El webhook dispara automaticamente una revalidacion del sitio
3. Los cambios aparecen en el sitio en menos de 2 minutos

Si el webhook no esta configurado, hacer clic manualmente en **Redeploy** en el dashboard de Vercel.

---

## Rollback Rapido

Si algo sale mal despues de un deploy:

1. En Vercel → **Deployments**
2. Buscar el ultimo deploy exitoso
3. Hacer clic en los tres puntos (...)
4. Seleccionar **"Promote to Production"**

El rollback tarda menos de 1 minuto.

