import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Job Search Results - Find Caregiver Opportunities',
  description: 'Browse caregiver job opportunities near you. Find rewarding positions in senior care, companionship, and home care services with NestAid.',
  keywords: [
    'caregiver job search',
    'senior care jobs near me',
    'home care positions',
    'caregiver opportunities',
    'healthcare jobs search',
  ],
  canonical: 'https://www.nestaid.us/jobs/search-results',
})

export default function SearchResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
