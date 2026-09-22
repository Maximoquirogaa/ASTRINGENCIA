# Requirements Document

## Introduction

Este documento define los requerimientos para el sitio web showroom de Vinoteca Astringencia, un bar de vinos artesanal ubicado en Mendoza, Argentina. El sitio funcionará como vitrina digital de la propuesta, permitiendo a visitantes locales y turistas conocer la carta de vinos, información del local y próximos eventos. El sistema debe ser fácilmente actualizable por las fundadoras sin conocimientos técnicos mediante integración con Notion CMS.

## Glossary

- **Website**: El sitio web completo de Vinoteca Astringencia
- **Visitor**: Usuario que accede al sitio web (local o turista)
- **Owner**: Fundadora de la vinoteca con acceso de edición al Notion CMS
- **Notion_CMS**: Sistema de gestión de contenido basado en Notion API
- **Wine_Card**: Componente visual que muestra información de un vino individual
- **Showroom**: Sección del sitio que presenta la colección de vinos disponibles
- **Hero_Section**: Primera sección visual del sitio con branding e imagen principal
- **Contact_Form**: Formulario de contacto del sitio web
- **Mobile_Viewport**: Pantalla con ancho menor a 768px
- **Desktop_Viewport**: Pantalla con ancho mayor o igual a 768px
- **Page_Load**: Tiempo desde la solicitud inicial hasta First Contentful Paint
- **Wine_Filter**: Control que permite filtrar vinos por tipo
- **Event_Card**: Componente visual que muestra información de un evento
- **Schema_Markup**: Datos estructurados en formato JSON-LD para SEO
- **OG_Tags**: Meta tags Open Graph para compartir en redes sociales
- **WhatsApp_Link**: Enlace que abre conversación de WhatsApp con el negocio
- **Business_Hours**: Horarios de apertura y cierre del local
- **Location_Map**: Mapa interactivo que muestra la ubicación del local

## Requirements

### Requirement 1: Identidad Visual y Branding

**User Story:** Como visitante, quiero experimentar una identidad visual coherente y profesional que refleje el carácter artesanal de la vinoteca, para sentir confianza y conexión con la marca.

#### Acceptance Criteria

1. THE Website SHALL use color #7B2030 as primary brand color throughout all sections
2. THE Website SHALL use color #F5EFE0 as secondary background color
3. THE Website SHALL use color #C9A87C as accent color for interactive elements
4. THE Website SHALL use color #2C1A0E for body text
5. THE Website SHALL use Cormorant Garamond font for display headings
6. THE Website SHALL use Dancing Script font for taglines and decorative text
7. THE Website SHALL use DM Sans font for body copy and UI elements
8. WHEN a Visitor hovers over an interactive element, THE Website SHALL apply the accent color with a transition duration between 200ms and 300ms
9. THE Website SHALL maintain visual consistency across all sections using CSS custom properties for colors and typography

### Requirement 2: Hero Section y Primera Impresión

**User Story:** Como visitante que llega al sitio, quiero ver inmediatamente una imagen impactante del local y la propuesta de valor, para entender de qué se trata la vinoteca.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height on initial load
2. THE Hero_Section SHALL display a background image or video of the wine bar atmosphere
3. THE Hero_Section SHALL display the Vinoteca Astringencia logo prominently
4. THE Hero_Section SHALL display the tagline "La esquina del vino" using Dancing Script font
5. THE Hero_Section SHALL include a call-to-action button "Ver Vinos" that scrolls to the Showroom section
6. THE Hero_Section SHALL include a call-to-action button "Visitanos" that scrolls to the contact section
7. WHEN the Hero_Section background is an image, THE Website SHALL optimize it to load within 1.5 seconds on a 3G connection
8. THE Hero_Section SHALL display a subtle scroll indicator at the bottom to encourage exploration

### Requirement 3: Sección Nosotros

**User Story:** Como visitante interesado, quiero conocer la historia de las fundadoras y la filosofía del lugar, para conectar emocionalmente con la propuesta.

