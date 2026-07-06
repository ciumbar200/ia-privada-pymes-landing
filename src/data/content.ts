// ===========================================================================
//  Noxo IA — content.ts
//  Modelo: Auditoría IA gratuita → Propuesta de proyecto → Implementación
// ===========================================================================

export const brandName = 'Noxo IA'
export const siteUrl = 'https://noxoiaempresas.com'
export const contactSectionId = 'contacto'
export const meetingUrl = 'https://meet.brevo.com/virgil-buibar'
export const whatsappShortMessage = 'Hola, quiero solicitar la auditoría IA gratuita para mi empresa.'

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

export interface ProofEntry {
  title: string
  description: string
}

export interface HeroPanelEntry {
  title: string
  description: string
}

export interface StatEntry {
  label: string
  value: string
}

export interface PricingPlan {
  name: string
  tagline: string
  setupPrice: string
  monthlyPrice: string
  summary: string
  idealFor: string
  features: string[]
  pricingLogic: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export interface ResourceCategory {
  name: string
  description: string
}

export interface ResourcePostSummary {
  path: string
  title: string
  category: string
  excerpt: string
  intent: string
}

export interface ArticleSection {
  title: string
  paragraphs: string[]
}

export interface DigitalTeamRole {
  title: string
  tag: string
  summary: string
  example: string
  benefit: string
}

export interface DigitalTeamDiagramData {
  title: string
  subtitle: string
  supportText: string
  ctaLabel: string
  ctaHref: string
  centralRole: DigitalTeamRole
  roles: DigitalTeamRole[]
}

export interface PageData {
  kind: 'home' | 'service' | 'niche' | 'pricing' | 'resources' | 'article'
  path: string
  slug: string
  label: string
  title: string
  metaDescription: string
  searchIntent: string
  primaryKeyword: string
  secondaryKeywords: string[]
  h1: string
  h2s: string[]
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
  heroPanel: {
    label: string
    title: string
    items: HeroPanelEntry[]
  }
  problemTitle?: string
  problemIntro?: string
  problemPoints?: string[]
  solutionTitle?: string
  solutionIntro?: string
  deliverables?: string[]
  outcomesTitle?: string
  outcomes?: ProofEntry[]
  processTitle?: string
  process?: string[]
  fitTitle?: string
  fitPoints?: string[]
  examplesTitle?: string
  examplesIntro?: string
  examples?: ProofEntry[]
  objectionsTitle?: string
  objections?: string[]
  stats?: StatEntry[]
  pricingTitle?: string
  pricingIntro?: string
  pricingPlans?: PricingPlan[]
  pricingNotes?: string[]
  resourceCategories?: ResourceCategory[]
  resourcePosts?: ResourcePostSummary[]
  articleCategory?: string
  articleSections?: ArticleSection[]
  teamDiagram?: DigitalTeamDiagramData
  faqs: FaqEntry[]
  relatedLinks: LinkEntry[]
}

// ── Pricing → Modalidades de proyecto (sin precios visibles) ───────────────

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Auditoría',
    tagline: 'Fase 1 — Gratuita',
    setupPrice: '0€',
    monthlyPrice: '48h',
    summary: 'Te analizamos gratis. En 48h te decimos dónde puedes automatizar, ahorrar y crecer con IA.',
    idealFor: 'Cualquier empresa que quiere entender qué puede hacer la IA por ella antes de invertir.',
    features: [
      'Análisis de procesos manuales y tareas repetitivas',
      'Detección de oportunidades de automatización con IA',
      'Identificación de dónde se pierde tiempo y dinero',
      'Mapa de lo que se puede implementar y en qué orden',
      'Propuesta de proyecto con timeline y presupuesto',
    ],
    pricingLogic:
      'La auditoría es siempre gratuita. No hay compromiso. Si no hay encaje, te lo decimos.',
    ctaLabel: 'Solicitar auditoría',
    ctaHref: '/#contacto',
    featured: true,
  },
  {
    name: 'Proyecto IA',
    tagline: 'Fase 2 — Implementación',
    setupPrice: 'A medida',
    monthlyPrice: '14-30 días',
    summary: 'Implementamos el sistema de IA completo en tu empresa. Proyecto cerrado con timeline y presupuesto definidos.',
    idealFor: 'Empresas que ya tienen clara la oportunidad y quieren ejecutar sin contratar un equipo técnico interno.',
    features: [
      'Diseño e implementación del sistema de IA end-to-end',
      'Integración con tus herramientas actuales (CRM, WhatsApp, email, etc.)',
      'Automatización de captación, respuesta, seguimiento y organización',
      'Panel de control y visibilidad de procesos',
      'Formación del equipo para el día a día',
      'Entrega documentada y replicable',
    ],
    pricingLogic:
      'Cada proyecto es único. El presupuesto se define tras la auditoría, según alcance y complejidad. Sin sorpresas.',
    ctaLabel: 'Empezar con auditoría',
    ctaHref: '/#contacto',
  },
  {
    name: 'Evolución',
    tagline: 'Fase 3 — Opcional',
    setupPrice: 'Desde 300€/mes',
    monthlyPrice: 'Flexible',
    summary: 'Ajustes, mejoras y nuevas automatizaciones después del proyecto. Solo si quieres seguir avanzando.',
    idealFor: 'Empresas que ya tienen el sistema funcionando y quieren iterar: nuevas ideas, nuevos flujos, más IA.',
    features: [
      'Mejoras y ajustes del sistema implementado',
      'Nuevas automatizaciones según necesidades',
      'Soporte y resolución de incidencias',
      'Reporting mensual de impacto',
      'Sesión mensual de revisión estratégica',
    ],
    pricingLogic:
      'Opcional. El sistema funciona solo después del proyecto. Esto es para quien quiere seguir aprovechando nuevas oportunidades de IA.',
    ctaLabel: 'Solicitar auditoría',
    ctaHref: '/#contacto',
  },
]

// ── Navigation ──────────────────────────────────────────────────────────────

export const primaryNav = [
  { href: '/', label: 'Inicio' },
  { href: '/como-funciona', label: 'Cómo trabajamos' },
  { href: '/#sectores', label: 'Sectores' },
  { href: '/recursos', label: 'Recursos' },
  { href: '/#contacto', label: 'Contacto' },
]

// ── Niche links ─────────────────────────────────────────────────────────────

export const nicheLinks: LinkEntry[] = [
  {
    href: '/coliving-flex-living',
    label: 'Coliving y flex living',
    description: 'Auditoría IA para operadores de coliving: reservas, seguimiento y ocupación.',
  },
  {
    href: '/inmobiliarias-property-managers',
    label: 'Inmobiliarias y property managers',
    description: 'IA para captar, organizar y seguir oportunidades inmobiliarias sin perder leads.',
  },
  {
    href: '/clinicas-salud-privada',
    label: 'Clínicas y salud privada',
    description: 'IA para responder consultas, seguir pacientes potenciales y llenar agenda.',
  },
  {
    href: '/academias-formacion',
    label: 'Academias y formación',
    description: 'IA para seguir interesados, admisiones y oportunidades desde campañas y formularios.',
  },
]

// ── Resources ────────────────────────────────────────────────────────────────

export const resourceCategories: ResourceCategory[] = [
  {
    name: 'IA para empresas',
    description: 'Cómo la IA real (no el hype) ahorra tiempo y genera ventas en PYMEs.',
  },
  {
    name: 'Automatización comercial',
    description: 'Captación, respuesta, seguimiento y cierre con sistemas de IA.',
  },
  {
    name: 'Sectores',
    description: 'Casos aplicados a coliving, inmobiliarias, clínicas y academias.',
  },
  {
    name: 'Auditoría y proyectos IA',
    description: 'Cómo funciona el proceso de auditoría gratuita e implementación.',
  },
]

export const featuredResources: ResourcePostSummary[] = [
  {
    path: '/recursos/auditoria-ia-gratuita-para-empresas',
    title: 'Qué es una auditoría IA y por qué tu empresa la necesita ya',
    category: 'Auditoría y proyectos IA',
    excerpt: 'Una auditoría IA gratuita te dice exactamente dónde puedes automatizar, ahorrar y crecer antes de invertir un euro.',
    intent: 'Informacional con intención comercial',
  },
  {
    path: '/recursos/automatizar-captacion-leads-con-ia',
    title: 'Cómo automatizar la captación de leads con IA sin perder el toque humano',
    category: 'Automatización comercial',
    excerpt: 'Sistemas de IA que captan, responden y siguen leads mientras tu equipo se centra en cerrar.',
    intent: 'Informacional middle-funnel',
  },
  {
    path: '/recursos/ia-para-inmobiliarias-property-managers',
    title: 'IA para inmobiliarias y property managers: del caos de leads al cierre ordenado',
    category: 'Sectores',
    excerpt: 'Ejemplos concretos de cómo la IA transforma la operación comercial en gestión inmobiliaria.',
    intent: 'Guía aplicada al sector',
  },
]

// ── Footer ───────────────────────────────────────────────────────────────────

export const footerLinkGroups = [
  {
    title: 'Navegación',
    links: primaryNav.map((item) => ({ href: item.href, label: item.label })),
  },
  {
    title: 'Sectores',
    links: nicheLinks,
  },
]

// ===========================================================================
//  HOME PAGE
// ===========================================================================

