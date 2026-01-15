import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Corporate Benefits - Employee Care Services',
  description: 'Corporate care benefits program by NestAid. Support your employees with trusted home care services for their loved ones. Improve productivity and retention.',
  keywords: [
    'corporate care benefits',
    'employee care services',
    'eldercare benefits',
    'workplace caregiving support',
  ],
  canonical: 'https://www.nestaid.us/corporate-benefits',
})

export default function CorporateBenefitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

