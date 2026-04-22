export const brandName = 'Noxo AI Empresas'
export const siteUrl = 'https://noxoiaempresas.com'
export const contactSectionId = 'contacto'

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

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    tagline: 'Primer empleado digital',
    setupPrice: '900€ setup',
    monthlyPrice: '390€/mes',
    summary: 'Para empresas que quieren dejar de perder leads y empezar a trabajar con orden desde el día uno.',
    idealFor: 'Negocios con un flujo de leads manejable, pero desordenado entre WhatsApp, email y formularios.',
    features: [
      '1 empleado digital centrado en captación y organización de leads',
      'Entrada unificada desde formularios, email y WhatsApp',
      'Clasificación inicial y siguiente paso sugerido',
      'Seguimiento básico para que no se enfríen oportunidades',
      'Panel simple con estado de leads y tareas pendientes',
    ],
    pricingLogic:
      'Entrada clara para empezar sin un proyecto grande. Filtra a quien necesita orden comercial ya, pero todavía no un sistema más amplio.',
    ctaLabel: 'Elegir Starter',
    ctaHref: '/#contacto',
  },
  {
    name: 'Growth',
    tagline: 'Equipo digital comercial',
    setupPrice: '1.800€ setup',
    monthlyPrice: '790€/mes',
    summary: 'Para empresas con volumen real de leads que necesitan responder, seguir y coordinar sin depender de memoria y urgencias.',
    idealFor: 'Equipos comerciales o administrativos que ya van cargados y necesitan consistencia diaria.',
    features: [
      '2-3 empleados digitales trabajando captación, respuesta y seguimiento',
      'Reglas de prioridad para leads calientes y leads estancados',
      'Secuencias de seguimiento y recordatorios automáticos',
      'Pipeline visible para dirección y equipo',
      'Ajustes mensuales para mejorar velocidad y conversión',
    ],
    pricingLogic:
      'Es el plan que mejor equilibra coste, impacto y claridad de operación. Por eso es el recomendado para cerrar en 30 días.',
    ctaLabel: 'Elegir Growth',
    ctaHref: '/#contacto',
    featured: true,
  },
  {
    name: 'Full Team',
    tagline: 'Operación digital completa',
    setupPrice: '3.500€ setup',
    monthlyPrice: '1.490€/mes',
    summary: 'Para empresas que quieren un sistema completo con varios empleados digitales cubriendo distintas partes del proceso.',
    idealFor: 'Equipos con varios canales, varias personas y necesidad de visibilidad operativa real.',
    features: [
      'Equipo digital completo para captar, responder, organizar y seguir leads',
      'Varios flujos coordinados para comercial y administración',
      'Automatizaciones por canal, estado y tipo de lead',
      'Reporting ejecutivo y lectura de cuellos de botella',
      'Soporte prioritario y evolución continua del sistema',
    ],
    pricingLogic:
      'Pensado para cuando el coste de perder oportunidades ya supera claramente el coste del sistema. Entra menos por precio y más por retorno operativo.',
    ctaLabel: 'Hablar sobre Full Team',
    ctaHref: '/#contacto',
  },
]

export const primaryNav = [
  { href: '/', label: 'Inicio' },
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/#sectores', label: 'Sectores' },
  { href: '/precios', label: 'Precios' },
  { href: '/recursos', label: 'Recursos' },
  { href: '/#contacto', label: 'Contacto' },
]

export const nicheLinks: LinkEntry[] = [
  {
    href: '/coliving-flex-living',
    label: 'Coliving y flex living',
    description: 'Equipos digitales para responder, organizar y seguir leads de reservas, visitas y estancias.',
  },
  {
    href: '/inmobiliarias-property-managers',
    label: 'Inmobiliarias y property managers',
    description: 'Equipo digital para ordenar portales, formularios, visitas y seguimiento comercial.',
  },
  {
    href: '/clinicas-salud-privada',
    label: 'Clínicas y salud privada',
    description: 'Equipo digital para responder consultas, organizar pacientes potenciales y seguir oportunidades.',
  },
  {
    href: '/academias-formacion',
    label: 'Academias y formación',
    description: 'Sistema claro para seguir interesados, admisiones y oportunidades procedentes de campañas o formularios.',
  },
]

export const resourceCategories: ResourceCategory[] = [
  {
    name: 'Gestión de leads',
    description: 'Contenido para ordenar entrada, clasificación y priorización de oportunidades.',
  },
  {
    name: 'Seguimiento comercial',
    description: 'Cómo responder antes, seguir mejor y no perder leads por desorden.',
  },
  {
    name: 'Sectores',
    description: 'Casos aplicados a coliving, inmobiliarias, clínicas y academias.',
  },
  {
    name: 'Operación y procesos',
    description: 'Procesos comerciales simples para equipos pequeños y medianos.',
  },
]

export const featuredResources: ResourcePostSummary[] = [
  {
    path: '/recursos/como-no-perder-leads-por-whatsapp',
    title: 'Cómo no perder leads por WhatsApp cuando el equipo va saturado',
    category: 'Gestión de leads',
    excerpt: 'El problema no es WhatsApp. El problema es no tener un sistema detrás para responder, clasificar y seguir.',
    intent: 'Informacional con intención comercial',
  },
  {
    path: '/recursos/seguimiento-de-leads-sin-caos',
    title: 'Seguimiento de leads sin caos: el sistema mínimo que necesita una pyme',
    category: 'Seguimiento comercial',
    excerpt: 'Qué pasos, alertas y reglas hacen falta para que el seguimiento no dependa de memoria y buena voluntad.',
    intent: 'Informacional middle-funnel',
  },
  {
    path: '/recursos/empleados-digitales-para-property-managers',
    title: 'Qué puede hacer un equipo de empleados digitales en property management',
    category: 'Sectores',
    excerpt: 'Ejemplos concretos de captación, organización, seguimiento y coordinación por cartera o activo.',
    intent: 'Guía aplicada al sector',
  },
]

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

export const homePage: PageData = {
  kind: 'home',
  path: '/',
  slug: '',
  label: 'Inicio',
  title: 'Empleados digitales para captar y seguir leads | Noxo IA Empresas',
  metaDescription:
    'Implementamos un equipo de empleados digitales que capta, responde, organiza y sigue tus leads para que tu equipo humano no pierda tiempo ni oportunidades.',
  searchIntent: 'Transaccional B2B. Usuario buscando una solución clara para ordenar y seguir leads sin contratar más personas.',
  primaryKeyword: 'empleados digitales para leads',
  secondaryKeywords: [
    'equipo digital para leads',
    'automatización comercial para leads',
    'seguimiento de leads para empresas',
    'organizar leads de whatsapp y email',
    'equipo digital comercial',
  ],
  h1: 'Contrata un equipo de empleados digitales para captar, responder, organizar y seguir tus leads sin caos ni retrasos.',
  h2s: [
    'Qué hace el equipo digital',
    'Qué problema resuelve',
    'Cómo funciona',
    'Qué tareas cubre',
    'Planes y precios',
    'Preguntas frecuentes',
  ],
  hero: {
    eyebrow: 'Equipo digital para leads',
    title:
      'Contrata un equipo de empleados digitales para captar, responder, organizar y seguir tus leads sin caos ni retrasos.',
    intro:
      'No vendemos automatizaciones sueltas. Implementamos un sistema con empleados digitales que trabajan cada día para que no pierdas oportunidades entre WhatsApp, email, formularios y CRM.',
    primaryCtaLabel: 'Ver precios',
    primaryCtaHref: '/precios',
    secondaryCtaLabel: 'Ver cómo funciona',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Responde más rápido',
      'Organiza leads sin trabajo manual',
      'Haz seguimiento sin olvidos',
    ],
  },
  heroPanel: {
    label: 'Qué compra el cliente',
    title: 'No compras software suelto. Compras trabajo operativo diario.',
    items: [
      {
        title: 'Capta',
        description: 'El equipo digital recoge y ordena leads que hoy entran dispersos.',
      },
      {
        title: 'Responde',
        description: 'Actúa rápido para que las oportunidades no se enfríen mientras tu equipo va cargado.',
      },
      {
        title: 'Sigue',
        description: 'Mantiene el seguimiento con criterio y constancia para que no dependas de memoria.',
      },
    ],
  },
  problemTitle: 'Tu problema no son las herramientas. Es el desorden entre herramientas.',
  problemIntro:
    'Cuando un lead entra por demasiados sitios y nadie tiene un sistema claro, se pierde tiempo, contexto y ventas.',
  problemPoints: [
    'Los leads llegan por WhatsApp, email, formularios y CRM, pero no se trabajan con el mismo ritmo.',
    'El equipo tarda en responder porque está saturado con tareas manuales.',
    'El seguimiento se hace cuando hay tiempo, no cuando toca.',
    'La información queda repartida y nadie ve el estado real de cada oportunidad.',
    'Se pierden leads no por falta de demanda, sino por falta de sistema.',
  ],
  solutionTitle: 'Qué hace el equipo digital por tu empresa',
  solutionIntro:
    'Cada empleado digital se ocupa de una parte concreta del trabajo para que el proceso no dependa solo de personas saturadas.',
  deliverables: [
    'Recibe y organiza leads desde los canales donde hoy trabajas.',
    'Clasifica oportunidades y detecta cuáles requieren atención inmediata.',
    'Responde o deja preparada la respuesta según canal y contexto.',
    'Hace seguimiento con recordatorios, tareas y estados claros.',
    'Mantiene ordenado el pipeline para comercial, administración y dirección.',
    'Te da visibilidad de qué entra, qué avanza y qué se está perdiendo.',
  ],
  outcomesTitle: 'Qué cambia cuando el sistema está bien montado',
  outcomes: [
    {
      title: 'Menos caos',
      description: 'El equipo deja de perseguir conversaciones, datos sueltos y próximos pasos.',
    },
    {
      title: 'Más constancia',
      description: 'Cada lead recibe seguimiento aunque el equipo humano tenga una semana cargada.',
    },
    {
      title: 'Más control',
      description: 'Dirección ve el estado real del proceso sin depender de intuición.',
    },
  ],
  processTitle: 'Cómo funciona',
  process: [
    'Analizamos cómo entran hoy tus leads y dónde se está perdiendo tiempo o seguimiento.',
    'Diseñamos el equipo digital con tareas concretas y flujos simples de entender.',
    'Lo implementamos sobre tu operativa actual sin meter complejidad innecesaria.',
    'Lo ajustamos para que responda mejor, organice mejor y siga mejor cada oportunidad.',
  ],
  fitTitle: 'Encaja si tu equipo ya no puede absorber más desorden',
  fitPoints: [
    'Tu empresa recibe leads, pero no los trabaja con consistencia.',
    'Tienes comerciales o administración cargados con tareas repetitivas.',
    'Quieres un sistema operativo claro, no más herramientas sueltas.',
  ],
  examplesTitle: 'Qué señales indican que ya lo necesitas',
  examplesIntro: 'Si te reconoces aquí, el problema ya no es de esfuerzo. Es de estructura comercial.',
  examples: [
    {
      title: 'Leads contestados tarde',
      description: 'Responder tarde equivale a regalar oportunidades a quien llega antes.',
    },
    {
      title: 'Seguimiento irregular',
      description: 'Un lead sin siguiente paso claro suele convertirse en lead perdido.',
    },
    {
      title: 'Información repartida',
      description: 'Cuando cada conversación vive en un canal distinto, nadie controla el proceso completo.',
    },
  ],
  stats: [
    { label: 'Promesa principal', value: 'Equipo digital' },
    { label: 'Foco', value: 'Leads y seguimiento' },
    { label: 'Resultado', value: 'Más orden' },
  ],
  pricingTitle: 'Precios visibles para filtrar bien desde el principio',
  pricingIntro:
    'Mostramos precios porque ayudan a entender el alcance, comparar rápido y evitar llamadas improductivas.',
  pricingPlans,
  pricingNotes: [
    'El setup cubre diseño, configuración e implantación inicial.',
    'La cuota mensual cubre el trabajo operativo del equipo digital y la mejora continua.',
    'Growth es el plan recomendado porque suele ser el punto donde más rápido se nota el retorno.',
  ],
  faqs: [
    {
      question: '¿Esto sustituye a mi equipo humano?',
      answer:
        'No. El objetivo es quitar carga repetitiva y desorden para que tu equipo humano se centre en vender, atender mejor y cerrar.',
    },
    {
      question: '¿Necesito cambiar mis herramientas actuales?',
      answer:
        'No necesariamente. Lo primero es ordenar el proceso. Después se decide si conviene mantener o simplificar herramientas.',
    },
    {
      question: '¿Por qué enseñáis los precios?',
      answer:
        'Porque ayudan a filtrar, generan confianza y permiten entender el valor frente a seguir perdiendo leads por desorden.',
    },
    {
      question: '¿Qué hace exactamente un empleado digital?',
      answer:
        'Hace trabajo operativo real: captar, clasificar, responder, organizar y seguir leads con reglas claras y constancia diaria.',
    },
  ],
  relatedLinks: [
    { href: '/como-funciona', label: 'Cómo funciona', description: 'Explicación completa de cómo implementamos el equipo digital.' },
    { href: '/precios', label: 'Precios', description: 'Comparación clara de planes con setup y cuota mensual visibles.' },
    { href: '/recursos', label: 'Recursos', description: 'Guías y artículos sobre gestión de leads, seguimiento y organización comercial.' },
  ],
}

