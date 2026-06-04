import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

const siteUrl = 'https://www.abdallaeyeclinic.com';
const locales = ['en', 'ar'] as const;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

type SitemapPage = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  lastModified?: Date;
};

const staticPages = [
  { path: '', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/lasik', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/cataract-surgery', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/glaucoma', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/retina', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/dry-eye', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/online-eye-tests', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/doctors', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eye-tests', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/appointments', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/faqs', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/branches/smouha', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/branches/raml-station', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.6 },
] satisfies SitemapPage[];

function localizedUrl(locale: (typeof locales)[number], path: string) {
  return `${siteUrl}/${locale}${path}`;
}

function languageAlternates(path: string) {
  return {
    en: localizedUrl('en', path),
    ar: localizedUrl('ar', path),
    'x-default': localizedUrl('en', path),
  };
}

function localizedEntries(page: SitemapPage): MetadataRoute.Sitemap {
  const lastModified = page.lastModified ?? new Date();

  return locales.map((locale) => ({
    url: localizedUrl(locale, page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: languageAlternates(page.path),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const blogPostPages = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: new Date(post.date),
  })) satisfies SitemapPage[];

  return [...staticPages, ...blogPostPages].flatMap(localizedEntries);
}
