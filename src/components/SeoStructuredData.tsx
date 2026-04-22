import type { PageData } from '../data/content'
import { brandName, siteUrl } from '../data/content'

interface SeoStructuredDataProps {
  currentPage: PageData
  allPages: PageData[]
}

export function SeoStructuredData({ currentPage, allPages }: SeoStructuredDataProps) {
  const canonicalUrl = `${siteUrl}${currentPage.path === '/' ? '' : currentPage.path}`
  const organizationId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`
  const webpageId = `${canonicalUrl}#webpage`

  const breadcrumbItems =
    currentPage.path === '/'
      ? undefined
      : [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: currentPage.label,
            item: canonicalUrl,
          },
        ]

  const schema: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: brandName,
      url: siteUrl,
      areaServed: 'ES',
      knowsAbout: [
        'equipos digitales',
        'gestión de leads',
        'seguimiento comercial',
        'coliving',
        'property managers',
        'clínicas',
        'academias',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: brandName,
      url: siteUrl,
      inLanguage: 'es',
    },
  ]

  if (currentPage.kind === 'home') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonicalUrl,
      name: currentPage.title,
      description: currentPage.metaDescription,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'es',
    })
  }

  if (currentPage.kind === 'service' || currentPage.kind === 'niche') {
    const serviceId = `${canonicalUrl}#service`

    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: currentPage.title,
        description: currentPage.metaDescription,
        isPartOf: { '@id': websiteId },
        about: { '@id': serviceId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': serviceId,
        serviceType: currentPage.label,
        name: currentPage.h1,
        provider: { '@id': organizationId },
        areaServed: 'ES',
        audience: {
          '@type': 'Audience',
          audienceType: 'Empresas con leads, trabajo manual y necesidad de más orden comercial',
        },
        description: currentPage.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          name: 'Diagnóstico comercial',
        },
      },
    )
  }

  if (currentPage.kind === 'pricing') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: currentPage.title,
        description: currentPage.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Planes de equipos digitales',
        itemListElement: (currentPage.pricingPlans || []).map((plan, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: plan.name,
          description: plan.summary,
          priceCurrency: 'EUR',
          category: 'Equipo digital',
        })),
      },
    )
  }

  if (currentPage.kind === 'resources') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: currentPage.title,
        description: currentPage.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Recursos Noxo IA Empresas',
        url: canonicalUrl,
        blogPost: (currentPage.resourcePosts || []).map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${siteUrl}${post.path}`,
          articleSection: post.category,
          description: post.excerpt,
        })),
      },
    )
  }

  if (currentPage.kind === 'article') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: currentPage.title,
        description: currentPage.metaDescription,
        inLanguage: 'es',
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: brandName,
        },
        publisher: {
          '@type': 'Organization',
          name: brandName,
        },
        articleSection: currentPage.articleCategory,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: currentPage.title,
        description: currentPage.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
    )
  }

  if (currentPage.faqs.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: currentPage.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  if (breadcrumbItems) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    })
  }

  schema.push({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Páginas principales del sitio',
    itemListElement: allPages
      .filter((page) => page.kind !== 'article')
      .map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}${page.path === '/' ? '' : page.path}`,
        name: page.label,
      })),
  })

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
