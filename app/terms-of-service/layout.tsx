import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Read the Terms of Service for NestAid. Learn about the terms and conditions governing your use of our in-home care services and website.',
  canonical: 'https://www.nestaid.us/terms-of-service',
})

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
