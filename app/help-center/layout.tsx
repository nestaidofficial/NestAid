import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Help Center - FAQs & Support',
  description: 'Get answers to frequently asked questions about NestAid\'s home care services in Massachusetts. Find information about care options, pricing, and more.',
  keywords: [
    'home care FAQs',
    'elderly care questions',
    'caregiver services help',
    'senior care support',
  ],
  canonical: 'https://nestaid.us/help-center',
})

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

