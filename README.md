# Nexo IA Empresas - Landing Premium

Landing one-page en **React + TypeScript + Tailwind (Vite)** orientada a conversión para solicitudes de diagnóstico inicial en micropymes y pymes.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3

## Desarrollo local

```bash
npm install
npm run dev
```

La app se levanta por defecto en `http://localhost:5173`.

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

- `VITE_LEAD_ENDPOINT_URL`: endpoint HTTP `POST` para recibir el formulario de diagnóstico.
- `VITE_WHATSAPP_NUMBER`: número para enlace rápido de WhatsApp en formato internacional sin símbolos.

### Comportamiento del formulario

- Si `VITE_LEAD_ENDPOINT_URL` está configurado, el formulario envía datos reales por `POST`.
- Si no está configurado, el formulario entra en modo demo y muestra feedback sin romper la UX.

## Scripts

```bash
npm run dev      # entorno de desarrollo
npm run lint     # validación eslint
npm run build    # compilación producción
npm run preview  # vista previa build local
```

## Despliegue en Vercel

1. Importa este repositorio en Vercel.
2. Framework preset: **Vite** (detectado automáticamente).
3. Añade variables de entorno:
   - `VITE_LEAD_ENDPOINT_URL`
   - `VITE_WHATSAPP_NUMBER`
4. Deploy.

No requiere configuración adicional de `vercel.json` para el flujo estático estándar.

## SEO AI-first incluido

- Metadatos `title`, `description`, Open Graph y Twitter en `index.html`.
- Datos estructurados JSON-LD para `ProfessionalService` y `FAQPage`.
- Archivos técnicos para rastreo:
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/llms.txt` (formato orientativo para consumo por asistentes de IA)

Importante: antes de publicar, reemplaza el dominio placeholder `https://nexoiaempresas.com/` por tu dominio final en:

- `index.html` (`og:url`)
- `public/robots.txt` (`Sitemap`)
- `public/sitemap.xml` (`loc`)
- `public/llms.txt` (enlace principal)
