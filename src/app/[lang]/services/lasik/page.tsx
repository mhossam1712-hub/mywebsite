import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody } from '@/components/common/Card';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { CLINIC_BRANCHES } from '@/constants';
import { branchAreaName } from '@/lib/clinic';
import { getSiteUrl } from '@/lib/site-url';
import {
  absoluteUrl,
  buildFAQPageSchema,
  canonicalUrl,
  createRouteMetadata,
  normalizeLocale,
  SERVICE_OG_IMAGES,
  serializeStructuredData,
} from '@/lib/seo';
import { getLocalizedFaqs } from '@/utils/localized-content';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const path = '/services/lasik';

const seoText = {
  title: {
    en: 'LASIK Surgery in Alexandria',
    ar: 'جراحة الليزك في الإسكندرية',
  },
  description: {
    en: 'LASIK consultation and laser vision correction assessment at Abdalla Eye Clinic in Alexandria, including candidacy checks, benefits, and recovery guidance.',
    ar: 'استشارة الليزك وتقييم تصحيح الإبصار بالليزر في عيادة عبد الله للعيون في الإسكندرية مع فحص الملاءمة والفوائد وإرشادات التعافي.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'LASIK Surgery',
    title: 'Laser vision correction with careful screening first',
    intro:
      'LASIK reshapes the cornea with laser technology to reduce dependence on glasses or contact lenses. At Abdalla Eye Clinic, the most important step is deciding whether your eyes are suitable before discussing the procedure.',
    overviewTitle: 'LASIK Overview',
    overview:
      'A LASIK assessment reviews your glasses prescription, corneal shape, tear film, eye pressure, retina, lifestyle needs, and expectations. If LASIK is not the safest option, your doctor will explain alternatives.',
    benefitsTitle: 'Benefits',
    benefits: [
      'Reduced dependence on glasses or contact lenses',
      'Quick outpatient procedure for suitable candidates',
      'Fast visual recovery for many patients',
      'Personalized assessment before treatment planning',
    ],
    candidatesTitle: 'Candidate Criteria',
    candidates: [
      'Stable glasses prescription',
      'Healthy corneal thickness and topography',
      'No uncontrolled dry eye or active eye inflammation',
      'No significant cataract, glaucoma, retinal disease, or other contraindication',
      'Realistic expectations about vision quality and recovery',
    ],
    recoveryTitle: 'Recovery Process',
    recovery: [
      'Rest your eyes on the day of the procedure',
      'Use prescribed drops exactly as directed',
      'Avoid rubbing your eyes, swimming, dust, and eye makeup early on',
      'Expect some dryness or fluctuation while the surface settles',
      'Attend scheduled follow-up visits even if vision feels clear',
    ],
    linksTitle: 'Plan Your LASIK Visit',
    appointment: 'Book LASIK Consultation',
    doctors: 'Meet Our Doctors',
    contact: 'Contact the Clinic',
    branches: 'Clinic Branches',
    branchLinkPrefix: 'Visit',
    faqsTitle: 'LASIK FAQs',
    ctaTitle: 'Ready to check if LASIK is right for you?',
    ctaText:
      'Book a consultation for a full eye exam and personalized recommendation before making a treatment decision.',
  },
  ar: {
    eyebrow: 'جراحة الليزك',
    title: 'تصحيح الإبصار بالليزر يبدأ بفحص دقيق أولاً',
    intro:
      'يعيد الليزك تشكيل القرنية بالليزر لتقليل الاعتماد على النظارات أو العدسات اللاصقة. في عيادة عبد الله للعيون، الخطوة الأهم هي التأكد من ملاءمة العين قبل مناقشة الإجراء.',
    overviewTitle: 'نظرة عامة على الليزك',
    overview:
      'يشمل تقييم الليزك مراجعة مقاس النظارة، شكل القرنية، طبقة الدموع، ضغط العين، الشبكية، احتياجاتك اليومية، وتوقعاتك. وإذا لم يكن الليزك هو الخيار الأنسب، يشرح الطبيب البدائل الممكنة.',
    benefitsTitle: 'الفوائد',
    benefits: [
      'تقليل الاعتماد على النظارات أو العدسات اللاصقة',
      'إجراء سريع في العيادة للمرضى المناسبين',
      'تحسن سريع في الرؤية لدى كثير من المرضى',
      'تقييم شخصي قبل وضع خطة العلاج',
    ],
    candidatesTitle: 'شروط المرشح المناسب',
    candidates: [
      'ثبات مقاس النظارة',
      'سُمك وشكل قرنية مناسبين',
      'عدم وجود جفاف عين غير مسيطر عليه أو التهاب نشط',
      'عدم وجود مياه بيضاء مهمة أو جلوكوما أو مرض شبكي أو مانع طبي آخر',
      'توقعات واقعية عن جودة الرؤية وفترة التعافي',
    ],
    recoveryTitle: 'التعافي بعد الليزك',
    recovery: [
      'إراحة العين في يوم الإجراء',
      'استخدام القطرات الموصوفة كما يحدد الطبيب',
      'تجنب فرك العين والسباحة والأتربة ومكياج العين في البداية',
      'توقع بعض الجفاف أو تذبذب الرؤية أثناء استقرار سطح العين',
      'حضور زيارات المتابعة حتى إذا كان النظر واضحاً',
    ],
    linksTitle: 'خطط لزيارة الليزك',
    appointment: 'احجز استشارة الليزك',
    doctors: 'تعرف على الأطباء',
    contact: 'تواصل مع العيادة',
    branches: 'فروع العيادة',
    branchLinkPrefix: 'زيارة فرع',
    faqsTitle: 'أسئلة شائعة عن الليزك',
    ctaTitle: 'هل تريد معرفة إذا كان الليزك مناسباً لك؟',
    ctaText: 'احجز استشارة لفحص العين بالكامل والحصول على توصية شخصية قبل اتخاذ قرار العلاج.',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path,
    title: seoText.title,
    description: seoText.description,
    image: SERVICE_OG_IMAGES.lasik.url,
    imageAlt: SERVICE_OG_IMAGES.lasik.alt,
  });
}

