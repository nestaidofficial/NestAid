import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Settings',
  description: 'Manage your cookie preferences for the NestAid website. Control how we use cookies to enhance your browsing experience.',
  canonical: 'https://www.nestaid.us/cookie-settings',
})

export default function CookieSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
