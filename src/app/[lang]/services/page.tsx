import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import {
  getDedicatedServiceLinks,
  serviceDetailsLabel,
  serviceHref,
  serviceLearnMoreLabel,
  serviceLinksHeading,
  serviceNavigationLabel,
} from '@/lib/service-links';
import { getSiteUrl } from '@/lib/site-url';
import { buildFAQPageSchema, createRouteMetadata, serializeStructuredData } from '@/lib/seo';
import { getLocalizedFaqs, getLocalizedServices } from '@/utils/localized-content';
import type { FAQ } from '@/types';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = createRouteMetadata({ lang, path: '/services', route: 'services' });

  if (lang === 'en') {
    return {
      ...metadata,
      title: 'Eye Care Services Alexandria — LASIK, Cataract, Glaucoma | Abdalla Eye Clinic',
      description:
        'Comprehensive ophthalmology services in Alexandria: LASIK, cataract surgery, glaucoma treatment, retinal care, dry eye & pediatric eye care. Serving Smouha & Raml Station.',
    };
  }

  return metadata;
}

const serviceFaqCategories = ['general', 'lasik', 'cataract', 'iol', 'glaucoma'] as const;
const serviceFaqCategoryLabels = {
  en: {
    general: 'General service questions',
    lasik: 'LASIK',
    cataract: 'Cataract surgery',
    iol: 'Lens implants',
    glaucoma: 'Glaucoma care',
  },
  ar: {
    general: 'أسئلة عامة عن الخدمات',
    lasik: 'الليزك',
    cataract: 'جراحة المياه البيضاء',
    iol: 'العدسات المزروعة',
    glaucoma: 'رعاية الجلوكوما',
  },
} as const;

const servicePathwayText = {
  en: {
    title: 'Common service pathways',
    intro: 'Fast links to the dedicated pages patients most often need before booking a visit.',
  },
  ar: {
    title: 'مسارات الخدمات الأكثر طلباً',
    intro: 'روابط مباشرة للصفحات المتخصصة التي يحتاجها المرضى غالباً قبل حجز الزيارة.',
  },
} as const;

function getServicePageFaqs(faqs: FAQ[]) {
  return serviceFaqCategories.flatMap((category) => (
    faqs.filter((faq) => faq.category === category).slice(0, 3)
  ));
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'services' });
  const services = getLocalizedServices(lang);
  const isArabic = lang === 'ar';
  const learnMoreLabel = serviceLearnMoreLabel(lang);
  const serviceDetails = serviceDetailsLabel(lang);
  const dedicatedServiceLinks = getDedicatedServiceLinks(lang);
  const serviceFaqs = getServicePageFaqs(getLocalizedFaqs(lang));
  const faqSchema = buildFAQPageSchema({
    faqs: serviceFaqs,
    locale: lang,
    siteUrl: getSiteUrl(),
    path: '/services',
  });

  return (
    <>
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

        <section
          aria-label={serviceNavigationLabel(lang)}
          className="mb-12 rounded-lg border border-cyan-100 bg-white p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-7"
        >
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-200">
              {serviceLinksHeading(lang)}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">
              {servicePathwayText[isArabic ? 'ar' : 'en'].title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              {servicePathwayText[isArabic ? 'ar' : 'en'].intro}
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dedicatedServiceLinks.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className={`group rounded-lg border border-cyan-100 bg-cyan-50/70 p-4 transition-colors hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/30 dark:hover:bg-cyan-900/50 ${isArabic ? 'text-right' : 'text-left'}`}
              >
                <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-800 shadow-sm transition-colors group-hover:bg-cyan-700 group-hover:text-white dark:bg-slate-950 dark:text-cyan-200 dark:group-hover:bg-cyan-600">
                    <ServiceIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-black text-gray-950 dark:text-white">{service.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </span>
                    <span className="mt-3 block text-sm font-bold text-cyan-800 dark:text-cyan-200">
                      {serviceDetails}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} variant="elevated" className="h-full">
              <CardHeader>
                <Link href={serviceHref(lang, service)} className={isArabic ? 'block text-right' : 'block'}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 shadow-inner transition-colors hover:bg-cyan-700 hover:text-white dark:bg-cyan-950/60 dark:text-cyan-200">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 transition-colors hover:text-cyan-800 dark:text-white dark:hover:text-cyan-200">
                    {service.name}
                  </h3>
                </Link>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'المميزات:' : 'Features:'}
                  </h4>
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3">
                  <Link
                    href={serviceHref(lang, service)}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-bold text-cyan-900 transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                  >
                    {learnMoreLabel}
                  </Link>
                  <Link href={`/${lang}/appointments?serviceId=${encodeURIComponent(service.id)}`} className="block">
                    <Button fullWidth>{t('book_this_service')}</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <section className="mt-16 rounded-lg border border-cyan-100 bg-white p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-7">
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('service_faqs_title')}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              {t('service_faqs_subtitle')}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {serviceFaqCategories.map((category) => {
              const categoryFaqs = serviceFaqs.filter((faq) => faq.category === category);

              if (categoryFaqs.length === 0) {
                return null;
              }

              return (
                <div key={category} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/80">
                  <h3 className={`text-lg font-bold text-gray-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
                    {serviceFaqCategoryLabels[isArabic ? 'ar' : 'en'][category]}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {categoryFaqs.map((faq) => (
                      <details key={faq.id} className="rounded-lg border border-white bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                        <summary className={`cursor-pointer font-semibold text-gray-900 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
                          {faq.question}
                        </summary>
                        <p className={`mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300 ${isArabic ? 'text-right' : 'text-left'}`}>
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
    <MobileBottomActionBar locale={lang} />
    </>
  );
}