export const homePage: PageData = {
  kind: 'home',
  path: '/',
  slug: '',
  label: 'Inicio',
  title: 'Auditoría IA Gratuita para tu Empresa | Noxo IA',
  metaDescription:
    'Te analizamos gratis. En 48h te decimos dónde puedes automatizar, ahorrar y crecer con IA. Después implementamos el proyecto completo.',
  searchIntent: 'Transaccional B2B. Empresa buscando implementar IA pero no sabe por dónde empezar.',
  primaryKeyword: 'auditoría IA gratuita para empresas',
  secondaryKeywords: [
    'implementar IA en empresa',
    'automatización con IA para pymes',
    'consultoría IA empresas',
    'proyecto IA para empresa',
    'auditoría inteligencia artificial',
  ],
  h1: 'Auditoría IA Gratuita para tu Empresa. En 48h sabes dónde automatizar, ahorrar y crecer.',
  h2s: [
    'Qué te entrega la auditoría',
    'El problema real',
    'Cómo trabajamos',
    'Qué cubre la auditoría',
    'Sectores',
    'Modalidades',
    'Preguntas frecuentes',
  ],
  hero: {
    eyebrow: 'Auditoría IA gratuita',
    title:
      'Auditoría IA Gratuita para tu Empresa. En 48h sabes dónde automatizar, ahorrar y crecer.',
    intro:
      'No vendemos cursos ni suscripciones. Te analizamos gratis, te proponemos un proyecto de IA con timeline y presupuesto cerrados, y lo implementamos. Si no hay encaje, te lo decimos.',
    primaryCtaLabel: 'Solicitar auditoría gratuita',
    primaryCtaHref: '/#contacto',
    secondaryCtaLabel: 'Ver cómo trabajamos',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Gratis y sin compromiso',
      'Resultado en 48 horas',
      'Propuesta clara con presupuesto',
    ],
  },
  heroPanel: {
    label: 'Qué pasa después',
    title: 'De auditoría a implementación. De idea a sistema funcionando.',
    items: [
      {
        title: 'Auditoramos',
        description: 'Analizamos tus procesos, detectamos dónde se pierde tiempo y dinero por falta de IA.',
      },
      {
        title: 'Proponemos',
        description: 'Te entregamos un proyecto con alcance, timeline y presupuesto. Sin humo.',
      },
      {
        title: 'Implementamos',
        description: 'Montamos el sistema completo en tu empresa. Lo dejamos funcionando y documentado.',
      },
    ],
  },
  problemTitle: 'Tu empresa pierde tiempo y dinero todos los días por falta de IA. Y lo sabes.',
  problemIntro:
    'No es que no tengas herramientas. Es que no tienes un sistema que trabaje por ti.',
  problemPoints: [
    'Tareas repetitivas que consumen horas del equipo todos los días.',
    'Leads que se pierden porque nadie responde a tiempo o se olvidan en el seguimiento.',
    'Procesos manuales que dependen de personas saturadas, no de sistemas.',
    'Decisiones con intuición, no con datos que ya podrías tener automatizados.',
    'Competidores que ya usan IA y van más rápido con menos gente.',
    'Saber que deberías implementar IA, pero no saber por dónde empezar.',
  ],
  solutionTitle: 'Qué te entrega la auditoría IA gratuita',
  solutionIntro:
    'Un análisis claro de tu empresa con un mapa de oportunidades de IA. En 48 horas.',
  deliverables: [
    'Diagnóstico de procesos manuales y tareas automatizables con IA.',
    'Detección de dónde estás perdiendo dinero por falta de sistema.',
    'Mapa de oportunidades priorizado por impacto y esfuerzo.',
    'Propuesta de proyecto con timeline y presupuesto cerrados.',
    'Estimación de ROI: cuánto puedes ahorrar o ganar con la implementación.',
    'Sin compromiso: si no hay encaje, te lo decimos y punto.',
  ],
  outcomesTitle: 'Qué cambia después del proyecto',
  outcomes: [
    {
      title: 'Más tiempo',
      description: 'El equipo deja de hacer trabajo repetitivo que la IA puede hacer sola.',
    },
    {
      title: 'Más ventas',
      description: 'Los leads se responden en minutos y se siguen con criterio, sin depender de memoria.',
    },
    {
      title: 'Más control',
      description: 'Dirección ve el estado real del negocio en tiempo real, no cuando ya es tarde.',
    },
  ],
  processTitle: 'Cómo trabajamos',
  process: [
    'Pides la auditoría gratuita. Te contactamos en 24h para entender tu negocio.',
    'Analizamos tus procesos, herramientas y puntos de fuga. En 48h tienes el diagnóstico.',
    'Si hay encaje, te proponemos un proyecto con alcance, timeline y presupuesto cerrados.',
    'Implementamos el sistema completo en tu empresa. Lo dejamos funcionando y formamos a tu equipo.',
  ],
  fitTitle: 'Encaja si te reconoces en alguno de estos puntos',
  fitPoints: [
    'Sabes que deberías usar IA pero no sabes por dónde empezar.',
    'Tu equipo pierde tiempo en tareas que podrían estar automatizadas.',
    'Pierdes oportunidades por lentitud, desorden o falta de seguimiento.',
    'Quieres un proyecto cerrado, no una suscripción perpetua.',
  ],
  examplesTitle: 'Señales de que ya lo necesitas',
  examplesIntro: 'Si alguna de estas cosas pasa en tu empresa, la auditoría te va a abrir los ojos.',
  examples: [
    {
      title: 'Respondes tarde',
      description: 'Cada lead que espera más de 5 minutos tiene menos probabilidad de cerrar. La IA responde en segundos.',
    },
    {
      title: 'Sigues a mano',
      description: 'Si el seguimiento depende de memoria y post-its, estás perdiendo oportunidades cada semana.',
    },
    {
      title: 'No ves el pipeline',
      description: 'Si no sabes cuántos leads tienes, en qué etapa están ni cuáles se están perdiendo, no puedes decidir bien.',
    },
  ],
  stats: [
    { label: 'Auditoría', value: 'Gratuita' },
    { label: 'Resultado en', value: '48 horas' },
    { label: 'Modelo', value: 'Proyecto cerrado' },
  ],
  teamDiagram: {
    title: 'Lo que implementamos en tu empresa',
    subtitle: 'Un sistema de IA completo que trabaja solo. Cada componente tiene un rol claro.',
    supportText: 'Esto no es un CRM ni una herramienta más. Es un sistema de IA que captar, responde, clasifica, sigue, publica y analiza — todo coordinado y adaptado a tu negocio.',
    ctaLabel: 'Quiero ver cómo encajaría en mi empresa',
    ctaHref: '/#contacto',
    centralRole: {
      title: 'Tu empresa',
      tag: 'el centro',
      summary: 'Tú te centras en decidir y cerrar. El sistema de IA hace el trabajo operativo que hoy te roba tiempo.',
      example: 'Llegas por la mañana y los leads del día ya están captados, respondidos, clasificados y organizados. El seguimiento está activo. Las redes, publicadas.',
      benefit: 'Menos caos. Más foco. El negocio avanza aunque no estés pendiente de cada detalle.',
    },
    roles: [
      {
        title: 'Captación IA',
        tag: 'captura',
        summary: 'Recoge y unifica leads desde todos tus canales: web, WhatsApp, email, redes y campañas.',
        example: 'Un lead de Google Ads, uno de Instagram y uno del formulario web entran a la vez. Ninguno se pierde.',
        benefit: 'Nunca más un lead perdido por caos de canales.',
      },
      {
        title: 'Respuesta automática',
        tag: 'responde',
        summary: 'Responde a cada lead en minutos con el mensaje correcto, sin que tengas que estar pendiente.',
        example: 'Son las 22:00 y entra una consulta por WhatsApp. El sistema responde antes de que el lead se vaya con otro.',
        benefit: 'Más velocidad. Mejor primera impresión. Sin horarios.',
      },
      {
        title: 'Clasificación IA',
        tag: 'clasifica',
        summary: 'Ordena y prioriza leads con IA para que sepas exactamente cuáles merecen tu tiempo.',
        example: 'Separa los que tienen intención real de compra de los que aún están explorando.',
        benefit: 'Tu tiempo va solo a las oportunidades que más valen.',
      },
      {
        title: 'Seguimiento inteligente',
        tag: 'sigue',
        summary: 'Hace seguimiento con criterio para que ningún lead se enfríe por olvido o falta de tiempo.',
        example: 'Un lead no respondió. Dos días después, el sistema lanza un recontacto diferente al primero.',
        benefit: 'Más oportunidades rescatadas. Sin depender de tu memoria.',
      },
      {
        title: 'Contenido automático',
        tag: 'publica',
        summary: 'Crea y publica contenido en redes con regularidad y sin que tengas que estar detrás.',
        example: 'Publica tres veces por semana en LinkedIn e Instagram con tono y formato adaptados a cada canal.',
        benefit: 'Presencia constante sin dedicar horas del equipo.',
      },
      {
        title: 'Análisis y reporting',
        tag: 'analiza',
        summary: 'Supervisa procesos, detecta cuellos de botella y te da visibilidad real del negocio.',
        example: 'Detecta que una campaña trae leads de baja calidad y te alerta antes de que el presupuesto se desperdicie.',
        benefit: 'Decisiones con datos, no con intuición.',
      },
    ],
  },
  pricingTitle: 'Tres fases. Un proceso claro. Sin sorpresas.',
  pricingIntro:
    'La auditoría es gratuita. El proyecto se define tras la auditoría con presupuesto cerrado. La evolución es opcional.',
  pricingPlans,
  pricingNotes: [
    'La auditoría es siempre gratuita y sin compromiso.',
    'El presupuesto del proyecto se fija tras la auditoría, según alcance y complejidad.',
    'La evución mensual es opcional — el sistema funciona solo después del proyecto.',
  ],
  faqs: [
    {
      question: '¿La auditoría es realmente gratuita?',
      answer:
        'Sí. La auditoría es 100% gratuita y sin compromiso. Si no hay encaje para un proyecto, te lo decimos y punto.',
    },
    {
      question: '¿Cuánto tarda la auditoría?',
      answer:
        '48 horas desde que hablamos. Te hacemos unas preguntas sobre tu negocio, analizamos tus procesos y te entregamos el diagnóstico.',
    },
    {
      question: '¿Después de la auditoría estoy obligado a contratar?',
      answer:
        'No. La auditoría te da un mapa de oportunidades. Si quieres ejecutar, te proponemos un proyecto. Si no, te quedas con el diagnóstico gratis.',
    },
    {
      question: '¿Qué tipo de empresas auditáis?',
      answer:
        'PYMEs y empresas con procesos manuales, leads que gestionar y equipos saturados. Trabajamos especialmente con coliving, inmobiliarias, clínicas y academias, pero no exclusivamente.',
    },
    {
      question: '¿Necesito saber algo de IA o tecnología?',
      answer:
        'No. Nosotros nos encargamos de todo. Tú solo necesitas conocer tu negocio. La IA es nuestra parte.',
    },
  ],
  relatedLinks: [
    { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo de auditoría a implementación.' },
    { href: '/recursos', label: 'Recursos', description: 'Guías sobre IA para empresas y casos por sector.' },
  ],
}

// ===========================================================================
//  CÓMO TRABAJAMOS
// ===========================================================================