function buildLasikProcedureSchema(lang: string, siteUrl: string) {
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const title = isArabic ? seoText.title.ar : seoText.title.en;
  const description = isArabic ? seoText.description.ar : seoText.description.en;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${absoluteUrl(siteUrl, canonicalUrl(locale, path))}#procedure`,
    name: title,
    alternateName: isArabic ? seoText.title.en : seoText.title.ar,
    description,
    url: absoluteUrl(siteUrl, canonicalUrl(locale, path)),
    inLanguage: locale,
    medicalSpecialty: 'Ophthalmology',
    procedureType: 'Refractive surgery',
    bodyLocation: isArabic ? 'العين والقرنية' : 'Eye and cornea',
    provider: {
      '@id': `${siteUrl}/#clinic`,
    },
  };
}

export default async function LasikServicePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = getLocalizedFaqs(locale).filter((faq) => faq.category === 'lasik').slice(0, 6);
  const procedureSchema = buildLasikProcedureSchema(locale, siteUrl);
  const faqSchema = buildFAQPageSchema({ faqs, locale, siteUrl, path });

  return (
    <>
      <div className="bg-gray-50 py-12 transition-colors duration-200 dark:bg-gray-900 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(procedureSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
        />

        <div className="mx-auto max-w-7xl px-4">
          <section className={`grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start ${isArabic ? 'text-right' : 'text-left'}`}>
            <div>
              <span className="eyebrow mb-5">{copy.eyebrow}</span>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 dark:text-white md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
                {copy.intro}
              </p>
              <div className={`mt-7 flex flex-col gap-3 sm:flex-row ${isArabic ? 'sm:justify-end' : ''}`}>
                <Link
                  href={`/${locale}/appointments?serviceId=service-2`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-cyan-800"
                >
                  {copy.appointment}
                </Link>
                <Link
                  href={`/${locale}/doctors`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-200 bg-white px-5 py-3 font-bold text-cyan-900 shadow-sm transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                >
                  {copy.doctors}
                </Link>
              </div>
            </div>

            <Card variant="elevated" className="lg:sticky lg:top-28">
              <CardBody>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 shadow-inner dark:bg-cyan-950/60 dark:text-cyan-200">
                  <ServiceIcon name="lasik" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-2`}>
                    {copy.appointment}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.overviewTitle}</h2>
                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">{copy.overview}</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.benefitsTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.benefits.map((benefit) => (
                    <li key={benefit} className="rounded-lg border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-gray-800 dark:border-cyan-900/60 dark:bg-cyan-950/30 dark:text-gray-200">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card variant="outlined">
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.candidatesTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.candidates.map((item) => (
                    <li key={item} className="flex gap-3 leading-7 text-gray-700 dark:text-gray-300">
                      <span className="mt-1 text-cyan-700 dark:text-cyan-300">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.recoveryTitle}</h2>
                <ol className="mt-5 space-y-3">
                  {copy.recovery.map((item, index) => (
                    <li key={item} className="flex gap-3 leading-7 text-gray-700 dark:text-gray-300">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-700 text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12">
            <h2 className={`text-3xl font-bold text-gray-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
              {copy.branches}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {CLINIC_BRANCHES.map((branch) => (
                <Link
                  key={branch.slug}
                  href={`/${locale}/branches/${branch.slug}`}
                  className={`rounded-lg border border-cyan-100 bg-white p-5 shadow-sm transition-colors hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-900/70 dark:bg-gray-950 dark:hover:bg-cyan-950/40 ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  <p className="font-black text-gray-950 dark:text-white">
                    {copy.branchLinkPrefix} {branchAreaName(branch, locale)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {isArabic ? branch.addressAr : branch.address}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-cyan-100 bg-white p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-7">
            <h2 className={`text-3xl font-bold text-gray-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
              {copy.faqsTitle}
            </h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                  <summary className={`cursor-pointer font-semibold text-gray-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
                    {faq.question}
                  </summary>
                  <p className={`mt-3 leading-7 text-gray-700 dark:text-gray-300 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className={`mt-12 rounded-lg bg-cyan-700 p-6 text-white shadow-elegant md:p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h2 className="text-3xl font-black">{copy.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-cyan-50">{copy.ctaText}</p>
            <div className={`mt-6 flex flex-col gap-3 sm:flex-row ${isArabic ? 'sm:justify-end' : ''}`}>
              <Link
                href={`/${locale}/appointments?serviceId=service-2`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 py-3 font-bold text-cyan-950 shadow-sm transition-colors hover:bg-cyan-50"
              >
                {copy.appointment}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-5 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                {copy.contact}
              </Link>
            </div>
          </section>
        </div>
      </div>
      <MobileBottomActionBar locale={locale} />
    </>
  );
}
