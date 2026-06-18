import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

const siteUrl = 'https://abdallaeyeclinic.com';
const locales = ['en', 'ar'] as const;
const mainPageChangeFrequency = 'weekly' as const;
const blogPostChangeFrequency = 'monthly' as const;
const mainPagePriority = 0.8;
const blogPostPriority = 0.5;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

type SitemapPage = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  lastModified?: Date;
};

const mainPagePaths = [
  '',
  '/services',
  '/services/lasik',
  '/services/cataract-surgery',
  '/services/glaucoma',
  '/services/retina',
  '/services/dry-eye',
  '/services/online-eye-tests',
  '/doctors',
  '/eye-tests',
  '/about',
  '/blog',
  '/contact',
  '/appointments',
  '/faqs',
  '/branches/smouha',
  '/branches/raml-station',
  '/privacy',
  '/terms',
] as const;

const mainPages = mainPagePaths.map((path) => ({
  path,
  changeFrequency: mainPageChangeFrequency,
  priority: mainPagePriority,
})) satisfies SitemapPage[];

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

function homepageEntry(): MetadataRoute.Sitemap[number] {
  return {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: mainPageChangeFrequency,
    priority: mainPagePriority,
    alternates: {
      languages: languageAlternates(''),
    },
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
    changeFrequency: blogPostChangeFrequency,
    priority: blogPostPriority,
    lastModified: new Date(post.date),
  })) satisfies SitemapPage[];

  return [
    homepageEntry(),
    ...mainPages.flatMap(localizedEntries),
    ...blogPostPages.flatMap(localizedEntries),
  ];
}
