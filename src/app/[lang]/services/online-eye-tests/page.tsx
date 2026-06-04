import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody } from '@/components/common/Card';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { CLINIC_BRANCHES } from '@/constants';
import { branchAreaName } from '@/lib/clinic';
import { getSiteUrl } from '@/lib/site-url';
import {
  buildFAQPageSchema,
  createRouteMetadata,
  normalizeLocale,
  serializeStructuredData,
} from '@/lib/seo';
import type { FAQ } from '@/types';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const path = '/services/online-eye-tests';

const seoText = {
  title: {
    en: 'Online Eye Tests',
    ar: 'اختبارات النظر على الإنترنت',
  },
  description: {
    en: 'Try online eye screening checks for color vision, central vision, contrast sensitivity, near vision, and eye symptoms, then book a calibrated eye exam in Alexandria when needed.',
    ar: 'جرّب فحوصات عيون أولية على الإنترنت للألوان والرؤية المركزية وحساسية التباين والرؤية القريبة والأعراض، ثم احجز فحصاً طبياً معايراً في الإسكندرية عند الحاجة.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'Online Eye Tests',
    title: 'Online eye screening before your Alexandria clinic visit',
    intro:
      'Abdalla Eye Clinic offers interactive online screening tools for color vision, central vision, contrast sensitivity, near vision, and eye symptoms. These checks help you understand when a calibrated eye exam in Alexandria is worth booking, without replacing medical diagnosis.',
    openTests: 'Open Eye Test Tools',
    doctors: 'Meet Our Doctors',
    linksTitle: 'Next Steps',
    contact: 'Contact the Clinic',
    appointments: 'Book an Eye Exam',
    branches: 'Alexandria Branches',
    branchLinkPrefix: 'Visit',
    overviewTitle: 'What You Can Check Online',
    overview:
      'The online eye-test suite is educational screening. Results can be affected by screen brightness, color settings, room lighting, device size, and viewing distance. If symptoms are new, severe, one-sided, or worsening, book an ophthalmology exam instead of relying on an online score.',
    toolsTitle: 'Available Eye Tests',
    toolCta: 'Start this check',
    tools: [
      {
        title: 'Ishihara Color Vision Screening',
        description:
          'A plate-based color screening check for red-green color vision patterns. Useful for school, work, driving, and anyone who suspects color discrimination difficulty.',
      },
      {
        title: 'Amsler Grid Central Vision Check',
        description:
          'A central vision screen for distortion, missing areas, or differences between eyes that may need macular or retina evaluation.',
      },
      {
        title: 'Contrast Sensitivity Check',
        description:
          'A simple contrast screen for visual quality concerns such as glare, night-driving difficulty, cataract symptoms, dry eye, or uncorrected prescription.',
      },
      {
        title: 'Near-Vision Screening',
        description:
          'A near-vision check at approximately 40 cm for reading comfort, eye strain, and age-related near focusing changes.',
      },
      {
        title: 'Eye Symptom Triage',
        description:
          'A symptom checklist that highlights urgent warning signs such as sudden vision loss, severe pain, flashes, floaters, trauma, or a curtain-like shadow.',
      },
    ],
    useCasesTitle: 'When Online Screening Helps',
    useCases: [
      'You want a quick first check before booking a full eye exam',
      'You notice screen fatigue, reading difficulty, glare, or color confusion',
      'You need help deciding whether symptoms should be checked urgently',
      'You want a structured report to discuss during your Alexandria clinic visit',
    ],
    limitationsTitle: 'Important Limits',
    limitations: [
      'Online tests do not diagnose cataract, glaucoma, retina disease, dry eye, or prescription changes',
      'Screen settings and lighting can change results',
      'Children, older adults, and patients with symptoms still need a real eye exam',
      'Urgent symptoms should not wait for online screening',
    ],
    faqsTitle: 'Online Eye Test FAQs',
    ctaTitle: 'Want a calibrated result?',
    ctaText:
      'Use the online tools as a first screen, then book a comprehensive eye exam at Abdalla Eye Clinic in Alexandria for medical-grade testing and interpretation.',
  },
  ar: {
    eyebrow: 'اختبارات النظر على الإنترنت',
    title: 'فحص نظر أولي على الإنترنت قبل زيارة العيادة في الإسكندرية',
    intro:
      'توفر عيادة عبد الله للعيون أدوات فحص تفاعلية على الإنترنت لرؤية الألوان والرؤية المركزية وحساسية التباين والرؤية القريبة وأعراض العين. تساعد هذه الفحوصات على معرفة متى تحتاج إلى فحص عيون معاير في الإسكندرية، لكنها لا تستبدل التشخيص الطبي.',
    openTests: 'افتح أدوات فحص النظر',
    doctors: 'تعرف على الأطباء',
    linksTitle: 'الخطوات التالية',
    contact: 'تواصل مع العيادة',
    appointments: 'احجز فحص عيون',
    branches: 'فروع الإسكندرية',
    branchLinkPrefix: 'زيارة فرع',
    overviewTitle: 'ما الذي يمكن فحصه على الإنترنت؟',
    overview:
      'مجموعة اختبارات النظر على الإنترنت هي فحوصات أولية تعليمية. قد تتأثر النتائج بسطوع الشاشة وإعدادات الألوان وإضاءة الغرفة وحجم الجهاز ومسافة المشاهدة. إذا كانت الأعراض جديدة أو شديدة أو في عين واحدة أو تزداد، احجز فحص عيون بدلاً من الاعتماد على نتيجة إلكترونية.',
    toolsTitle: 'اختبارات النظر المتاحة',
    toolCta: 'ابدأ هذا الفحص',
    tools: [
      {
        title: 'فحص ألوان إيشيهارا',
        description:
          'فحص أولي باستخدام لوحات الألوان لتقييم أنماط ضعف تمييز الأحمر والأخضر، ومفيد للدراسة والعمل والقيادة ومن يشك في صعوبة تمييز الألوان.',
      },
      {
        title: 'شبكة أمسلر للرؤية المركزية',
        description:
          'فحص للرؤية المركزية لاكتشاف التشوه أو المناطق المفقودة أو الاختلاف بين العينين، وهي علامات قد تحتاج تقييم الشبكية أو مركز الإبصار.',
      },
      {
        title: 'فحص حساسية التباين',
        description:
          'فحص بسيط لجودة الرؤية عند وجود انبهار أو صعوبة في القيادة ليلاً أو أعراض مياه بيضاء أو جفاف العين أو مقاس نظارة غير مناسب.',
      },
      {
        title: 'فحص الرؤية القريبة',
        description:
          'فحص للرؤية القريبة على مسافة حوالي 40 سم لتقييم راحة القراءة وإجهاد العين وتغيرات التركيز القريب المرتبطة بالعمر.',
      },
      {
        title: 'فرز أعراض العين',
        description:
          'قائمة أعراض توضح العلامات التحذيرية العاجلة مثل فقدان النظر المفاجئ أو الألم الشديد أو الومضات أو العوائم أو الإصابة أو ظل يشبه الستارة.',
      },
    ],
    useCasesTitle: 'متى يفيد الفحص الإلكتروني؟',
    useCases: [
      'عندما تريد فحصاً أولياً سريعاً قبل حجز كشف عيون كامل',
      'عند ملاحظة إجهاد مع الشاشات أو صعوبة قراءة أو انبهار أو ارتباك في الألوان',
      'عندما تحتاج مساعدة في معرفة هل الأعراض تحتاج كشفاً عاجلاً',
      'عندما تريد تقريراً منظماً لمناقشته أثناء زيارة العيادة في الإسكندرية',
    ],
    limitationsTitle: 'حدود مهمة',
    limitations: [
      'اختبارات الإنترنت لا تشخص المياه البيضاء أو الجلوكوما أو أمراض الشبكية أو جفاف العين أو تغير مقاس النظارة',
      'إعدادات الشاشة والإضاءة قد تغير النتيجة',
      'الأطفال وكبار السن والمرضى أصحاب الأعراض يحتاجون فحصاً حقيقياً',
      'الأعراض العاجلة لا يجب أن تنتظر الفحص الإلكتروني',
    ],
    faqsTitle: 'أسئلة شائعة عن اختبارات النظر على الإنترنت',
    ctaTitle: 'تحتاج نتيجة معايرة؟',
    ctaText:
      'استخدم أدوات الفحص على الإنترنت كخطوة أولى، ثم احجز فحص عيون شامل في عيادة عبد الله للعيون في الإسكندرية للحصول على قياسات طبية وتفسير متخصص.',
  },
} as const;