export const howItWorksPage: PageData = {
  kind: 'service',
  path: '/como-funciona',
  slug: 'como-funciona',
  label: 'Cómo trabajamos',
  title: 'Cómo trabajamos: de auditoría a implementación IA | Noxo IA',
  metaDescription:
    'Descubre nuestro proceso: auditoría gratuita, propuesta de proyecto con presupuesto cerrado e implementación IA end-to-end en tu empresa.',
  searchIntent: 'Comercial. Empresa evaluando si Noxo IA es la opción correcta antes de pedir la auditoría.',
  primaryKeyword: 'implementación IA para empresas',
  secondaryKeywords: [
    'consultoría IA empresas',
    'auditoría IA gratuita',
    'proyecto IA end-to-end',
    'automatización empresarial con IA',
  ],
  h1: 'De auditoría gratuita a sistema IA funcionando en tu empresa.',
  h2s: [
    'El problema que resolvemos',
    'Qué incluye el proceso',
    'Cómo se ejecuta',
    'Dudas habituales',
    'Resultados esperables',
  ],
  hero: {
    eyebrow: 'Cómo trabajamos',
    title: 'De auditoría gratuita a sistema IA funcionando en tu empresa.',
    intro:
      'Un proceso simple y transparente: te auditamos gratis, te proponemos un proyecto con presupuesto cerrado, lo implementamos y lo dejamos funcionando.',
    primaryCtaLabel: 'Solicitar auditoría gratuita',
    primaryCtaHref: '/#contacto',
    secondaryCtaLabel: 'Ver sectores',
    secondaryCtaHref: '/#sectores',
    bullets: [
      'Proceso claro en 3 fases',
      'Presupuesto cerrado antes de empezar',
      'Sistema funcionando en 14-30 días',
    ],
  },
  heroPanel: {
    label: 'Idea fuerza',
    title: 'No vendemos humo. Vendemos sistemas que trabajan.',
    items: [
      { title: 'Fase 1', description: 'Auditoría gratuita. Diagnóstico claro en 48h.' },
      { title: 'Fase 2', description: 'Proyecto con presupuesto cerrado. Implementación en 14-30 días.' },
      { title: 'Fase 3', description: 'Evolución opcional. Mejoras cuando quieres seguir avanzando.' },
    ],
  },
  problemTitle: 'El problema que resolvemos',
  problemIntro:
    'La mayoría de empresas saben que deberían usar IA. El problema es que no saben qué, cómo ni por dónde empezar.',
  problemPoints: [
    'Hay demasiado ruido sobre IA y poco concreto aplicado a tu negocio real.',
    'Las agencias vendan paquetes genéricos que no se adaptan a tu operativa.',
    'Las suscripciones a herramientas sueltas no resuelven el problema de fondo.',
    'Sin un diagnóstico claro, invertir en IA es tirar dinero a ciegas.',
    'El equipo no tiene tiempo ni conocimiento para investigar e implementar.',
  ],
  solutionTitle: 'Qué incluye el proceso completo',
  solutionIntro:
    'Desde el primer contacto hasta el sistema funcionando en tu empresa. Todo gestionado por nosotros.',
  deliverables: [
    'Auditoría gratuita de procesos, herramientas y oportunidades de IA.',
    'Diagnóstico priorizado por impacto y esfuerzo con estimación de ROI.',
    'Propuesta de proyecto con alcance, timeline y presupuesto cerrados.',
    'Implementación del sistema de IA end-to-end en tu empresa.',
    'Integración con tus herramientas actuales (CRM, WhatsApp, email, redes).',
    'Formación del equipo y documentación para el día a día.',
    'Entrega y validación: el sistema queda funcionando solo.',
  ],
  outcomesTitle: 'Qué puedes esperar',
  outcomes: [
    { title: 'Claridad', description: 'Sabes exactamente qué puede hacer la IA por tu empresa antes de invertir.' },
    { title: 'Ejecución', description: 'No te quedas con un PDF. El sistema queda montado y funcionando.' },
    { title: 'Control', description: 'Tienes visibilidad real del negocio y de lo que la IA está haciendo por ti.' },
  ],
  processTitle: 'Cómo se ejecuta',
  process: [
    'Pides la auditoría. Te contactamos en 24h para entender tu negocio y tus procesos.',
    'Analizamos dónde se pierde tiempo, dinero y oportunidades. En 48h tienes el diagnóstico.',
    'Te proponemos un proyecto con alcance, timeline y presupuesto cerrados. Decides tú.',
    'Implementamos el sistema completo. Lo dejamos funcionando, formamos a tu equipo y lo documentamos.',
  ],
  examplesTitle: 'Qué tareas puede automatizar el sistema',
  examplesIntro: 'Esto no es IA genérica. Son sistemas concretos que hacen trabajo real en tu empresa.',
  examples: [
    { title: 'Captar', description: 'Recoger leads desde formularios, email, WhatsApp o CRM sin que se pierdan.' },
    { title: 'Responder', description: 'Dar salida rápida a las primeras consultas, 24/7, sin depender del equipo.' },
    { title: 'Organizar', description: 'Etiquetar, clasificar y ordenar oportunidades por prioridad con IA.' },
    { title: 'Seguir', description: 'Recordar recontactos, detectar leads parados y mantener el siguiente paso claro.' },
  ],
  objectionsTitle: 'Dudas habituales',
  objections: [
    'No necesitas saber nada de IA. Nosotros nos encargamos de toda la parte técnica.',
    'No necesitas cambiar todas tus herramientas. Integramos con lo que ya usas.',
    'No es una suscripción perpetua. Es un proyecto cerrado con principio y fin.',
    'No te vendemos humo. Si la auditoría muestra que no hay encaje, te lo decimos.',
  ],
  stats: [
    { label: 'Fase 1', value: 'Auditoría gratuita' },
    { label: 'Fase 2', value: 'Proyecto 14-30 días' },
    { label: 'Fase 3', value: 'Evolución opcional' },
  ],
  teamDiagram: {
    title: 'El sistema IA que implementamos en tu empresa',
    subtitle: 'No es un bot que hace de todo. Es un sistema donde cada componente tiene un rol concreto y trabaja en coordinación.',
    supportText: 'La clave no está en tener más herramientas, sino en tener un sistema que trabaja con criterio: capta, responde, clasifica, sigue, publica y analiza. Todo coordinado y adaptado a tu operativa real.',
    ctaLabel: 'Quiero ver cómo encajaría en mi empresa',
    ctaHref: '/#contacto',
    centralRole: {
      title: 'Director del sistema',
      tag: 'coordina',
      summary: 'Orquesta todo el sistema: recibe señales, asigna tareas y asegura que nada quede sin atender.',
      example: 'Detecta un lead entrante, activa la respuesta, informa a la clasificación y deja el seguimiento preparado.',
      benefit: 'El proceso funciona solo. Tú tienes visibilidad sin supervisar cada acción.',
    },
    roles: [
      {
        title: 'Captación IA',
        tag: 'captura',
        summary: 'Unifica la entrada de leads desde todos los canales: web, WhatsApp, email, redes y campañas.',
        example: 'Recoge al mismo tiempo un lead de Google Ads, uno de Instagram y uno de un formulario web, sin duplicados.',
        benefit: 'Ningún lead se pierde entre canales.',
      },
      {
        title: 'Respuesta automática',
        tag: 'responde',
        summary: 'Responde al lead en los primeros minutos con el mensaje correcto según canal y contexto.',
        example: 'Detecta que el lead preguntó por precio en WhatsApp y responde con la información y el siguiente paso.',
        benefit: 'Menos leads fríos. Mejor primera impresión sin depender del horario.',
      },
      {
        title: 'Clasificación IA',
        tag: 'clasifica',
        summary: 'Ordena cada lead según urgencia, intención y encaje real con tu oferta.',
        example: 'Separa leads que ya saben lo que quieren de los que están explorando, y prioriza los primeros.',
        benefit: 'El equipo humano dedica tiempo solo a lo que merece.',
      },
      {
        title: 'Seguimiento inteligente',
        tag: 'sigue',
        summary: 'Mantiene el contacto activo con leads que no cerraron en el primer contacto.',
        example: 'Detecta que un lead no respondió en 48h y lanza un recontacto con un mensaje diferente.',
        benefit: 'Más oportunidades rescatadas sin esfuerzo manual.',
      },
      {
        title: 'Contenido automático',
        tag: 'publica',
        summary: 'Crea y publica contenido en redes con la frecuencia y el tono correctos.',
        example: 'Publica tres piezas semanales en LinkedIn e Instagram adaptando formato a cada plataforma.',
        benefit: 'Presencia constante sin que el equipo dedique horas.',
      },
      {
        title: 'Análisis y reporting',
        tag: 'analiza',
        summary: 'Supervisa procesos, detecta cuellos de botella y genera visibilidad real.',
        example: 'Detecta que una campaña trae leads de baja intención y alerta para ajustar segmentación.',
        benefit: 'Decisiones con datos, no con intuición.',
      },
    ],
  },
  faqs: [
    {
      question: '¿Cuánto tarda la implementación?',
      answer:
        'Entre 14 y 30 días según el alcance del proyecto. Lo definimos tras la auditoría con timeline cerrado.',
    },
    {
      question: '¿Esto vale para cualquier sector?',
      answer:
        'Funciona mejor donde hay procesos manuales, leads que gestionar y equipos saturados. Por eso trabajamos páginas específicas por sector.',
    },
    {
      question: '¿Necesito un equipo técnico interno?',
      answer:
        'No. Nosotros nos encargamos de todo. Tu equipo solo necesita saber usar el resultado, y los formamos para eso.',
    },
  ],
  relatedLinks: [
    { href: '/#sectores', label: 'Sectores', description: 'Ver cómo aplicamos la IA a tu sector concreto.' },
    ...nicheLinks,
    { href: '/recursos', label: 'Recursos', description: 'Guías para entender el impacto de la IA en empresas como la tuya.' },
  ],
}

// ===========================================================================
//  PRECIOS → MODALIDADES (sin precios visibles, reframeado)
// ===========================================================================

