// ===========================================================================
//  Noxo IA Empresas — content.ts
//  Auditoría de accesibilidad web para empresas que venden online
// ===========================================================================

export const brandName = 'Noxo IA Empresas'
export const siteUrl = 'https://noxoiaempresas.com'
export const contactSectionId = 'contacto'
export const whatsappNumber = '+34600000000'
export const whatsappShortMessage = 'Hola, quiero solicitar una auditoría de accesibilidad web.'

// ── Types ──────────────────────────────────────────────────────────────────

export interface FaqEntry {
  question: string
  answer: string
}

export interface LinkEntry {
  href: string
  label: string
  description?: string
}

export interface ReviewItem {
  icon: string
  title: string
  description: string
}

export interface IssueDemo {
  severity: 'critical' | 'serious' | 'moderate' | 'minor'
  type: string
  title: string
  description: string
  selector: string
  recommendation: string
  impact: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export interface PageData {
  path: string
  label: string
  title: string
  metaDescription: string
  h1: string
  hero: {
    eyebrow: string
    title: string
    intro: string
    primaryCtaLabel: string
    primaryCtaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
    bullets: string[]
  }
  faqs: FaqEntry[]
}

// ── Navigation ──────────────────────────────────────────────────────────────

export const primaryNav = [
  { href: '/', label: 'Inicio' },
  { href: '/#problema', label: 'Problema' },
  { href: '/#que-revisamos', label: 'Qué revisamos' },
  { href: '/precios', label: 'Precios' },
  { href: '/demo-auditoria', label: 'Demo' },
  { href: '/contacto', label: 'Contacto' },
]

// ── What we review ──────────────────────────────────────────────────────────

export const reviewItems: ReviewItem[] = [
  {
    icon: 'contrast',
    title: 'Contraste y legibilidad',
    description: 'Textos difíciles de leer por bajo contraste entre fondo y letra.',
  },
  {
    icon: 'keyboard',
    title: 'Navegación con teclado',
    description: 'Botones, menús y formularios que no funcionan sin ratón.',
  },
  {
    icon: 'forms',
    title: 'Formularios',
    description: 'Campos sin etiqueta, errores confusos y validaciones inaccesibles.',
  },
  {
    icon: 'buttons',
    title: 'Botones y enlaces',
    description: 'Elementos sin etiqueta clara o demasiado pequeños para táctil.',
  },
  {
    icon: 'images',
    title: 'Imágenes y textos alternativos',
    description: 'Imágenes sin alt text o con texto alternativo insuficiente.',
  },
  {
    icon: 'structure',
    title: 'Estructura HTML',
    description: 'Encabezados desordenados, regiones mal definidas, falta de semántica.',
  },
  {
    icon: 'mobile',
    title: 'Responsive / móvil',
    description: 'Problemas de visualización y uso en dispositivos móviles.',
  },
  {
    icon: 'technical',
    title: 'Errores técnicos frecuentes',
    description: 'ARIA mal usado, atributos duplicados, elementos invisibles problemáticos.',
  },
  {
    icon: 'recommendations',
    title: 'Recomendaciones de mejora',
    description: 'Priorización práctica de qué corregir primero y por qué.',
  },
]

// ── Niches ──────────────────────────────────────────────────────────────────

export const niches: string[] = [
  'Clínicas dentales',
  'Clínicas estéticas',
  'Academias',
  'Restaurantes con reservas',
  'Ecommerce pequeño',
  'Inmobiliarias',
  'Hoteles pequeños',
  'Empresas con formularios de contacto',
  'Negocios que dependen de captación online',
]

// ── Problem points ──────────────────────────────────────────────────────────

export const problemPoints: string[] = [
  'Botones sin etiqueta clara que confunden a usuarios y lectores de pantalla.',
  'Contraste insuficiente que hace difícil leer textos, sobre todo en móvil.',
  'Formularios difíciles de usar con campos sin etiqueta y errores poco claros.',
  'Menús que no funcionan bien cuando se navega solo con teclado.',
  'Imágenes sin texto alternativo, dejando contenido invisible para algunos usuarios.',
  'Estructura confusa de encabezados que dificulta la navegación con lectores de pantalla.',
  'Problemas en móvil: botones pequeños, textos que se cortan, layout roto.',
  'Errores que afectan directamente reservas, compras o solicitudes.',
]

// ── Deliverables ────────────────────────────────────────────────────────────

export const deliverables: string[] = [
  'Resumen ejecutivo con diagnóstico claro y nivel de riesgo.',
  'Score general de accesibilidad (0-100) con desglose por categoría.',
  'Top 10 errores priorizados por impacto real en usuarios.',
  'Capturas de pantalla de los problemas detectados.',
  'Explicación del impacto en lenguaje humano, no técnico.',
  'Recomendaciones prácticas de corrección para cada problema.',
  'Checklist de próximos pasos accionables.',
  'Propuesta opcional de mantenimiento mensual.',
]

// ── Pricing ─────────────────────────────────────────────────────────────────

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Auditoría Express',
    price: '149 €',
    period: 'pago único',
    tagline: 'Análisis técnico completo con informe claro y prioridades en 48h.',
    features: [
      'Escaneo técnico de accesibilidad',
      'Informe PDF con capturas',
      'Top 10 errores priorizados',
      'Recomendaciones prácticas',
      'Impacto explicado en lenguaje humano',
      'Checklist de próximos pasos',
      'Entrega en 48 horas',
    ],
    ctaLabel: 'Solicitar auditoría',
    ctaHref: '/contacto',
    featured: true,
  },
  {
    name: 'Mantenimiento Noxo',
    price: '49 €',
    period: '/mes',
    tagline: 'Revisión mensual para que tu web no acumule errores invisibles.',
    features: [
      'Reescaneo mensual completo',
      'Informe actualizado',
      'Alertas si aparecen nuevos errores',
      'Revisión básica de cambios',
      'Recomendaciones continuas',
      'Soporte ligero por email',
    ],
    ctaLabel: 'Quiero mantenimiento',
    ctaHref: '/contacto',
  },
]

