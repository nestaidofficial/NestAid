import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Living Options - Home Care vs Assisted Living',
  description: 'Compare home care options with assisted living in Massachusetts. Learn about the benefits of aging in place with NestAid\'s in-home care services.',
  keywords: [
    'home care vs assisted living',
    'aging in place',
    'living options for seniors',
    'elderly care options Massachusetts',
  ],
  canonical: 'https://nestaid.us/living-options',
})

export default function LivingOptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

