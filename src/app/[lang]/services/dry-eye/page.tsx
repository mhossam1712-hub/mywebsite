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
import type { FAQ } from '@/types';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const path = '/services/dry-eye';

const seoText = {
  title: {
    en: 'Dry Eye Treatment in Alexandria',
    ar: 'علاج جفاف العين في الإسكندرية',
  },
  description: {
    en: 'Dry eye diagnosis and treatment in Alexandria for burning, irritation, screen-related symptoms, contact lens discomfort, and tear film problems.',
    ar: 'تشخيص وعلاج جفاف العين في الإسكندرية للحرقان والتهيج وأعراض الشاشات وعدم ارتياح العدسات اللاصقة ومشكلات طبقة الدموع.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'Dry Eye Treatment',
    title: 'Dry eye care for burning, irritation, and screen fatigue',
    intro:
      'Dry eye can cause burning, redness, blurred vision, foreign-body sensation, and discomfort during screen use or contact lens wear. At Abdalla Eye Clinic in Alexandria, dry eye care starts with identifying the cause so treatment can match the tear film problem.',
    overviewTitle: 'Dry Eye Overview',
    overview:
      'A dry eye assessment reviews symptoms, screen habits, medications, contact lens use, eyelid health, tear quality, and meibomian gland function. The goal is to separate simple irritation from chronic tear film instability or eyelid-related dry eye.',
    benefitsTitle: 'Benefits Of Proper Treatment',
    benefits: [
      'Relief from burning, gritty sensation, redness, and irritation',
      'Improved comfort during reading, computer work, and phone use',
      'Better contact lens tolerance for suitable patients',
      'A personalized plan instead of relying on random lubricant drops',
    ],
    candidatesTitle: 'When To Book A Dry Eye Visit',
    candidates: [
      'Burning, stinging, tearing, or a gritty feeling in the eyes',
      'Blurred vision that changes with blinking',
      'Symptoms that worsen with screens, air conditioning, or dust',
      'Contact lens discomfort or reduced wearing time',
      'Red eyelids, crusting, or recurrent irritation',
    ],
    treatmentTitle: 'Treatment Options',
    treatmentItems: [
      'Artificial tear and lubricant selection',
      'Eyelid hygiene and warm compress guidance',
      'Meibomian gland evaluation and treatment planning',
      'Anti-inflammatory drops when clinically appropriate',
      'Punctal plugs or advanced treatments for selected cases',
    ],
    processTitle: 'Care Process',
    process: [
      'Review symptoms, triggers, medications, and screen habits',
      'Examine the tear film, eyelids, cornea, and ocular surface',
      'Identify whether dryness is evaporative, aqueous-deficient, or mixed',
      'Start a practical treatment plan and explain home care clearly',
      'Adjust treatment during follow-up based on response',
    ],
    linksTitle: 'Plan Your Dry Eye Visit',
    appointment: 'Book Dry Eye Consultation',
    doctors: 'Meet Our Doctors',
    contact: 'Contact the Clinic',
    branches: 'Alexandria Branches',
    branchLinkPrefix: 'Visit',
    faqsTitle: 'Dry Eye FAQs',
    ctaTitle: 'Need dry eye relief in Alexandria?',
    ctaText:
      'Book a dry eye consultation for burning, irritation, screen-related symptoms, or contact lens discomfort.',
  },
  ar: {
    eyebrow: 'علاج جفاف العين',
    title: 'رعاية جفاف العين للحرقان والتهيج وإجهاد الشاشات',
    intro:
      'قد يسبب جفاف العين حرقاناً واحمراراً وزغللة وإحساساً بوجود جسم غريب وعدم ارتياح مع الشاشات أو العدسات اللاصقة. في عيادة عبد الله للعيون في الإسكندرية، يبدأ علاج جفاف العين بتحديد السبب حتى تناسب الخطة مشكلة طبقة الدموع.',
    overviewTitle: 'نظرة عامة على جفاف العين',
    overview:
      'يشمل تقييم جفاف العين مراجعة الأعراض، عادات استخدام الشاشات، الأدوية، العدسات اللاصقة، صحة الجفون، جودة الدموع، ووظيفة غدد ميبوميان. الهدف هو التمييز بين التهيج البسيط واضطراب طبقة الدموع المزمن أو الجفاف المرتبط بالجفون.',
    benefitsTitle: 'فوائد العلاج المناسب',
    benefits: [
      'تخفيف الحرقان والإحساس بالرمل والاحمرار والتهيج',
      'راحة أفضل أثناء القراءة واستخدام الكمبيوتر والهاتف',
      'تحسن تحمل العدسات اللاصقة للحالات المناسبة',
      'خطة شخصية بدلاً من الاعتماد على قطرات مرطبة عشوائية',
    ],
    candidatesTitle: 'متى تحجز كشف جفاف العين؟',
    candidates: [
      'حرقان أو لسعة أو دموع زائدة أو إحساس بالرمل في العين',
      'زغللة تتغير مع الرمش',
      'أعراض تزيد مع الشاشات أو التكييف أو الأتربة',
      'عدم ارتياح مع العدسات اللاصقة أو قلة مدة استخدامها',
      'احمرار الجفون أو قشور أو تهيج متكرر',
    ],
    treatmentTitle: 'خيارات العلاج',
    treatmentItems: [
      'اختيار القطرات المرطبة والمزلقة المناسبة',
      'إرشادات تنظيف الجفون والكمادات الدافئة',
      'تقييم غدد ميبوميان ووضع خطة العلاج',
      'قطرات مضادة للالتهاب عند مناسبتها طبياً',
      'سدادات القنوات الدمعية أو علاجات متقدمة لحالات مختارة',
    ],
    processTitle: 'خطوات الرعاية',
    process: [
      'مراجعة الأعراض والمحفزات والأدوية وعادات الشاشات',
      'فحص طبقة الدموع والجفون والقرنية وسطح العين',
      'تحديد هل الجفاف تبخري أو نقص في الدموع أو مختلط',
      'بدء خطة علاج عملية وشرح الرعاية المنزلية بوضوح',
      'تعديل العلاج في المتابعة حسب الاستجابة',
    ],
    linksTitle: 'خطط لزيارة جفاف العين',
    appointment: 'احجز استشارة جفاف العين',
    doctors: 'تعرف على الأطباء',
    contact: 'تواصل مع العيادة',
    branches: 'فروع الإسكندرية',
    branchLinkPrefix: 'زيارة فرع',
    faqsTitle: 'أسئلة شائعة عن جفاف العين',
    ctaTitle: 'تحتاج علاج جفاف العين في الإسكندرية؟',
    ctaText:
      'احجز استشارة جفاف العين للحرقان أو التهيج أو أعراض الشاشات أو عدم ارتياح العدسات اللاصقة.',
  },
} as const;