// ── Demo audit data (fictitious Clínica Demo) ───────────────────────────────

export const demoAudit = {
  company: 'Clínica Demo',
  url: 'https://clinica-demo.example.com',
  checkedAt: '2026-07-01T10:00:00Z',
  scores: {
    accessibility: 72,
    performance: 68,
    seo: 84,
    bestPractices: 75,
  },
  riskLevel: 'Medio' as const,
  summary: {
    critical: 3,
    serious: 4,
    moderate: 6,
    minor: 5,
  },
  issues: [
    {
      severity: 'critical' as const,
      type: 'contrast',
      title: 'Botón "Pedir cita" con contraste insuficiente',
      description: 'El botón principal de reserva tiene un ratio de contraste de 2.8:1, por debajo del mínimo de 4.5:1.',
      selector: '.hero-cta-button',
      recommendation: 'Aumentar el contraste entre el texto del botón y el fondo. Usar un color más oscuro o más claro para alcanzar al menos 4.5:1.',
      impact: 'Puede impedir que usuarios con baja visión vean o usen el botón principal de reserva.',
    },
    {
      severity: 'critical' as const,
      type: 'forms',
      title: 'Formulario de cita sin etiquetas accesibles',
      description: 'Los campos del formulario de solicitud de cita no tienen etiquetas <label> asociadas, solo placeholders.',
      selector: '#appointment-form input',
      recommendation: 'Añadir etiquetas <label> explícitas asociadas a cada campo mediante for/id.',
      impact: 'Lectores de pantalla no pueden anunciar correctamente los campos, impidiendo completar la reserva.',
    },
    {
      severity: 'critical' as const,
      type: 'keyboard',
      title: 'Menú de navegación no accesible con teclado',
      description: 'El menú desplegable de servicios no es operable con teclado. Los submenús no se abren con Tab.',
      selector: 'nav.main-menu',
      recommendation: 'Implementar navegación por teclado con aria-expanded y gestionar focus correctamente.',
      impact: 'Usuarios que navegan sin ratón no pueden acceder a las páginas de servicios.',
    },
    {
      severity: 'serious' as const,
      type: 'images',
      title: 'Logo y imágenes decorativas sin alt text',
      description: 'El logo de la clínica y 3 imágenes del equipo no tienen atributo alt.',
      selector: 'header img, .team-section img',
      recommendation: 'Añadir alt text descriptivo al logo y a las fotos del equipo.',
      impact: 'Lectores de pantalla omiten información visual importante sobre la identidad del sitio.',
    },
    {
      severity: 'serious' as const,
      type: 'structure',
      title: 'Estructura de encabezados desordenada',
      description: 'La página salta de h1 a h4, saltándose h2 y h3.',
      selector: 'main content',
      recommendation: 'Reestructurar los encabezados siguiendo orden jerárquico: h1 → h2 → h3.',
      impact: 'La navegación por encabezados con lectores de pantalla es confusa y poco útil.',
    },
    {
      severity: 'serious' as const,
      type: 'aria',
      title: 'Atributos ARIA mal aplicados',
      description: 'Se usan role="button" en elementos <div> en lugar de usar <button> nativo.',
      selector: '.custom-cta',
      recommendation: 'Reemplazar divs con role="button" por elementos <button> nativos.',
      impact: 'Comportamiento inesperado en lectores de pantalla y navegación con teclado.',
    },
    {
      severity: 'serious' as const,
      type: 'mobile',
      title: 'Botones demasiado pequeños en móvil',
      description: 'Los botones de contacto tienen 36px de altura, por debajo del mínimo recomendado de 44px.',
      selector: '.contact-buttons a',
      recommendation: 'Aumentar el tamaño mínimo de los elementos interactivos a 44x44px.',
      impact: 'Dificultad para pulsar botones correctamente en dispositivos móviles.',
    },
  ] as IssueDemo[],
}