export const howItWorksPage: PageData = {
  kind: 'service',
  path: '/como-funciona',
  slug: 'como-funciona',
  label: 'Cómo funciona',
  title: 'Cómo funciona un equipo de empleados digitales para leads | Noxo IA Empresas',
  metaDescription:
    'Descubre cómo implementamos un equipo de empleados digitales que capta, responde, organiza y sigue tus leads sin meter más caos al equipo.',
  searchIntent: 'Comercial. Usuario evaluando cómo funciona el servicio antes de pedir una llamada o ver precios.',
  primaryKeyword: 'equipo digital para leads',
  secondaryKeywords: [
    'empleados digitales para empresas',
    'cómo organizar leads con automatización',
    'equipo digital comercial',
    'sistema para seguir leads',
  ],
  h1: 'Cómo funciona un equipo de empleados digitales para leads.',
  h2s: [
    'Qué problema resuelve',
    'Qué incluye',
    'Cómo se implementa',
    'Objeciones habituales',
    'Resultados esperables',
  ],
  hero: {
    eyebrow: 'Cómo funciona',
    title: 'Cómo funciona un equipo de empleados digitales para leads.',
    intro:
      'Diseñamos un sistema operativo claro para que tus leads se capten, respondan, organicen y sigan con más consistencia que hoy.',
    primaryCtaLabel: 'Ver precios',
    primaryCtaHref: '/precios',
    secondaryCtaLabel: 'Solicitar diagnóstico',
    secondaryCtaHref: '/#contacto',
    bullets: [
      'Trabajo operativo real',
      'Implementación sobre tu proceso actual',
      'Más claridad para comercial y dirección',
    ],
  },
  heroPanel: {
    label: 'Idea fuerza',
    title: 'No es una capa de humo técnico. Es un sistema que trabaja.',
    items: [
      { title: 'Entrada', description: 'Centraliza canales y pone orden desde el primer contacto.' },
      { title: 'Seguimiento', description: 'Mantiene el ritmo comercial sin depender solo de memoria.' },
      { title: 'Control', description: 'Da visibilidad del estado real del embudo a quien toma decisiones.' },
    ],
  },
  problemTitle: 'Qué problema resuelve',
  problemIntro:
    'Resuelve el hueco entre recibir un lead y trabajarlo bien de forma constante.',
  problemPoints: [
    'Tu equipo no necesita más apps, necesita menos trabajo manual y más orden.',
    'Responder una vez no basta si luego el seguimiento se cae.',
    'Sin sistema, cada persona trabaja como puede y el embudo pierde coherencia.',
    'Los leads no se pierden solo por calidad. También se pierden por lentitud y caos.',
  ],
  solutionTitle: 'Qué incluye el servicio',
  solutionIntro:
    'Implantamos un equipo digital con tareas definidas, prioridades claras y visibilidad de proceso.',
  deliverables: [
    'Diseño del flujo completo de entrada, respuesta y seguimiento.',
    'Empleados digitales asignados a tareas concretas del proceso.',
    'Reglas de priorización para que no se te escapen leads calientes.',
    'Estados y pipeline claros para saber qué toca hacer en cada oportunidad.',
    'Ajustes mensuales para mejorar velocidad y consistencia.',
  ],
  outcomesTitle: 'Qué puedes esperar',
  outcomes: [
    { title: 'Más respuesta útil', description: 'No solo contestar más rápido, sino contestar con contexto y siguiente paso.' },
    { title: 'Más seguimiento estable', description: 'El proceso no se cae cuando el equipo va cargado.' },
    { title: 'Más control del embudo', description: 'Se ve lo que entra, lo que avanza y lo que se atasca.' },
  ],
  processTitle: 'Cómo se implementa',
  process: [
    'Auditamos cómo entra hoy la demanda y dónde se rompe el proceso.',
    'Definimos qué trabajo asume cada empleado digital y qué sigue haciendo el equipo humano.',
    'Configuramos los flujos sobre los canales y herramientas que ya usas.',
    'Validamos con el equipo y ajustamos hasta que el sistema queda claro y útil.',
  ],
  examplesTitle: 'Qué tareas cubre el equipo digital',
  examplesIntro: 'Las tareas son concretas y fáciles de entender por cualquier negocio.',
  examples: [
    { title: 'Captar', description: 'Recoger leads desde formularios, email, WhatsApp o CRM sin que se pierdan por el camino.' },
    { title: 'Responder', description: 'Dar salida rápida a las primeras consultas o dejar la respuesta preparada.' },
    { title: 'Organizar', description: 'Etiquetar, clasificar y ordenar oportunidades por prioridad, canal o estado.' },
    { title: 'Seguir', description: 'Recordar recontactos, detectar leads parados y mantener el siguiente paso claro.' },
  ],
  objectionsTitle: 'Objeciones habituales',
  objections: [
    'No hace falta sustituir al equipo humano para mejorar el proceso.',
    'No necesitas un proyecto técnico complejo para empezar a ordenar leads.',
    'No hace falta esconder precios ni el funcionamiento para venderlo bien.',
  ],
  stats: [
    { label: 'Concepto', value: 'Equipo digital' },
    { label: 'Trabajo', value: 'Diario y operativo' },
    { label: 'Objetivo', value: 'No perder leads' },
  ],
  teamDiagram: {
    title: 'El equipo digital completo: cada empleado con un rol, todo coordinado',
    subtitle: 'No es un bot que hace de todo. Es un equipo donde cada empleado digital tiene una tarea concreta y trabaja en paralelo con los demás.',
    supportText: 'La clave no está en tener más herramientas, sino en tener un equipo que trabaja con criterio: capta, responde, clasifica, sigue, publica y gestiona campañas sin que tú tengas que supervisar cada paso.',
    ctaLabel: 'Quiero ver cómo encaja este equipo en mi empresa',
    ctaHref: '/#contacto',
    centralRole: {
      title: 'Director de operaciones digitales',
      tag: 'coordina',
      summary: 'Orquesta todo el equipo: recibe señales, asigna tareas y asegura que ningún lead o tarea quede sin atender.',
      example: 'Detecta un lead entrante, activa al respondedor, informa al clasificador y deja al gestor de seguimiento preparado para el siguiente paso.',
      benefit: 'El proceso funciona solo. Tú tienes visibilidad sin tener que supervisar cada acción.',
    },
    roles: [
      {
        title: 'Captador de leads',
        tag: 'captura',
        summary: 'Unifica la entrada de leads desde todos los canales: web, WhatsApp, email, redes y campañas de pago.',
        example: 'Recoge en el mismo momento un lead de Google Ads, otro de Instagram y otro de un formulario web, sin duplicados y sin pérdidas.',
        benefit: 'Ningún lead se pierde entre canales, aunque entren diez a la vez.',
      },
      {
        title: 'Respondedor de consultas',
        tag: 'responde',
        summary: 'Responde al lead en los primeros minutos con el mensaje correcto según canal y contexto.',
        example: 'Detecta que el lead preguntó por precio en WhatsApp y responde con la información básica y el siguiente paso claro.',
        benefit: 'Menos leads fríos. Mejor primera impresión sin depender del horario del equipo.',
      },
      {
        title: 'Clasificador y priorizador',
        tag: 'clasifica',
        summary: 'Ordena cada lead según urgencia, intención y encaje real con tu oferta.',
        example: 'Separa leads que ya saben lo que quieren de leads que aún están explorando, y prioriza los primeros para el equipo humano.',
        benefit: 'El equipo humano solo dedica tiempo a los leads que realmente merecen atención.',
      },
      {
        title: 'Gestor de seguimiento',
        tag: 'sigue',
        summary: 'Mantiene el contacto activo con leads que no cerraron en el primer contacto.',
        example: 'Detecta que un lead no respondió en 48 h y lanza un recontacto con un mensaje diferente al primero.',
        benefit: 'Más oportunidades rescatadas sin esfuerzo manual. Ningún lead se enfría por olvido.',
      },
      {
        title: 'Publicador de redes sociales',
        tag: 'publica',
        summary: 'Crea y publica contenido en los canales sociales de la empresa con la frecuencia y el tono correctos.',
        example: 'Publica tres piezas semanales en LinkedIn e Instagram adaptando el mensaje y el formato a cada plataforma.',
        benefit: 'Presencia constante en redes sin que el equipo dedique horas a crear contenido.',
      },
      {
        title: 'Gestor de campañas Google',
        tag: 'ads',
        summary: 'Supervisa y ajusta las campañas de Google Ads para que los leads sean de calidad y el coste sea razonable.',
        example: 'Detecta que una campaña trae leads de baja intención y ajusta segmentación y palabras clave para mejorar el resultado.',
        benefit: 'Más leads útiles por euro invertido. Sin necesidad de un especialista dedicado a tiempo completo.',
      },
    ],
  },
  faqs: [
    {
      question: '¿Cuánto tarda en notarse?',
      answer:
        'El primer cambio suele notarse cuando el equipo deja de trabajar con conversaciones sueltas y empieza a trabajar con un proceso visible.',
    },
    {
      question: '¿Esto vale para cualquier sector?',
      answer:
        'Funciona mejor donde ya existe entrada de leads y desorden en el seguimiento. Por eso también trabajamos páginas específicas por sector.',
    },
  ],
  relatedLinks: [
    { href: '/precios', label: 'Precios', description: 'Planes claros con setup y cuota mensual visibles.' },
    ...nicheLinks,
    { href: '/recursos', label: 'Recursos', description: 'Contenido útil para entender cómo mejorar captación y seguimiento.' },
  ],
}

