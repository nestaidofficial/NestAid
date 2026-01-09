import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Resources - Senior Care Information & Guides',
  description: 'Educational resources and guides about senior care, wellness, and aging in place. Helpful information for families seeking home care services in Massachusetts.',
  keywords: [
    'senior care resources',
    'elderly care guides',
    'caregiving information',
    'senior wellness',
    'aging in place resources',
  ],
  canonical: 'https://nestaid.us/resources',
})

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

