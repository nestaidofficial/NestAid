import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/app/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Careers - Join the NestAid Team',
  description: 'Join NestAid and make a difference in the lives of seniors in Massachusetts. Explore caregiver, sales, and customer success career opportunities.',
  keywords: [
    'caregiver jobs Massachusetts',
    'home care careers',
    'elderly care jobs',
    'caregiver positions',
    'healthcare careers Massachusetts',
  ],
  canonical: 'https://www.nestaid.us/careers',
})

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

