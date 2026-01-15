import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us - Trusted Home Care Provider in Massachusetts',
  description: 'Learn about NestAid, a trusted provider of non-medical in-home care services in Massachusetts. Our mission is to provide compassionate, reliable care for seniors.',
  keywords: [
    'about NestAid',
    'home care company Massachusetts',
    'trusted caregivers',
    'elderly care provider',
    'senior care company',
  ],
  canonical: 'https://www.nestaid.us/about-us',
})

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

