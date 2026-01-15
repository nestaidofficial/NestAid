import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Safety Center - Caregiver Background Checks & Safety',
  description: 'Learn about NestAid\'s comprehensive safety measures including background checks, identity verification, and ongoing monitoring to ensure safe, trusted care.',
  keywords: [
    'caregiver background checks',
    'safe home care',
    'verified caregivers',
    'elderly care safety',
    'trusted caregivers Massachusetts',
  ],
  canonical: 'https://www.nestaid.us/safety-center',
})

export default function SafetyCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

