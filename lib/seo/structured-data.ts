/**
 * Structured Data (JSON-LD) Schema Generators for SEO
 */

export interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: string
    longitude: string
  }
  openingHours?: string
  priceRange?: string
  image?: string
  sameAs?: string[]
}

export interface ServiceData {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  areaServed: {
    name: string
    addressRegion: string
  }
  serviceType: string
  url?: string
}

export interface ArticleData {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
  }
  publisher: {
    name: string
    logo?: string
  }
}

/**
 * Generate LocalBusiness schema (JSON-LD)
 */
export function generateLocalBusinessSchema(data: LocalBusinessData): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${data.url}#organization`,
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    ...(data.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
    }),
    ...(data.openingHours && { openingHours: data.openingHours }),
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.image && { image: data.image }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  }
}

/**
 * Generate Service schema (JSON-LD)
 */
export function generateServiceSchema(data: ServiceData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "LocalBusiness",
      name: data.provider.name,
      url: data.provider.url,
    },
    areaServed: {
      "@type": "State",
      name: data.areaServed.name,
      addressRegion: data.areaServed.addressRegion,
    },
    serviceType: data.serviceType,
    ...(data.url && { url: data.url }),
  }
}

/**
 * Generate Article schema (JSON-LD)
 */
export function generateArticleSchema(data: ArticleData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    ...(data.image && { image: data.image }),
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    author: {
      "@type": "Organization",
      name: data.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: data.publisher.name,
      ...(data.publisher.logo && {
        logo: {
          "@type": "ImageObject",
          url: data.publisher.logo,
        },
      }),
    },
  }
}

/**
 * Generate BreadcrumbList schema (JSON-LD)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