#### Acceptance Criteria

1. THE Website SHALL display a "Nosotros" section after the Hero_Section
2. THE Website SHALL display the origin story of Vinoteca Astringencia including the founding year 2026
3. THE Website SHALL display information about the two founders
4. THE Website SHALL display a photograph or illustration of the founders
5. THE Website SHALL display the business philosophy emphasizing artisanal and accessible wine culture
6. WHEN the Nosotros section content is edited in Notion_CMS, THE Website SHALL reflect changes within 5 minutes of rebuild
7. THE Website SHALL format the Nosotros text with a maximum line width of 65 characters for optimal readability

### Requirement 4: Showroom de Vinos - Visualización

**User Story:** Como visitante, quiero ver los vinos disponibles en formato de galería visual atractiva, para explorar la oferta y decidir qué probar.

#### Acceptance Criteria

1. THE Showroom SHALL display wines in a grid layout
2. WHEN viewing on Mobile_Viewport, THE Showroom SHALL display 1 column of Wine_Cards
3. WHEN viewing on Desktop_Viewport with width between 768px and 1024px, THE Showroom SHALL display 2 columns of Wine_Cards
4. WHEN viewing on Desktop_Viewport with width greater than 1024px, THE Showroom SHALL display 3 columns of Wine_Cards
5. THE Wine_Card SHALL display the wine name, winery, type, and price
6. THE Wine_Card SHALL display a representative image of the wine bottle
7. WHEN a Wine_Card image fails to load, THE Website SHALL display a placeholder image with the brand colors
8. THE Wine_Card SHALL display a visual indicator for the wine type using color coding
9. WHEN a Visitor hovers over a Wine_Card on Desktop_Viewport, THE Website SHALL apply a subtle elevation effect with a transition duration of 300ms

### Requirement 5: Showroom de Vinos - Filtrado

**User Story:** Como visitante, quiero filtrar los vinos por tipo (tinto, blanco, rosado, espumante, naranja), para encontrar rápidamente lo que me interesa.

#### Acceptance Criteria

1. THE Showroom SHALL display a Wine_Filter control above the wine grid
2. THE Wine_Filter SHALL include options for "Todos", "Tinto", "Blanco", "Rosado", "Espumante", and "Naranja"
3. WHEN a Visitor selects a filter option, THE Showroom SHALL display only wines matching that type within 300ms
4. WHEN the "Todos" filter is selected, THE Showroom SHALL display all wines
5. THE Wine_Filter SHALL indicate the currently active filter with the accent color
6. WHEN no wines match the selected filter, THE Showroom SHALL display a message "No hay vinos de este tipo disponibles actualmente"
7. THE Wine_Filter SHALL be keyboard navigable for accessibility
8. WHEN a filter is applied, THE Website SHALL update the URL hash to maintain filter state on page reload

### Requirement 6: Integración con Notion CMS - Vinos

**User Story:** Como Owner, quiero actualizar la información de vinos desde Notion sin tocar código, para mantener la carta actualizada fácilmente.

#### Acceptance Criteria

1. THE Notion_CMS SHALL store wine data in a Notion database with properties: name, winery, type, price, description, and image_url
2. WHEN the Website builds, THE Website SHALL fetch wine data from the Notion API
3. WHEN a wine is added to the Notion database, THE Website SHALL display it in the Showroom after the next build
4. WHEN a wine is marked as archived in Notion, THE Website SHALL exclude it from the Showroom
5. WHEN a wine price is updated in Notion, THE Website SHALL reflect the new price after the next build
6. THE Website SHALL handle Notion API errors gracefully and display cached data if the API is unavailable
7. THE Website SHALL cache Notion data during build time to minimize API calls

### Requirement 7: Sección de Eventos

**User Story:** Como visitante interesado en la cultura del vino, quiero ver los próximos eventos y degustaciones, para planificar mi visita.

#### Acceptance Criteria