export const pricingPage: PageData = {
  kind: 'pricing',
  path: '/modalidades',
  slug: 'modalidades',
  label: 'Modalidades',
  title: 'Modalidades de proyecto IA | Noxo IA',
  metaDescription:
    'Tres fases claras: auditoría gratuita, proyecto de implementación con presupuesto cerrado y evolución opcional.',
  searchIntent: 'Comercial. Usuario comparando opciones antes de pedir la auditoría.',
  primaryKeyword: 'modalidades proyecto IA empresas',
  secondaryKeywords: [
    'precio implementación IA',
    'coste proyecto IA empresa',
    'auditoría IA gratuita',
    'consultoría IA presupuesto',
  ],
  h1: 'Tres fases. Un proceso claro. Sin sorpresas ni suscripciones perpetuas.',
  h2s: [
    'Las tres fases',
    'Qué incluye cada una',
    'Cómo elegir',
    'Preguntas frecuentes',
  ],
  hero: {
    eyebrow: 'Modalidades',
    title: 'Tres fases. Un proceso claro. Sin sorpresas ni suscripciones perpetuas.',
    intro:
      'La auditoría es gratuita. El proyecto se define tras la auditoría con presupuesto cerrado. La evolución es opcional. Tú decides en cada momento.',
    primaryCtaLabel: 'Solicitar auditoría gratuita',
    primaryCtaHref: '/#contacto',
    secondaryCtaLabel: 'Ver cómo trabajamos',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Auditoría 100% gratuita',
      'Presupuesto cerrado antes de empezar',
      'Sin suscripción obligatoria',
    ],
  },
  heroPanel: {
    label: 'Cómo leer las fases',
    title: 'Cada fase es independiente. Puedes parar después de cualquiera.',
    items: [
      { title: 'Fase 1', description: 'Auditoría gratuita. Si no hay encaje, paras aquí sin coste.' },
      { title: 'Fase 2', description: 'Proyecto con presupuesto cerrado. Si no quieres evolución, paras aquí.' },
      { title: 'Fase 3', description: 'Evolución opcional. Solo si quieres seguir aprovechando nuevas oportunidades.' },
    ],
  },
  pricingTitle: 'Las tres fases del proceso',
  pricingIntro:
    'Empiezas por la auditoría gratuita. Después decides si quieres proyecto. Después decides si quieres evolución.',
  pricingPlans,
  pricingNotes: [
    'La auditoría es siempre gratuita y sin compromiso.',
    'El presupuesto del proyecto se fija tras la auditoría. Sin sorpresas.',
    'La evolución mensual es opcional — el sistema funciona solo después del proyecto.',
  ],
  examplesTitle: 'Cómo decidir',
  examplesIntro: 'No tienes que decidir todo a la vez. Cada fase es independiente.',
  examples: [
    { title: 'Empieza por la auditoría', description: 'Es gratis y te da un mapa completo de oportunidades. Sin riesgo.' },
    { title: 'Decide sobre el proyecto', description: 'Tras la auditoría sabes el alcance, el timeline y el presupuesto. Decides con datos.' },
    { title: 'Evolución cuando quieras', description: 'El sistema funciona solo. Si más adelante quieres más, ahí estamos.' },
  ],
  faqs: [
    {
      question: '¿Por qué la auditoría es gratuita?',
      answer:
        'Porque filtramos por necesidad, no por cartera. Si tu empresa no necesita IA, te lo decimos. Si la necesita, te lo demostramos.',
    },
    {
      question: '¿Cuánto cuesta el proyecto?',
      answer:
        'Depende del alcance y la complejidad. Tras la auditoría te damos un presupuesto cerrado. Sin costes ocultos ni sorpresas.',
    },
    {
      question: '¿Tengo que contratar la evolución mensual?',
      answer:
        'No. El sistema queda funcionando solo después del proyecto. La evolución es para quien quiere seguir iterando.',
    },
    {
      question: '¿Qué pasa si no quiero seguir después de la auditoría?',
      answer:
        'Nada. Te quedas con el diagnóstico. Sin coste y sin compromiso. Si más adelante quieres retomar, ahí estamos.',
    },
  ],
  relatedLinks: [
    { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo en detalle.' },
    { href: '/recursos', label: 'Recursos', description: 'Guías para entender el valor de la IA en tu empresa.' },
    ...nicheLinks,
  ],
}

// ===========================================================================
//  RECURSOS
// ===========================================================================

export const resourcesPage: PageData = {
  kind: 'resources',
  path: '/recursos',
  slug: 'recursos',
  label: 'Recursos',
  title: 'Recursos sobre IA para empresas | Noxo IA',
  metaDescription:
    'Guías prácticas para entender cómo la IA puede ahorrar tiempo y generar más ventas en tu empresa. Casos por sector y proceso.',
  searchIntent: 'Informacional con apoyo comercial. Empresa buscando entender el impacto de la IA.',
  primaryKeyword: 'IA para empresas',
  secondaryKeywords: [
    'implementar IA en empresa',
    'automatización con IA',
    'auditoría IA gratuita',
    'casos de uso IA pymes',
  ],
  h1: 'Recursos para entender la IA real en tu empresa.',
  h2s: [
    'Categorías',
    'Artículos destacados',
    'Cómo conectar',
  ],
  hero: {
    eyebrow: 'Recursos',
    title: 'Recursos para entender la IA real en tu empresa.',
    intro:
      'No es contenido genérico sobre IA. Cada artículo conecta el problema real de tu negocio con la solución adecuada.',
    primaryCtaLabel: 'Solicitar auditoría gratuita',
    primaryCtaHref: '/#contacto',
    secondaryCtaLabel: 'Ver cómo trabajamos',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Casos prácticos',
      'SEO con intención real',
      'Enlace directo a auditoría',
    ],
  },
  heroPanel: {
    label: 'Objetivo editorial',
    title: 'Captar tráfico útil, educar y llevar a la auditoría gratuita.',
    items: [
      { title: 'Educar', description: 'Ayuda a entender qué puede hacer la IA de verdad en una empresa como la tuya.' },
      { title: 'Aplicar', description: 'Casos concretos por sector y por problema comercial real.' },
      { title: 'Convertir', description: 'Cada artículo enlaza hacia la auditoría gratuita.' },
    ],
  },
  resourceCategories,
  resourcePosts: featuredResources,
  examplesTitle: 'Cómo usar este contenido',
  examplesIntro: 'La lógica es simple: del problema a la auditoría.',
  examples: [
    {
      title: 'Artículo → Auditoría',
      description: 'Cuando el lector entiende el problema, se le lleva a la auditoría gratuita.',
    },
    {
      title: 'Artículo de sector → Auditoría sectorial',
      description: 'Si la búsqueda es específica de un sector, el contenido enlaza al caso concreto.',
    },
    {
      title: 'Artículo middle-funnel → Cómo trabajamos',
      description: 'Cuando el usuario ya entiende el valor, se le empuja al proceso.',
    },
  ],
  faqs: [
    {
      question: '¿Vais a publicar artículos genéricos de IA?',
      answer:
        'No. El foco está en IA aplicada a empresas reales: procesos, leads, automatización y casos por sector.',
    },
    {
      question: '¿El blog sirve para vender o solo para SEO?',
      answer:
        'Las dos cosas. Capta tráfico útil y lo conecta con la auditoría gratuita.',
    },
  ],
  relatedLinks: [
    ...featuredResources.map((post) => ({ href: post.path, label: post.title, description: post.excerpt })),
    { href: '/#contacto', label: 'Auditoría gratuita', description: 'Si ya sabes que necesitas IA, pide la auditoría.' },
  ],
}

// ===========================================================================
//  NICHE PAGES
// ===========================================================================