export const pricingPage: PageData = {
  kind: 'pricing',
  path: '/precios',
  slug: 'precios',
  label: 'Precios',
  title: 'Precios de empleados digitales para leads | Noxo IA Empresas',
  metaDescription:
    'Consulta los precios de nuestros planes Starter, Growth y Full Team para captar, responder, organizar y seguir leads con un equipo digital.',
  searchIntent: 'Transaccional. Usuario comparando precio, alcance y encaje antes de contactar.',
  primaryKeyword: 'precios equipo digital para leads',
  secondaryKeywords: [
    'precio empleados digitales',
    'precios automatización comercial',
    'coste seguimiento de leads',
    'planes equipo digital comercial',
  ],
  h1: 'Precios claros para contratar un equipo de empleados digitales.',
  h2s: [
    'Planes y precios',
    'Qué incluye cada plan',
    'Cómo elegir',
    'Preguntas frecuentes sobre precios',
  ],
  hero: {
    eyebrow: 'Precios visibles',
    title: 'Precios claros para contratar un equipo de empleados digitales.',
    intro:
      'Mostramos el precio porque acelera la decisión correcta. Si no encaja, se ve rápido. Si encaja, la conversación comercial va al grano.',
    primaryCtaLabel: 'Solicitar diagnóstico',
    primaryCtaHref: '/#contacto',
    secondaryCtaLabel: 'Ver cómo funciona',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Sin esconder precio',
      'Comparación fácil',
      'Planes pensados como equipo real',
    ],
  },
  heroPanel: {
    label: 'Cómo leer los planes',
    title: 'El setup pone el sistema en marcha. La cuota mantiene al equipo digital trabajando.',
    items: [
      { title: 'Setup', description: 'Diseño, configuración e implantación inicial del sistema.' },
      { title: 'Mensual', description: 'Trabajo operativo, seguimiento y mejora continua.' },
      { title: 'Filtro', description: 'El precio ayuda a saber rápido si hay encaje y prioridad real.' },
    ],
  },
  pricingTitle: 'Tres planes. Una lógica simple.',
  pricingIntro:
    'Empiezas por el nivel de trabajo operativo que hoy te falta. No por la cantidad de funciones que suenan bien en una demo.',
  pricingPlans,
  pricingNotes: [
    'Starter sirve para dejar de perder leads por desorden básico.',
    'Growth es el plan recomendado para empresas con volumen y equipo saturado.',
    'Full Team entra cuando ya compensa ordenar varias partes del proceso a la vez.',
  ],
  examplesTitle: 'Cómo elegir rápido',
  examplesIntro: 'Si dudas entre planes, esta es la forma corta de decidir.',
  examples: [
    { title: 'Elige Starter', description: 'Si lo urgente es dejar de perder leads y poner orden mínimo con un coste contenido.' },
    { title: 'Elige Growth', description: 'Si ya hay volumen, seguimiento irregular y necesidad de más coordinación comercial.' },
    { title: 'Elige Full Team', description: 'Si quieres varios empleados digitales cubriendo más de una parte del proceso.' },
  ],
  faqs: [
    {
      question: '¿Por qué hay setup más cuota mensual?',
      answer:
        'Porque primero hay que diseñar y montar el sistema, y después mantenerlo trabajando con criterio y ajustes reales.',
    },
    {
      question: '¿Qué plan suele cerrar mejor?',
      answer:
        'Growth. Suele ser donde el precio sigue siendo asumible y el cambio operativo ya se nota de verdad.',
    },
    {
      question: '¿Puedo empezar por Starter y subir después?',
      answer:
        'Sí. De hecho es una forma razonable de empezar cuando el problema principal es dejar de perder leads ya.',
    },
    {
      question: '¿El precio incluye soporte?',
      answer:
        'Sí. Cada plan incluye seguimiento y soporte acorde al alcance del equipo digital contratado.',
    },
  ],
  relatedLinks: [
    { href: '/como-funciona', label: 'Cómo funciona', description: 'Antes de comparar precio, entiende exactamente qué hace el sistema.' },
    { href: '/recursos', label: 'Recursos', description: 'Guías para entender el coste real de perder leads por desorden.' },
    ...nicheLinks,
  ],
}

export const resourcesPage: PageData = {
  kind: 'resources',
  path: '/recursos',
  slug: 'recursos',
  label: 'Recursos',
  title: 'Recursos sobre leads, seguimiento y empleados digitales | Noxo IA Empresas',
  metaDescription:
    'Recursos y guías para organizar leads, responder más rápido y montar un sistema comercial simple con empleados digitales.',
  searchIntent: 'Informacional con apoyo comercial. Usuario buscando entender mejor gestión de leads y seguimiento.',
  primaryKeyword: 'gestión de leads para empresas',
  secondaryKeywords: [
    'seguimiento de leads',
    'respuesta rápida a leads',
    'empleados digitales para ventas',
    'organización comercial',
  ],
  h1: 'Recursos útiles para dejar de perder leads por desorden.',
  h2s: [
    'Categorías',
    'Artículos destacados',
    'Cómo conectan con el servicio',
  ],
  hero: {
    eyebrow: 'Recursos',
    title: 'Recursos útiles para dejar de perder leads por desorden.',
    intro:
      'No es un blog decorativo. Cada contenido está pensado para captar tráfico útil, educar y llevar a páginas comerciales con sentido.',
    primaryCtaLabel: 'Ver precios',
    primaryCtaHref: '/precios',
    secondaryCtaLabel: 'Ver cómo funciona',
    secondaryCtaHref: '/como-funciona',
    bullets: [
      'Contenido práctico',
      'SEO con intención real',
      'Enlace directo a páginas comerciales',
    ],
  },
  heroPanel: {
    label: 'Objetivo editorial',
    title: 'Captar tráfico útil, reforzar autoridad y empujar hacia precio y servicio.',
    items: [
      { title: 'Captar', description: 'Responde búsquedas reales sobre leads, seguimiento y organización comercial.' },
      { title: 'Educar', description: 'Ayuda a entender por qué el problema es de sistema, no de una sola herramienta.' },
      { title: 'Convertir', description: 'Cada artículo enlaza hacia cómo funciona, sectores y precios.' },
    ],
  },
  resourceCategories,
  resourcePosts: featuredResources,
  examplesTitle: 'Cómo usar este contenido para convertir mejor',
  examplesIntro: 'La lógica del enlazado es simple: del problema a la solución y de la solución al precio.',
    examples: [
      {
        title: 'Artículo → Cómo funciona',
        description: 'Cuando el lector entiende el problema, se le lleva a la explicación del equipo digital.',
      },
      {
        title: 'Artículo de sector → Solución adaptada',
        description: 'Si la búsqueda es específica de un sector, se enlaza a la página que mejor encaja con ese caso.',
      },
      {
        title: 'Artículo middle-funnel → Precios',
        description: 'Cuando el usuario ya entiende el valor, se le empuja a comparar planes con precio visible.',
    },
  ],
  faqs: [
    {
      question: '¿Vais a publicar artículos genéricos de IA?',
      answer:
        'No. El foco está en leads, seguimiento, respuesta y orden comercial. Lo demás distrae y no convierte igual.',
    },
    {
      question: '¿El blog sirve para vender o solo para SEO?',
      answer:
        'Las dos cosas. Capta tráfico útil y lo conecta con páginas comerciales mejor posicionadas para cerrar.',
    },
  ],
  relatedLinks: [
    ...featuredResources.map((post) => ({ href: post.path, label: post.title, description: post.excerpt })),
    { href: '/precios', label: 'Precios', description: 'Cuando el lector ya ve el problema, puede comparar planes claros.' },
  ],
}

