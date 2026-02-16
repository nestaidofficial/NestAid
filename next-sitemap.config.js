/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.nestaid.us',
  generateRobotsTxt: false, // We already have app/robots.ts
  generateIndexSitemap: false, // Single sitemap (not split)
  outDir: './public', // Generate sitemap.xml in public folder
  exclude: [
    '/admin/*', 
    '/api/*',
    '/admin',
    '/become-a-partner',
    '/care/*',
    '/careers',
    '/corporate-benefits',
    '/living-options',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.svg',
    '/*.ico',
    '/*.xml',
    '/*.txt',
  ], // Exclude admin, API routes, deleted pages, and static assets
  
  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    const currentDate = new Date().toISOString()
    
    // Resource/blog pages - content marketing
    const resources = [
      'physical-activities',
      'social-engagement',
      'right-caregiver',
    ]
    
    const resourcePages = resources.map((slug) => ({
      loc: `/resources/${slug}`,
      lastmod: currentDate,
      changefreq: 'weekly', // Changed from monthly to weekly for fresh content
      priority: 0.7, // Increased priority for blog content
    }))
    
    return resourcePages
  },
  
  // Priority and change frequency for different routes
  transform: async (config, path) => {
    const currentDate = new Date().toISOString()
    
    // Exclude icon.png and other static files
    if (path.includes('.png') || path.includes('.jpg') || path.includes('.svg') || path.includes('.ico')) {
      return null
    }
    
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 1.0,
      }
    }
    
    // Primary conversion pages - very high priority
    if (path === '/find-care') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'daily', // Changed to daily for main conversion page
        priority: 0.95, // Increased priority
      }
    }
    
    // Important service/info pages
    if (['/about-us', '/pricing'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.85, // Increased priority
      }
    }
    
    // Job pages - important for recruitment
    if (path === '/jobs/senior-care') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'daily', // Jobs change frequently
        priority: 0.8,
      }
    }
    
    // Resources hub - content marketing
    if (path === '/resources') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.75,
      }
    }
    
    // Job search results - dynamic content
    if (path === '/jobs/search-results') {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 0.7,
      }
    }
    
    // Support and information pages
    if (['/help-center', '/safety-center'].includes(path)) {
      return {
        loc: path,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.65,
      }
    }
    
    // Exclude deleted pages
    if (['/become-a-partner', '/careers', '/corporate-benefits', '/living-options'].includes(path) || path.startsWith('/care/')) {
      return null
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
