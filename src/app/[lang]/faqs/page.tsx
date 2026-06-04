import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQsSection } from '@/components/sections/FAQsSection';
import { getSiteUrl } from '@/lib/site-url';
import {
  buildFAQPageSchema,
  createRouteMetadata,
  serializeStructuredData,
} from '@/lib/seo';
import { getLocalizedFaqs } from '@/utils/localized-content';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '/faqs', route: 'faqs' });
}

export default async function FAQsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'faqs' });
  const siteUrl = getSiteUrl();
  const faqSchema = buildFAQPageSchema({
    faqs: getLocalizedFaqs(lang),
    locale: lang,
    siteUrl,
    path: '/faqs',
  });

  return (
    <div className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>
      </div>
      <FAQsSection />
    </div>
  );
}