1. THE Website SHALL display an "Eventos" section after the Showroom
2. THE Website SHALL display upcoming events in chronological order
3. THE Event_Card SHALL display the event name, date, time, and brief description
4. THE Event_Card SHALL display an image related to the event
5. WHEN an event date has passed, THE Website SHALL exclude it from the display
6. WHEN there are no upcoming events, THE Website SHALL display a message "Próximamente nuevos eventos"
7. THE Website SHALL display a maximum of 3 upcoming events on the home page
8. WHEN viewing on Mobile_Viewport, THE Website SHALL stack Event_Cards vertically

### Requirement 8: Integración con Notion CMS - Eventos

**User Story:** Como Owner, quiero publicar y actualizar eventos desde Notion, para promocionar degustaciones sin depender de un desarrollador.

#### Acceptance Criteria

1. THE Notion_CMS SHALL store event data in a Notion database with properties: name, date, time, description, image_url, and status
2. WHEN the Website builds, THE Website SHALL fetch event data from the Notion API
3. WHEN an event status is set to "published" in Notion, THE Website SHALL display it in the Eventos section
4. WHEN an event status is set to "draft" in Notion, THE Website SHALL exclude it from display
5. THE Website SHALL sort events by date field in ascending order
6. THE Website SHALL handle missing event images by using a default event placeholder image

### Requirement 9: Sección Visitanos - Información del Local

**User Story:** Como visitante que quiere ir al local, quiero ver la dirección, horarios y cómo llegar, para planificar mi visita fácilmente.

#### Acceptance Criteria

1. THE Website SHALL display a "Visitanos" section with the complete address: N. Avellaneda 598, La 5ta., Mendoza, Argentina
2. THE Website SHALL display Business_Hours for each day of the week
3. THE Website SHALL highlight the current day in the Business_Hours display
4. WHEN the current time is within Business_Hours, THE Website SHALL display an indicator "Abierto ahora"
5. WHEN the current time is outside Business_Hours, THE Website SHALL display the next opening time
6. THE Website SHALL display a Location_Map embedded from Google Maps or OpenStreetMap
7. THE Website SHALL allow the Visitor to open the location in their maps application via a button
8. THE Website SHALL display an illustration or photograph of the storefront

### Requirement 10: Sección Contacto - WhatsApp

**User Story:** Como visitante interesado, quiero contactar rápidamente por WhatsApp, para hacer consultas o reservas de forma directa.

#### Acceptance Criteria

1. THE Website SHALL display a WhatsApp_Link button in the contact section
2. THE WhatsApp_Link SHALL use the business phone number configured in Notion_CMS
3. WHEN a Visitor clicks the WhatsApp_Link on Mobile_Viewport, THE Website SHALL open the WhatsApp app with a pre-filled message
4. WHEN a Visitor clicks the WhatsApp_Link on Desktop_Viewport, THE Website SHALL open WhatsApp Web with a pre-filled message
5. THE WhatsApp_Link pre-filled message SHALL include "Hola! Tengo una consulta sobre Vinoteca Astringencia"
6. THE WhatsApp_Link button SHALL be prominently styled with the accent color
7. THE Website SHALL display a floating WhatsApp button fixed to the bottom-right corner on all sections

### Requirement 11: Sección Contacto - Formulario

**User Story:** Como visitante que prefiere no usar WhatsApp, quiero enviar un mensaje mediante un formulario web, para contactar al local de forma alternativa.

#### Acceptance Criteria

1. THE Website SHALL display a Contact_Form in the contact section
2. THE Contact_Form SHALL include fields for name, email, phone (optional), and message
3. THE Contact_Form SHALL validate that the name field is not empty before submission
4. THE Contact_Form SHALL validate that the email field contains a valid email format before submission
5. THE Contact_Form SHALL validate that the message field contains at least 10 characters before submission
6. WHEN a Visitor submits the Contact_Form with valid data, THE Website SHALL send the message via a serverless function
7. WHEN the Contact_Form submission is successful, THE Website SHALL display a confirmation message "Mensaje enviado! Te responderemos pronto"
8. WHEN the Contact_Form submission fails, THE Website SHALL display an error message "Error al enviar. Por favor intenta por WhatsApp"
9. THE Contact_Form SHALL disable the submit button during submission to prevent duplicate sends
10. THE Contact_Form SHALL be accessible via keyboard navigation and screen readers

