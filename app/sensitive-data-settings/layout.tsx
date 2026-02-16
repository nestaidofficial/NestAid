import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sensitive Data Settings',
  description: 'Manage your sensitive data preferences and privacy settings for NestAid services.',
  canonical: 'https://www.nestaid.us/sensitive-data-settings',
})

export default function SensitiveDataSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
