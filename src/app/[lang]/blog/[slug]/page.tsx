import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArabicBlogContent } from '@/content/arabic-blog';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { LOCALES } from '@/i18n/config';
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

  return {
    title: `${metadata.title} | Abdalla Eye Clinic`,
    description: metadata.description,
    alternates: {
      canonical: `/${lang}/blog/${post.metadata.slug}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = (await params) as { lang: string; slug: string };
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.default;
  const metadata = localizeBlogMetadata(post.metadata, lang);
  const isArabic = lang === 'ar';
  const arabicContent = isArabic ? getArabicBlogContent(slug) : null;

  return (
    <article className="overflow-hidden bg-white px-4 py-10 dark:bg-gray-950 sm:py-14 md:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-3xl">
        <Link href={`/${lang}/blog`} className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300">
          {isArabic ? 'العودة إلى المدونة' : 'Back to blog'}
        </Link>

        <header className="mt-6 rounded-lg border border-cyan-100 bg-medical-50/80 p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-900/80 sm:p-7">
          <div className={`flex flex-wrap gap-2 text-xs font-semibold text-cyan-800 dark:text-cyan-200 ${isArabic ? 'justify-end' : ''}`}>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-cyan-950/70">{metadata.category}</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-cyan-950/70">{metadata.readingTime}</span>
          </div>
          <h1 className={`mt-5 text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl ${isArabic ? 'text-right' : ''}`}>
            {metadata.title}
          </h1>
          <p className={`mt-4 text-base leading-7 text-slate-600 dark:text-gray-300 ${isArabic ? 'text-right' : ''}`}>{metadata.description}</p>
        </header>

        <div className="mt-8">
          {arabicContent ?? <PostContent />}
        </div>
      </div>
    </article>
  );
}