### Requirement 12: Performance - Carga Inicial

**User Story:** Como visitante con conexión móvil lenta, quiero que el sitio cargue rápido, para no abandonar por frustración.

#### Acceptance Criteria

1. WHEN accessed on a 3G connection, THE Page_Load time SHALL be less than 2.5 seconds
2. THE Website SHALL achieve a Lighthouse Performance score greater than 90 on mobile
3. THE Website SHALL optimize images using modern formats (WebP with JPEG fallback)
4. THE Website SHALL implement lazy loading for images below the fold
5. THE Website SHALL inline critical CSS for above-the-fold content
6. THE Website SHALL defer non-critical JavaScript loading
7. THE Website SHALL preload fonts to avoid FOIT (Flash of Invisible Text)
8. THE Website SHALL minimize main thread work to less than 4 seconds
9. THE Website SHALL achieve a Time to Interactive (TTI) of less than 4 seconds on mobile

### Requirement 13: Diseño Responsivo Mobile-First

**User Story:** Como visitante móvil (70% del tráfico esperado), quiero una experiencia optimizada para mi dispositivo, para navegar cómodamente sin hacer zoom.

#### Acceptance Criteria

1. THE Website SHALL be fully functional on Mobile_Viewport with width as small as 320px
2. THE Website SHALL use touch-friendly interactive elements with minimum tap target size of 44x44 pixels
3. WHEN viewing on Mobile_Viewport, THE Website SHALL display a hamburger menu for navigation
4. WHEN viewing on Desktop_Viewport, THE Website SHALL display a horizontal navigation bar
5. THE Website SHALL use responsive typography with font sizes scaling between 14px (mobile) and 18px (desktop) for body text
6. THE Website SHALL maintain readable line height of 1.5 to 1.7 across all viewport sizes
7. THE Website SHALL prevent horizontal scrolling on any viewport width
8. THE Website SHALL optimize tap targets to be at least 8px apart on Mobile_Viewport
9. WHEN a Visitor rotates their mobile device, THE Website SHALL adapt layout within 200ms

### Requirement 14: SEO Local y Discoverabilidad

**User Story:** Como visitante buscando vinotecas en Mendoza en Google, quiero encontrar Astringencia en los resultados, para descubrir el local.

#### Acceptance Criteria

1. THE Website SHALL include Schema_Markup for LocalBusiness type with complete business information
2. THE Schema_Markup SHALL include name, address, telephone, opening hours, and price range
3. THE Website SHALL include a descriptive meta title of 50-60 characters
4. THE Website SHALL include a meta description of 150-160 characters mentioning "vinoteca", "Mendoza", and "vinos"
5. THE Website SHALL include OG_Tags for title, description, image, and url
6. THE Website SHALL include Twitter Card meta tags for social sharing
7. THE Website SHALL include a canonical URL tag to prevent duplicate content issues
8. THE Website SHALL generate a sitemap.xml file automatically
9. THE Website SHALL generate a robots.txt file allowing all search engines
10. THE Website SHALL include descriptive alt text for all images for accessibility and SEO
11. THE Website SHALL use semantic HTML5 elements (header, nav, main, section, article, footer)
12. THE Website SHALL include hreflang tags for Spanish (es-AR) as the primary language

### Requirement 15: Animaciones y Microinteracciones

**User Story:** Como visitante, quiero animaciones sutiles que hagan el sitio agradable de explorar, sin distraerme del contenido.

#### Acceptance Criteria

