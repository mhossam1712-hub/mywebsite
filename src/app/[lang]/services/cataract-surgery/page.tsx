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
  serializeStructuredData,
} from '@/lib/seo';
import { getLocalizedFaqs } from '@/utils/localized-content';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const path = '/services/cataract-surgery';

const seoText = {
  title: {
    en: 'Cataract Surgery in Alexandria',
    ar: 'جراحة المياه البيضاء في الإسكندرية',
  },
  description: {
    en: 'Cataract evaluation, phacoemulsification, and intraocular lens options at Abdalla Eye Clinic in Alexandria, with guidance before and after surgery.',
    ar: 'تقييم المياه البيضاء وتفتيت العدسة وزراعة العدسات داخل العين في عيادة عبد الله للعيون في الإسكندرية مع إرشادات قبل وبعد الجراحة.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'Cataract Surgery',
    title: 'Clearer vision starts with the right lens plan',
    intro:
      'Cataract surgery removes the cloudy natural lens and replaces it with an intraocular lens. At Abdalla Eye Clinic in Alexandria, the visit focuses on confirming the diagnosis, measuring the eye carefully, and choosing the lens option that fits your daily vision needs.',
    overviewTitle: 'Cataract Surgery Overview',
    overview:
      'Your cataract assessment reviews vision, eye pressure, corneal health, retinal status, medical history, and detailed lens measurements. Surgery is usually recommended when cataracts begin affecting reading, driving, work, or daily independence.',
    benefitsTitle: 'Benefits',
    benefits: [
      'Improved clarity, brightness, and contrast',
      'Reduced glare from lights for many patients',
      'Intraocular lens selection based on lifestyle and eye measurements',
      'Short outpatient procedure with planned follow-up',
    ],
    candidatesTitle: 'When Cataract Surgery May Help',
    candidates: [
      'Blurred, cloudy, or dim vision affecting daily tasks',
      'Glare, halos, or difficulty with night driving',
      'Frequent glasses changes without satisfying clarity',
      'Cataract confirmed by a full eye examination',
      'Retina, cornea, and eye pressure reviewed before surgery planning',
    ],
    lensTitle: 'Lens Planning',
    lensItems: [
      'Monofocal lenses for focused distance or near vision goals',
      'Toric lenses when astigmatism correction is appropriate',
      'Premium lens discussions when the eye and lifestyle are suitable',
      'Clear expectations about glasses needs after surgery',
    ],
    recoveryTitle: 'Recovery Process',
    recovery: [
      'Use prescribed drops exactly as directed',
      'Avoid rubbing or pressing on the eye',
      'Keep water, dust, and eye makeup away early in recovery',
      'Wear the protective shield if your doctor recommends it',
      'Attend follow-up visits to monitor healing and vision',
    ],
    linksTitle: 'Plan Your Cataract Visit',
    appointment: 'Book Cataract Consultation',
    doctors: 'Meet Our Doctors',
    contact: 'Contact the Clinic',
    branches: 'Alexandria Branches',
    branchLinkPrefix: 'Visit',
    faqsTitle: 'Cataract Surgery FAQs',
    ctaTitle: 'Need cataract surgery advice in Alexandria?',
    ctaText:
      'Book an eye exam to understand your cataract stage, lens options, and the safest next step for your vision.',
  },
  ar: {
    eyebrow: 'جراحة المياه البيضاء',
    title: 'وضوح الرؤية يبدأ بخطة عدسة مناسبة',
    intro:
      'تزيل جراحة المياه البيضاء العدسة الطبيعية المعتمة وتستبدلها بعدسة داخل العين. في عيادة عبد الله للعيون في الإسكندرية، يركز الكشف على تأكيد التشخيص، قياس العين بدقة، واختيار العدسة المناسبة لاحتياجاتك اليومية.',
    overviewTitle: 'نظرة عامة على جراحة المياه البيضاء',
    overview:
      'يشمل تقييم المياه البيضاء قياس النظر، ضغط العين، صحة القرنية، حالة الشبكية، التاريخ الطبي، وقياسات العدسة التفصيلية. غالباً ينصح بالجراحة عندما تبدأ المياه البيضاء في التأثير على القراءة أو القيادة أو العمل أو الاعتماد على النفس.',
    benefitsTitle: 'الفوائد',
    benefits: [
      'تحسن وضوح الرؤية والسطوع والتباين',
      'تقليل الانبهار من الأضواء لدى كثير من المرضى',
      'اختيار عدسة داخل العين حسب نمط الحياة وقياسات العين',
      'إجراء قصير مع متابعة منظمة بعد الجراحة',
    ],
    candidatesTitle: 'متى قد تفيد جراحة المياه البيضاء؟',
    candidates: [
      'زغللة أو عتامة أو ضعف في الرؤية يؤثر على المهام اليومية',
      'انبهار أو هالات حول الأضواء أو صعوبة في القيادة ليلاً',
      'تغيير متكرر في النظارة دون وضوح مرضي',
      'تأكيد وجود المياه البيضاء من خلال فحص عيون كامل',
      'مراجعة الشبكية والقرنية وضغط العين قبل التخطيط للجراحة',
    ],
    lensTitle: 'تخطيط العدسة',
    lensItems: [
      'عدسات أحادية البؤرة حسب هدف الرؤية للمسافة أو القرب',
      'عدسات توريك عند الحاجة لتصحيح الاستجماتيزم',
      'مناقشة العدسات المتقدمة عندما تكون العين ونمط الحياة مناسبين',
      'توضيح التوقعات بخصوص الحاجة للنظارة بعد الجراحة',
    ],
    recoveryTitle: 'التعافي بعد الجراحة',
    recovery: [
      'استخدام القطرات الموصوفة كما يحدد الطبيب',
      'تجنب فرك العين أو الضغط عليها',
      'إبعاد الماء والأتربة ومكياج العين في بداية التعافي',
      'ارتداء واقي العين إذا أوصى الطبيب بذلك',
      'حضور زيارات المتابعة لمراقبة الالتئام والرؤية',
    ],
    linksTitle: 'خطط لزيارة المياه البيضاء',
    appointment: 'احجز استشارة المياه البيضاء',
    doctors: 'تعرف على الأطباء',
    contact: 'تواصل مع العيادة',
    branches: 'فروع الإسكندرية',
    branchLinkPrefix: 'زيارة فرع',
    faqsTitle: 'أسئلة شائعة عن المياه البيضاء',
    ctaTitle: 'تحتاج نصيحة عن المياه البيضاء في الإسكندرية؟',
    ctaText:
      'احجز فحص عيون لمعرفة درجة المياه البيضاء، خيارات العدسات، والخطوة الأكثر أماناً لرؤيتك.',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path,
    title: seoText.title,
    description: seoText.description,
  });
}

