import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing - Affordable Home Care Services in Massachusetts',
  description: 'Transparent pricing for in-home care services in Massachusetts. Learn about NestAid\'s flexible care plans and hourly rates. Get a personalized quote today.',
  keywords: [
    'home care pricing Massachusetts',
    'in-home care costs',
    'elderly care prices',
    'affordable home care',
    'caregiver rates Massachusetts',
    'hourly care services pricing',
  ],
  canonical: 'https://nestaid.us/pricing',
})

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

