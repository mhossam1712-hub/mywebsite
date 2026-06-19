import type { Metadata } from 'next';
import Link from 'next/link';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { Card, CardBody } from '@/components/common/Card';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { LOCALES } from '@/i18n/config';
import { branchAreaName, branchDirectionsHref } from '@/lib/clinic';
import { getSiteUrl } from '@/lib/site-url';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  canonicalUrl,
  createRouteMetadata,
  normalizeLocale,
  serializeStructuredData,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '/branches', route: 'branches' });
}

const copy = {
  en: {
    h1: 'Abdalla Eye Clinic Branches in Alexandria',
    intro:
      'Abdalla Eye Clinic operates two fully equipped ophthalmology branches in Alexandria, Egypt, providing specialist eye care close to where patients live or work. Both branches share the same specialist team and offer the same standard of care — choose whichever location is most convenient for you.',
    branchCardCta: 'View branch details',
    directionsLabel: 'Get directions',
    hoursLabel: 'Opening hours',
    hoursValue: 'Saturday – Wednesday, 12:00 PM – 9:00 PM',
    closedValue: 'Thursday and Friday: Closed',
    section1Title: 'Which Branch Should You Visit?',
    section1Smouha:
      'The Smouha branch (Wataneya Medical Center, 14 May Street) is the most convenient option for patients coming from Smouha, Sidi Gaber, Sporting, Glym, Kafr Abdu, and eastern Alexandria neighbourhoods.',
    section1Raml:
      'The Raml Station branch (22 Al-Ghorfa Al-Togareya Street) is best for patients near central Alexandria, Mansheya, Bahary, Attarin, El-Ibrahimia, and downtown areas. It is well-served by public transport and easily accessible from most parts of the city.',
    section2Title: 'Eye Care Services Available at Both Branches',
    services: [
      'Comprehensive eye examination and vision assessment',
      'Cataract evaluation and intraocular lens (IOL) planning',
      'Glaucoma follow-up and eye pressure monitoring',
      'Dry eye diagnosis and treatment',
      'Retina examination and screening',
      'Pediatric eye care and child vision testing',
      'Contact lens and glasses prescription',
      'Eye tests and vision screening',
    ],
    section3Title: 'How to Choose Your Appointment Location',
    section3Intro:
      'Choosing a branch is straightforward. Consider the following factors:',
    section3Factors: [
      'Proximity — choose the branch closest to your home or workplace.',
      'Appointment times — both branches are open Saturday through Wednesday, 12PM to 9PM.',
      'Doctor availability — both branches are staffed by the same specialist team.',
      'Follow-up convenience — you can switch between branches between visits if needed.',
      'WhatsApp confirmation — all bookings are confirmed via WhatsApp after you submit your request.',
    ],
    section4Title: 'Frequently Asked Questions About Our Branches',
    faqs: [
      {
        q: 'Do I need to choose a specific branch when booking?',
        a: 'No. You can simply mention your preferred area when booking via WhatsApp and we will suggest the most convenient branch. Both Smouha and Raml Station are fully equipped and operated by the same specialist team.',
      },
      {
        q: 'Can I follow up at a different branch?',
        a: 'Yes. Your medical history is accessible at both branches, so you can continue your care at whichever location is more convenient for each visit.',
      },
      {
        q: 'Are the same eye services available at both branches?',
        a: 'Both branches offer comprehensive eye examinations, cataract evaluation, glaucoma follow-up, dry eye assessment, pediatric eye care, and vision prescriptions. Some advanced procedures may be scheduled at one branch — your doctor will advise you accordingly.',
      },
      {
        q: 'How can I confirm the exact appointment time?',
        a: 'After submitting your booking request, a WhatsApp message is pre-filled with your details. Send it to confirm your appointment, and you will receive a reply with the confirmed time and branch.',
      },
    ],
    bookCta: 'Book an appointment',
  },
  ar: {
    h1: 'فروع عيادة عبد الله للعيون في الإسكندرية',
    intro:
      'تمتلك عيادة عبد الله للعيون فرعين متكاملَين في الإسكندرية، يقدمان رعاية عيون متخصصة قريبة من مكان إقامتك أو عملك. يعمل كلا الفرعين بنفس الفريق الطبي المتخصص ويقدمان المستوى ذاته من الرعاية — اختر الفرع الأنسب لك.',
    branchCardCta: 'تفاصيل الفرع',
    directionsLabel: 'الاتجاهات',
    hoursLabel: 'مواعيد العمل',
    hoursValue: 'السبت – الأربعاء، 12:00 ظهراً – 9:00 مساءً',
    closedValue: 'الخميس والجمعة: مغلق',
    section1Title: 'أي فرع يناسبك؟',
    section1Smouha:
      'فرع سموحة (المركز الطبي الوطنية، شارع 14 مايو) هو الخيار الأنسب للمرضى القادمين من سموحة وسيدي جابر وسبورتنج وغليم والكفراوي ومناطق شرق الإسكندرية.',
    section1Raml:
      'فرع محطة الرمل (22 شارع الغرفة التجارية) مناسب للمرضى القادمين من وسط المدينة والمنشية والبحري والعطارين والإبراهيمية ومنطقة وسط البلد. يتمتع الفرع بسهولة الوصول من معظم أحياء الإسكندرية.',
    section2Title: 'خدمات العيون المتوفرة في كلا الفرعين',
    services: [
      'فحص العيون الشامل وتقييم حدة الإبصار',
      'تقييم المياه البيضاء وتخطيط العدسة داخل العين (IOL)',
      'متابعة الجلوكوما وقياس ضغط العين',
      'تشخيص جفاف العين وعلاجه',
      'فحص الشبكية والغربلة العينية',
      'رعاية عيون الأطفال وقياس النظر',
      'كتابة وصفات العدسات اللاصقة والنظارات الطبية',
      'اختبارات النظر وفرز الأعراض البصرية',
    ],
    section3Title: 'كيف تختار مكان الكشف؟',
    section3Intro:
      'اختيار الفرع أمر يسير. ضع في اعتبارك العوامل التالية:',
    section3Factors: [
      'القرب الجغرافي — اختر الفرع الأقرب إلى منزلك أو مكان عملك.',
      'مواعيد الكشف — كلا الفرعين مفتوحان السبت–الأربعاء من 12 ظهراً حتى 9 مساءً.',
      'توافر الطبيب — يعمل في كلا الفرعين نفس الفريق الطبي المتخصص.',
      'سهولة المتابعة — يمكنك الانتقال بين الفرعين بين الزيارات حسب ما يناسبك.',
      'تأكيد الحجز — تُرسَل رسالة تأكيد عبر واتساب بعد كل طلب حجز.',
    ],
    section4Title: 'أسئلة شائعة عن فروع العيادة',
    faqs: [
      {
        q: 'هل يجب أن أختار فرعاً محدداً عند الحجز؟',
        a: 'لا. يمكنك ذكر المنطقة الأقرب لك عند التواصل عبر واتساب وسنقترح الفرع الأنسب. فرعا سموحة ومحطة الرمل مجهزان بالكامل ويعملان بنفس الفريق الطبي المتخصص.',
      },
      {
        q: 'هل يمكنني المتابعة في فرع مختلف؟',
        a: 'نعم. سجلك الطبي متاح في كلا الفرعين، ويمكنك مواصلة علاجك في أيٍّ منهما حسب ما يناسبك في كل زيارة.',
      },
      {
        q: 'هل تتوفر نفس خدمات العيون في كلا الفرعين؟',
        a: 'يقدم كلا الفرعين فحص العيون الشامل وتقييم المياه البيضاء ومتابعة الجلوكوما وتشخيص جفاف العين ورعاية عيون الأطفال وكتابة وصفات النظارات. بعض العمليات المتقدمة قد يُحدد لها موعد في أحد الفرعين — وسيوجهك طبيبك بناءً على حالتك.',
      },
      {
        q: 'كيف يمكنني تأكيد موعد الكشف؟',
        a: 'بعد إرسال طلب الحجز، ستُفتح نافذة واتساب تلقائياً بتفاصيل موعدك. أرسل الرسالة الجاهزة لتأكيد الموعد، وستصلك رسالة رد بتأكيد التوقيت والفرع.',
      },
    ],
    bookCta: 'احجز موعداً',
  },
} as const;

