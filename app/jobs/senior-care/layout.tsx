import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Senior Care Jobs - Caregiver Careers in Massachusetts',
  description: 'Explore rewarding caregiver career opportunities with NestAid in Massachusetts. Join our team of compassionate professionals providing quality home care services.',
  keywords: [
    'caregiver jobs Massachusetts',
    'senior care careers',
    'home care jobs',
    'elderly care positions',
    'healthcare jobs Massachusetts',
  ],
  canonical: 'https://www.nestaid.us/jobs/senior-care',
})

export default function SeniorCareJobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

