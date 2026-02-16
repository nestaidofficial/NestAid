import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for NestAid. Learn how we collect, use, and protect your personal information when you use our services.',
  canonical: 'https://www.nestaid.us/privacy-policy',
})

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