1. WHEN a Visitor scrolls to a new section, THE Website SHALL fade-in section content with a duration of 600ms
2. WHEN a Visitor hovers over a Wine_Card, THE Website SHALL scale it to 1.02 with a smooth transition
3. WHEN a Visitor clicks a scroll-to-section link, THE Website SHALL scroll smoothly with easing over 800ms
4. THE Website SHALL respect the prefers-reduced-motion media query and disable animations when set
5. THE Website SHALL implement parallax scrolling for the Hero_Section background with a maximum displacement of 100px
6. WHEN the Wine_Filter is changed, THE Website SHALL animate wine cards fading out and in over 300ms
7. THE Website SHALL limit animations to CSS transforms and opacity for optimal performance
8. THE Website SHALL not use auto-playing carousels or aggressive animations

### Requirement 16: Accesibilidad Web

**User Story:** Como visitante con discapacidad visual o motriz, quiero poder navegar el sitio con tecnologías asistivas, para acceder a toda la información.

#### Acceptance Criteria

1. THE Website SHALL achieve WCAG 2.1 Level AA compliance
2. THE Website SHALL maintain a color contrast ratio of at least 4.5:1 for normal text
3. THE Website SHALL maintain a color contrast ratio of at least 3:1 for large text and UI components
4. THE Website SHALL include skip-to-content link for keyboard navigation
5. THE Website SHALL maintain logical focus order throughout all interactive elements
6. THE Website SHALL provide visible focus indicators for all interactive elements
7. THE Website SHALL include ARIA labels for icon-only buttons
8. THE Website SHALL ensure all form inputs have associated labels
9. THE Website SHALL provide text alternatives for all non-text content
10. THE Website SHALL be fully navigable using only keyboard
11. THE Website SHALL include lang attribute on the html element set to "es-AR"

### Requirement 17: Deploy y Hosting

**User Story:** Como Owner, quiero que el sitio esté disponible 24/7 con un dominio profesional, sin costos excesivos de hosting.

#### Acceptance Criteria

1. THE Website SHALL be deployed on Vercel platform using the free tier
2. THE Website SHALL be accessible via the domain astringencia.com.ar
3. THE Website SHALL automatically deploy when changes are pushed to the main branch
4. THE Website SHALL use HTTPS with a valid SSL certificate
5. THE Website SHALL implement automatic preview deployments for branches
6. WHEN a build fails, THE Website SHALL maintain the previous working version
7. THE Website SHALL configure custom domain DNS correctly with A and CNAME records
8. THE Website SHALL achieve an uptime of at least 99.5%

### Requirement 18: Content Management Workflow

**User Story:** Como Owner sin conocimientos técnicos, quiero actualizar contenido fácilmente desde Notion y ver los cambios reflejados en el sitio, para gestionar el sitio de forma autónoma.

#### Acceptance Criteria

1. THE Notion_CMS SHALL be the single source of truth for all dynamic content
2. THE Website SHALL provide documentation for Owners on how to update content in Notion
3. WHEN an Owner updates content in Notion, THE Website SHALL reflect changes after triggering a manual build
4. THE Website SHALL implement a webhook from Notion to trigger automatic builds on content changes
5. THE Website SHALL complete a rebuild within 2 minutes of content changes
6. THE Notion_CMS SHALL include a "Published" status field that controls content visibility
7. THE Website SHALL validate required fields from Notion and skip incomplete entries
8. THE Website SHALL log clear error messages when Notion data is malformed

### Requirement 19: Error Handling y Estados Vacíos

**User Story:** Como visitante, quiero mensajes claros cuando algo no funciona o no hay contenido, para entender qué está pasando.

#### Acceptance Criteria

1. WHEN the Notion API is unavailable, THE Website SHALL display the last successfully cached content
2. WHEN a section has no content to display, THE Website SHALL show a friendly empty state message
3. WHEN an image fails to load, THE Website SHALL display a placeholder maintaining layout stability
4. WHEN the Contact_Form submission fails, THE Website SHALL preserve the user's input for retry
5. WHEN a network error occurs, THE Website SHALL display a user-friendly error message in Spanish
6. THE Website SHALL implement a custom 404 page with branding and navigation back to home
7. THE Website SHALL log errors to a monitoring service for debugging without exposing details to users

