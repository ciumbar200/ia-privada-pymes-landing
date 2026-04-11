interface FaqItem {
  question: string
  answer: string
}

interface SeoStructuredDataProps {
  brandName: string
  faqs: FaqItem[]
}

export function SeoStructuredData({ brandName, faqs }: SeoStructuredDataProps) {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: brandName,
      description:
        'Implantación de automatización con IA para micropymes y pymes, con enfoque en privacidad, control de datos y resultados medibles.',
      url: 'https://nexoiaempresas.com/',
      areaServed: 'ES',
      serviceType: [
        'Automatización de procesos para pymes',
        'Implantación de agentes de IA',
        'Diagnóstico de oportunidades de automatización',
      ],
      offers: {
        '@type': 'Offer',
        name: 'Diagnóstico inicial de automatización',
        price: '0',
        priceCurrency: 'EUR',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
