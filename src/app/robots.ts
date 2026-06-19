import type { MetadataRoute } from 'next';

const siteUrl = 'https://abdallaeyeclinic.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/en/privacy',
          '/ar/privacy',
          '/en/terms',
          '/ar/terms',
          '/en/dashboard',
          '/ar/dashboard',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
