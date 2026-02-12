# Sitemap Setup with next-sitemap

## Overview

The sitemap is automatically generated at **build time** using the `next-sitemap` package. This ensures Google and other search engines can reliably access your sitemap as a static file.

## How It Works

1. **Build Process**: When you run `npm run build`, Next.js builds your site, then `next-sitemap` runs automatically
2. **Generation**: `next-sitemap` reads your Next.js build manifest and generates `public/sitemap.xml`
3. **Deployment**: Netlify deploys the static `public/sitemap.xml` file
4. **Access**: The sitemap is available at `https://www.nestaid.us/sitemap.xml`

## Configuration

The sitemap configuration is in `next-sitemap.config.js`:

```javascript
module.exports = {
  siteUrl: 'https://www.nestaid.us',
  generateRobotsTxt: false, // We use app/robots.ts instead
  generateIndexSitemap: false, // Single sitemap (not split)
  outDir: './public', // Output to public folder
  exclude: ['/admin/*', '/api/*'], // Exclude these routes
  // ... additional configuration
}
```

## Current Sitemap Contents (26+ URLs)

### High Priority Pages (0.8-1.0)
- Homepage (1.0)
- Find Care (0.9)
- About Us, Pricing (0.8)
- All care service pages (0.8):
  - Companionship, Assistance, Special Needs, Live-in, Care Plans, Wellness

### Medium Priority Pages (0.6-0.7)
- Careers, Resources (0.7)
- Jobs pages (0.7)
- Help Center, Safety Center, Living Options (0.6)
- Resource articles (0.6)

### Lower Priority Pages (0.5)
- Corporate Benefits, Become a Partner (0.5)

## Adding New Pages to the Sitemap

### Static Pages (Automatically Included)
If you create a new page in the `app` directory (e.g., `app/new-page/page.tsx`), it will be automatically discovered and added to the sitemap on the next build.

### Dynamic Routes (Manual Configuration Required)

For dynamic routes like `/care/[slug]`, add them to the `additionalPaths` section in `next-sitemap.config.js`:

```javascript
additionalPaths: async (config) => {
  return [
    {
      loc: '/care/new-service',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
  ]
}
```

### Adjusting Priorities

To change the priority or change frequency of a page, update the `transform` function in `next-sitemap.config.js`:

```javascript
transform: async (config, path) => {
  if (path === '/new-important-page') {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    }
  }
  // ... rest of transform logic
}
```

## Testing Locally

To test sitemap generation locally:

```bash
npm run build
```

Then check `public/sitemap.xml` to verify your changes.

## Deployment

1. Commit your changes to `next-sitemap.config.js`
2. Push to GitHub
3. Netlify automatically builds and deploys
4. The new sitemap is available at `https://www.nestaid.us/sitemap.xml`

## Google Search Console

After deploying sitemap changes:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (`www.nestaid.us`)
3. Navigate to **Sitemaps** in the left sidebar
4. If not already submitted, add: `https://www.nestaid.us/sitemap.xml`
5. Click **Submit**

Google will automatically re-crawl the sitemap periodically, but you can also:
- Use "Test live URL" to verify the sitemap is accessible
- Request re-indexing for specific important pages

## Troubleshooting

### Sitemap not updating after deployment
- Check that `npm run build` completed successfully in Netlify logs
- Verify `next-sitemap` ran after the build (look for "Generation completed" in logs)
- Clear your browser cache and check `https://www.nestaid.us/sitemap.xml` again

### Page not appearing in sitemap
- Ensure the page is not in the `exclude` list in `next-sitemap.config.js`
- For dynamic routes, verify they're added to `additionalPaths`
- Check that the page file is named `page.tsx` (not `layout.tsx` or other)

### Google Search Console shows "Could not be read"
- Verify the sitemap URL is correct: `https://www.nestaid.us/sitemap.xml`
- Check that the sitemap is valid XML (open in browser)
- Ensure Netlify headers are set correctly in `netlify.toml`

## Files Related to Sitemap

- `next-sitemap.config.js` - Configuration for sitemap generation
- `public/sitemap.xml` - Generated sitemap (auto-generated, in .gitignore)
- `netlify.toml` - Headers for serving sitemap with correct Content-Type
- `package.json` - Build script includes `next-sitemap` command
- `.gitignore` - Excludes auto-generated sitemap files

## Best Practices

1. **Don't commit** `public/sitemap.xml` - it's auto-generated
2. **Update priorities** based on page importance and traffic
3. **Use appropriate change frequencies**:
   - `daily` - Homepage, frequently updated content
   - `weekly` - Important pages that change regularly
   - `monthly` - Static pages that rarely change
4. **Exclude** admin pages, API routes, and non-public pages
5. **Test locally** before deploying sitemap changes

---

For more information, see the [next-sitemap documentation](https://github.com/iamvishnusankar/next-sitemap).
