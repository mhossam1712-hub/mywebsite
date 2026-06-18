import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { isValidLocale } from '@/i18n/config';
import { createRouteMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ lang: string }>;
};

function EyeTestsSkeleton() {
  return (
    <div className="animate-pulse bg-gray-50 py-12 dark:bg-gray-900 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4 h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mb-3 h-9 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mb-10 h-5 w-full max-w-xl rounded bg-gray-200 dark:bg-gray-800" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

const EyeTestsClient = dynamic(() => import('./EyeTestsClient'), {
  ssr: false,
  loading: () => <EyeTestsSkeleton />,
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang: isValidLocale(lang) ? lang : 'en',
    path: '/eye-tests',
    route: 'eyeTests',
  });
}

export default async function EyeTestsPage({ params }: PageProps) {
  const { lang } = await params;

  if (isValidLocale(lang)) {
    setRequestLocale(lang);
  }

  return (
    <>
      <EyeTestsClient locale={lang} />
      <MobileBottomActionBar locale={lang} />
    </>
  );
}
