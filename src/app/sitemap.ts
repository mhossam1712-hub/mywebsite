import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { LOCALES } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abdallaeyeclinic.com';

const staticRoutes = [
  '',
  '/about',
  '/appointments',
  '/blog',
  '/contact',
  '/doctors',
  '/eye-tests',
  '/faqs',
  '/privacy',
  '/services',
  '/terms',
] as const;

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function localizedAlternates(path: string) {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)])
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogPosts();
  const pages: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      pages.push({
        url: absoluteUrl(`/${locale}${route}`),
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/eye-tests' || route === '/services' ? 0.9 : 0.7,
        alternates: {
          languages: localizedAlternates(route),
        },
      });
    }
  }

  for (const post of posts) {
    for (const locale of LOCALES) {
      pages.push({
        url: absoluteUrl(`/${locale}/blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages: localizedAlternates(`/blog/${post.slug}`),
        },
      });
    }
  }

  return pages;
}
