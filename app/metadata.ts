/**
 * Centralized Metadata Configuration for SEO
 */

import type { Metadata } from 'next'

const baseUrl = 'https://www.nestaid.us'
const siteName = 'NestAid'
const defaultDescription = 'Find trusted, non-medical in-home care services in Massachusetts. Compassionate caregivers offering companionship, daily living assistance, and personalized care for seniors.'

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
}

/**
 * Generate full metadata object with Open Graph and Twitter Cards
 */
export function generateMetadata({
  title,
  description,
  keywords,
  image = '/logo.png',
  noIndex = false,
  canonical,
}: PageMetadata): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const canonicalUrl = canonical || baseUrl

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Default metadata for homepage
 */
export const defaultMetadata: Metadata = generateMetadata({
  title: 'NestAid - Trusted In-Home Care Services in Massachusetts',
  description: defaultDescription,
  canonical: 'https://www.nestaid.us',
  keywords: [
    'in-home care Massachusetts',
    'elderly care services Massachusetts',
    'non-medical home care',
    'companion care Massachusetts',
    'home health care',
    'senior care services',
    'caregiver services Massachusetts',
    'Somerville home care',
  ],
})

/**
 * Common keywords for all pages
 */
export const commonKeywords = [
  'home care',
  'in-home care',
  'elderly care',
  'senior care',
  'caregiver services',
  'Massachusetts',
  'MA',
]

