import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { isValidLocale } from '@/i18n/config';
import EyeTestsClient from './EyeTestsClient';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return {
    title: isArabic ? 'اختبارات النظر التفاعلية' : 'Interactive Eye Tests',
    description: isArabic
      ? 'فحوصات عيون تفاعلية أولية تشمل لوحات إيشيهارا، شبكة أمسلر، حساسية التباين، وفرز أعراض العيون مع عرض النتيجة للمريض.'
      : 'Try interactive online eye screening tools with Ishihara color plates, Amsler grid, contrast sensitivity, and symptom triage with visible patient results.',
    alternates: {
      canonical: `/${isValidLocale(lang) ? lang : 'en'}/eye-tests`,
      languages: {
        en: '/en/eye-tests',
        ar: '/ar/eye-tests',
      },
    },
    openGraph: {
      title: isArabic ? 'اختبارات النظر التفاعلية' : 'Interactive Eye Tests',
      description: isArabic
        ? 'فحوصات أولية أكثر ملاءمة للموقع مع حجز متابعة عند الحاجة.'
        : 'Online screening tools designed for safer, more reliable follow-up decisions.',
      type: 'website',
      images: ['/assets/images/hero-ophthalmologist.jpg'],
    },
  };
}

export default async function EyeTestsPage({ params }: PageProps) {
  const { lang } = await params;

  if (isValidLocale(lang)) {
    setRequestLocale(lang);
  }

  return <EyeTestsClient locale={lang} />;
}
