import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { getArabicBlogContent } from '@/content/arabic-blog';
import type { BlogPostMetadata } from '@/lib/blog';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { LOCALES } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import {
  absoluteUrl,
  canonicalUrl,
  createArticleMetadata,
  OG_IMAGES,
  normalizeLocale,
  serializeStructuredData,
} from '@/lib/seo';
import { localizeBlogMetadata } from '@/utils/localized-content';

interface BlogPostPageProps {
  params: Promise<unknown>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();

  return LOCALES.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: string; slug: string };
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  const metadata = localizeBlogMetadata(post.metadata, lang);

  return createArticleMetadata({
    lang,
    path: `/blog/${post.metadata.slug}`,
    title: metadata.title,
    description: metadata.description,
    image: openGraphImage(metadata.image),
    imageAlt: metadata.imageAlt,
    publishedTime: post.metadata.date,
    authors: metadata.author ? [metadata.author] : undefined,
  });
}

function openGraphImage(image: string | undefined) {
  if (!image || image.endsWith('.svg')) return OG_IMAGES.blog.url;

  return image;
}

function blogAuthorSchema(metadata: BlogPostMetadata, siteUrl: string) {
  if (!metadata.author) {
    return {
      '@id': `${siteUrl}/#clinic`,
    };
  }

  return {
    '@type': 'Person',
    name: metadata.author,
    ...(metadata.authorTitle ? { jobTitle: metadata.authorTitle } : {}),
  };
}

function buildArticleStructuredData({
  type,
  metadata,
  locale,
  siteUrl,
  path,
}: {
  type: 'Article' | 'BlogPosting';
  metadata: BlogPostMetadata;
  locale: string;
  siteUrl: string;
  path: string;
}) {
  const url = absoluteUrl(siteUrl, canonicalUrl(locale, path));

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#${type === 'Article' ? 'article' : 'blogposting'}`,
    headline: metadata.title,
    description: metadata.description,
    image: absoluteUrl(siteUrl, openGraphImage(metadata.image)),
    datePublished: metadata.date,
    dateModified: metadata.date,
    author: blogAuthorSchema(metadata, siteUrl),
    publisher: {
      '@id': `${siteUrl}/#clinic`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: {
      '@id': `${absoluteUrl(siteUrl, canonicalUrl(locale, '/blog'))}#blog`,
    },
    articleSection: metadata.category,
    inLanguage: normalizeLocale(locale),
    url,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = (await params) as { lang: string; slug: string };
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.default;
  const locale = normalizeLocale(lang);
  const metadata = localizeBlogMetadata(post.metadata, locale);
  const isArabic = locale === 'ar';
  const siteUrl = getSiteUrl();
  const path = `/blog/${post.metadata.slug}`;
  const arabicContent = isArabic ? getArabicBlogContent(slug) : null;
  const articleSchema = buildArticleStructuredData({
    type: 'Article',
    metadata,
    locale,
    siteUrl,
    path,
  });
  const blogPostingSchema = buildArticleStructuredData({
    type: 'BlogPosting',
    metadata,
    locale,
    siteUrl,
    path,
  });

  return (
    <>
    <article className="overflow-hidden bg-[#f8fafb] px-4 py-10 dark:bg-gray-950 sm:py-14 md:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(blogPostingSchema) }}
      />
      <div className="mx-auto max-w-5xl">
        <Link href={`/${locale}/blog`} className="text-sm font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300">
          {isArabic ? 'العودة إلى المدونة' : 'Back to blog'}
        </Link>

        <header className="mt-6 border-y border-slate-300 py-8 dark:border-slate-700 sm:py-10">
          <div className={`flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-200 ${isArabic ? 'justify-end' : ''}`}>
            <span>{metadata.category}</span>
            <span className="h-1 w-1 self-center rounded-full bg-slate-400" />
            <span>{metadata.readingTime}</span>
          </div>
          <h1 className={`mt-5 max-w-4xl text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl ${isArabic ? 'text-right' : ''}`}>
            {metadata.title}
          </h1>
          <p className={`mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-gray-300 ${isArabic ? 'text-right' : ''}`}>{metadata.description}</p>
          <div className={`mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-5 text-sm text-slate-600 dark:border-slate-700 dark:text-gray-300 ${isArabic ? 'justify-end text-right' : ''}`}>
            <p>
              <span className="font-black text-slate-950 dark:text-white">{isArabic ? 'الكاتب: ' : 'Author: '}</span>
              {metadata.author ?? (isArabic ? 'فريق عيادة عبد الله للعيون' : 'Abdalla Eye Clinic Editorial Team')}
            </p>
            {metadata.authorTitle && <p>{metadata.authorTitle}</p>}
            <p>
              {new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(metadata.date))}
            </p>
          </div>
        </header>

        {metadata.image && (
          <figure className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Image
              src={metadata.image}
              alt={metadata.imageAlt ?? metadata.title}
              width={1200}
              height={675}
              priority
              className="aspect-video w-full object-cover"
            />
            <figcaption className={`border-t border-slate-200 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:text-gray-300 ${isArabic ? 'text-right' : ''}`}>
              {metadata.imageAlt ?? metadata.description}
            </figcaption>
          </figure>
        )}

        <div className={`journal-prose mt-10 max-w-3xl ${isArabic ? 'ms-auto text-right' : ''}`}>
          {arabicContent ?? <PostContent />}
        </div>
      </div>
    </article>
    <MobileBottomActionBar locale={locale} />
    </>
  );
}