const dryEyeFaqs = {
  en: [
    {
      id: 'dry-eye-faq-1',
      question: 'What causes dry eye?',
      answer:
        'Dry eye can happen when tears are insufficient, evaporate too quickly, or become unstable because of eyelid inflammation, screen use, medications, contact lenses, or environmental factors.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-2',
      question: 'Can dry eye cause blurry vision?',
      answer:
        'Yes. Dry eye can cause fluctuating blur that often improves briefly after blinking or using lubricating drops.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-3',
      question: 'Why do screens make dry eye worse?',
      answer:
        'People blink less during screen use, which increases tear evaporation and can make burning, heaviness, and blurred vision worse.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-4',
      question: 'Are artificial tears enough for dry eye?',
      answer:
        'Lubricating drops help many patients, but persistent dry eye may need eyelid care, anti-inflammatory treatment, gland management, or other targeted options.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-5',
      question: 'Can contact lenses cause dry eye symptoms?',
      answer:
        'Contact lenses can worsen dryness or discomfort in some patients, especially when tear film quality or eyelid glands are not healthy.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-6',
      question: 'Is dry eye a chronic condition?',
      answer:
        'Dry eye can be temporary or chronic. Long-term cases often improve with a consistent plan and follow-up adjustments.',
      category: 'dry-eye',
    },
  ],
  ar: [
    {
      id: 'dry-eye-faq-1',
      question: 'ما أسباب جفاف العين؟',
      answer:
        'قد يحدث جفاف العين بسبب نقص الدموع أو تبخرها بسرعة أو عدم استقرار طبقة الدموع نتيجة التهاب الجفون أو استخدام الشاشات أو بعض الأدوية أو العدسات اللاصقة أو العوامل البيئية.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-2',
      question: 'هل جفاف العين يسبب زغللة؟',
      answer:
        'نعم. قد يسبب جفاف العين زغللة متغيرة تتحسن مؤقتاً بعد الرمش أو استخدام القطرات المرطبة.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-3',
      question: 'لماذا تزيد الشاشات أعراض جفاف العين؟',
      answer:
        'يقل معدل الرمش أثناء استخدام الشاشات، مما يزيد تبخر الدموع وقد يسبب زيادة الحرقان والثقل والزغللة.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-4',
      question: 'هل القطرات المرطبة كافية لعلاج جفاف العين؟',
      answer:
        'تساعد القطرات المرطبة كثيراً من المرضى، لكن الجفاف المستمر قد يحتاج عناية بالجفون أو علاجاً مضاداً للالتهاب أو علاج الغدد أو خيارات موجهة أخرى.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-5',
      question: 'هل العدسات اللاصقة تسبب أعراض جفاف العين؟',
      answer:
        'قد تزيد العدسات اللاصقة الجفاف أو عدم الارتياح لدى بعض المرضى، خاصة إذا كانت طبقة الدموع أو غدد الجفون غير سليمة.',
      category: 'dry-eye',
    },
    {
      id: 'dry-eye-faq-6',
      question: 'هل جفاف العين مرض مزمن؟',
      answer:
        'قد يكون جفاف العين مؤقتاً أو مزمناً. الحالات طويلة المدى غالباً تتحسن مع خطة منتظمة وتعديل العلاج في المتابعة.',
      category: 'dry-eye',
    },
  ],
} satisfies Record<'en' | 'ar', FAQ[]>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path,
    title: seoText.title,
    description: seoText.description,
  });
}