### Requirement 20: Analytics y Monitoreo

**User Story:** Como Owner, quiero entender cómo los visitantes usan el sitio, para mejorar la experiencia y la oferta.

#### Acceptance Criteria

1. THE Website SHALL integrate Google Analytics 4 for traffic monitoring
2. THE Website SHALL track custom events for "Wine Filter Used", "WhatsApp Click", and "Contact Form Submission"
3. THE Website SHALL track scroll depth to understand content engagement
4. THE Website SHALL respect the do-not-track browser setting
5. THE Website SHALL implement cookie consent banner compliant with Argentine data protection laws
6. THE Website SHALL provide a privacy policy page explaining data collection
7. THE Website SHALL integrate Vercel Analytics for Web Vitals monitoring
8. THE Website SHALL alert Owners when Core Web Vitals scores drop below thresholds

## Business Rules

### Content Update Workflow
- All wine and event content must be managed exclusively through Notion CMS
- Content marked as "draft" in Notion must never appear on the public site
- Historical events (past dates) must be automatically filtered from display
- Wine prices must be displayed in Argentine Pesos (ARS) with "$" prefix

### Visual Hierarchy
- The Hero section must always be the first visual element
- Sections must maintain a consistent vertical rhythm of 80-120px padding
- White space between Wine_Cards must be at least 24px on mobile and 32px on desktop
- Typography scale must follow a consistent ratio (1.25 for mobile, 1.333 for desktop)

### Navigation and User Flow
- All call-to-action buttons must lead to either the Showroom or Contact section
- The floating WhatsApp button must remain accessible on all sections except on Contact section where it's redundant
- Navigation menu items must correspond to section IDs for smooth scrolling
- External links (social media) must open in new tabs with rel="noopener noreferrer"

### Performance Budgets
- Total page weight must not exceed 2MB on initial load
- Total JavaScript bundle must not exceed 200KB
- Critical CSS must not exceed 20KB
- Largest Contentful Paint must occur within 2.5 seconds

### Mobile-First Constraints
- All features must work without JavaScript for core content (progressive enhancement)
- Touch gestures must not conflict with browser defaults (avoid custom swipe on main content)
- Form inputs must use appropriate input types for mobile keyboards (email, tel, etc.)
- Viewport meta tag must prevent user scaling only if zoom is implemented programmatically

### Accessibility Requirements
- Color must never be the only means of conveying information
- All interactive elements must have a minimum contrast ratio of 3:1 against adjacent colors
- Time-based content changes must be user-controlled (no auto-refresh or auto-advance)
- Error messages must be announced to screen readers via ARIA live regions

### SEO and Social Sharing
- Every page must have a unique, descriptive title
- OG image must be at least 1200x630px and less than 1MB
- Meta descriptions must be unique and compelling for each potential landing page
- Structured data must be validated with Google Rich Results Test before deployment

### Localization
- All content must be in Spanish (Rioplatense dialect for Argentina)
- Dates must use DD/MM/YYYY format
- Times must use 24-hour format (e.g., "18:00")
- Currency must always be displayed as "$ XXX" (Argentine convention)

### Brand Consistency
- The logo must never be distorted or have its proportions altered
- Brand colors must be used from CSS custom properties, never hardcoded hex values
- Photography must maintain a warm, authentic aesthetic consistent with the Instagram feed
- Tone of voice in all copy must be warm, approachable, and knowledgeable without being pretentious

### Data Management
- Notion database schemas must be documented and version-controlled as markdown
- API keys and secrets must be stored as environment variables, never in code
- Backup exports of Notion data must be performed weekly
- Image assets must be stored in a CDN-backed storage solution (Cloudinary or Vercel Blob)

### Deployment and Release
- All deployments to production must pass automated Lighthouse CI checks
- Preview deployments must be reviewed for visual regression before merging
- The main branch must always represent the production-ready state
- Rollbacks must be executable within 5 minutes if critical issues are discovered

