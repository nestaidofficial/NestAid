import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

const baseUrl = 'https://www.nestaid.us'

export default function robots(): MetadataRoute.Robots {
  const headersList = headers()
  const host = headersList.get('host') || ''
  
  // Block Netlify subdomain from being indexed
  if (host.includes('netlify.app')) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }
  }

  // Allow indexing for custom domain
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

