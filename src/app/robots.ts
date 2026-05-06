import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/en/dashboard', '/ar/dashboard'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow,
        crawlDelay: 1,
      },
      {
        userAgent: 'msnbot-media',
        allow: ['/assets/images/', '/_next/image'],
        disallow,
      },
    ],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    host: siteUrl,
  };
}
