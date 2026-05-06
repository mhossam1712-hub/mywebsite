import type { Metadata } from 'next';
import Image from 'next/image';
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
  const [featuredPost, ...secondaryPosts] = localizedPosts;
  const isArabic = lang === 'ar';

  return (
    <div className="overflow-hidden bg-[#f7fafb] px-4 py-10 dark:bg-gray-950 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-slate-300 pb-8 dark:border-slate-700 sm:pb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-800 dark:text-cyan-200">
                {isArabic ? 'مجلة عبد الله للعيون' : 'Abdalla Eye Clinic Journal'}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-none text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
                {isArabic ? 'رؤى طبية عملية للعين والرؤية' : 'Clinical insight for better eye health'}
              </h1>
            </div>
            <p className="max-w-sm border-slate-300 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:text-gray-300 sm:border-s sm:ps-5">
              {isArabic
                ? 'مقالات تثقيفية موجزة تساعد المرضى على فهم الأعراض والفحوصات وخيارات المتابعة.'
                : 'Concise patient education on symptoms, screening, treatment decisions, and follow-up care.'}
            </p>
          </div>
        </div>

        {featuredPost && (
          <Link
            href={`/${lang}/blog/${featuredPost.slug}`}
            className="group grid gap-6 border-b border-slate-300 py-8 transition-colors hover:bg-white/60 dark:border-slate-700 dark:hover:bg-white/[0.03] md:grid-cols-[1.15fr_0.85fr] md:py-10"
          >
            <div>
              {featuredPost.image && (
                <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt ?? featuredPost.title}
                    width={1200}
                    height={675}
                    priority
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-200">
                <span>{featuredPost.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{featuredPost.readingTime}</span>
              </div>
              <h2 className="max-w-4xl text-3xl font-black leading-tight text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200 sm:text-4xl md:text-5xl">
                {featuredPost.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-gray-300">
                {featuredPost.description}
              </p>
            </div>
            <div className="flex flex-col justify-between border-slate-300 text-sm text-slate-600 dark:border-slate-700 dark:text-gray-300 md:border-s md:ps-6">
              <div>
                <p className="font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                  {isArabic ? 'المقال الرئيسي' : 'Featured Article'}
                </p>
                <p className="mt-3 leading-6">
                  {featuredPost.author
                    ? `${isArabic ? 'بقلم' : 'By'} ${featuredPost.author}${featuredPost.authorTitle ? `, ${featuredPost.authorTitle}` : ''}`
                    : isArabic ? 'فريق عيادة عبد الله للعيون' : 'Abdalla Eye Clinic Editorial Team'}
                </p>
              </div>
              <p className="mt-8 font-bold text-cyan-700 dark:text-cyan-300">
                {isArabic ? 'اقرأ التحليل' : 'Read the analysis'}
              </p>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 border-b border-slate-300 dark:border-slate-700 md:grid-cols-2">
          {secondaryPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className={`group border-slate-300 py-7 transition-colors hover:bg-white/60 dark:border-slate-700 dark:hover:bg-white/[0.03] md:p-7 ${
                index % 2 === 0 ? 'md:border-e' : ''
              } ${index < 2 ? '' : 'border-t'}`}
            >
              {post.image && (
                <div className="mb-5 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    width={1200}
                    height={675}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-200">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-2xl font-black leading-snug text-slate-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                {post.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-gray-300">{post.description}</p>
              <p className="mt-5 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                {isArabic ? 'اقرأ المقال' : 'Read article'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
