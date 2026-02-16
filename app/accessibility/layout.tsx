import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Accessibility Statement',
  description: 'Learn about NestAid\'s commitment to digital accessibility and how we ensure our website is accessible to all users.',
  canonical: 'https://www.nestaid.us/accessibility',
})

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
