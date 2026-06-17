import type { MetadataRoute } from 'next';

const siteUrl = 'https://abdallaeyeclinic.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/privacy', '/en/terms'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