export const nichePages: PageData[] = [
  // ── Coliving ──────────────────────────────────────────────────────────────
  {
    kind: 'niche',
    path: '/coliving-flex-living',
    slug: 'coliving-flex-living',
    label: 'Coliving y flex living',
    title: 'Auditoría IA para coliving y flex living | Noxo IA',
    metaDescription:
      'Auditoría IA gratuita para operadores de coliving y flex living. Detecta dónde pierdes reservas y automatiza captación y seguimiento.',
    searchIntent: 'Comercial sectorial. Operador de coliving buscando más orden, más seguimiento y mejor lead-to-booking.',
    primaryKeyword: 'IA para coliving y flex living',
    secondaryKeywords: [
      'automatización coliving',
      'gestión de leads coliving',
      'IA flex living',
      'lead to booking IA',
    ],
    h1: 'Auditoría IA para coliving y flex living: más reservas, menos caos operativo.',
    h2s: [
      'El problema en coliving',
      'Qué audita la IA',
      'Casos concretos',
      'Encaja si',
    ],
    hero: {
      eyebrow: 'Sector: coliving y flex living',
      title: 'Auditoría IA para coliving y flex living: más reservas, menos caos operativo.',
      intro:
        'Si las consultas entran por portales, WhatsApp, email y formularios, pero la respuesta y el seguimiento dependen de turnos y trabajo manual, estás perdiendo reservas por falta de sistema.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Menos reservas perdidas', 'Más seguimiento real', 'Más orden por activo'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'En coliving, una respuesta tarde puede costar una reserva.',
      items: [
        { title: 'Lead caliente', description: 'El usuario compara rápido varias opciones y ubicaciones.' },
        { title: 'Canales', description: 'La demanda entra por demasiados sitios y se fragmenta.' },
        { title: 'Solución', description: 'La IA sostiene el orden y el seguimiento de cada oportunidad.' },
      ],
    },
    problemTitle: 'El problema en coliving y flex living',
    problemIntro: 'El cuello de botella suele aparecer entre primera consulta, disponibilidad, visita, propuesta y reserva.',
    problemPoints: [
      'Se responde tarde a leads con fecha de entrada cercana.',
      'El histórico de conversación no está claro por activo o habitación.',
      'El seguimiento depende demasiado de la persona que lo lleva ese día.',
      'Se pierde tiempo repitiendo información sobre disponibilidad y condiciones.',
    ],
    solutionTitle: 'Qué audita la IA en coliving y flex living',
    solutionIntro: 'Detecta dónde se pierden reservas y propone un sistema de IA que lo resuelve.',
    deliverables: [
      'Análisis de la entrada de consultas por canal, activo y tipo de estancia.',
      'Detección de cuellos de botella entre lead y reserva.',
      'Propuesta de sistema IA: captación, respuesta, clasificación y seguimiento automáticos.',
      'Estimación de impacto: cuántas reservas se pueden recuperar.',
    ],
    outcomesTitle: 'Qué mejora después del proyecto',
    outcomes: [
      { title: 'Más velocidad', description: 'Menos tiempo muerto entre lead y primera acción útil.' },
      { title: 'Más consistencia', description: 'El seguimiento no depende del turno o de la memoria.' },
      { title: 'Más control', description: 'Se ve qué activo, canal o fase frena cierres.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Auditoramos cómo entran hoy tus leads y dónde se pierden.',
      'Proponemos un sistema de IA adaptado a tu operativa real.',
      'Lo implementamos sin romper lo que ya funciona.',
      'Lo dejamos funcionando y formamos a tu equipo.',
    ],
    examplesTitle: 'Ejemplos concretos',
    examplesIntro: 'Situaciones reales del sector donde la IA cambia el resultado.',
    examples: [
      { title: 'Lead de última hora', description: 'La IA detecta prioridad alta y fuerza respuesta y seguimiento sin depender de un recordatorio manual.' },
      { title: 'Varias propiedades', description: 'Cada consulta queda ordenada por activo para que no se mezcle la demanda.' },
      { title: 'Visita o propuesta', description: 'Si se hizo el primer contacto, la IA empuja el siguiente paso hasta cierre o descarte.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Recibes demanda, pero la operación comercial se te dispersa.',
      'Tu equipo necesita más constancia sin contratar más personas.',
      'Quieres dejar de perder reservas por lentitud o desorden.',
    ],
    stats: [
      { label: 'Sector', value: 'Coliving / flex living' },
      { label: 'Foco', value: 'Lead to booking' },
      { label: 'Auditoría', value: 'Gratuita' },
    ],
    teamDiagram: {
      title: 'Sistema IA para coliving: cada lead avanza con orden',
      subtitle: 'Captar, responder, organizar y seguir cada consulta sin depender del caos del día a día.',
      supportText:
        'En coliving no basta con captar leads: hay que responder rápido, organizar bien y seguir cada oportunidad hasta que se convierta en reserva. Este sistema IA se encarga de que nada se enfríe ni se desordene.',
      ctaLabel: 'Quiero auditar mi operación de coliving',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador de reservas IA',
        tag: 'coordina',
        summary: 'Supervisa el flujo completo desde la entrada del lead hasta la oportunidad lista para cerrar.',
        example: 'Detecta nuevas consultas, reparte tareas y mantiene el orden del proceso.',
        benefit: 'Una operación comercial más clara y menos oportunidades perdidas.',
      },
      roles: [
        {
          title: 'Respuesta IA',
          tag: 'responde',
          summary: 'Responde nuevas consultas en cuanto entran para evitar que se enfríen.',
          example: 'Atiende solicitudes desde formulario, WhatsApp o email y activa la primera respuesta.',
          benefit: 'Más velocidad y menos leads perdidos por tardanza.',
        },
        {
          title: 'Clasificación IA',
          tag: 'clasifica',
          summary: 'Separa interesados según tipo de estancia, urgencia y encaje.',
          example: 'Identifica si el lead busca corta o media estancia y lo prioriza.',
          benefit: 'Seguimiento más inteligente y menos tiempo perdido.',
        },
        {
          title: 'Seguimiento IA',
          tag: 'sigue',
          summary: 'Mantiene el contacto activo para que la oportunidad no se enfríe.',
          example: 'Lanza seguimientos si el lead no responde o quedó pendiente de decidir.',
          benefit: 'Más oportunidades rescatadas y menos reservas perdidas.',
        },
        {
          title: 'Organización IA',
          tag: 'organiza',
          summary: 'Mantiene cada oportunidad en su etapa correcta dentro del proceso.',
          example: 'Mueve leads entre "nuevo", "contactado", "interesado" o "listo para reservar".',
          benefit: 'Visibilidad total del estado de cada oportunidad.',
        },
        {
          title: 'Coordinación de visitas',
          tag: 'prepara',
          summary: 'Ordena los siguientes pasos para que los leads listos avancen hacia la reserva.',
          example: 'Identifica leads preparados para visita y los deja listos para el equipo humano.',
          benefit: 'Menos fricción entre interés y reserva.',
        },
        {
          title: 'Alertas IA',
          tag: 'alerta',
          summary: 'Detecta cuellos de botella y oportunidades estancadas.',
          example: 'Marca leads sin respuesta, seguimientos atrasados o reservas potenciales paradas.',
          benefit: 'Menos fugas y mejor control comercial.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Sirve para operadores pequeños?',
        answer: 'Sí. Cuando el equipo es pequeño, cada lead cuenta más y la IA aporta más valor relativo.',
      },
      {
        question: '¿Esto sustituye al comercial?',
        answer: 'No. Le quita el caos operativo para que el comercial tenga más foco en cerrar.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso de auditoría a implementación.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Auditoría gratuita para tu operación de coliving.' },
      { href: '/recursos', label: 'Recursos', description: 'Guías sobre IA aplicada a coliving y flex living.' },
    ],
  },
  // ── Inmobiliarias ──────────────────────────────────────────────────────────
  {
    kind: 'niche',
    path: '/inmobiliarias-property-managers',
    slug: 'inmobiliarias-property-managers',
    label: 'Inmobiliarias y property managers',
    title: 'Auditoría IA para inmobiliarias y property managers | Noxo IA',
    metaDescription:
      'Auditoría IA gratuita para inmobiliarias y property managers. Detecta dónde pierdes oportunidades y automatiza captación y seguimiento.',
    searchIntent: 'Comercial sectorial. Inmobiliaria o property manager buscando más velocidad comercial.',
    primaryKeyword: 'IA para inmobiliarias y property managers',
    secondaryKeywords: [
      'automatización inmobiliaria',
      'gestión de leads inmobiliarios',
      'IA property management',
      'sistema IA inmobiliaria',
    ],
    h1: 'Auditoría IA para inmobiliarias con muchos leads y poco seguimiento real.',
    h2s: [
      'El problema en inmobiliarias',
      'Qué audita la IA',
      'Casos de uso',
      'Encaja si',
    ],
    hero: {
      eyebrow: 'Sector: inmobiliarias y property managers',
      title: 'Auditoría IA para inmobiliarias con muchos leads y poco seguimiento real.',
      intro:
        'Cuando entran leads desde portales, campañas, formularios y WhatsApp, pero la respuesta y el seguimiento dependen de trabajo manual, el desorden mata oportunidades.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Menos leads enfriados', 'Más seguimiento útil', 'Mejor coordinación'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'Aquí no basta con contestar una vez. Hace falta responder, organizar y seguir con criterio.',
      items: [
        { title: 'Portales y campañas', description: 'La demanda entra de varias fuentes y no siempre organizada.' },
        { title: 'Visitas y oportunidades', description: 'La velocidad de respuesta hace gran parte del trabajo.' },
        { title: 'Solución', description: 'La IA ayuda a repartir, responder y seguir sin perder trazabilidad.' },
      ],
    },
    problemTitle: 'El problema en inmobiliarias y property managers',
    problemIntro: 'La fricción suele estar entre entrada de lead, respuesta, visita, seguimiento y cierre.',
    problemPoints: [
      'Llegan muchos leads de portales, formularios o campañas y no todos se trabajan con la misma velocidad.',
      'Los agentes van saturados y el seguimiento cae cuando sube el volumen.',
      'Se pierde contexto entre primera consulta, visita, propuesta y oportunidad abierta.',
      'La información comercial queda repartida entre varias herramientas y conversaciones.',
    ],
    solutionTitle: 'Qué audita la IA en inmobiliarias',
    solutionIntro: 'Detecta dónde se pierden oportunidades y propone un sistema que lo resuelve.',
    deliverables: [
      'Análisis de la entrada de leads por canal, cartera y tipo de operación.',
      'Detección de cuellos de botella entre lead y cierre.',
      'Propuesta de sistema IA: captación, respuesta, clasificación y seguimiento.',
      'Estimación de impacto: cuántas oportunidades se pueden recuperar.',
    ],
    outcomesTitle: 'Qué mejora después del proyecto',
    outcomes: [
      { title: 'Más velocidad', description: 'Las oportunidades reciben atención útil antes de enfriarse.' },
      { title: 'Más orden', description: 'El equipo trabaja menos a salto de mata y con más trazabilidad.' },
      { title: 'Más control', description: 'Se ve qué canal, agente o activo frena la conversión.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Auditamos tus canales y el ciclo real de tu venta.',
      'Proponemos un sistema de IA que no fuerza una estructura teórica que nadie sigue.',
      'Lo implementamos para que el equipo sepa qué toca hacer en cada oportunidad.',
      'Lo dejamos funcionando y formamos a tu equipo.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'La propuesta se entiende mejor con ejemplos comerciales del sector.',
    examples: [
      { title: 'Lead de portal sin respuesta rápida', description: 'La IA lo detecta antes, lo prioriza y fuerza el siguiente paso.' },
      { title: 'Visita sin seguimiento', description: 'La oportunidad no desaparece después de la primera interacción.' },
      { title: 'Cartera con demasiadas conversaciones', description: 'La IA ordena y reparte para que no todo dependa de urgencias.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu equipo ya tiene leads, pero trabaja con demasiada fricción.',
      'Necesitas constancia comercial sin contratar varias personas más.',
      'Quieres un sistema simple de entender, no una tecnología incomprensible.',
    ],
    stats: [
      { label: 'Sector', value: 'Inmobiliarias / PM' },
      { label: 'Foco', value: 'Respuesta y seguimiento' },
      { label: 'Auditoría', value: 'Gratuita' },
    ],
    teamDiagram: {
      title: 'Sistema IA para inmobiliarias: del caos de leads al cierre ordenado',
      subtitle: 'Desde el primer contacto hasta el seguimiento comercial, cada lead avanza con orden y visibilidad.',
      supportText:
        'En inmobiliaria el problema no suele ser la falta de leads: suele ser que no se responden, no se ordenan o no se siguen bien. Este sistema IA se encarga de que cada oportunidad reciba atención, seguimiento y estructura.',
      ctaLabel: 'Quiero auditar mi embudo inmobiliario',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador IA inmobiliario',
        tag: 'coordina',
        summary: 'Organiza el flujo completo de oportunidades que entran desde portales, web o campañas.',
        example: 'Centraliza el trabajo del sistema IA y mantiene el pipeline limpio.',
        benefit: 'Menos desorden comercial y más control sobre cada oportunidad.',
      },
      roles: [
        {
          title: 'Respuesta IA',
          tag: 'responde',
          summary: 'Responde nuevos leads rápidamente para evitar que se enfríen.',
          example: 'Atiende solicitudes por pisos, alquileres o compra y activa el primer contacto.',
          benefit: 'Más velocidad y mejor aprovechamiento del lead.',
        },
        {
          title: 'Clasificación IA',
          tag: 'clasifica',
          summary: 'Ordena los leads según tipo de interés, urgencia y valor potencial.',
          example: 'Distingue entre propietario, inquilino, comprador o gestión patrimonial.',
          benefit: 'Mejor priorización y menos ruido comercial.',
        },
        {
          title: 'Seguimiento IA',
          tag: 'sigue',
          summary: 'Mantiene vivo el contacto con leads que aún no han decidido.',
          example: 'Lanza recordatorios y reactivaciones para visitas o propuestas pendientes.',
          benefit: 'Menos oportunidades perdidas por falta de insistencia.',
        },
        {
          title: 'Organización IA',
          tag: 'organiza',
          summary: 'Mantiene actualizadas las etapas del pipeline comercial.',
          example: 'Mueve cada oportunidad entre "nuevo", "contactado", "visita", "negociación" o "cerrado".',
          benefit: 'Visión clara del embudo y menos caos entre canales.',
        },
        {
          title: 'Coordinación de visitas',
          tag: 'prepara',
          summary: 'Detecta qué oportunidades están listas para avanzar a visita o llamada.',
          example: 'Deja preparados los leads con suficiente intención para el equipo humano.',
          benefit: 'El equipo dedica tiempo a oportunidades más maduras.',
        },
        {
          title: 'Alertas IA',
          tag: 'alerta',
          summary: 'Vigila oportunidades estancadas y puntos de fuga del proceso.',
          example: 'Detecta leads sin respuesta, visitas no confirmadas o interesados que dejaron de contestar.',
          benefit: 'Menos fugas invisibles y mejor recuperación de negocio.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Vale para inmobiliarias pequeñas y property managers grandes?',
        answer: 'Sí. El alcance cambia, pero el problema de fondo es el mismo: demasiados leads y demasiado trabajo manual.',
      },
      {
        question: '¿Necesito cambiar mi CRM?',
        answer: 'No. Primero se ordena el proceso. Luego se decide si conviene tocar herramienta.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo de auditoría a implementación.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Auditoría gratuita para tu inmobiliaria.' },
      { href: '/recursos/ia-para-inmobiliarias-property-managers', label: 'Guía para property managers', description: 'Cómo la IA transforma la operación inmobiliaria.' },
    ],
  },
  // ── Clínicas ──────────────────────────────────────────────────────────────
  {
    kind: 'niche',
    path: '/clinicas-salud-privada',
    slug: 'clinicas-salud-privada',
    label: 'Clínicas y salud privada',
    title: 'Auditoría IA para clínicas y salud privada | Noxo IA',
    metaDescription:
      'Auditoría IA gratuita para clínicas, centros estéticos y salud privada. Detecta dónde pierdes pacientes y automatiza consultas y seguimiento.',
    searchIntent: 'Comercial sectorial. Clínica o centro estético buscando más seguimiento y menos desorden.',
    primaryKeyword: 'IA para clínicas y salud privada',
    secondaryKeywords: [
      'automatización clínica',
      'captación de pacientes IA',
      'seguimiento leads clínica',
      'IA centro estético',
    ],
    h1: 'Auditoría IA para clínicas, centros estéticos y salud privada con muchas consultas y poco seguimiento.',
    h2s: [
      'El problema en clínicas',
      'Qué audita la IA',
      'Casos de uso',
      'Encaja si',
    ],
    hero: {
      eyebrow: 'Sector: clínicas y salud privada',
      title: 'Auditoría IA para clínicas, centros estéticos y salud privada con muchas consultas y poco seguimiento.',
      intro:
        'Cuando las consultas entran por WhatsApp, formularios o campañas, pero captación, agenda y seguimiento no van unidos, se pierden pacientes potenciales por simple falta de proceso.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Menos pacientes perdidos', 'Más seguimiento real', 'Más orden comercial'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'El problema no suele ser la demanda. Suele ser el seguimiento.',
      items: [
        { title: 'Consultas', description: 'Muchos leads piden información y luego nadie retoma bien.' },
        { title: 'Agenda', description: 'Captación y agenda están desconectadas.' },
        { title: 'Solución', description: 'La IA mantiene orden, respuesta y siguiente paso visible.' },
      ],
    },
    problemTitle: 'El problema en clínicas y salud privada',
    problemIntro: 'La pérdida suele venir por consultas sin seguimiento, respuesta tardía y dependencia del equipo humano.',
    problemPoints: [
      'Muchos leads piden información y desaparecen porque nadie retoma a tiempo.',
      'La agenda, WhatsApp y la captación están desconectados.',
      'El equipo va saturado y el seguimiento depende de huecos, no de proceso.',
      'Se pierden pacientes potenciales por falta de orden comercial.',
    ],
    solutionTitle: 'Qué audita la IA en clínicas',
    solutionIntro: 'Detecta dónde se pierden pacientes potenciales y propone un sistema que lo resuelve.',
    deliverables: [
      'Análisis de la entrada de consultas por canal y tipo de tratamiento.',
      'Detección de cuellos de botella entre consulta y cita.',
      'Propuesta de sistema IA: respuesta, clasificación, seguimiento y coordinación con agenda.',
      'Estimación de impacto: cuántos pacientes se pueden recuperar.',
    ],
    outcomesTitle: 'Qué mejora después del proyecto',
    outcomes: [
      { title: 'Más respuesta útil', description: 'Las consultas dejan de quedarse en bandejas sueltas.' },
      { title: 'Más seguimiento', description: 'Las oportunidades reciben continuidad aunque el equipo vaya cargado.' },
      { title: 'Más control', description: 'Se ve qué entra, qué avanza y qué se cae.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Auditamos cómo entran hoy las consultas y dónde se pierden.',
      'Proponemos un sistema de IA adaptado a tu clínica.',
      'Lo implementamos conectando captación, seguimiento y agenda.',
      'Lo dejamos funcionando y formamos a tu equipo.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'El valor se ve mejor en situaciones reales del día a día.',
    examples: [
      { title: 'Consulta por tratamiento', description: 'La IA contesta antes y deja un seguimiento claro para no perder al paciente.' },
      { title: 'WhatsApp sin continuidad', description: 'La IA evita que la conversación muera tras el primer intercambio.' },
      { title: 'Campañas con muchos leads', description: 'La IA organiza la entrada para que el equipo no trabaje a salto de mata.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu equipo recibe consultas cada día, pero no llega a seguirlas bien.',
      'Quieres más continuidad sin cargar más a recepción o coordinación.',
      'Necesitas un proceso claro para no perder pacientes por desorden.',
    ],
    stats: [
      { label: 'Sector', value: 'Clínicas / salud' },
      { label: 'Foco', value: 'Captación y seguimiento' },
      { label: 'Auditoría', value: 'Gratuita' },
    ],
    teamDiagram: {
      title: 'Sistema IA para clínicas: convierte consultas en oportunidades reales',
      subtitle: 'Las consultas entran, se responden, se organizan y se siguen sin depender del estrés del equipo.',
      supportText:
        'En salud privada muchas oportunidades no se pierden por falta de interés, sino por falta de seguimiento. Este sistema IA responde, clasifica, organiza y sigue cada consulta.',
      ctaLabel: 'Quiero auditar mi proceso de captación',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador IA de pacientes',
        tag: 'coordina',
        summary: 'Supervisa el flujo desde la primera consulta hasta la oportunidad lista para el equipo humano.',
        example: 'Organiza las entradas, reparte tareas y mantiene el proceso controlado.',
        benefit: 'Menos consultas perdidas y más orden entre captación y agenda.',
      },
      roles: [
        {
          title: 'Respuesta IA',
          tag: 'responde',
          summary: 'Responde nuevas consultas para que el paciente no se enfríe.',
          example: 'Atiende solicitudes desde campañas, formularios o WhatsApp.',
          benefit: 'Más velocidad y mejor primera impresión.',
        },
        {
          title: 'Clasificación IA',
          tag: 'clasifica',
          summary: 'Ordena cada consulta según tratamiento, urgencia o interés.',
          example: 'Distingue entre solicitudes informativas y pacientes listos para valoración.',
          benefit: 'Mejor priorización y menos saturación del equipo.',
        },
        {
          title: 'Seguimiento IA',
          tag: 'sigue',
          summary: 'Hace seguimiento de consultas que no cerraron en el primer contacto.',
          example: 'Reactiva leads que pidieron información o quedaron pendientes.',
          benefit: 'Más oportunidades recuperadas y menos dinero perdido.',
        },
        {
          title: 'Organización IA',
          tag: 'organiza',
          summary: 'Conecta la parte comercial con la agenda para que no haya caos.',
          example: 'Deja ordenadas las oportunidades por estado y prepara al equipo.',
          benefit: 'Mejor coordinación entre captación y operación.',
        },
        {
          title: 'Coordinación de citas',
          tag: 'prepara',
          summary: 'Identifica qué leads están listos para avanzar a valoración o cita.',
          example: 'Separa pacientes con intención real y los deja listos.',
          benefit: 'El equipo dedica tiempo a quienes tienen más probabilidad de cerrar.',
        },
        {
          title: 'Alertas IA',
          tag: 'alerta',
          summary: 'Detecta consultas sin respuesta y pacientes que se están enfriando.',
          example: 'Marca cuellos de botella y puntos de fuga.',
          benefit: 'Más control y menos fugas invisibles.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Sirve para clínicas pequeñas?',
        answer: 'Sí. Cuando hay volumen de consultas y poco seguimiento, el sistema ya aporta.',
      },
      {
        question: '¿Reemplaza recepción?',
        answer: 'No. Le quita carga repetitiva para que recepción tenga más foco en el paciente.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Auditoría gratuita para tu clínica.' },
      { href: '/recursos', label: 'Recursos', description: 'Guías sobre IA en salud privada.' },
    ],
  },
  // ── Academias ──────────────────────────────────────────────────────────────
  {
    kind: 'niche',
    path: '/academias-formacion',
    slug: 'academias-formacion',
    label: 'Academias y formación',
    title: 'Auditoría IA para academias y formación | Noxo IA',
    metaDescription:
      'Auditoría IA gratuita para academias y centros de formación. Detecta dónde pierdes interesados y automatiza admisiones y seguimiento.',
    searchIntent: 'Comercial sectorial. Academia o centro de formación buscando más seguimiento de interesados.',
    primaryKeyword: 'IA para academias y formación',
    secondaryKeywords: [
      'automatización academia',
      'captación alumnos IA',
      'seguimiento leads academia',
      'IA formación',
    ],
    h1: 'Auditoría IA para academias y formación: más inscripciones, menos leads perdidos.',
    h2s: [
      'El problema en academias',
      'Qué audita la IA',
      'Casos de uso',
      'Encaja si',
    ],
    hero: {
      eyebrow: 'Sector: academias y formación',
      title: 'Auditoría IA para academias y formación: más inscripciones, menos leads perdidos.',
      intro:
        'Cuando los interesados entran por campañas, formularios y WhatsApp, pero el seguimiento depende de trabajo manual, se pierden inscripciones por falta de sistema.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Menos interesados perdidos', 'Más seguimiento de admisiones', 'Más orden comercial'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'El problema no es faltar demanda. Es no tener sistema para seguirla.',
      items: [
        { title: 'Campañas', description: 'Los leads entran de varias fuentes pero no se trabajan igual.' },
        { title: 'Admisiones', description: 'El seguimiento depende de llamadas manuales y memoria.' },
        { title: 'Solución', description: 'La IA organiza, responde y sigue cada interesado con criterio.' },
      ],
    },
    problemTitle: 'El problema en academias y formación',
    problemIntro: 'La pérdida suele venir por interesados sin seguimiento, respuesta tardía y procesos manuales.',
    problemPoints: [
      'Los interesados piden información y desaparecen porque nadie retoma a tiempo.',
      'Las campañas traen leads, pero el seguimiento no es constante.',
      'Admisiones depende de llamadas manuales y recordatorios que se olvidan.',
      'Se pierden inscripciones no por falta de interés, sino por falta de proceso.',
    ],
    solutionTitle: 'Qué audita la IA en academias',
    solutionIntro: 'Detecta dónde se pierden interesados y propone un sistema que lo resuelve.',
    deliverables: [
      'Análisis de la entrada de interesados por canal y tipo de curso.',
      'Detección de cuellos de botella entre consulta e inscripción.',
      'Propuesta de sistema IA: respuesta, clasificación, seguimiento y coordinación de admisiones.',
      'Estimación de impacto: cuántas inscripciones se pueden recuperar.',
    ],
    outcomesTitle: 'Qué mejora después del proyecto',
    outcomes: [
      { title: 'Más respuesta', description: 'Las consultas se contestan antes y con contexto.' },
      { title: 'Más seguimiento', description: 'Los interesados reciben continuidad aunque el equipo vaya cargado.' },
      { title: 'Más control', description: 'Se ve qué campaña, canal o curso convierte más.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Auditamos cómo entran hoy los interesados y dónde se pierden.',
      'Proponemos un sistema de IA adaptado a tu academia.',
      'Lo implementamos conectando captación, seguimiento y admisiones.',
      'Lo dejamos funcionando y formamos a tu equipo.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'Situaciones reales del sector donde la IA cambia el resultado.',
    examples: [
      { title: 'Consulta por curso', description: 'La IA contesta antes y deja un seguimiento claro para no perder al interesado.' },
      { title: 'Campañas con muchos leads', description: 'La IA organiza la entrada para que admisiones no se sature.' },
      { title: 'Interesado que no decidió', description: 'La IA reactiva el contacto sin depender de memoria manual.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu academia recibe consultas, pero no llega a seguirlas bien.',
      'Necesitas más constancia sin cargar más a admisiones.',
      'Quieres un proceso claro para no perder inscripciones por desorden.',
    ],
    stats: [
      { label: 'Sector', value: 'Academias / formación' },
      { label: 'Foco', value: 'Admisiones y seguimiento' },
      { label: 'Auditoría', value: 'Gratuita' },
    ],
    teamDiagram: {
      title: 'Sistema IA para academias: cada interesado avanza con orden',
      subtitle: 'Las consultas entran, se responden, se organizan y se siguen sin depender del estrés del equipo.',
      supportText:
        'En formación, muchas inscripciones no se pierden por falta de interés, sino por falta de seguimiento. Este sistema IA responde, clasifica, organiza y sigue cada interesado.',
      ctaLabel: 'Quiero auditar mi proceso de admisiones',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador IA de admisiones',
        tag: 'coordina',
        summary: 'Supervisa el flujo desde la primera consulta hasta la inscripción.',
        example: 'Organiza las entradas, reparte tareas y mantiene el proceso controlado.',
        benefit: 'Menos interesados perdidos y más orden entre captación y admisiones.',
      },
      roles: [
        {
          title: 'Respuesta IA',
          tag: 'responde',
          summary: 'Responde nuevas consultas para que el interesado no se enfríe.',
          example: 'Atiende solicitudes desde campañas, formularios o WhatsApp.',
          benefit: 'Más velocidad y mejor primera impresión.',
        },
        {
          title: 'Clasificación IA',
          tag: 'clasifica',
          summary: 'Ordena cada consulta según curso, urgencia e interés.',
          example: 'Distingue entre solicitudes informativas e interesados listos para matricularse.',
          benefit: 'Mejor priorización y menos saturación.',
        },
        {
          title: 'Seguimiento IA',
          tag: 'sigue',
          summary: 'Hace seguimiento de interesados que no cerraron en el primer contacto.',
          example: 'Reactiva leads que pidieron información o quedaron pendientes.',
          benefit: 'Más inscripciones recuperadas.',
        },
        {
          title: 'Organización IA',
          tag: 'organiza',
          summary: 'Conecta captación con admisiones para que no haya caos.',
          example: 'Deja ordenadas las oportunidades por estado y prepara al equipo.',
          benefit: 'Mejor coordinación entre marketing y admisiones.',
        },
        {
          title: 'Coordinación de matrículas',
          tag: 'prepara',
          summary: 'Identifica qué interesados están listos para avanzar a matrícula.',
          example: 'Separa interesados con intención real y los deja listos.',
          benefit: 'El equipo dedica tiempo a quienes van a matricularse.',
        },
        {
          title: 'Alertas IA',
          tag: 'alerta',
          summary: 'Detecta consultas sin respuesta e interesados que se enfrían.',
          example: 'Marca cuellos de botella y puntos de fuga.',
          benefit: 'Más control y menos fugas invisibles.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Sirve para academias pequeñas?',
        answer: 'Sí. Cuando el equipo es pequeño, cada lead cuenta más y la IA aporta más valor.',
      },
      {
        question: '¿Reemplaza admisiones?',
        answer: 'No. Le quita el caos operativo para que admisiones tenga más foco en cerrar matrículas.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Auditoría gratuita para tu academia.' },
      { href: '/recursos', label: 'Recursos', description: 'Guías sobre IA en formación.' },
    ],
  },
]

// ===========================================================================
//  ARTICLE PAGES
// ===========================================================================

export const articlePages: PageData[] = [
  {
    kind: 'article',
    path: '/recursos/auditoria-ia-gratuita-para-empresas',
    slug: 'auditoria-ia-gratuita-para-empresas',
    label: 'Qué es una auditoría IA',
    title: 'Qué es una auditoría IA y por qué tu empresa la necesita ya | Noxo IA',
    metaDescription:
      'Una auditoría IA gratuita te dice exactamente dónde puedes automatizar, ahorrar y crecer antes de invertir un euro.',
    searchIntent: 'Informacional con intención comercial. Empresa explorando si la IA le sirve.',
    primaryKeyword: 'auditoría IA gratuita',
    secondaryKeywords: [
      'auditoría inteligencia artificial empresas',
      'diagnóstico IA empresa',
      'consultoría IA gratis',
    ],
    h1: 'Qué es una auditoría IA y por qué tu empresa la necesita ya.',
    h2s: ['Qué es', 'Qué incluye', 'Por qué es gratuita', 'Qué pasa después'],
    hero: {
      eyebrow: 'Auditoría y proyectos IA',
      title: 'Qué es una auditoría IA y por qué tu empresa la necesita ya.',
      intro:
        'Una auditoría IA es un análisis gratuito de tu empresa que te dice exactamente dónde puedes automatizar, ahorrar y crecer con inteligencia artificial. Sin compromiso y sin humo.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Gratis', '48 horas', 'Sin compromiso'],
    },
    heroPanel: {
      label: 'En resumen',
      title: 'Te decimos qué puede hacer la IA por tu empresa antes de que inviertas un euro.',
      items: [
        { title: 'Diagnóstico', description: 'Análisis de procesos manuales y tareas automatizables.' },
        { title: 'Oportunidades', description: 'Mapa priorizado por impacto y esfuerzo.' },
        { title: 'Propuesta', description: 'Si hay encaje, proyecto con presupuesto cerrado.' },
      ],
    },
    articleCategory: 'Auditoría y proyectos IA',
    articleSections: [
      {
        title: 'Qué es una auditoría IA',
        paragraphs: [
          'Una auditoría IA es un análisis de tu empresa que identifica dónde la inteligencia artificial puede ahorrar tiempo, generar más ventas y eliminar trabajo manual innecesario. No es una charla motivacional sobre IA. Es un diagnóstico concreto de tu operativa real.',
          'En Noxo IA hacemos esta auditoría de forma gratuita porque filtramos por necesidad, no por cartera. Si tu empresa no necesita IA, te lo decimos. Si la necesita, te demostramos dónde y cómo.',
        ],
      },
      {
        title: 'Qué incluye la auditoría',
        paragraphs: [
          'Análisis de tus procesos actuales: captación, respuesta, seguimiento, organización y reporting. Detección de tareas repetitivas que la IA puede asumir. Identificación de puntos de fuga donde se pierde tiempo, dinero u oportunidades.',
          'Mapa de oportunidades priorizado por impacto y esfuerzo. Estimación de ROI: cuánto puedes ahorrar o ganar con la implementación. Y si hay encaje, propuesta de proyecto con timeline y presupuesto cerrados.',
        ],
      },
      {
        title: 'Por qué es gratuita',
        paragraphs: [
          'Porque nuestro modelo no es vender auditorías. Es implementar proyectos de IA. La auditoría es el primer paso para que entiendas el valor antes de decidir. Si no hay encaje, te ahorras un proyecto que no te sirve. Si lo hay, tienes toda la información para decidir con datos.',
          'No hay truco ni letra pequeña. La auditoría es gratuita y sin compromiso. Te quedas con el diagnóstico ocurra lo que ocurra después.',
        ],
      },
      {
        title: 'Qué pasa después de la auditoría',
        paragraphs: [
          'Si la auditoría muestra que hay oportunidades claras, te proponemos un proyecto de implementación con alcance, timeline y presupuesto cerrados. Tú decides si quieres adelante.',
          'Si decides sí, implementamos el sistema completo en 14-30 días. Lo dejamos funcionando, formamos a tu equipo y lo documentamos. El sistema funciona solo después del proyecto.',
          'Si decides no, te quedas con el diagnóstico gratis. Sin coste y sin compromiso. Si más adelante quieres retomar, ahí estamos.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿La auditoría es realmente gratuita?',
        answer: 'Sí, 100% gratuita y sin compromiso. Si no hay encaje, te lo decimos.',
      },
      {
        question: '¿Cuánto tarda?',
        answer: '48 horas desde que hablamos.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo de auditoría a implementación.' },
      { href: '/recursos/automatizar-captacion-leads-con-ia', label: 'Automatizar captación con IA', description: 'Cómo la IA transforma la captación de leads.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Pide tu auditoría gratuita ahora.' },
    ],
  },
  {
    kind: 'article',
    path: '/recursos/automatizar-captacion-leads-con-ia',
    slug: 'automatizar-captacion-leads-con-ia',
    label: 'Automatizar captación con IA',
    title: 'Cómo automatizar la captación de leads con IA sin perder el toque humano | Noxo IA',
    metaDescription:
      'Sistemas de IA que captan, responden y siguen leads mientras tu equipo se centra en cerrar. Automatización real, no bots genéricos.',
    searchIntent: 'Informacional middle-funnel. Empresa buscando cómo automatizar captación.',
    primaryKeyword: 'automatizar captación de leads con IA',
    secondaryKeywords: [
      'IA para captación',
      'automatización leads IA',
      'respuestas automáticas IA',
      'seguimiento leads automático',
    ],
    h1: 'Cómo automatizar la captación de leads con IA sin perder el toque humano.',
    h2s: ['El problema', 'Qué hace la IA', 'Sin perder el toque humano', 'Cómo empezar'],
    hero: {
      eyebrow: 'Automatización comercial',
      title: 'Cómo automatizar la captación de leads con IA sin perder el toque humano.',
      intro:
        'La IA no reemplaza a tu equipo. Le quita el trabajo repetitivo para que pueda centrarse en cerrar. Esto es cómo funciona.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver cómo trabajamos',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Respuesta en segundos', 'Seguimiento automático', 'Toque humano en el cierre'],
    },
    heroPanel: {
      label: 'En resumen',
      title: 'La IA hace el trabajo operativo. Tu equipo hace el trabajo que importa.',
      items: [
        { title: 'Capta', description: 'Recoge leads de todos los canales sin que se pierdan.' },
        { title: 'Responde', description: 'Contesta en minutos, 24/7, con el mensaje correcto.' },
        { title: 'Segue', description: 'Mantiene el contacto hasta que el lead está listo para cerrar.' },
      ],
    },
    articleCategory: 'Automatización comercial',
    articleSections: [
      {
        title: 'El problema de la captación manual',
        paragraphs: [
          'Cuando los leads entran por WhatsApp, email, formularios y redes, pero la respuesta depende de quién esté disponible, se pierden oportunidades cada día. No por falta de interés, sino por falta de sistema.',
          'El equipo humano no puede estar pendiente de cada canal a la vez. Y aunque lo esté, el seguimiento se hace cuando hay tiempo, no cuando toca.',
        ],
      },
      {
        title: 'Qué hace la IA en la captación',
        paragraphs: [
          'Un sistema de IA puede captar leads desde todos los canales en un solo flujo, responder automáticamente en los primeros minutos con el mensaje correcto, clasificar y priorizar oportunidades según intención y urgencia, y hacer seguimiento con criterio para que ningún lead se enfríe.',
          'No es un chatbot genérico. Es un sistema adaptado a tu negocio que sabe qué decir, cuándo decirlo y a quién decírselo.',
        ],
      },
      {
        title: 'Cómo no perder el toque humano',
        paragraphs: [
          'La clave es que la IA hace el trabajo operativo —captar, responder, clasificar, seguir— y tu equipo hace el trabajo que importa: cerrar. Cuando el lead está caliente y listo, la IA lo pasa al humano con todo el contexto.',
          'El resultado es que tu equipo dedica tiempo a conversaciones que valen, no a perseguir leads fríos o contestar la misma pregunta veinte veces.',
        ],
      },
      {
        title: 'Cómo empezar',
        paragraphs: [
          'El primer paso es la auditoría gratuita. Te decimos exactamente dónde puedes automatizar y qué impacto tendría. Si hay encaje, te proponemos un proyecto de implementación con presupuesto cerrado.',
          'No necesitas saber nada de IA. Nosotros nos encargamos de toda la parte técnica. Tú solo necesitas conocer tu negocio.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿La IA reemplaza a mi equipo comercial?',
        answer: 'No. Le quita el trabajo repetitivo para que pueda centrarse en cerrar.',
      },
      {
        question: '¿Necesito cambiar mis herramientas?',
        answer: 'No. Integramos con lo que ya usas.',
      },
    ],
    relatedLinks: [
      { href: '/recursos/auditoria-ia-gratuita-para-empresas', label: 'Qué es la auditoría IA', description: 'El primer paso para automatizar tu captación.' },
      { href: '/como-funciona', label: 'Cómo trabajamos', description: 'El proceso completo.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Pide tu auditoría gratuita ahora.' },
    ],
  },
  {
    kind: 'article',
    path: '/recursos/ia-para-inmobiliarias-property-managers',
    slug: 'ia-para-inmobiliarias-property-managers',
    label: 'IA para inmobiliarias',
    title: 'IA para inmobiliarias y property managers: del caos de leads al cierre ordenado | Noxo IA',
    metaDescription:
      'Ejemplos concretos de cómo la IA transforma la operación comercial en gestión inmobiliaria. Captación, respuesta, seguimiento y cierre.',
    searchIntent: 'Guía aplicada al sector inmobiliario.',
    primaryKeyword: 'IA para inmobiliarias',
    secondaryKeywords: [
      'automatización inmobiliaria',
      'gestión de leads inmobiliarios',
      'IA property management',
      'sistema IA inmobiliaria',
    ],
    h1: 'IA para inmobiliarias y property managers: del caos de leads al cierre ordenado.',
    h2s: ['El problema actual', 'Qué cambia con IA', 'Ejemplos concretos', 'Cómo empezar'],
    hero: {
      eyebrow: 'Sectores',
      title: 'IA para inmobiliarias y property managers: del caos de leads al cierre ordenado.',
      intro:
        'En inmobiliaria el problema no suele ser la falta de leads. Suele ser que no se responden, no se ordenan o no se siguen bien. La IA lo cambia.',
      primaryCtaLabel: 'Solicitar auditoría gratuita',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver sector inmobiliario',
      secondaryCtaHref: '/inmobiliarias-property-managers',
      bullets: ['Más velocidad', 'Más orden', 'Más cierres'],
    },
    heroPanel: {
      label: 'En resumen',
      title: 'La IA transforma la operación comercial inmobiliaria de caos a sistema.',
      items: [
        { title: 'Antes', description: 'Leads que se pierden, visitas sin seguimiento, pipeline invisible.' },
        { title: 'Después', description: 'Cada lead se responde, se organiza y se sigue con criterio.' },
        { title: 'Resultado', description: 'Más oportunidades trabajadas y más cierres.' },
      ],
    },
    articleCategory: 'Sectores',
    articleSections: [
      {
        title: 'El problema actual en inmobiliarias',
        paragraphs: [
          'Las inmobiliarias y property managers reciben leads desde portales, campañas, formularios y WhatsApp. Pero la respuesta y el seguimiento dependen de trabajo manual, y cuando el volumen sube, el seguimiento cae.',
          'El resultado es que oportunidades que podrían cerrarse se enfrían por simple falta de sistema. No es un problema de demanda. Es un problema de proceso.',
        ],
      },
      {
        title: 'Qué cambia con IA',
        paragraphs: [
          'Un sistema de IA puede unificar la entrada de leads desde todos los canales, responder automáticamente en los primeros minutos, clasificar y priorizar oportunidades según intención de compra o alquiler, y hacer seguimiento con criterio para que ningún lead se enfríe.',
          'Además, mantiene el pipeline visible para que dirección sepa qué entra, qué avanza y qué se está perdiendo.',
        ],
      },
      {
        title: 'Ejemplos concretos',
        paragraphs: [
          'Un lead entra por un portal a las 22:00. El sistema IA responde antes de que se vaya con otro, deja el seguimiento programado y avisa al agente si el lead tiene intención real.',
          'Una visita se hizo hace una semana y no hay respuesta. El sistema IA lanza un recontacto con un mensaje diferente al primero.',
          'Una cartera con 50 conversaciones abiertas. El sistema IA las ordena por prioridad y deja al agente solo las que merecen su tiempo.',
        ],
      },
      {
        title: 'Cómo empezar',
        paragraphs: [
          'El primer paso es la auditoría gratuita. Analizamos tu operativa inmobiliaria y te decimos exactamente dónde la IA puede tener más impacto. Si hay encaje, te proponemos un proyecto con presupuesto cerrado.',
          'No necesitas cambiar tu CRM ni reorganizar todo tu equipo. Empezamos por lo que ya tienes.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Esto sustituye a los agentes?',
        answer: 'No. Les quita el caos operativo para que tengan más foco en cerrar.',
      },
      {
        question: '¿Necesito cambiar mi CRM?',
        answer: 'No. Integramos con lo que ya usas.',
      },
    ],
    relatedLinks: [
      { href: '/inmobiliarias-property-managers', label: 'Sector inmobiliario', description: 'Página dedicada a inmobiliarias y property managers.' },
      { href: '/recursos/auditoria-ia-gratuita-para-empresas', label: 'Qué es la auditoría IA', description: 'El primer paso.' },
      { href: '/#contacto', label: 'Solicitar auditoría', description: 'Pide tu auditoría gratuita ahora.' },
    ],
  },
]

// ===========================================================================
//  AGGREGATES
// ===========================================================================

export const allPages: PageData[] = [
  homePage,
  howItWorksPage,
  pricingPage,
  resourcesPage,
  ...nichePages,
  ...articlePages,
]

export const pagesByPath: Record<string, PageData> = Object.fromEntries(
  allPages.map((page) => [page.path, page]),
)