function buildBranchesPageSchema(lang: string, siteUrl: string) {
  const isArabic = normalizeLocale(lang) === 'ar';
  const locale = normalizeLocale(lang);

  const breadcrumb = buildBreadcrumbSchema({
    locale: lang,
    siteUrl,
    items: [
      { name: isArabic ? 'الصفحة الرئيسية' : 'Home', path: '' },
      { name: isArabic ? 'الفروع' : 'Branches', path: '/branches' },
    ],
  });

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(siteUrl, canonicalUrl(lang, '/branches'))}#list`,
    name: isArabic
      ? 'فروع عيادة عبد الله للعيون في الإسكندرية'
      : 'Abdalla Eye Clinic Branches in Alexandria',
    description: isArabic
      ? 'فرعا عيادة عبد الله للعيون في سموحة ومحطة الرمل، الإسكندرية'
      : 'Abdalla Eye Clinic ophthalmology branches in Smouha and Raml Station, Alexandria',
    numberOfItems: CLINIC_BRANCHES.length,
    itemListElement: CLINIC_BRANCHES.map((branch, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: isArabic
        ? `عيادة عبد الله للعيون — فرع ${branchAreaName(branch, 'ar')}`
        : `Abdalla Eye Clinic — ${branchAreaName(branch, 'en')} Branch`,
      url: absoluteUrl(siteUrl, canonicalUrl(locale, `/branches/${branch.slug}`)),
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(siteUrl, canonicalUrl(lang, '/branches'))}#faq`,
    url: absoluteUrl(siteUrl, canonicalUrl(lang, '/branches')),
    inLanguage: locale,
    mainEntity: copy[isArabic ? 'ar' : 'en'].faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return { breadcrumb, itemList, faqPage };
}