// ── Footer ───────────────────────────────────────────────────────────────────

export const footerLinkGroups = [
  {
    title: 'Navegación',
    links: primaryNav.map((item) => ({ href: item.href, label: item.label })),
  },
  {
    title: 'Recursos',
    links: [
      { href: '/demo-auditoria', label: 'Ejemplo de informe' },
      { href: '/precios', label: 'Precios' },
      { href: '/contacto', label: 'Solicitar auditoría' },
    ],
  },
]

// ── Pages ───────────────────────────────────────────────────────────────────

export const homePage: PageData = {
  path: '/',
  label: 'Inicio',
  title: 'Auditoría de Accesibilidad Web para Empresas | Noxo IA Empresas',
  metaDescription:
    'Detectamos errores invisibles de accesibilidad en tu web que pueden afectar a clientes, formularios, reservas y compras. Informe claro y accionable en 48h.',
  h1: 'Auditorías de accesibilidad web para empresas que venden online',
  hero: {
    eyebrow: 'Auditoría de accesibilidad web',
    title: 'Tu web puede estar perdiendo clientes por errores invisibles de accesibilidad',
    intro:
      'Detectamos errores invisibles que pueden afectar a clientes, formularios, reservas y compras. Recibe un informe claro, priorizado y accionable en 48h. Sin humo, sin plugins milagro.',
    primaryCtaLabel: 'Solicitar auditoría express',
    primaryCtaHref: '/contacto',
    secondaryCtaLabel: 'Ver ejemplo de informe',
    secondaryCtaHref: '/demo-auditoria',
    bullets: [
      'Informe claro en 48 horas',
      'Sin humo ni plugins milagro',
      'Recomendaciones accionables',
    ],
  },
  faqs: [
    {
      question: '¿La auditoría garantiza el cumplimiento legal?',
      answer:
        'No. La auditoría automatizada no sustituye una auditoría legal completa ni pruebas manuales avanzadas con usuarios reales. Nuestro servicio detecta problemas técnicos frecuentes, prioriza mejoras prácticas y ayuda a mantener una web más accesible de forma continua.',
    },
    {
      question: '¿Cuánto tarda la auditoría express?',
      answer:
        '48 horas desde que recibimos tu solicitud y la URL de tu web. Te entregamos el informe en PDF con capturas, prioridades y recomendaciones.',
    },
    {
      question: '¿Necesito saber algo de accesibilidad o tecnología?',
      answer:
        'No. El informe está escrito en lenguaje humano. Te explicamos qué pasa, por qué importa y qué hacer para corregirlo. Sin tecnicismos innecesarios.',
    },
    {
      question: '¿Qué herramientas usáis?',
      answer:
        'Combinamos herramientas open source como axe-core, Lighthouse y Pa11y con revisión asistida por IA. No vendemos overlays ni plugins mágicos.',
    },
    {
      question: '¿El mantenimiento mensual es obligatorio?',
      answer:
        'No. La auditoría express es un pago único. El mantenimiento es opcional y sirve para controlar que tu web no acumule nuevos errores con el tiempo.',
    },
  ],
}