export const nichePages: PageData[] = [
  {
    kind: 'niche',
    path: '/coliving-flex-living',
    slug: 'coliving-flex-living',
    label: 'Coliving y flex living',
    title: 'Equipos digitales para coliving y flex living | Noxo IA Empresas',
    metaDescription:
      'Implementamos equipos digitales para coliving y flex living que responden, organizan y siguen leads para no perder reservas por retrasos o desorden.',
    searchIntent: 'Comercial sectorial. Operador de coliving o flex living buscando más orden, más seguimiento y mejor lead-to-booking.',
    primaryKeyword: 'equipos digitales para coliving y flex living',
    secondaryKeywords: [
      'gestión de leads coliving',
      'flex living leads',
      'seguimiento de reservas flex living',
      'lead to booking coliving',
    ],
    h1: 'Equipos digitales para captar, responder y seguir leads de coliving y flex living.',
    h2s: [
      'Problemas de coliving y flex living',
      'Qué hace el equipo digital',
      'Casos concretos',
      'Cómo encaja',
    ],
    hero: {
      eyebrow: 'Vertical: coliving y flex living',
      title: 'Equipos digitales para captar, responder y seguir leads de coliving y flex living.',
      intro:
        'Si las consultas entran por portales, WhatsApp, email y formularios, pero la respuesta y el seguimiento dependen de turnos, urgencias y trabajo manual, el problema ya no es de demanda. Es de sistema.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Solicitar diagnóstico',
      secondaryCtaHref: '/#contacto',
      bullets: ['Menos leads perdidos', 'Más seguimiento de reservas', 'Más orden por activo'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'En coliving y flex living, una respuesta tarde puede costar una reserva.',
      items: [
        { title: 'Lead caliente', description: 'El usuario suele comparar rápido varias opciones y varias ubicaciones.' },
        { title: 'Canales', description: 'La demanda entra por demasiados sitios y se fragmenta con facilidad.' },
        { title: 'Solución', description: 'El equipo digital sostiene el orden y el seguimiento de cada oportunidad.' },
      ],
    },
    problemTitle: 'Problemas específicos de coliving y flex living',
    problemIntro: 'El cuello de botella suele aparecer entre primera consulta, disponibilidad, visita, propuesta y reserva.',
    problemPoints: [
      'Se responde tarde a leads con fecha de entrada cercana.',
      'El histórico de conversación no siempre está claro por activo o habitación.',
      'El seguimiento depende demasiado de la persona que lo lleva ese día.',
      'Se pierde tiempo repitiendo información sobre disponibilidad y condiciones.',
    ],
    solutionTitle: 'Qué hace el equipo digital en coliving y flex living',
    solutionIntro: 'Da orden a la demanda y ritmo al seguimiento para que cada lead avance con más criterio.',
    deliverables: [
      'Entrada unificada de consultas por activo, estancia y presupuesto.',
      'Priorización de leads más cercanos a reserva.',
      'Seguimiento por etapa con siguiente paso visible.',
      'Lectura por activo para saber dónde se pierde más.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más velocidad', description: 'Menos tiempo muerto entre lead y primera acción útil.' },
      { title: 'Más consistencia', description: 'El seguimiento no depende tanto del turno o de la memoria.' },
      { title: 'Más control', description: 'Se ve mejor qué activo, canal o fase está frenando cierres.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Se adapta a cómo entran hoy tus leads y cómo cerráis reservas.',
      'No obliga a empezar de cero con todo el stack comercial.',
      'Se valida con el equipo para que el sistema sirva de verdad en el día a día.',
    ],
    examplesTitle: 'Ejemplos concretos',
    examplesIntro: 'No se vende como IA genérica. Se entiende mejor con situaciones reales del vertical.',
    examples: [
      { title: 'Lead de última hora', description: 'Se detecta prioridad alta y se fuerza respuesta y seguimiento sin depender de un recordatorio manual.' },
      { title: 'Varias propiedades', description: 'Cada consulta queda ordenada por activo para que no se mezcle la demanda.' },
      { title: 'Visita o propuesta', description: 'Si se hizo el primer contacto, el sistema empuja el siguiente paso hasta cierre o descarte.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Recibes demanda, pero la operación comercial se te dispersa.',
      'Tu equipo necesita más constancia sin contratar más personas ya.',
      'Quieres dejar de perder reservas por lentitud o desorden.',
    ],
    stats: [
      { label: 'Keyword principal', value: 'equipos digitales para coliving y flex living' },
      { label: 'Foco', value: 'lead to booking' },
      { label: 'Resultado', value: 'Más orden por activo' },
    ],
    teamDiagram: {
      title: 'Mira cómo trabaja tu equipo digital de reservas y seguimiento',
      subtitle: 'Cada lead entra, se responde, se organiza y se sigue sin depender del caos del día a día.',
      supportText:
        'En coliving y flex living no basta con captar leads: hay que responder rápido, organizar bien y seguir cada oportunidad hasta que se convierta en reserva. Este equipo digital se encarga de que nada se enfríe, nada se desordene y nada se pierda por falta de seguimiento.',
      ctaLabel: 'Quiero ver cómo encajaría este equipo en mi operación',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador de reservas',
        tag: 'coordina',
        summary: 'Supervisa el flujo completo desde la entrada del lead hasta la oportunidad lista para cerrar.',
        example: 'Detecta nuevas consultas, reparte tareas y mantiene el orden del proceso.',
        benefit: 'Una operación comercial más clara y menos oportunidades perdidas.',
      },
      roles: [
        {
          title: 'Respondedor de interesados',
          tag: 'responde',
          summary: 'Responde nuevas consultas en cuanto entran para evitar que se enfríen.',
          example: 'Atiende solicitudes desde formulario, WhatsApp o email y activa la primera respuesta.',
          benefit: 'Más velocidad de respuesta y menos leads perdidos por tardanza.',
        },
        {
          title: 'Clasificador de leads',
          tag: 'clasifica',
          summary: 'Separa interesados según tipo de estancia, urgencia y encaje.',
          example: 'Identifica si el lead busca corta estancia, media estancia o flex living y lo prioriza.',
          benefit: 'Seguimiento más inteligente y menos tiempo perdido en leads poco claros.',
        },
        {
          title: 'Gestor de seguimiento',
          tag: 'sigue',
          summary: 'Mantiene el contacto activo para que la oportunidad no se enfríe.',
          example: 'Lanza seguimientos si el lead no responde, si pidió información o si quedó pendiente de decidir.',
          benefit: 'Más oportunidades rescatadas y menos reservas perdidas por olvido.',
        },
        {
          title: 'Organizador de pipeline',
          tag: 'organiza',
          summary: 'Mantiene cada oportunidad en su etapa correcta dentro del proceso comercial.',
          example: 'Mueve leads entre “nuevo”, “contactado”, “interesado”, “pendiente” o “listo para reservar”.',
          benefit: 'Visibilidad total del estado de cada oportunidad.',
        },
        {
          title: 'Coordinador de visitas y reservas',
          tag: 'prepara',
          summary: 'Ordena los siguientes pasos para que los leads listos avancen hacia la reserva.',
          example: 'Identifica leads preparados para visita, llamada o cierre y los deja listos para el equipo humano.',
          benefit: 'Menos fricción entre interés y reserva.',
        },
        {
          title: 'Supervisor de oportunidades',
          tag: 'alerta',
          summary: 'Detecta cuellos de botella, oportunidades estancadas y tareas sin ejecutar.',
          example: 'Marca leads sin respuesta, seguimientos atrasados o reservas potenciales que llevan demasiado tiempo paradas.',
          benefit: 'Menos fugas y mejor control comercial.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Sirve para operadores pequeños?',
        answer:
          'Sí. De hecho suele ayudar mucho cuando el equipo es pequeño y cada lead cuenta más.',
      },
      {
        question: '¿Esto sustituye al comercial?',
        answer:
          'No. Le quita parte del caos operativo para que el comercial tenga más foco en cerrar.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Ver cómo implantamos el equipo digital sobre tu operativa actual.' },
      { href: '/precios', label: 'Precios', description: 'Comparar planes para empezar con el nivel de alcance adecuado.' },
      { href: '/recursos/como-no-perder-leads-por-whatsapp', label: 'Lead por WhatsApp', description: 'Artículo útil sobre respuesta y orden cuando entra demanda por WhatsApp.' },
    ],
  },
  {
    kind: 'niche',
    path: '/inmobiliarias-property-managers',
    slug: 'inmobiliarias-property-managers',
    label: 'Inmobiliarias y property managers',
    title: 'Equipos digitales para inmobiliarias y property managers | Noxo IA Empresas',
    metaDescription:
      'Implementamos equipos digitales para inmobiliarias y property managers que responden, organizan y siguen leads sin perder oportunidades por lentitud o desorden.',
    searchIntent: 'Comercial sectorial. Inmobiliaria o property manager buscando más velocidad comercial y mejor organización de oportunidades.',
    primaryKeyword: 'equipos digitales para inmobiliarias y property managers',
    secondaryKeywords: [
      'gestión de leads inmobiliarios',
      'property managers leads',
      'seguimiento de leads inmobiliaria',
      'equipo digital inmobiliaria',
    ],
    h1: 'Equipos digitales para inmobiliarias y property managers con muchos leads y poco seguimiento real.',
    h2s: [
      'Problemas del vertical',
      'Qué hace el equipo digital',
      'Casos de uso',
      'Cómo encaja',
    ],
    hero: {
      eyebrow: 'Vertical: inmobiliarias y property managers',
      title: 'Equipos digitales para inmobiliarias y property managers con muchos leads y poco seguimiento real.',
      intro:
        'Cuando entran leads desde portales, campañas, formularios y WhatsApp, pero la respuesta y el seguimiento dependen demasiado de trabajo manual, el desorden mata oportunidades.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Ver cómo funciona',
      secondaryCtaHref: '/como-funciona',
      bullets: ['Menos leads enfriados', 'Más seguimiento útil', 'Mejor coordinación'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'Aquí no basta con contestar una vez. Hace falta responder, organizar y seguir con criterio.',
      items: [
        { title: 'Portales y campañas', description: 'La demanda entra de varias fuentes y no siempre llega bien organizada.' },
        { title: 'Visitas y oportunidades', description: 'La velocidad de respuesta y el seguimiento hacen gran parte del trabajo comercial.' },
        { title: 'Solución', description: 'El equipo digital ayuda a repartir, responder y seguir sin perder trazabilidad.' },
      ],
    },
    problemTitle: 'Problemas específicos de inmobiliarias y property managers',
    problemIntro: 'La fricción suele estar entre entrada de lead, respuesta, visita, seguimiento y cierre.',
    problemPoints: [
      'Llegan muchos leads de portales, formularios o campañas y no todos se trabajan con la misma velocidad.',
      'Los agentes o equipos van saturados y el seguimiento cae cuando sube el volumen.',
      'Se pierde contexto entre primera consulta, visita, propuesta y oportunidad abierta.',
      'La información comercial queda repartida entre varias herramientas y conversaciones.',
    ],
    solutionTitle: 'Qué hace el equipo digital en inmobiliarias y property managers',
    solutionIntro: 'Ordena la entrada, sostiene el seguimiento y mantiene visible el siguiente paso comercial.',
    deliverables: [
      'Entrada centralizada por canal, activo o cartera.',
      'Priorización de leads y siguiente paso claro por oportunidad.',
      'Seguimiento con alertas para no dejar visitas o conversaciones paradas.',
      'Visibilidad del pipeline para comercial y dirección.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más velocidad', description: 'Las oportunidades reciben atención útil antes de enfriarse.' },
      { title: 'Más orden', description: 'El equipo trabaja menos a salto de mata y con más trazabilidad.' },
      { title: 'Más control', description: 'Se ve mejor qué canal, agente o activo está frenando la conversión.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Se adapta a tus canales y al ciclo real de tu venta.',
      'No fuerza una estructura teórica que luego nadie sigue.',
      'Se diseña para que el equipo entienda rápido qué toca hacer en cada oportunidad.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'La propuesta se entiende mejor con ejemplos comerciales del sector.',
    examples: [
      { title: 'Lead de portal sin respuesta rápida', description: 'Se detecta antes, se prioriza y se fuerza el siguiente paso para no perderlo por lentitud.' },
      { title: 'Visita sin seguimiento', description: 'La oportunidad no desaparece después de la primera interacción comercial.' },
      { title: 'Cartera o activo con demasiadas conversaciones', description: 'El sistema ordena y reparte mejor para que no todo dependa de urgencias.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu equipo ya tiene leads, pero trabaja con demasiada fricción.',
      'Necesitas constancia comercial sin contratar varias personas más.',
      'Quieres un sistema simple de entender por negocio, no por tecnología.',
    ],
    stats: [
      { label: 'Keyword principal', value: 'equipos digitales para inmobiliarias y property managers' },
      { label: 'Foco', value: 'respuesta y seguimiento' },
      { label: 'Resultado', value: 'Más oportunidades trabajadas' },
    ],
    teamDiagram: {
      title: 'Así trabaja tu equipo digital para no perder oportunidades inmobiliarias',
      subtitle: 'Desde el primer contacto hasta el seguimiento comercial, cada lead avanza con orden y visibilidad.',
      supportText:
        'En inmobiliaria y property management, el problema no suele ser la falta de leads: suele ser que no se responden, no se ordenan o no se siguen bien. Este equipo digital se encarga de que cada oportunidad reciba atención, seguimiento y estructura.',
      ctaLabel: 'Quiero ver este equipo aplicado a mi embudo inmobiliario',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador de leads inmobiliarios',
        tag: 'coordina',
        summary: 'Organiza el flujo completo de oportunidades que entran desde portales, web o campañas.',
        example: 'Centraliza el trabajo del equipo digital y mantiene el pipeline limpio y operativo.',
        benefit: 'Menos desorden comercial y más control sobre cada oportunidad.',
      },
      roles: [
        {
          title: 'Respondedor de interesados',
          tag: 'responde',
          summary: 'Responde nuevos leads rápidamente para evitar que se enfríen o se vayan con otro.',
          example: 'Atiende solicitudes por pisos, alquileres, compra o gestión y activa el primer contacto.',
          benefit: 'Más velocidad y mejor aprovechamiento del lead entrante.',
        },
        {
          title: 'Clasificador de oportunidades',
          tag: 'clasifica',
          summary: 'Ordena los leads según tipo de interés, urgencia y valor potencial.',
          example: 'Distingue entre propietario, inquilino, comprador, arrendador o gestión patrimonial.',
          benefit: 'Priorización mejor y menos ruido comercial.',
        },
        {
          title: 'Gestor de seguimiento comercial',
          tag: 'sigue',
          summary: 'Mantiene vivo el contacto con leads que aún no han tomado decisión.',
          example: 'Lanza recordatorios, seguimientos y reactivaciones para visitas, llamadas o propuestas pendientes.',
          benefit: 'Menos oportunidades perdidas por falta de insistencia.',
        },
        {
          title: 'Organizador de CRM',
          tag: 'organiza',
          summary: 'Mantiene actualizadas las etapas del pipeline comercial.',
          example: 'Mueve cada oportunidad entre “nuevo”, “contactado”, “visita pendiente”, “negociación” o “cerrado”.',
          benefit: 'Visión clara del embudo y menos caos entre canales.',
        },
        {
          title: 'Coordinador de visitas',
          tag: 'prepara',
          summary: 'Detecta qué oportunidades están listas para avanzar a visita o llamada comercial.',
          example: 'Deja preparados los leads con suficiente intención o interés para que el equipo humano intervenga.',
          benefit: 'El equipo comercial dedica tiempo a oportunidades más maduras.',
        },
        {
          title: 'Supervisor de cartera y fugas',
          tag: 'alerta',
          summary: 'Vigila oportunidades estancadas y puntos de fuga del proceso.',
          example: 'Detecta leads sin respuesta, visitas que no se confirmaron o interesados que dejaron de contestar.',
          benefit: 'Menos fugas invisibles y mejor recuperación de negocio.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Vale para inmobiliarias pequeñas y para property managers grandes?',
        answer:
          'Sí. El alcance cambia, pero el problema de fondo es el mismo: demasiados leads y demasiado trabajo manual.',
      },
      {
        question: '¿Necesito cambiar mi CRM?',
        answer:
          'No. Primero se ordena el proceso. Luego se decide si conviene tocar herramienta o no.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Ver cómo trabajamos antes de bajarlo a tu caso.' },
      { href: '/precios', label: 'Precios', description: 'Ver qué plan encaja según volumen y carga operativa.' },
      { href: '/recursos/empleados-digitales-para-property-managers', label: 'Guía para property managers', description: 'Ejemplos concretos de cómo ordenar mejor leads y seguimiento.' },
    ],
  },
  {
    kind: 'niche',
    path: '/clinicas-salud-privada',
    slug: 'clinicas-salud-privada',
    label: 'Clínicas y salud privada',
    title: 'Equipos digitales para clínicas, centros estéticos y salud privada | Noxo IA Empresas',
    metaDescription:
      'Implementamos equipos digitales para clínicas, centros estéticos y salud privada que responden, organizan y siguen leads para no perder pacientes potenciales.',
    searchIntent: 'Comercial sectorial. Clínica o centro estético buscando más seguimiento, menos desorden y menos pacientes potenciales perdidos.',
    primaryKeyword: 'equipos digitales para clínicas y salud privada',
    secondaryKeywords: [
      'captación clínica',
      'seguimiento de pacientes potenciales',
      'leads centro estético',
      'automatización comercial clínica',
    ],
    h1: 'Equipos digitales para clínicas, centros estéticos y salud privada con muchas consultas y poco seguimiento real.',
    h2s: [
      'Problemas del vertical',
      'Qué hace el equipo digital',
      'Casos de uso',
      'Cómo encaja',
    ],
    hero: {
      eyebrow: 'Vertical: clínicas y salud privada',
      title: 'Equipos digitales para clínicas, centros estéticos y salud privada con muchas consultas y poco seguimiento real.',
      intro:
        'Cuando las consultas entran por WhatsApp, formularios o campañas, pero captación, agenda y seguimiento no van unidas, se pierden pacientes potenciales por simple falta de proceso.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Solicitar diagnóstico',
      secondaryCtaHref: '/#contacto',
      bullets: ['Menos pacientes perdidos', 'Más seguimiento real', 'Más orden comercial'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'Aquí el problema no suele ser la demanda. Suele ser el seguimiento.',
      items: [
        { title: 'Consultas', description: 'Muchos leads piden información y luego nadie retoma bien la conversación.' },
        { title: 'Agenda', description: 'Captación, agenda y seguimiento no siempre están conectados.' },
        { title: 'Solución', description: 'El equipo digital mantiene orden, respuesta y siguiente paso visible.' },
      ],
    },
    problemTitle: 'Problemas específicos de clínicas, centros estéticos y salud privada',
    problemIntro: 'La pérdida suele venir por consultas sin seguimiento, respuesta tardía y demasiada dependencia del equipo humano.',
    problemPoints: [
      'Muchos leads piden información y desaparecen porque nadie retoma a tiempo.',
      'La agenda, WhatsApp y la captación están desconectados.',
      'El equipo va saturado y el seguimiento depende de huecos, no de proceso.',
      'Se pierden pacientes potenciales por falta de orden comercial.',
    ],
    solutionTitle: 'Qué hace el equipo digital en clínicas y salud privada',
    solutionIntro: 'Da continuidad a la captación para que las consultas se respondan, se organicen y se trabajen mejor.',
    deliverables: [
      'Entrada ordenada de consultas desde formularios, campañas y WhatsApp.',
      'Priorización y siguiente paso claro por lead.',
      'Seguimiento para que el paciente potencial no se enfríe sin respuesta.',
      'Visibilidad de qué oportunidades siguen vivas y cuáles se están perdiendo.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más respuesta útil', description: 'Las consultas dejan de quedarse en bandejas o chats sueltos.' },
      { title: 'Más seguimiento', description: 'Las oportunidades reciben más continuidad aunque el equipo vaya cargado.' },
      { title: 'Más control', description: 'Se ve mejor qué está entrando, qué avanza y qué se cae.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Se mapea la estructura real de activos y reparto actual.',
      'Se define la lógica mínima para que el equipo trabaje igual en todas las carteras.',
      'Se da visibilidad a puntos de atasco que hoy se intuyen pero no se ven bien.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'El valor se ve mejor en situaciones reales del día a día de una clínica o centro.',
    examples: [
      { title: 'Consulta por tratamiento', description: 'Se contesta antes y se deja un seguimiento claro para no perder al paciente potencial.' },
      { title: 'WhatsApp sin continuidad', description: 'El sistema evita que la conversación muera tras el primer intercambio.' },
      { title: 'Campañas con muchos leads', description: 'Se organiza la entrada para que el equipo no trabaje a salto de mata.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu equipo recibe consultas cada día, pero no llega a seguirlas bien.',
      'Quieres más continuidad comercial sin cargar todavía más a recepción o coordinación.',
      'Necesitas un proceso claro para no perder pacientes potenciales por desorden.',
    ],
    stats: [
      { label: 'Keyword principal', value: 'equipos digitales para clínicas y salud privada' },
      { label: 'Foco', value: 'captación y seguimiento' },
      { label: 'Resultado', value: 'Menos pacientes perdidos' },
    ],
    teamDiagram: {
      title: 'Mira cómo trabaja tu equipo digital para convertir consultas en oportunidades reales',
      subtitle: 'Las consultas entran, se responden, se organizan y se siguen sin depender del estrés del equipo.',
      supportText:
        'En salud privada y estética, muchas oportunidades no se pierden por falta de interés, sino por falta de seguimiento. Este equipo digital responde, clasifica, organiza y sigue cada consulta para que el equipo humano no viva apagando fuegos.',
      ctaLabel: 'Quiero ver este equipo en mi proceso de captación',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador de captación de pacientes',
        tag: 'coordina',
        summary: 'Supervisa el flujo desde la primera consulta hasta la oportunidad lista para ser atendida por el equipo humano.',
        example: 'Organiza las entradas, reparte tareas y mantiene controlado el proceso comercial.',
        benefit: 'Menos consultas perdidas y más orden entre captación y agenda.',
      },
      roles: [
        {
          title: 'Respondedor inicial',
          tag: 'responde',
          summary: 'Responde nuevas consultas para que el posible paciente no se enfríe.',
          example: 'Atiende solicitudes desde campañas, formularios, WhatsApp o redes y activa el primer contacto.',
          benefit: 'Más velocidad y mejor primera impresión.',
        },
        {
          title: 'Clasificador de pacientes potenciales',
          tag: 'clasifica',
          summary: 'Ordena cada consulta según tratamiento, urgencia o nivel de interés.',
          example: 'Distingue entre solicitudes informativas, pacientes listos para valoración o contactos aún fríos.',
          benefit: 'Mejor priorización y menos saturación del equipo.',
        },
        {
          title: 'Gestor de seguimiento',
          tag: 'sigue',
          summary: 'Hace seguimiento de las consultas que no cerraron en el primer contacto.',
          example: 'Reactiva leads que pidieron información, compararon opciones o quedaron pendientes de decidir.',
          benefit: 'Más oportunidades recuperadas y menos dinero perdido por olvido.',
        },
        {
          title: 'Organizador de agenda y CRM',
          tag: 'organiza',
          summary: 'Conecta la parte comercial con la parte operativa para que no haya caos entre mensajes y agenda.',
          example: 'Deja ordenadas las oportunidades por estado y prepara al equipo para el siguiente paso.',
          benefit: 'Mejor coordinación entre captación y operación.',
        },
        {
          title: 'Coordinador de citas y valoraciones',
          tag: 'prepara',
          summary: 'Identifica qué leads están listos para avanzar a valoración, llamada o cita.',
          example: 'Separa los pacientes con intención real y los deja listos para intervención humana.',
          benefit: 'El equipo dedica su tiempo a quienes tienen más probabilidad de cerrar.',
        },
        {
          title: 'Supervisor de oportunidades',
          tag: 'alerta',
          summary: 'Detecta consultas sin respuesta, seguimientos vencidos y pacientes potenciales que se están enfriando.',
          example: 'Marca cuellos de botella y puntos de fuga para que no se pierdan oportunidades silenciosamente.',
          benefit: 'Más control y menos fugas invisibles.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Sirve para clínicas pequeñas y centros estéticos?',
        answer:
          'Sí. Cuando hay volumen de consultas y poco seguimiento, el sistema ya aporta aunque el equipo sea pequeño.',
      },
      {
        question: '¿Esto reemplaza recepción o coordinación?',
        answer:
          'No. Les quita parte del caos para que el equipo humano pueda centrarse mejor en atender y cerrar.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Ver la lógica completa del sistema antes de aplicarla a tu caso.' },
      { href: '/precios', label: 'Precios', description: 'Comparar planes según volumen y necesidad de seguimiento.' },
      { href: '/recursos/seguimiento-de-leads-sin-caos', label: 'Seguimiento sin caos', description: 'Recurso útil para entender la base del sistema.' },
    ],
  },
  {
    kind: 'niche',
    path: '/academias-formacion',
    slug: 'academias-formacion',
    label: 'Academias y formación',
    title: 'Equipos digitales para academias y formación | Noxo IA Empresas',
    metaDescription:
      'Implementamos equipos digitales para academias y empresas de formación que responden, organizan y siguen leads para no perder interesados por lentitud o falta de proceso.',
    searchIntent: 'Comercial sectorial. Academia o empresa de formación buscando más orden en admisiones y seguimiento.',
    primaryKeyword: 'equipos digitales para academias y formación',
    secondaryKeywords: [
      'seguimiento de leads academias',
      'admisiones formación',
      'captación alumnos potenciales',
      'equipo digital para academias',
    ],
    h1: 'Equipos digitales para academias y formación con muchos interesados y poco seguimiento real.',
    h2s: [
      'Problemas del vertical',
      'Qué hace el equipo digital',
      'Casos de uso',
      'Cómo encaja',
    ],
    hero: {
      eyebrow: 'Vertical: academias y formación',
      title: 'Equipos digitales para academias y formación con muchos interesados y poco seguimiento real.',
      intro:
        'Cuando entran leads de campañas o formularios, pero el seguimiento depende de tareas manuales, muchas matrículas potenciales se pierden antes de que alguien llegue bien al interesado.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Solicitar diagnóstico',
      secondaryCtaHref: '/#contacto',
      bullets: ['Más seguimiento', 'Menos interesados perdidos', 'Más orden en admisiones'],
    },
    heroPanel: {
      label: 'Por qué encaja',
      title: 'Aquí el problema suele estar entre lead, información y admisión.',
      items: [
        { title: 'Campañas', description: 'Entran interesados, pero no siempre se priorizan ni se siguen bien.' },
        { title: 'Admisiones', description: 'Parte del proceso depende demasiado de correos, llamadas y recordatorios manuales.' },
        { title: 'Solución', description: 'El equipo digital mantiene visible el siguiente paso y da continuidad al proceso.' },
      ],
    },
    problemTitle: 'Problemas específicos de academias y formación',
    problemIntro: 'La pérdida suele venir por respuesta lenta, seguimiento manual pobre y poca consistencia en admisiones.',
    problemPoints: [
      'Muchos leads llegan por campañas o formularios y no se siguen con la misma constancia.',
      'El equipo comercial o de admisiones va saturado y prioriza como puede.',
      'Se pierden interesados por tardar en retomar la conversación.',
      'No siempre queda claro en qué punto está cada oportunidad.',
    ],
    solutionTitle: 'Qué hace el equipo digital en academias y formación',
    solutionIntro: 'Ayuda a captar, ordenar y seguir oportunidades para que el proceso de admisión tenga más ritmo y menos caos.',
    deliverables: [
      'Entrada ordenada de leads por canal, programa o interés.',
      'Priorización y siguiente paso claro por oportunidad.',
      'Seguimiento con alertas para interesados parados o a punto de caer.',
      'Visibilidad de qué leads avanzan y cuáles se enfrían.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más ritmo', description: 'Los interesados reciben atención más rápida y más constante.' },
      { title: 'Más orden', description: 'Admisiones trabaja con más claridad y menos improvisación.' },
      { title: 'Más control', description: 'Se detecta mejor en qué punto se están cayendo oportunidades.' },
    ],
    processTitle: 'Cómo encaja en tu operativa',
    process: [
      'Se adapta a cómo captáis interesados hoy y cómo funcionáis en admisiones.',
      'No exige rehacer todo el proceso para empezar a notar orden.',
      'Se valida para que el sistema ayude al equipo en lugar de añadir fricción.',
    ],
    examplesTitle: 'Casos de uso',
    examplesIntro: 'El valor se ve claro cuando el sistema evita que un interesado desaparezca sin más.',
    examples: [
      { title: 'Lead de campaña sin seguimiento', description: 'La oportunidad se prioriza y se retoma antes de que pierda interés.' },
      { title: 'Proceso de admisión lento', description: 'El sistema hace visible el siguiente paso y evita olvidos.' },
      { title: 'Muchos programas o cursos', description: 'La entrada se organiza mejor por interés para que el equipo responda con más criterio.' },
    ],
    fitTitle: 'Encaja si',
    fitPoints: [
      'Tu academia ya genera leads, pero no los sigue con suficiente constancia.',
      'Admisiones o comercial va cargado de tareas manuales.',
      'Quieres más orden y seguimiento sin rehacer tu operativa desde cero.',
    ],
    stats: [
      { label: 'Keyword principal', value: 'equipos digitales para academias y formación' },
      { label: 'Foco', value: 'admisiones y seguimiento' },
      { label: 'Resultado', value: 'Menos interesados perdidos' },
    ],
    teamDiagram: {
      title: 'Así trabaja tu equipo digital para no perder interesados y acelerar admisiones',
      subtitle: 'Cada lead se responde, se clasifica y se sigue hasta que avance o quede claramente descartado.',
      supportText:
        'En formación, el problema no suele ser solo captar interesados. El problema es responder bien, seguir mejor y mantener orden hasta que la admisión avance. Este equipo digital hace ese trabajo todos los días sin depender de recordatorios manuales.',
      ctaLabel: 'Quiero ver este equipo aplicado a mi proceso de admisión',
      ctaHref: '/#contacto',
      centralRole: {
        title: 'Coordinador de admisiones',
        tag: 'coordina',
        summary: 'Supervisa el flujo completo de captación y seguimiento hasta que el interesado está listo para avanzar.',
        example: 'Reparte tareas, organiza el proceso y mantiene limpio el pipeline de admisiones.',
        benefit: 'Más control comercial y menos interesados perdidos.',
      },
      roles: [
        {
          title: 'Respondedor de interesados',
          tag: 'responde',
          summary: 'Responde nuevas solicitudes antes de que el lead pierda interés.',
          example: 'Atiende formularios, campañas o mensajes entrantes y lanza la primera interacción.',
          benefit: 'Más velocidad y mejor aprovechamiento del interés inicial.',
        },
        {
          title: 'Clasificador por programa',
          tag: 'clasifica',
          summary: 'Ordena los leads según programa, nivel de interés y encaje.',
          example: 'Separa interesados por curso, modalidad, urgencia o fase de decisión.',
          benefit: 'Seguimiento mejor enfocado y menos desorden.',
        },
        {
          title: 'Gestor de seguimiento',
          tag: 'sigue',
          summary: 'Mantiene el contacto con quienes aún no han tomado decisión.',
          example: 'Reactiva leads que pidieron información, descargaron material o mostraron interés pero no avanzaron.',
          benefit: 'Más oportunidades recuperadas y menos leads olvidados.',
        },
        {
          title: 'Organizador de CRM académico',
          tag: 'organiza',
          summary: 'Mantiene ordenadas las etapas del proceso de admisión.',
          example: 'Mueve interesados entre “nuevo”, “contactado”, “pendiente”, “interesado”, “matrícula en curso” o “cerrado”.',
          benefit: 'Visibilidad real del proceso y menos caos interno.',
        },
        {
          title: 'Coordinador de llamadas y admisiones',
          tag: 'prepara',
          summary: 'Detecta qué interesados están listos para avanzar a llamada, entrevista o cierre.',
          example: 'Deja preparados los leads con intención suficiente para que el equipo humano intervenga.',
          benefit: 'Más foco del equipo comercial y menos tiempo en leads fríos.',
        },
        {
          title: 'Supervisor de oportunidades',
          tag: 'alerta',
          summary: 'Detecta interesados parados, seguimientos fuera de plazo y fugas del embudo.',
          example: 'Marca automáticamente oportunidades que llevan demasiado tiempo sin movimiento.',
          benefit: 'Menos interesados perdidos por falta de proceso.',
        },
      ],
    },
    faqs: [
      {
        question: '¿Vale para academias pequeñas y grandes?',
        answer:
          'Sí. La diferencia está en el alcance inicial, no en la lógica del sistema.',
      },
      {
        question: '¿Sirve si ya usamos CRM o herramienta de admisiones?',
        answer:
          'Sí. El sistema se apoya sobre la operativa actual y ordena lo que hoy se está quedando sin seguimiento real.',
      },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Entender la estructura del servicio antes de aplicarlo a admisiones.' },
      { href: '/precios', label: 'Precios', description: 'Comparar planes según volumen y necesidad de seguimiento.' },
      { href: '/recursos/seguimiento-de-leads-sin-caos', label: 'Seguimiento sin caos', description: 'Recurso útil para entender la base del sistema.' },
    ],
  },
]

export const taskServicePages: PageData[] = [
  {
    kind: 'service',
    path: '/servicios/captacion-de-leads',
    slug: 'servicios/captacion-de-leads',
    label: 'Captación de leads',
    title: 'Equipo digital para captar y organizar leads | Noxo IA Empresas',
    metaDescription:
      'Servicio para captar y organizar leads con un equipo digital que centraliza entradas desde WhatsApp, email, formularios y CRM.',
    searchIntent: 'Transaccional. Usuario buscando ordenar la entrada de leads.',
    primaryKeyword: 'captar y organizar leads',
    secondaryKeywords: ['organizar leads', 'centralizar leads', 'captación de leads B2B'],
    h1: 'Equipo digital para captar y organizar leads sin perder oportunidades.',
    h2s: ['Qué resuelve', 'Qué incluye', 'Cómo se implementa', 'Objeciones'],
    hero: {
      eyebrow: 'Servicio',
      title: 'Equipo digital para captar y organizar leads sin perder oportunidades.',
      intro:
        'Esta parte del sistema se centra en recoger, ordenar y clasificar leads que hoy entran dispersos.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Solicitar diagnóstico',
      secondaryCtaHref: '/#contacto',
      bullets: ['Entrada unificada', 'Prioridad clara', 'Menos desorden inicial'],
    },
    heroPanel: {
      label: 'Foco del servicio',
      title: 'El objetivo aquí no es seguir mejor todavía. Es recibir mejor.',
      items: [
        { title: 'Centralizar', description: 'Recibir leads desde canales sueltos en una única vista.' },
        { title: 'Clasificar', description: 'Detectar qué lead requiere acción primero.' },
        { title: 'Preparar', description: 'Dejar el proceso listo para que el seguimiento tenga sentido.' },
      ],
    },
    problemTitle: 'Qué resuelve',
    problemIntro: 'Si la entrada del lead ya llega mal, todo lo demás se complica.',
    problemPoints: [
      'Leads repartidos entre WhatsApp, email, formularios y CRM.',
      'Datos incompletos o sin contexto desde el primer momento.',
      'Poca claridad sobre qué merece atención inmediata.',
    ],
    solutionTitle: 'Qué incluye',
    solutionIntro: 'Se centra en poner orden al inicio del embudo.',
    deliverables: [
      'Entrada centralizada por canal.',
      'Clasificación por estado, urgencia o encaje.',
      'Preparación del siguiente paso comercial.',
      'Lectura básica de volumen y calidad por fuente.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más orden', description: 'La entrada deja de ser una suma de bandejas y mensajes sueltos.' },
      { title: 'Más foco', description: 'El equipo sabe antes qué lead merece atención.' },
      { title: 'Mejor base', description: 'El seguimiento posterior parte de una estructura más limpia.' },
    ],
    processTitle: 'Cómo se implementa',
    process: [
      'Se revisan canales de entrada actuales.',
      'Se diseña la estructura mínima útil del lead.',
      'Se conectan fuentes y se valida la clasificación.',
    ],
    examplesTitle: 'Qué incluye en la práctica',
    examplesIntro: 'Es una página centrada en entrada de embudo, no en seguimiento ni cierre.',
    examples: [
      { title: 'WhatsApp y formularios', description: 'La entrada se unifica para no trabajar cada canal como un mundo aparte.' },
      { title: 'Lead urgente', description: 'Se resalta pronto para acelerar respuesta humana o automática.' },
      { title: 'Lectura por fuente', description: 'Empiezas a ver qué canal trae algo más que ruido.' },
    ],
    objectionsTitle: 'Objeciones habituales',
    objections: [
      'No basta con tener CRM si la entrada sigue siendo desordenada.',
      'La captación aquí no es generar tráfico; es recibir bien lo que ya entra.',
    ],
    faqs: [
      { question: '¿Esto incluye anuncios o tráfico?', answer: 'No. Se centra en ordenar la entrada comercial de leads ya generados.' },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Contexto completo del equipo digital.' },
      { href: '/precios', label: 'Precios', description: 'Planes visibles para elegir el alcance adecuado.' },
    ],
  },
  {
    kind: 'service',
    path: '/servicios/seguimiento-de-leads',
    slug: 'servicios/seguimiento-de-leads',
    label: 'Seguimiento de leads',
    title: 'Equipo digital para seguimiento de leads | Noxo IA Empresas',
    metaDescription:
      'Servicio para hacer seguimiento de leads con un equipo digital que mantiene ritmo, recordatorios y próximos pasos claros.',
    searchIntent: 'Transaccional. Usuario buscando no perder leads por seguimiento irregular.',
    primaryKeyword: 'seguimiento de leads',
    secondaryKeywords: ['seguimiento comercial', 'seguimiento de oportunidades', 'seguimiento automático de leads'],
    h1: 'Equipo digital para hacer seguimiento de leads con más constancia.',
    h2s: ['Qué resuelve', 'Qué incluye', 'Cómo se implementa', 'Objeciones'],
    hero: {
      eyebrow: 'Servicio',
      title: 'Equipo digital para hacer seguimiento de leads con más constancia.',
      intro:
        'Esta parte del sistema evita que las oportunidades se enfríen por falta de siguiente paso, recordatorio o contexto.',
      primaryCtaLabel: 'Ver precios',
      primaryCtaHref: '/precios',
      secondaryCtaLabel: 'Solicitar diagnóstico',
      secondaryCtaHref: '/#contacto',
      bullets: ['Siguiente paso claro', 'Recordatorios útiles', 'Más ritmo comercial'],
    },
    heroPanel: {
      label: 'Foco del servicio',
      title: 'No se trata de perseguir más. Se trata de seguir mejor.',
      items: [
        { title: 'Ritmo', description: 'Cada oportunidad tiene un siguiente paso visible.' },
        { title: 'Memoria', description: 'El proceso deja de depender solo de que alguien se acuerde.' },
        { title: 'Control', description: 'Se ve mejor qué leads están vivos y cuáles se están cayendo.' },
      ],
    },
    problemTitle: 'Qué resuelve',
    problemIntro: 'Muchos leads no se pierden al entrar. Se pierden después.',
    problemPoints: [
      'La primera respuesta existe, pero luego el seguimiento cae.',
      'No hay alertas para oportunidades paradas.',
      'Dirección no ve bien qué leads se están trabajando de verdad.',
    ],
    solutionTitle: 'Qué incluye',
    solutionIntro: 'Se centra en mantener constancia y criterio en el embudo.',
    deliverables: [
      'Recordatorios y tareas por estado del lead.',
      'Alertas para leads calientes y estancados.',
      'Secuencias simples de seguimiento.',
      'Lectura del trabajo comercial real.',
    ],
    outcomesTitle: 'Qué mejora',
    outcomes: [
      { title: 'Más constancia', description: 'El proceso ya no se cae con una semana complicada.' },
      { title: 'Más foco', description: 'El equipo trabaja mejor las oportunidades con más intención.' },
      { title: 'Más visibilidad', description: 'Se detecta antes qué está parado.' },
    ],
    processTitle: 'Cómo se implementa',
    process: [
      'Se revisan las etapas reales del seguimiento actual.',
      'Se definen alertas y tareas útiles.',
      'Se valida que el equipo entienda y use el ritmo nuevo.',
    ],
    examplesTitle: 'Qué incluye en la práctica',
    examplesIntro: 'Página centrada en middle-funnel, sin mezclarla con entrada o cierre.',
    examples: [
      { title: 'Lead sin respuesta en días', description: 'Se marca y activa una acción clara antes de que se enfríe del todo.' },
      { title: 'Siguiente paso olvidado', description: 'El sistema lo convierte en una tarea visible y no en un olvido.' },
      { title: 'Lectura por estado', description: 'Sabes mejor cuántas oportunidades están vivas de verdad.' },
    ],
    objectionsTitle: 'Objeciones habituales',
    objections: [
      'No basta con contestar una vez si luego desaparece el seguimiento.',
      'Seguir bien no significa perseguir sin criterio; significa mantener el proceso vivo.',
    ],
    faqs: [
      { question: '¿Se puede adaptar al ciclo comercial?', answer: 'Sí. Se adapta al ritmo real de tu negocio y de tus oportunidades.' },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Ver el sistema completo y no solo una pieza.' },
      { href: '/precios', label: 'Precios', description: 'Comparar el alcance de cada plan.' },
    ],
  },
]

export const articlePages: PageData[] = [
  {
    kind: 'article',
    path: '/recursos/como-no-perder-leads-por-whatsapp',
    slug: 'recursos/como-no-perder-leads-por-whatsapp',
    label: 'Cómo no perder leads por WhatsApp',
    title: 'Cómo no perder leads por WhatsApp cuando el equipo va saturado | Noxo IA Empresas',
    metaDescription:
      'Guía práctica para no perder leads por WhatsApp cuando entran mensajes a diario y el seguimiento depende demasiado de tareas manuales.',
    searchIntent: 'Informacional con intención comercial.',
    primaryKeyword: 'no perder leads por WhatsApp',
    secondaryKeywords: ['gestionar leads de WhatsApp', 'seguimiento de leads por WhatsApp'],
    h1: 'Cómo no perder leads por WhatsApp cuando el equipo va saturado.',
    h2s: ['Por qué se pierden', 'Sistema mínimo', 'Errores comunes'],
    hero: {
      eyebrow: 'Recurso',
      title: 'Cómo no perder leads por WhatsApp cuando el equipo va saturado.',
      intro:
        'WhatsApp no es el problema. El problema es depender de chats sueltos, memoria y seguimiento manual cuando entran varias oportunidades a la vez.',
      primaryCtaLabel: 'Ver cómo funciona',
      primaryCtaHref: '/como-funciona',
      secondaryCtaLabel: 'Ver precios',
      secondaryCtaHref: '/precios',
      bullets: ['Orden', 'Seguimiento', 'Respuesta útil'],
    },
    heroPanel: {
      label: 'Intención del artículo',
      title: 'Ayudar a entender el problema y llevar al lector a una solución comercial clara.',
      items: [
        { title: 'Problema', description: 'Mensajes sin sistema detrás.' },
        { title: 'Consecuencia', description: 'Leads fríos, contexto perdido y seguimiento desigual.' },
        { title: 'Salida', description: 'Un equipo digital que sostenga el proceso.' },
      ],
    },
    articleCategory: 'Gestión de leads',
    articleSections: [
      {
        title: 'Por qué se pierden leads por WhatsApp',
        paragraphs: [
          'Porque WhatsApp da velocidad, pero no da estructura. Si todo depende del chat y de la persona que lo lleve, el proceso se rompe fácil.',
          'El problema aparece cuando varias conversaciones avanzan a la vez y nadie tiene una vista clara del estado de cada oportunidad.',
        ],
      },
      {
        title: 'El sistema mínimo que hace falta',
        paragraphs: [
          'Centralizar, clasificar y marcar siguiente paso. Sin esas tres piezas, el lead sigue dependiendo de trabajo manual.',
          'No hace falta una herramienta más. Hace falta un sistema que sostenga el orden y el seguimiento.',
        ],
      },
      {
        title: 'Error común',
        paragraphs: [
          'Pensar que responder rápido ya es suficiente. Lo que más se cae suele ser lo que pasa después de la primera respuesta.',
        ],
      },
    ],
    faqs: [
      { question: '¿Vale solo para WhatsApp?', answer: 'No. El mismo problema suele repetirse en email, formularios y CRM cuando no hay sistema común.' },
    ],
    relatedLinks: [
      { href: '/como-funciona', label: 'Cómo funciona', description: 'Explicación completa del equipo digital.' },
      { href: '/precios', label: 'Precios', description: 'Planes visibles para empezar con el alcance adecuado.' },
      { href: '/recursos', label: 'Más recursos', description: 'Volver al hub de contenidos.' },
    ],
  },
  {
    kind: 'article',
    path: '/recursos/seguimiento-de-leads-sin-caos',
    slug: 'recursos/seguimiento-de-leads-sin-caos',
    label: 'Seguimiento de leads sin caos',
    title: 'Seguimiento de leads sin caos: el sistema mínimo que necesita una pyme | Noxo IA Empresas',
    metaDescription:
      'Guía para montar un seguimiento de leads claro, simple y consistente sin depender de memoria, urgencias y tareas manuales.',
    searchIntent: 'Informacional middle-funnel.',
    primaryKeyword: 'seguimiento de leads sin caos',
    secondaryKeywords: ['seguimiento comercial simple', 'proceso de seguimiento de leads'],
    h1: 'Seguimiento de leads sin caos: el sistema mínimo que necesita una pyme.',
    h2s: ['Qué debe tener', 'Qué no debe depender de memoria', 'Cuándo compensa automatizar'],
    hero: {
      eyebrow: 'Recurso',
      title: 'Seguimiento de leads sin caos: el sistema mínimo que necesita una pyme.',
      intro:
        'Si el seguimiento depende de acordarse, de revisar chats sueltos o de “cuando tenga un rato”, el sistema ya está roto.',
      primaryCtaLabel: 'Ver cómo funciona',
      primaryCtaHref: '/como-funciona',
      secondaryCtaLabel: 'Ver precios',
      secondaryCtaHref: '/precios',
      bullets: ['Siguiente paso', 'Ritmo', 'Visibilidad'],
    },
    heroPanel: {
      label: 'Intención del artículo',
      title: 'Bajar la idea a un proceso simple y empujar al lector hacia solución.',
      items: [
        { title: 'Problema', description: 'Seguimiento irregular.' },
        { title: 'Sistema', description: 'Estados claros, tareas y alertas útiles.' },
        { title: 'Salida', description: 'Menos dependencia de memoria y más constancia.' },
      ],
    },
    articleCategory: 'Seguimiento comercial',
    articleSections: [
      {
        title: 'Qué debe tener un seguimiento útil',
        paragraphs: [
          'Estado claro, siguiente paso y responsabilidad. Sin esas tres piezas, el seguimiento se vuelve opaco.',
          'No hace falta complejidad. Hace falta que el equipo entienda rápido qué toca hacer con cada lead.',
        ],
      },
      {
        title: 'Qué no puede seguir dependiendo de memoria',
        paragraphs: [
          'Recontactos, leads parados y oportunidades con intención alta. Eso debe estar visible, no escondido en la cabeza de alguien.',
        ],
      },
      {
        title: 'Cuándo compensa automatizar',
        paragraphs: [
          'Cuando ya existe volumen suficiente o cuando cada lead perdido duele porque el equipo va saturado y no llega a todo.',
        ],
      },
    ],
    faqs: [
      { question: '¿Esto aplica solo a equipos comerciales?', answer: 'No. También ayuda cuando administración participa en parte del proceso de seguimiento.' },
    ],
    relatedLinks: [
      { href: '/servicios/seguimiento-de-leads', label: 'Servicio de seguimiento', description: 'Página comercial del mismo problema con foco en servicio.' },
      { href: '/precios', label: 'Precios', description: 'Comparar planes y alcance.' },
      { href: '/recursos', label: 'Más recursos', description: 'Volver al hub de contenidos.' },
    ],
  },
  {
    kind: 'article',
    path: '/recursos/empleados-digitales-para-property-managers',
    slug: 'recursos/empleados-digitales-para-property-managers',
    label: 'Empleados digitales para property managers',
    title: 'Qué puede hacer un equipo de empleados digitales en property management | Noxo IA Empresas',
    metaDescription:
      'Ejemplos concretos de cómo un equipo de empleados digitales puede ayudar a property managers a captar, organizar y seguir leads por activo o cartera.',
    searchIntent: 'Informacional sectorial con intención comercial.',
    primaryKeyword: 'empleados digitales property managers',
    secondaryKeywords: ['property management leads', 'seguimiento property manager'],
    h1: 'Qué puede hacer un equipo de empleados digitales en property management.',
    h2s: ['Dónde aporta más', 'Ejemplos concretos', 'Cuándo compensa'],
    hero: {
      eyebrow: 'Guía práctica',
      title: 'Qué puede hacer un equipo de empleados digitales en property management.',
      intro:
        'El valor no está solo en responder más rápido. Está en repartir mejor, seguir mejor y dar más visibilidad del pipeline por activo o cartera.',
      primaryCtaLabel: 'Ver solución para property managers',
      primaryCtaHref: '/inmobiliarias-property-managers',
      secondaryCtaLabel: 'Ver precios',
      secondaryCtaHref: '/precios',
      bullets: ['Reparto', 'Trazabilidad', 'Control'],
    },
    heroPanel: {
      label: 'Intención del artículo',
      title: 'Explicar el problema con ejemplos reales y llevar al lector a una solución clara.',
      items: [
        { title: 'Dolor', description: 'Leads mal repartidos y pipeline poco claro.' },
        { title: 'Proceso', description: 'Ordenar entrada, seguimiento y lectura para dirección.' },
        { title: 'Salida', description: 'Llevar al lector a la página de solución y al precio.' },
      ],
    },
    articleCategory: 'Sectores',
    articleSections: [
      {
        title: 'Dónde aporta más un equipo digital',
        paragraphs: [
          'Aporta más cuando hay varias carteras, varios activos o varias personas tocando leads y nadie tiene una lectura común del proceso.',
        ],
      },
      {
        title: 'Ejemplos concretos',
        paragraphs: [
          'Reparto por cartera, seguimiento por activo y trazabilidad del siguiente paso. Son tres ejemplos donde el desorden suele costar negocio.',
        ],
      },
      {
        title: 'Cuándo compensa',
        paragraphs: [
          'Compensa cuando la complejidad operativa ya hace que parte de las oportunidades se pierdan o se trabajen demasiado tarde.',
        ],
      },
    ],
    faqs: [
      { question: '¿Esto aplica también a equipos pequeños?', answer: 'Sí, si hay suficiente complejidad como para que el desorden ya esté costando oportunidades.' },
    ],
    relatedLinks: [
      { href: '/inmobiliarias-property-managers', label: 'Solución para inmobiliarias y property managers', description: 'Página completa con enfoque en respuesta, reparto y seguimiento.' },
      { href: '/precios', label: 'Precios', description: 'Planes visibles para evaluar encaje.' },
      { href: '/recursos', label: 'Más recursos', description: 'Volver al hub de contenidos.' },
    ],
  },
]

export const allPages = [
  homePage,
  howItWorksPage,
  pricingPage,
  resourcesPage,
  ...nichePages,
  ...taskServicePages,
  ...articlePages,
]

export const pagesByPath = Object.fromEntries(allPages.map((page) => [page.path, page])) as Record<string, PageData>

export const whatsappShortMessage =
  'Hola, soy [Nombre] de [Empresa]. Queremos dejar de perder leads por desorden y ver cómo nos puede ayudar un equipo de empleados digitales para captar, responder, organizar y seguir oportunidades. ¿Podemos hablar?'
