import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { isValidLocale } from '@/i18n/config';
import { createRouteMetadata } from '@/lib/seo';
import EyeTestsClient from './EyeTestsClient';

type PageProps = {
  params: Promise<{ lang: string }>;
};

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