function buildCataractProcedureSchema(lang: string, siteUrl: string) {
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
    procedureType: 'Cataract extraction with intraocular lens implantation',
    bodyLocation: isArabic ? 'العين والعدسة الطبيعية' : 'Eye and natural lens',
    howPerformed: isArabic
      ? 'إزالة العدسة المعتمة وزراعة عدسة داخل العين بعد قياسات دقيقة.'
      : 'Removal of the cloudy natural lens and implantation of an intraocular lens after detailed measurements.',
    followup: isArabic
      ? 'زيارات متابعة بعد الجراحة لمراقبة الالتئام والرؤية.'
      : 'Postoperative follow-up visits to monitor healing and vision.',
    provider: {
      '@id': `${siteUrl}/#clinic`,
    },
  };
}

export default async function CataractSurgeryPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = getLocalizedFaqs(locale)
    .filter((faq) => faq.category === 'cataract' || faq.category === 'iol')
    .slice(0, 8);
  const procedureSchema = buildCataractProcedureSchema(locale, siteUrl);
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
                  href={`/${locale}/appointments?serviceId=service-3`}
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
                  <ServiceIcon name="cataract" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-3`}>
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.lensTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.lensItems.map((item) => (
                    <li key={item} className="flex gap-3 leading-7 text-gray-700 dark:text-gray-300">
                      <span className="mt-1 text-cyan-700 dark:text-cyan-300">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12">
            <Card>
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.recoveryTitle}</h2>
                <ol className="mt-5 grid gap-3 md:grid-cols-2">
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
                href={`/${locale}/appointments?serviceId=service-3`}
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