function buildDryEyeProcedureSchema(lang: string, siteUrl: string) {
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
    procedureType: 'Dry eye evaluation and treatment planning',
    bodyLocation: isArabic ? 'العين وسطح العين وطبقة الدموع' : 'Eye, ocular surface, and tear film',
    howPerformed: isArabic
      ? 'فحص سطح العين والجفون وطبقة الدموع وتحديد سبب الجفاف ثم وضع خطة علاج مناسبة.'
      : 'Assessment of the ocular surface, eyelids, and tear film to identify the cause of dryness and plan targeted treatment.',
    followup: isArabic
      ? 'متابعة الاستجابة وتعديل القطرات أو علاج الجفون أو الخيارات المتقدمة حسب الحالة.'
      : 'Follow-up to review response and adjust drops, eyelid care, or advanced treatment options as needed.',
    provider: {
      '@id': `${siteUrl}/#clinic`,
    },
  };
}

export default async function DryEyeServicePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = dryEyeFaqs[locale];
  const procedureSchema = buildDryEyeProcedureSchema(locale, siteUrl);
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
                  href={`/${locale}/appointments?serviceId=service-7`}
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
                  <ServiceIcon name="dry-eye" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-7`}>
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.treatmentTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.treatmentItems.map((item) => (
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.processTitle}</h2>
                <ol className="mt-5 grid gap-3 md:grid-cols-2">
                  {copy.process.map((item, index) => (
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
                href={`/${locale}/appointments?serviceId=service-7`}
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
