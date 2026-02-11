/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.nestaid.us',
  generateRobotsTxt: false, // We already have app/robots.ts
  generateIndexSitemap: false, // Single sitemap (not split)
  outDir: './public', // Generate sitemap.xml in public folder
  exclude: ['/admin/*', '/api/*'], // Exclude admin and API routes
  
  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    const currentDate = new Date().toISOString()
    
    // Care service pages
    const careServices = [
      'companionship',
      'assistance',
      'special-needs',
      'live-in',
      'care-plans',
      'wellness',
    ]
    
    const careServicePages = careServices.map((slug) => ({
      loc: `/care/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    }))
    
    // Resource/blog pages
    const resources = [
      'physical-activities',
      'social-engagement',
      'right-caregiver',
    ]
    
    const resourcePages = resources.map((slug) => ({
      loc: `/resources/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    }))
    
    return [...careServicePages, ...resourcePages]
  },
  
  // Priority and change frequency for different routes
  transform: async (config, path) => {
    const currentDate = new Date().toISOString()
    
    // Homepage
    if (path === '/') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 1.0,
      }
    }
    
    // High priority pages
    if (path === '/find-care') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.9,
      }
    }
    
    // Important pages
    if (['/about-us', '/pricing'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8,
      }
    }
    
    // Regular pages
    if (['/careers', '/resources'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.7,
      }
    }
    
    // Job pages
    if (path.startsWith('/jobs/')) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.7,
      }
    }
    
    // Lower priority pages
    if (['/help-center', '/safety-center', '/living-options'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6,
      }
    }
    
    // Lowest priority pages
    if (['/corporate-benefits', '/become-a-partner'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.5,
      }
    }
    
    // Default for other pages
    return {
      loc: path,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5,
    }
  },
}
