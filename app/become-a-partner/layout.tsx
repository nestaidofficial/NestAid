import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Become a Partner - Healthcare Partnership Opportunities',
  description: 'Partner with NestAid to expand your healthcare services. Partnership opportunities for healthcare organizations, senior living communities, and technology companies.',
  keywords: [
    'healthcare partnerships',
    'home care partnerships',
    'senior care partnerships',
    'healthcare collaboration',
  ],
  canonical: 'https://www.nestaid.us/become-a-partner',
})

export default function BecomePartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

