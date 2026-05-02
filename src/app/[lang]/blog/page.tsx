import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { localizeBlogMetadata } from '@/utils/localized-content';

export const metadata: Metadata = {
  title: 'Eye Care Blog | Abdalla Eye Clinic',
  description:
    'Expert eye care articles from Abdalla Eye Clinic covering LASIK, cataracts, comprehensive eye exams, and healthy vision habits.',
};

interface BlogIndexPageProps {
  params: Promise<unknown>;
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { lang } = (await params) as { lang: string };
  const posts = await getBlogPosts();
  const localizedPosts = posts.map((post) => localizeBlogMetadata(post, lang));
  const isArabic = lang === 'ar';

  return (
    <div className="overflow-hidden bg-medical-50 px-4 py-10 dark:bg-gray-950 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12">
          <span className="eyebrow mb-4">{isArabic ? 'مجلة العيون' : 'Eye Care Journal'}</span>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
            {isArabic ? 'إرشادات عملية لرؤية أوضح وصحة عين أفضل' : 'Practical guidance for clearer, healthier vision'}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-gray-300 sm:text-lg">
            {isArabic
              ? 'تصفح مقالات مبسطة تساعدك على اتخاذ قرارات أفضل قبل الزيارة وبعدها.'
              : 'Browse patient-friendly articles written to support better decisions before and after your visit.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {localizedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group rounded-lg border border-white/80 bg-white/95 p-5 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant-lg dark:border-white/10 dark:bg-gray-900/88"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-800 dark:text-cyan-200">
                <span className="rounded-full bg-cyan-50 px-3 py-1 dark:bg-cyan-950/70">{post.category}</span>
                <span className="text-slate-400">{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300">{post.description}</p>
              <p className="mt-5 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                {isArabic ? 'اقرأ المقال' : 'Read article'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
