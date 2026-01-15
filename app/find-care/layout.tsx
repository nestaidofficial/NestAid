import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Find Care - Home Care Services in Massachusetts',
  description: 'Explore NestAid\'s comprehensive in-home care services in Massachusetts. From companionship to specialized care, find the perfect care solution for your loved ones.',
  keywords: [
    'find home care Massachusetts',
    'in-home care services',
    'elderly care options',
    'senior care services Massachusetts',
    'caregiver services',
    'home health care Massachusetts',
  ],
  canonical: 'https://www.nestaid.us/find-care',
})

export default function FindCareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

