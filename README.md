# Vinoteca Astringencia — Sitio Web

Sitio web showroom para **Vinoteca Astringencia**, bar de vinos artesanal en Mendoza, Argentina.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript (modo strict)
- **Estilos**: Tailwind CSS + CSS Custom Properties
- **CMS**: Notion API (gestión de contenido sin código)
- **Deploy**: Vercel (dominio: astringencia.com.ar)
- **Fuentes**: Cormorant Garamond + Dancing Script + DM Sans (Google Fonts)

## Convención de Código

> **Regla estricta**: Todo el código fuente — variables, funciones, clases, interfaces, tipos, comentarios y constantes — se escribe **en español**. Esta regla no tiene excepciones.

```ts
// ✅ Correcto
const tarjetasDeVino = obtenerVinos();
const filtroActivo = 'Tinto';

// ❌ Incorrecto
const wineCards = getWines();
const activeFilter = 'Tinto';
```

## Estructura del Proyecto

```
astringencia/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout raíz (fuentes, metadatos, HTML base)
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globales y tokens CSS
│   ├── componentes/            # Componentes React reutilizables
│   │   ├── ui/                 # Componentes de interfaz genéricos
│   │   ├── secciones/          # Secciones del sitio (Hero, Nosotros, etc.)
│   │   └── layout/             # Navegación, pie de página, etc.
│   ├── estilos/
│   │   └── tokens.ts           # Tokens de diseño (colores, tipografías, etc.)
│   ├── tipos/
│   │   └── index.ts            # Tipos TypeScript del dominio
│   ├── servicios/              # Lógica de negocio y API calls
│   │   └── notion/             # Integración con Notion CMS
│   ├── utilidades/             # Funciones auxiliares
│   └── datos/                  # Datos estáticos y de fallback
├── public/                     # Assets estáticos
├── .env.local.example          # Plantilla de variables de entorno
├── next.config.mjs             # Configuración de Next.js
├── tailwind.config.ts          # Configuración de Tailwind CSS
└── tsconfig.json               # Configuración de TypeScript
```

## Paleta de Colores

| Variable CSS | Valor | Uso |
|---|---|---|
| `--color-primario` | `#7B2030` | Color principal de marca (vino tinto) |
| `--color-fondo` | `#F5EFE0` | Fondo secundario (crema cálido) |
| `--color-acento` | `#C9A87C` | Elementos interactivos (dorado) |
| `--color-texto` | `#2C1A0E` | Texto principal (marrón oscuro) |

## Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.local.example .env.local
# Completar .env.local con los valores reales

# 3. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## Fases de Implementación

- [x] **Paso 1**: Inicialización del proyecto y tokens de diseño
- [ ] **Paso 2**: Componentes UI base (Hero, Navegación, Tarjetas)
- [ ] **Paso 3**: Integración con Notion CMS (vinos y eventos)
- [ ] **Paso 4**: Secciones completas del sitio
- [ ] **Paso 5**: Performance, SEO y accesibilidad WCAG 2.1 AA
- [ ] **Paso 6**: Analytics, deploy en Vercel y CI/CD

## Gestión de Contenido

El contenido dinámico (vinos, eventos, horarios) se gestiona desde **Notion**. Las fundadoras pueden actualizar la carta sin tocar código. Cada actualización en Notion dispara un rebuild automático del sitio vía webhook.

Ver documentación de Notion en `docs/guia-notion.md` _(próximamente)_.

## Licencia

Proyecto privado — © 2026 Vinoteca Astringencia

