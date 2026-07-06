# Noxo IA Empresas — Auditoría de Accesibilidad Web

Landing y sistema de auditoría de accesibilidad web B2B para empresas que venden, reservan o captan clientes online.

## Stack
- React 19 + Vite 8 + TypeScript 6
- Tailwind CSS v3
- Deploy: Vercel / Coolify

## Estructura

```
noxoiaempresas/
├── src/
│   ├── App.tsx              # App principal con 4 rutas
│   ├── data/content.ts     # Contenido y datos de páginas
│   ├── lib/analytics.ts    # Tracking de eventos
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globales
├── api/
│   ├── lead.ts             # Endpoint POST para leads
│   └── submit.ts           # Alias de lead
├── audit/                  # Engine de auditoría (axe-core + Lighthouse + Pa11y)
├── db/
│   └── crm-schema.sql      # Schema PostgreSQL para CRM
├── docs/
│   └── sales-templates.md  # Plantillas de venta
├── report-template.html    # Plantilla HTML del informe PDF
├── public/                 # Assets estáticos
└── index.html              # HTML root
```

## Rutas

- `/` — Landing principal (hero, problema, qué revisamos, qué entregamos, precios, disclaimer, nichos, contacto, FAQ)
- `/demo-auditoria` — Ejemplo de informe ficticio (Clínica Demo)
- `/precios` — Precios detallados (Auditoría Express 149€ + Mantenimiento 49€/mes)
- `/contacto` — Formulario de solicitud de auditoría

## Productos

1. **Auditoría Express** — 149€ pago único. Informe PDF en 48h.
2. **Mantenimiento Noxo** — 49€/mes. Reescaneo mensual + alertas.

## Engine de auditoría

```bash
cd audit
npm run audit -- https://example.com
```

Genera JSON estructurado con scores (Lighthouse), issues (axe-core) y screenshots (Playwright).

## CRM

Schema SQL en `db/crm-schema.sql`. Compatible con PostgreSQL/Supabase.

Estados: new → audited → contacted → replied → interested → won / lost / maintenance

## Desarrollo

```bash
npm install
npm run dev      # desarrollo
npm run build    # build producción
npm run preview  # preview build
```