export const pricingPage: PageData = {
  path: '/precios',
  label: 'Precios',
  title: 'Precios: Auditoría Express y Mantenimiento | Noxo IA Empresas',
  metaDescription:
    'Auditoría express de accesibilidad web por 149€ con informe en 48h. Mantenimiento mensual por 49€/mes con reescaneo y alertas.',
  h1: 'Precios claros. Sin sorpresas.',
  hero: {
    eyebrow: 'Precios',
    title: 'Precios claros. Sin sorpresas.',
    intro:
      'Empieza con una auditoría express por 149€. Si quieres mantener tu web controlada mes a mes, añade mantenimiento por 49€/mes.',
    primaryCtaLabel: 'Solicitar auditoría express',
    primaryCtaHref: '/contacto',
    secondaryCtaLabel: 'Ver ejemplo de informe',
    secondaryCtaHref: '/demo-auditoria',
    bullets: [
      'Auditoría express: 149€',
      'Mantenimiento: 49€/mes',
      'Sin permanencia obligatoria',
    ],
  },
  faqs: [
    {
      question: '¿El precio de la auditoría incluye correcciones?',
      answer:
        'No. La auditoría detecta y prioriza problemas. Si necesitas ayuda con las correcciones, lo hablamos aparte. El informe incluye recomendaciones claras para que tu equipo o tu agencia puedan implementarlas.',
    },
    {
      question: '¿Puedo cancelar el mantenimiento cuando quiera?',
      answer:
        'Sí. El mantenimiento es mensual sin permanencia. Cancelas cuando quieras y vuelves cuando lo necesites.',
    },
  ],
}

export const demoPage: PageData = {
  path: '/demo-auditoria',
  label: 'Ejemplo de informe',
  title: 'Ejemplo de Informe de Auditoría | Noxo IA Empresas',
  metaDescription:
    'Mira un ejemplo de cómo es nuestro informe de auditoría de accesibilidad web: score general, errores priorizados, capturas y recomendaciones.',
  h1: 'Ejemplo de informe de auditoría',
  hero: {
    eyebrow: 'Demo',
    title: 'Así es el informe que recibirás',
    intro:
      'Este es un ejemplo ficticio de una auditoría para "Clínica Demo". No usa datos reales. Te muestra exactamente qué recibirás al contratar una auditoría express.',
    primaryCtaLabel: 'Quiero mi auditoría express',
    primaryCtaHref: '/contacto',
    secondaryCtaLabel: 'Ver precios',
    secondaryCtaHref: '/precios',
    bullets: [
      'Score general y por categoría',
      'Errores priorizados por severidad',
      'Recomendaciones accionables',
    ],
  },
  faqs: [],
}

export const contactPage: PageData = {
  path: '/contacto',
  label: 'Contacto',
  title: 'Solicita tu Auditoría de Accesibilidad Web | Noxo IA Empresas',
  metaDescription:
    'Solicita una auditoría express de accesibilidad web por 149€. Informe claro, capturas y prioridades en 48h. Sin compromiso.',
  h1: 'Analizar mi web',
  hero: {
    eyebrow: 'Contacto',
    title: 'Solicita tu auditoría express',
    intro:
      'Indícanos tu web y tus datos de contacto. Te enviamos el informe en 48 horas con los problemas detectados, prioridades y recomendaciones claras.',
    primaryCtaLabel: 'Analizar mi web',
    primaryCtaHref: '#formulario',
    secondaryCtaLabel: 'Ver ejemplo de informe',
    secondaryCtaHref: '/demo-auditoria',
    bullets: [
      'Respuesta en 48 horas',
      'Sin compromiso',
      'Informe en PDF con capturas',
    ],
  },
  faqs: [],
}

// ── All pages ───────────────────────────────────────────────────────────────

export const allPages: PageData[] = [homePage, pricingPage, demoPage, contactPage]

export const pagesByPath: Record<string, PageData> = {
  '/': homePage,
  '/precios': pricingPage,
  '/demo-auditoria': demoPage,
  '/contacto': contactPage,
}
