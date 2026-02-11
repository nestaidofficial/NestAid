# SEO Fix Guide: Replacing Netlify Subdomain with Custom Domain in Google

## Problem
Google is showing `nestaid1234.netlify.app` in search results instead of your primary domain `www.nestaid.us`.

## Changes Made

### 1. Updated `netlify.toml`
- Added 301 redirects from Netlify subdomain to custom domain
- This ensures anyone visiting the old subdomain is automatically redirected
- Added proper headers for sitemap.xml (Content-Type and Cache-Control)

### 2. Updated `app/robots.ts`
- Added logic to block Netlify subdomain from being indexed
- Only allows indexing on the custom domain `www.nestaid.us`

### 3. Updated `app/layout.tsx`
- Added explicit canonical link tag pointing to `https://www.nestaid.us`

### 4. Implemented `next-sitemap` for Build-Time Sitemap Generation
- Installed `next-sitemap` package
- Created `next-sitemap.config.js` with all URLs and priorities
- Sitemap is now automatically generated during build (`npm run build`)
- Generated as static `public/sitemap.xml` for reliable serving on Netlify
- Includes 26+ URLs with proper priorities and change frequencies

## Next Steps (IMPORTANT - You Must Do These)

### Step 1: Deploy Changes
```bash
git add .
git commit -m "Fix: Block Netlify subdomain from Google indexing"
git push
```

Wait for Netlify to deploy the changes.

### Step 2: Verify Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Make sure you have **both** properties added:
   - `https://www.nestaid.us`
   - `https://nestaid.us` (without www)
3. Set `https://www.nestaid.us` as your **preferred domain**

### Step 3: Submit URL Removal Request
1. In Google Search Console, select the `www.nestaid.us` property
2. Go to **Removals** in the left sidebar
3. Click **New Request**
4. Select **Remove all URLs with this prefix**
5. Enter: `https://nestaid1234.netlify.app/`
6. Submit the request

This will temporarily remove the Netlify subdomain from Google search results (usually within 24-48 hours).

### Step 4: Request Re-indexing
1. In Google Search Console for `www.nestaid.us`
2. Go to **URL Inspection**
3. Enter your homepage URL: `https://www.nestaid.us`
4. Click **Request Indexing**
5. Repeat for your most important pages:
   - `https://www.nestaid.us/find-care`
   - `https://www.nestaid.us/about-us`
   - `https://www.nestaid.us/pricing`
   - etc.

### Step 5: Submit Updated Sitemap
1. In Google Search Console for `www.nestaid.us`
2. Go to **Sitemaps** in the left sidebar
3. Submit: `https://www.nestaid.us/sitemap.xml`
4. This helps Google discover and index all your pages with the correct domain

### Step 6: Update Any External Links (Optional but Recommended)
- Check if you have backlinks pointing to `nestaid1234.netlify.app`
- Update them to point to `www.nestaid.us` instead
- This includes:
  - Social media profiles
  - Business directories
  - Partner websites
  - Any marketing materials

## Timeline
- **Immediate**: Redirects will work as soon as deployed
- **24-48 hours**: Netlify subdomain removal request processed
- **1-2 weeks**: Google starts showing custom domain more frequently
- **2-4 weeks**: Custom domain should fully replace subdomain in search results

## Verification
After deployment, test these URLs:
- Visit `https://nestaid1234.netlify.app` → Should redirect to `https://www.nestaid.us`
- Visit `https://nestaid1234.netlify.app/robots.txt` → Should show `Disallow: /`
- Visit `https://www.nestaid.us/robots.txt` → Should show normal rules with `Allow: /`
- Visit `https://www.nestaid.us/sitemap.xml` → Should show XML sitemap with 26+ URLs

## Maintaining the Sitemap

The sitemap is automatically generated during each build. To add or remove pages:

1. **For static pages**: They're automatically discovered by `next-sitemap` from your Next.js build
2. **For dynamic routes** (like `/care/[slug]`): Update the `additionalPaths` section in `next-sitemap.config.js`
3. **To change priorities**: Update the `transform` function in `next-sitemap.config.js`

The sitemap will be regenerated every time you run `npm run build` or deploy to Netlify.

## Additional SEO Best Practices

### Update Social Media Links
Make sure all your social media profiles link to `https://www.nestaid.us`:
- Facebook
- LinkedIn
- Twitter/X
- Instagram
- Any other platforms

### Check Google Business Profile
If you have a Google Business Profile, ensure the website URL is set to `https://www.nestaid.us`

### Monitor Progress
- Check Google Search Console weekly for indexing status
- Search for "site:nestaid1234.netlify.app" in Google to see if pages are still indexed
- Search for "site:www.nestaid.us" to see your custom domain pages

## Need Help?
If the Netlify subdomain is still showing in Google after 4 weeks:
1. Verify all redirects are working
2. Check that robots.txt is blocking the subdomain
3. Submit another removal request in Google Search Console
4. Consider reaching out to Google Search Console support

---

**Note**: This is a common issue when migrating from a Netlify subdomain to a custom domain. The changes made will ensure Google eventually recognizes your custom domain as the canonical version.