const onlineEyeTestFaqs = {
  en: [
    {
      id: 'online-eye-tests-faq-1',
      question: 'Can online eye tests replace an eye exam?',
      answer:
        'No. Online eye tests are screening tools only. They can guide next steps, but they cannot diagnose eye disease or replace a calibrated ophthalmology exam.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-2',
      question: 'Which online eye tests are available?',
      answer:
        'The available checks include Ishihara color vision screening, Amsler grid central vision screening, contrast sensitivity, near vision, and symptom triage.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-3',
      question: 'What should I do if my online result is abnormal?',
      answer:
        'Book a comprehensive eye exam, especially if the result is new, one-sided, worsening, or affecting daily activities.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-4',
      question: 'Are online eye tests accurate?',
      answer:
        'They are useful for screening, but accuracy depends on screen brightness, color calibration, room lighting, device size, and viewing distance.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-5',
      question: 'Which symptoms need urgent care?',
      answer:
        'Sudden vision loss, severe eye pain, new flashes or floaters, trauma, or a curtain-like shadow should be checked urgently.',
      category: 'online-eye-tests',
    },
  ],
  ar: [
    {
      id: 'online-eye-tests-faq-1',
      question: 'هل اختبارات النظر على الإنترنت تغني عن فحص العيون؟',
      answer:
        'لا. اختبارات النظر على الإنترنت هي فحوصات أولية فقط. قد تساعد في تحديد الخطوة التالية، لكنها لا تشخص أمراض العين ولا تستبدل فحص طبيب العيون المعاير.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-2',
      question: 'ما اختبارات النظر المتاحة على الإنترنت؟',
      answer:
        'تشمل الفحوصات المتاحة فحص ألوان إيشيهارا، شبكة أمسلر للرؤية المركزية، حساسية التباين، الرؤية القريبة، وفرز أعراض العين.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-3',
      question: 'ماذا أفعل إذا كانت نتيجة الفحص الإلكتروني غير طبيعية؟',
      answer:
        'احجز فحص عيون شامل، خاصة إذا كانت النتيجة جديدة أو في عين واحدة أو تزداد أو تؤثر على الأنشطة اليومية.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-4',
      question: 'هل اختبارات النظر على الإنترنت دقيقة؟',
      answer:
        'هي مفيدة كفحص أولي، لكن الدقة تعتمد على سطوع الشاشة ومعايرة الألوان وإضاءة الغرفة وحجم الجهاز ومسافة المشاهدة.',
      category: 'online-eye-tests',
    },
    {
      id: 'online-eye-tests-faq-5',
      question: 'ما الأعراض التي تحتاج رعاية عاجلة؟',
      answer:
        'فقدان النظر المفاجئ أو ألم العين الشديد أو ظهور ومضات أو عوائم جديدة أو إصابة العين أو ظل يشبه الستارة يحتاج فحصاً عاجلاً.',
      category: 'online-eye-tests',
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

export default async function OnlineEyeTestsServicePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = onlineEyeTestFaqs[locale];
  const testSuiteHref = `/${locale}/eye-tests`;
  const faqSchema = buildFAQPageSchema({ faqs, locale, siteUrl, path });

  return (
    <>
      <div className="bg-gray-50 py-12 transition-colors duration-200 dark:bg-gray-900 md:py-20">
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
                  href={testSuiteHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-cyan-800"
                >
                  {copy.openTests}
                </Link>
                <Link
                  href={`/${locale}/appointments?serviceId=service-9`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-200 bg-white px-5 py-3 font-bold text-cyan-900 shadow-sm transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                >
                  {copy.appointments}
                </Link>
              </div>
            </div>

            <Card variant="elevated" className="lg:sticky lg:top-28">
              <CardBody>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 shadow-inner dark:bg-cyan-950/60 dark:text-cyan-200">
                  <ServiceIcon name="eye-exam" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={testSuiteHref}>
                    {copy.openTests}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-9`}>
                    {copy.appointments}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12">
            <Card>
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.overviewTitle}</h2>
                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">{copy.overview}</p>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12">
            <h2 className={`text-3xl font-bold text-gray-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
              {copy.toolsTitle}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {copy.tools.map((tool) => (
                <Link
                  key={tool.title}
                  href={testSuiteHref}
                  className={`rounded-lg border border-cyan-100 bg-white p-5 shadow-sm transition-colors hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-900/70 dark:bg-gray-950 dark:hover:bg-cyan-950/40 ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  <h3 className="text-xl font-black text-gray-950 dark:text-white">{tool.title}</h3>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{tool.description}</p>
                  <span className="mt-5 inline-flex font-bold text-cyan-700 dark:text-cyan-300">
                    {copy.toolCta}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card variant="outlined">
              <CardBody className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.useCasesTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.useCases.map((item) => (
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.limitationsTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {copy.limitations.map((item) => (
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
                href={testSuiteHref}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 py-3 font-bold text-cyan-950 shadow-sm transition-colors hover:bg-cyan-50"
              >
                {copy.openTests}
              </Link>
              <Link
                href={`/${locale}/appointments?serviceId=service-9`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-5 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                {copy.appointments}
              </Link>
            </div>
          </section>
        </div>
      </div>
      <MobileBottomActionBar locale={locale} />
    </>
  );
}