export default async function BranchesListingPage({ params }: PageProps) {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  const t = isArabic ? copy.ar : copy.en;
  const siteUrl = getSiteUrl();
  const schemas = buildBranchesPageSchema(lang, siteUrl);

  return (
    <>
      <div className="bg-gray-50 py-12 transition-colors duration-200 dark:bg-gray-900 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(schemas.breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(schemas.itemList) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(schemas.faqPage) }}
        />

        <div className="mx-auto max-w-7xl px-4">
          {/* Hero */}
          <div className="mb-12">
            <span className="eyebrow mb-4 block">
              {isArabic ? 'الإسكندرية، مصر' : 'Alexandria, Egypt'}
            </span>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 dark:text-white md:text-5xl">
              {t.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
              {t.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/appointments`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-cyan-800"
              >
                {t.bookCta}
              </Link>
            </div>
          </div>

          {/* Branch cards */}
          <section aria-label={isArabic ? 'فروع العيادة' : 'Clinic branches'}>
            <div className="grid gap-6 sm:grid-cols-2">
              {CLINIC_BRANCHES.map((branch) => {
                const areaName = branchAreaName(branch, lang);
                const address = isArabic ? branch.addressAr : branch.address;
                const directionsUrl = branchDirectionsHref(branch);

                return (
                  <Card key={branch.slug} variant="elevated">
                    <CardBody>
                      <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                        {isArabic
                          ? `فرع ${areaName}`
                          : `${areaName} Branch`}
                      </h2>
                      <dl className="mt-4 space-y-3 text-sm">
                        <div>
                          <dt className="text-xs font-black uppercase tracking-[0.13em] text-cyan-800 dark:text-cyan-300">
                            {isArabic ? 'العنوان' : 'Address'}
                          </dt>
                          <dd className="mt-1 text-gray-700 dark:text-gray-300">{address}</dd>
                          <dd className="text-gray-500 dark:text-gray-400">
                            {isArabic ? 'الإسكندرية، مصر' : 'Alexandria, Egypt'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-black uppercase tracking-[0.13em] text-cyan-800 dark:text-cyan-300">
                            {isArabic ? 'الهاتف' : 'Phone'}
                          </dt>
                          <dd className="mt-1">
                            <a
                              href={`tel:${branch.phone.replace(/\s/g, '')}`}
                              className="font-semibold text-cyan-800 transition-colors hover:text-cyan-950 dark:text-cyan-200"
                            >
                              {branch.phone}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-black uppercase tracking-[0.13em] text-cyan-800 dark:text-cyan-300">
                            {t.hoursLabel}
                          </dt>
                          <dd className="mt-1 text-gray-700 dark:text-gray-300">{t.hoursValue}</dd>
                          <dd className="text-gray-500 dark:text-gray-400">{t.closedValue}</dd>
                        </div>
                      </dl>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href={`/${lang}/branches/${branch.slug}`}
                          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-800"
                        >
                          {t.branchCardCta}
                        </Link>
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-bold text-cyan-900 transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50"
                        >
                          {t.directionsLabel}
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Section 1 — Which branch */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
              {t.section1Title}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-cyan-100 bg-white p-5 dark:border-cyan-900/60 dark:bg-gray-950/70">
                <h3 className="font-bold text-cyan-900 dark:text-cyan-200">
                  {isArabic ? 'فرع سموحة' : 'Smouha Branch'}
                </h3>
                <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{t.section1Smouha}</p>
                <Link
                  href={`/${lang}/branches/smouha`}
                  className="mt-4 inline-flex text-sm font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-white"
                >
                  {t.branchCardCta} →
                </Link>
              </div>
              <div className="rounded-xl border border-cyan-100 bg-white p-5 dark:border-cyan-900/60 dark:bg-gray-950/70">
                <h3 className="font-bold text-cyan-900 dark:text-cyan-200">
                  {isArabic ? 'فرع محطة الرمل' : 'Raml Station Branch'}
                </h3>
                <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{t.section1Raml}</p>
                <Link
                  href={`/${lang}/branches/raml-station`}
                  className="mt-4 inline-flex text-sm font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-white"
                >
                  {t.branchCardCta} →
                </Link>
              </div>
            </div>
          </section>

          {/* Section 2 — Services */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
              {t.section2Title}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200"
                >
                  <span className="mt-0.5 text-cyan-600" aria-hidden="true">✓</span>
                  {service}
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link
                href={`/${lang}/services`}
                className="inline-flex text-sm font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-white"
              >
                {isArabic ? 'استعرض كل الخدمات' : 'View all services'} →
              </Link>
            </p>
          </section>

          {/* Section 3 — How to choose */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
              {t.section3Title}
            </h2>
            <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{t.section3Intro}</p>
            <ul className="mt-5 space-y-3">
              {t.section3Factors.map((factor) => (
                <li key={factor} className="flex gap-3 leading-7 text-gray-700 dark:text-gray-300">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-600" aria-hidden="true" />
                  {factor}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={`/${lang}/appointments`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-cyan-800"
              >
                {t.bookCta}
              </Link>
            </div>
          </section>

          {/* Section 4 — FAQs */}
          <section className="mt-14 rounded-lg border border-cyan-100 bg-white p-6 shadow-sm dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
              {t.section4Title}
            </h2>
            <div className="mt-6 space-y-3">
              {t.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <summary className="cursor-pointer font-semibold text-gray-950 dark:text-white">
                    {faq.q}
                  </summary>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Contact strip */}
          <section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-cyan-100 bg-cyan-50/60 p-5 dark:border-cyan-900/60 dark:bg-cyan-950/20">
            <div>
              <p className="font-semibold text-cyan-900 dark:text-cyan-100">
                {isArabic
                  ? `تواصل معنا: ${CLINIC_INFO.phone}`
                  : `Call or WhatsApp: ${CLINIC_INFO.phone}`}
              </p>
              <p className="mt-1 text-sm text-cyan-800 dark:text-cyan-200">
                {isArabic
                  ? 'السبت–الأربعاء، 12 ظهراً – 9 مساءً'
                  : 'Saturday–Wednesday, 12PM–9PM'}
              </p>
            </div>
            <Link
              href={`/${lang}/appointments`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 font-bold text-white transition-colors hover:bg-cyan-800"
            >
              {t.bookCta}
            </Link>
          </section>
        </div>
      </div>
      <MobileBottomActionBar locale={lang} />
    </>
  );
}
