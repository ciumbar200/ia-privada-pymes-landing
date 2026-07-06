// translations.ts — Spanish translations for common axe-core violations

export interface SpanishTranslation {
  title: string;
  description: string;
  recommendation: string;
  impact: string;
}

export const axeTranslations: Record<string, SpanishTranslation> = {
  'color-contrast': {
    title: 'Texto con contraste insuficiente',
    description: 'Los elementos de texto no tienen suficiente contraste con el color de fondo, lo que dificulta la lectura para personas con discapacidades visuales.',
    recommendation: 'Aumenta la relación de contraste entre el texto y el fondo. Para texto normal usa al menos 4.5:1, y para texto grande al menos 3:1.',
    impact: 'Usuarios con baja visión o daltonismo no pueden leer el contenido adecuadamente.',
  },
  'image-alt': {
    title: 'Imágenes sin texto alternativo',
    description: 'Las imágenes no tienen atributo alt o este está vacío, por lo que los lectores de pantalla no pueden describirlas.',
    recommendation: 'Añade un atributo alt descriptivo a todas las imágenes informativas. Usa alt="" para imágenes decorativas.',
    impact: 'Usuarios de lectores de pantalla no comprenden el contenido de las imágenes.',
  },
  'aria-label': {
    title: 'Elementos interactivos sin etiqueta ARIA',
    description: 'Los elementos interactivos no tienen una etiqueta accesible definida mediante aria-label, aria-labelledby o texto visible.',
    recommendation: 'Añade un atributo aria-label o aria-labelledby con una descripción clara del propósito del elemento.',
    impact: 'Los usuarios de lectores de pantalla no saben qué hace el elemento.',
  },
  'aria-required-attr': {
    title: 'Atributos ARIA requeridos faltantes',
    description: 'Un elemento con rol ARIA no tiene los atributos requeridos para ese rol.',
    recommendation: 'Añade los atributos ARIA requeridos según el rol del elemento. Consulta la especificación ARIA.',
    impact: 'La funcionalidad del elemento no se comunica correctamente a los tecnologías de asistencia.',
  },
  'aria-valid-attr-value': {
    title: 'Valores de atributos ARIA no válidos',
    description: 'Los atributos ARIA tienen valores que no pertenecen al conjunto permitido para ese atributo.',
    recommendation: 'Corrige los valores de los atributos ARIA para que coincidan con los valores permitidos por la especificación.',
    impact: 'Las tecnologías de asistencia pueden interpretar incorrectamente el elemento.',
  },
  'aria-roles': {
    title: 'Roles ARIA no válidos',
    description: 'Se han asignado roles ARIA que no existen en la especificación.',
    recommendation: 'Usa solo roles ARIA válidos definidos en la especificación WAI-ARIA.',
    impact: 'Las tecnologías de asistencia no interpretan correctamente el propósito del elemento.',
  },
  'button-name': {
    title: 'Botones sin nombre accesible',
    description: 'Los botones no tienen texto visible o etiqueta accesible que describa su función.',
    recommendation: 'Añade texto descriptivo dentro del botón o usa aria-label para proporcionar un nombre accesible.',
    impact: 'Los usuarios de lectores de pantalla no saben qué hace el botón.',
  },
  'html-has-lang': {
    title: 'Documento HTML sin atributo lang',
    description: 'El elemento html no tiene un atributo lang que indique el idioma del documento.',
    recommendation: 'Añade un atributo lang al elemento html con el código del idioma correcto, ej: <html lang="es">.',
    impact: 'Los lectores de pantalla no pueden determinar el idioma del contenido correctamente.',
  },
  'html-lang-valid': {
    title: 'Valor de atributo lang no válido',
    description: 'El atributo lang del elemento html tiene un valor que no es un código de idioma válido.',
    recommendation: 'Usa un código de idioma válido según el estándar BCP 47, como "es" o "es-ES".',
    impact: 'Los lectores de pantalla pueden no pronunciar el contenido correctamente.',
  },
  'html-valid-lang': {
    title: 'Valor de idioma no válido',
    description: 'El atributo lang tiene un valor que no corresponde a un idioma válido.',
    recommendation: 'Usa un código de idioma válido según BCP 47.',
    impact: 'Los lectores de pantalla pueden no interpretar el contenido correctamente.',
  },
  'label': {
    title: 'Campos de formulario sin etiqueta',
    description: 'Los campos de formulario no tienen una etiqueta asociada mediante <label>, aria-label o título.',
    recommendation: 'Asocia cada campo con un elemento <label> o usa aria-label para proporcionar un nombre accesible.',
    impact: 'Los usuarios de lectores de pantalla no saben qué información introducir en cada campo.',
  },
  'link-name': {
    title: 'Enlaces sin nombre accesible',
    description: 'Los enlaces no tienen texto discernible que los describa.',
    recommendation: 'Añade texto descriptivo al enlace o usa aria-label con una descripción clara del destino.',
    impact: 'Los usuarios de lectores de pantalla no saben a dónde lleva el enlace.',
  },
  'heading-order': {
    title: 'Orden de encabezados incorrecto',
    description: 'Los encabezados no siguen un orden jerárquico lógico (se saltan niveles).',
    recommendation: 'Asegúrate de que los encabezados sigan un orden secuencial sin saltar niveles (h1 → h2 → h3).',
    impact: 'La navegación por encabezados es confusa para usuarios de lectores de pantalla.',
  },
  'empty-heading': {
    title: 'Encabezados vacíos',
    description: 'Hay encabezados sin contenido de texto.',
    recommendation: 'Añade texto descriptivo a todos los encabezados o elimina los encabezados vacíos.',
    impact: 'Los usuarios de lectores de pantalla encuentran encabezados vacíos que no proporcionan información.',
  },
  'region': {
    title: 'Contenido fuera de regiones landmarks',
    description: 'Partes del contenido no están dentro de regiones landmarks (header, nav, main, footer).',
    recommendation: 'Envuelve el contenido en elementos HTML semánticos o roles ARIA landmark.',
    impact: 'Los usuarios de lectores de pantalla no pueden navegar fácilmente por la página.',
  },
  'tabindex': {
    title: 'Uso incorrecto de tabindex',
    description: 'Se usan valores de tabindex positivos que alteran el orden natural de navegación.',
    recommendation: 'Evita tabindex > 0. Usa tabindex="0" para elementos enfocables o tabindex="-1" para enfocar programáticamente.',
    impact: 'La navegación con teclado no sigue un orden lógico.',
  },
  'keyboard': {
    title: 'Elementos no accesibles por teclado',
    description: 'Hay elementos interactivos que no se pueden operar usando solo el teclado.',
    recommendation: 'Asegúrate de que todos los elementos interactivos sean accesibles y operables mediante teclado.',
    impact: 'Usuarios que dependen del teclado no pueden interactuar con la página.',
  },
  'focus-order-semantics': {
    title: 'Orden de foco semánticamente incorrecto',
    description: 'El orden de foco no sigue el orden de lectura visual esperado.',
    recommendation: 'Reorganiza el DOM para que el orden de foco siga el orden visual lógico.',
    impact: 'La navegación con teclado es confusa.',
  },
  'page-has-heading-one': {
    title: 'Falta encabezado principal (h1)',
    description: 'La página no tiene un encabezado de nivel 1 que describa su propósito.',
    recommendation: 'Añade un elemento <h1> que describa claramente el contenido principal de la página.',
    impact: 'Los usuarios de lectores de pantalla no pueden identificar rápidamente el tema de la página.',
  },
  'landmark-one-main': {
    title: 'Falta landmark main principal',
    description: 'La página no tiene un único landmark main que contenga el contenido principal.',
    recommendation: 'Usa <main> o role="main" para envolver el contenido principal de la página.',
    impact: 'Los usuarios de lectores de pantalla no pueden saltar directamente al contenido.',
  },
  'meta-viewport': {
    title: 'Configuración de viewport problemática',
    description: 'El meta viewport impide el escalado o zoom en dispositivos móviles.',
    recommendation: 'Evita usar user-scalable=no o maximum-scale=1.0 en el meta viewport.',
    impact: 'Usuarios con baja visión no pueden hacer zoom en la página en móviles.',
  },
  'target-size': {
    title: 'Tamaño de objetivo táctil insuficiente',
    description: 'Los elementos interactivos tienen un tamaño táctil menor al recomendado.',
    recommendation: 'Asegura que los objetivos táctiles tengan al menos 44x44 CSS píxeles.',
    impact: 'Usuarios con dificultades motoras tienen problemas para tocar elementos correctamente.',
  },
  'duplicate-id': {
    title: 'IDs duplicados',
    description: 'Hay atributos id duplicados en la página, lo que puede causar problemas con tecnologías de asistencia.',
    recommendation: 'Asegúrate de que cada id sea único en el documento.',
    impact: 'Las tecnologías de asistencia pueden no referenciar correctamente los elementos.',
  },
  'valid-id': {
    title: 'IDs no válidos',
    description: 'Algunos atributos id tienen valores que no son válidos.',
    recommendation: 'Usa valores de id válidos: deben empezar con una letra y contener solo caracteres alfanuméricos y guiones.',
    impact: 'Las referencias a estos IDs pueden fallar.',
  },
  'autocomplete-valid': {
    title: 'Atributo autocomplete no válido',
    description: 'Los campos de formulario tienen valores de autocomplete no válidos.',
    recommendation: 'Usa valores de autocomplete válidos de la especificación HTML (ej: "name", "email", "tel").',
    impact: 'Los navegadores no pueden autocompletar correctamente los campos.',
  },
  'list': {
    title: 'Listas mal estructuradas',
    description: 'Las listas no están estructuradas correctamente con ul/ol y li.',
    recommendation: 'Usa elementos ul u ol que contengan solo elementos li como hijos directos.',
    impact: 'Las tecnologías de asistencia no interpretan correctamente la estructura.',
  },
  'definition-list': {
    title: 'Lista de definiciones mal estructurada',
    description: 'Las listas de definiciones (dl) no están estructuradas correctamente.',
    recommendation: 'Asegúrate de que dl contenga dt y dd correctamente.',
    impact: 'La estructura semántica se pierde para tecnologías de asistencia.',
  },
  'scope-attr-valid': {
    title: 'Atributo scope no válido en tablas',
    description: 'El atributo scope en celdas de tabla tiene un valor no válido.',
    recommendation: 'Usa scope="row" o scope="col" en celdas de encabezado de tablas.',
    impact: 'Las tecnologías de asistencia no asocian correctamente encabezados con celdas.',
  },
  'td-headers-attr': {
    title: 'Atributo headers mal configurado',
    description: 'El atributo headers en celdas de tabla referencia ids inexistentes.',
    recommendation: 'Asegúrate de que los valores del atributo headers correspondan a ids reales de celdas de encabezado.',
    impact: 'Las tecnologías de asistencia no asocian correctamente encabezados con celdas de datos.',
  },
};

// Default translation for unknown rules
export const defaultTranslation: SpanishTranslation = {
  title: 'Problema de accesibilidad detectado',
  description: 'Se ha detectado un problema de accesibilidad que requiere atención.',
  recommendation: 'Revisa la documentación de axe-core para más detalles sobre esta regla.',
  impact: 'Puede afectar la experiencia de usuarios con discapacidades.',
};
