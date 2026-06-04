import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { getBlogPosts } from '@/lib/blog';
import { getSiteUrl } from '@/lib/site-url';
import {
  absoluteUrl,
  canonicalUrl,
  createRouteMetadata,
  OG_IMAGES,
  normalizeLocale,
  serializeStructuredData,
} from '@/lib/seo';
import { localizeBlogMetadata } from '@/utils/localized-content';

interface BlogIndexPageProps {
  params: Promise<unknown>;
}

const path = '/blog';

const seoText = {
  title: {
    en: 'Eye Care Blog',
    ar: 'مدونة العناية بالعين',
  },
  description: {
    en: 'Expert eye care articles from Abdalla Eye Clinic covering LASIK, cataracts, comprehensive eye exams, glaucoma, retina care, and healthy vision habits.',
    ar: 'مقالات طبية من عيادة عبد الله للعيون عن الليزك والمياه البيضاء وفحوصات العين والجلوكوما والشبكية وعادات الحفاظ على صحة النظر.',
  },
} as const;

export async function generateMetadata({ params }: BlogIndexPageProps): Promise<Metadata> {
  const { lang } = (await params) as { lang: string };

  return createRouteMetadata({
    lang,
    path,
    title: seoText.title,
    description: seoText.description,
    image: OG_IMAGES.blog.url,
    imageAlt: OG_IMAGES.blog.alt,
  });
}

function schemaImage(image: string | undefined) {
  if (!image || image.endsWith('.svg')) return OG_IMAGES.blog.url;

  return image;
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { lang } = (await params) as { lang: string };
  const locale = normalizeLocale(lang);
  const siteUrl = getSiteUrl();
  const posts = await getBlogPosts();
  const localizedPosts = posts.map((post) => localizeBlogMetadata(post, locale));
  const [featuredPost, ...secondaryPosts] = localizedPosts;
  const isArabic = locale === 'ar';
  const textAlign = isArabic ? 'text-right' : 'text-left';
  const metaDirection = isArabic ? 'justify-end' : '';
  const blogUrl = absoluteUrl(siteUrl, canonicalUrl(locale, path));
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    name: isArabic ? seoText.title.ar : seoText.title.en,
    description: isArabic ? seoText.description.ar : seoText.description.en,
    url: blogUrl,
    inLanguage: locale,
    publisher: {
      '@id': `${siteUrl}/#clinic`,
    },
    blogPost: localizedPosts.map((post) => {
      const postUrl = absoluteUrl(siteUrl, canonicalUrl(locale, `/blog/${post.slug}`));

      return {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#blogposting`,
        headline: post.title,
        description: post.description,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        image: absoluteUrl(siteUrl, schemaImage(post.image)),
        articleSection: post.category,
        author: post.author
          ? {
              '@type': 'Person',
              name: post.author,
              ...(post.authorTitle ? { jobTitle: post.authorTitle } : {}),
            }
          : {
              '@id': `${siteUrl}/#clinic`,
            },
        publisher: {
          '@id': `${siteUrl}/#clinic`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
      };
    }),
  };

  return (
    <>
    <div className="overflow-hidden bg-[#f7fafb] px-4 py-12 dark:bg-gray-950 sm:py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(blogSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-slate-300 pb-8 dark:border-slate-700 sm:pb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-xs font-black uppercase tracking-[0.24em] text-cyan-800 dark:text-cyan-200 ${textAlign}`}>
                {isArabic ? 'مجلة عبد الله للعيون' : 'Abdalla Eye Clinic Journal'}
              </p>
              <h1 className={`mt-4 max-w-4xl text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl ${textAlign}`}>
                {isArabic ? 'رؤى طبية عملية للعين والرؤية' : 'Clinical insight for better eye health'}
              </h1>
            </div>
            <p className={`max-w-sm border-slate-300 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:text-gray-300 sm:border-s sm:ps-5 ${textAlign}`}>
              {isArabic
                ? 'مقالات تثقيفية موجزة تساعد المرضى على فهم الأعراض والفحوصات وخيارات المتابعة.'
                : 'Concise patient education on symptoms, screening, treatment decisions, and follow-up care.'}
            </p>
          </div>
        </div>

        {featuredPost && (
          <Link
            href={`/${locale}/blog/${featuredPost.slug}`}
            className="group my-8 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-300 motion-safe:md:hover:-translate-y-1 motion-safe:md:hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative min-h-72 bg-slate-100 dark:bg-slate-800 sm:min-h-80 md:min-h-full">
              {featuredPost.image && (
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt ?? featuredPost.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover motion-safe:md:transition-transform motion-safe:md:duration-500 motion-safe:md:group-hover:scale-[1.03]"
                />
              )}
            </div>
            <div className={`flex min-h-full flex-col justify-between p-6 sm:p-8 lg:p-10 ${textAlign}`}>
              <div>
                <p className="mb-6 text-xs font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                  {isArabic ? 'المقال الرئيسي' : 'Featured Article'}
                </p>
                <div className={`mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-200 ${metaDirection}`}>
                  <span>{featuredPost.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span>{featuredPost.readingTime}</span>
                </div>
                <h2 className="text-3xl font-black leading-tight text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200 sm:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600 dark:text-gray-300">
                  {featuredPost.description}
                </p>
                <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-gray-400">
                  {featuredPost.author
                    ? `${isArabic ? 'بقلم' : 'By'} ${featuredPost.author}${featuredPost.authorTitle ? `, ${featuredPost.authorTitle}` : ''}`
                    : isArabic ? 'فريق عيادة عبد الله للعيون' : 'Abdalla Eye Clinic Editorial Team'}
                </p>
              </div>
              <p className="mt-8 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                {isArabic ? 'اقرأ التحليل' : 'Read the analysis'}
              </p>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-6 pb-2 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className={`group flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-300 motion-safe:md:hover:-translate-y-1 motion-safe:md:hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${textAlign}`}
            >
              {post.image && (
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover motion-safe:md:transition-transform motion-safe:md:duration-300 motion-safe:md:group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className={`mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-200 ${metaDirection}`}>
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-2xl font-black leading-snug text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300">{post.description}</p>
                <p className="mt-auto pt-5 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                  {isArabic ? 'اقرأ المقال' : 'Read article'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <MobileBottomActionBar locale={locale} />
    </>
  );
}
