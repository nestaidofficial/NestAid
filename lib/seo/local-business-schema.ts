/**
 * NestAid LocalBusiness Schema Configuration
 */

import { generateLocalBusinessSchema, type LocalBusinessData } from './structured-data'

const baseUrl = 'https://www.nestaid.us'

export const nestAidBusinessData: LocalBusinessData = {
  name: "NestAid",
  description: "NestAid provides trusted, non-medical in-home care services in Massachusetts. Our compassionate caregivers offer companionship, daily living assistance, and personalized care to help seniors age gracefully at home.",
  url: baseUrl,
  telephone: "+14129530622",
  email: "information@nestaid.com",
  address: {
    streetAddress: "Somerville",
    addressLocality: "Somerville",
    addressRegion: "MA",
    postalCode: "02143",
    addressCountry: "US",
  },
  sameAs: [
    // Add social media links when available
  ],
  priceRange: "$$",
}

/**
 * Get LocalBusiness schema for NestAid
 */
export function getNestAidLocalBusinessSchema() {
  return generateLocalBusinessSchema(nestAidBusinessData)
}

