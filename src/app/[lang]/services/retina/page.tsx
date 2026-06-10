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

const path = '/services/retina';

const seoText = {
  title: {
    en: 'Retina Specialist Care in Alexandria',
    ar: 'رعاية أمراض الشبكية في الإسكندرية',
  },
  description: {
    en: 'Retina evaluation and treatment in Alexandria for diabetic retinopathy, flashes, floaters, macular disease, and retinal warning symptoms.',
    ar: 'تقييم وعلاج أمراض الشبكية في الإسكندرية لاعتلال الشبكية السكري والومضات والعوائم وأمراض مركز الإبصار وأعراض الشبكية التحذيرية.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'Retina Care',
    title: 'Retina evaluation for symptoms that should not wait',
    intro:
      'The retina is the light-sensitive layer at the back of the eye. At Abdalla Eye Clinic in Alexandria, retina care focuses on careful examination, early detection of diabetic and macular disease, and urgent assessment of warning symptoms such as flashes, floaters, or sudden vision changes.',
    overviewTitle: 'Retina Treatment Overview',
    overview:
      'A retina visit may include dilated retinal examination, eye pressure measurement, macular evaluation, diabetic eye screening, and imaging when needed. The goal is to understand whether symptoms are stable, progressive, or urgent.',
    benefitsTitle: 'Why Retina Checks Matter',
    benefits: [
      'Early detection of diabetic retinopathy and macular problems',
      'Assessment of flashes, floaters, shadows, or sudden vision changes',
      'Monitoring for patients with diabetes, high myopia, or vascular risk factors',
      'Treatment planning and timely referral when urgent retina intervention is needed',
    ],
    candidatesTitle: 'When To Book A Retina Visit',
    candidates: [
      'Diabetes or a history of diabetic eye disease',
      'New flashes, floaters, curtain-like shadow, or sudden vision loss',
      'Distorted central vision or difficulty reading straight lines',
      'High myopia or previous retinal tear, laser, or detachment',
      'Macular degeneration, retinal vein problems, or unexplained blurred vision',
    ],
    treatmentTitle: 'Retina Care Options',
    treatmentItems: [
      'Dilated retina examination and risk assessment',
      'Diabetic retinopathy monitoring and treatment planning',
      'Macular disease evaluation',
      'Anti-VEGF injection planning when indicated',
      'Retinal tear or detachment assessment and urgent referral when needed',
    ],
    warningTitle: 'Urgent Warning Signs',
    warningItems: [
      'A sudden increase in floaters',
      'Flashing lights in one eye',
      'A dark curtain or shadow in side vision',
      'Sudden central blur or distortion',
      'Vision loss after eye trauma',
    ],
    linksTitle: 'Plan Your Retina Visit',
    appointment: 'Book Retina Consultation',
    doctors: 'Meet Our Doctors',
    contact: 'Contact the Clinic',
    branches: 'Alexandria Branches',
    branchLinkPrefix: 'Visit',
    faqsTitle: 'Retina FAQs',
    ctaTitle: 'Concerned about retina symptoms in Alexandria?',
    ctaText:
      'Book a retina assessment for diabetic eye screening, flashes, floaters, macular symptoms, or sudden vision changes.',
  },
  ar: {
    eyebrow: 'رعاية الشبكية',
    title: 'تقييم الشبكية للأعراض التي لا يجب تأجيلها',
    intro:
      'الشبكية هي الطبقة الحساسة للضوء في الجزء الخلفي من العين. في عيادة عبد الله للعيون في الإسكندرية، تركز رعاية الشبكية على الفحص الدقيق، الاكتشاف المبكر لأمراض السكري ومركز الإبصار، والتقييم العاجل للأعراض التحذيرية مثل الومضات أو العوائم أو تغير النظر المفاجئ.',
    overviewTitle: 'نظرة عامة على علاج الشبكية',
    overview:
      'قد يشمل كشف الشبكية فحص قاع العين بعد التوسيع، قياس ضغط العين، تقييم مركز الإبصار، فحص الشبكية لمرضى السكري، والتصوير عند الحاجة. الهدف هو تحديد هل الأعراض مستقرة أم متزايدة أم تحتاج تدخلاً عاجلاً.',
    benefitsTitle: 'أهمية فحص الشبكية',
    benefits: [
      'الاكتشاف المبكر لاعتلال الشبكية السكري ومشكلات مركز الإبصار',
      'تقييم الومضات والعوائم والظلال أو فقدان النظر المفاجئ',
      'متابعة مرضى السكري وقصر النظر الشديد وعوامل الخطورة الوعائية',
      'وضع خطة علاج أو تحويل عاجل عند الحاجة لتدخل شبكي سريع',
    ],
    candidatesTitle: 'متى تحجز كشف شبكية؟',
    candidates: [
      'وجود سكري أو تاريخ مرضي لاعتلال الشبكية السكري',
      'ظهور ومضات أو عوائم جديدة أو ظل مثل الستارة أو فقدان نظر مفاجئ',
      'تشوه في الرؤية المركزية أو صعوبة في رؤية الخطوط المستقيمة',
      'قصر نظر شديد أو تاريخ قطع أو ليزر أو انفصال في الشبكية',
      'تنكس بقعي أو مشكلات في أوردة الشبكية أو زغللة غير مفسرة',
    ],
    treatmentTitle: 'خيارات رعاية الشبكية',
    treatmentItems: [
      'فحص شبكية بعد التوسيع وتقييم عوامل الخطورة',
      'متابعة اعتلال الشبكية السكري ووضع خطة العلاج',
      'تقييم أمراض مركز الإبصار',
      'تخطيط حقن مضادات عامل النمو عند الحاجة',
      'تقييم قطع أو انفصال الشبكية والتحويل العاجل عند الضرورة',
    ],
    warningTitle: 'علامات تحذيرية عاجلة',
    warningItems: [
      'زيادة مفاجئة في العوائم',
      'ومضات ضوئية في عين واحدة',
      'ظل أو ستارة داكنة في مجال الرؤية الجانبي',
      'زغللة أو تشوه مفاجئ في مركز الرؤية',
      'فقدان نظر بعد إصابة في العين',
    ],
    linksTitle: 'خطط لزيارة الشبكية',
    appointment: 'احجز استشارة الشبكية',
    doctors: 'تعرف على الأطباء',
    contact: 'تواصل مع العيادة',
    branches: 'فروع الإسكندرية',
    branchLinkPrefix: 'زيارة فرع',
    faqsTitle: 'أسئلة شائعة عن الشبكية',
    ctaTitle: 'قلق من أعراض الشبكية في الإسكندرية؟',
    ctaText:
      'احجز تقييم الشبكية لفحص عين السكري أو الومضات أو العوائم أو أعراض مركز الإبصار أو تغير النظر المفاجئ.',
  },
} as const;

const retinaFaqs = {
  en: [
    {
      id: 'retina-faq-1',
      question: 'When should I see a retina specialist?',
      answer:
        'Book a retina assessment if you have diabetes, sudden floaters, flashes, a curtain-like shadow, distorted central vision, or unexplained vision loss.',
      category: 'retina',
    },
    {
      id: 'retina-faq-2',
      question: 'Are flashes and floaters urgent?',
      answer:
        'New flashes or a sudden increase in floaters should be checked promptly because they can sometimes indicate a retinal tear or detachment risk.',
      category: 'retina',
    },
    {
      id: 'retina-faq-3',
      question: 'How often should diabetic patients have a retina exam?',
      answer:
        'Many diabetic patients need a yearly dilated retina exam, but the timing may be more frequent if diabetic retinopathy is present.',
      category: 'retina',
    },
    {
      id: 'retina-faq-4',
      question: 'Can retina disease cause permanent vision loss?',
      answer:
        'Some retina conditions can cause permanent vision loss if untreated, which is why early diagnosis and timely follow-up are important.',
      category: 'retina',
    },
    {
      id: 'retina-faq-5',
      question: 'Will my pupils be dilated during a retina visit?',
      answer:
        'Retina assessment often requires pupil dilation, so your near vision and light sensitivity may be affected for several hours afterward.',
      category: 'retina',
    },
    {
      id: 'retina-faq-6',
      question: 'What symptoms suggest a retinal detachment?',
      answer:
        'Warning symptoms include sudden flashes, many new floaters, a dark curtain or shadow, or sudden loss of part of your vision.',
      category: 'retina',
    },
  ],
  ar: [
    {
      id: 'retina-faq-1',
      question: 'متى أحتاج إلى كشف شبكية؟',
      answer:
        'احجز تقييم الشبكية إذا كنت مصاباً بالسكري أو ظهرت عوائم مفاجئة أو ومضات أو ظل مثل الستارة أو تشوه في مركز الرؤية أو فقدان نظر غير مفسر.',
      category: 'retina',
    },
    {
      id: 'retina-faq-2',
      question: 'هل الومضات والعوائم حالة عاجلة؟',
      answer:
        'يجب فحص الومضات الجديدة أو الزيادة المفاجئة في العوائم سريعاً لأنها قد تشير أحياناً إلى قطع في الشبكية أو خطر انفصالها.',
      category: 'retina',
    },
    {
      id: 'retina-faq-3',
      question: 'كم مرة يحتاج مريض السكري إلى فحص الشبكية؟',
      answer:
        'يحتاج كثير من مرضى السكري إلى فحص شبكية بعد التوسيع مرة سنوياً، وقد تكون المتابعة أقرب إذا كان هناك اعتلال في الشبكية.',
      category: 'retina',
    },
    {
      id: 'retina-faq-4',
      question: 'هل أمراض الشبكية قد تسبب فقدان نظر دائم؟',
      answer:
        'بعض أمراض الشبكية قد تسبب فقدان نظر دائم إذا لم تعالج، لذلك فإن التشخيص المبكر والمتابعة في الوقت المناسب مهمان.',
      category: 'retina',
    },
    {
      id: 'retina-faq-5',
      question: 'هل يتم توسيع الحدقة أثناء كشف الشبكية؟',
      answer:
        'غالباً يحتاج تقييم الشبكية إلى توسيع الحدقة، وقد يتأثر النظر القريب وتزيد حساسية الضوء لعدة ساعات بعد الكشف.',
      category: 'retina',
    },
    {
      id: 'retina-faq-6',
      question: 'ما أعراض انفصال الشبكية؟',
      answer:
        'تشمل العلامات التحذيرية ومضات مفاجئة أو عوائم كثيرة جديدة أو ظل داكن مثل الستارة أو فقدان جزء من مجال الرؤية.',
      category: 'retina',
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

function buildRetinaProcedureSchema(lang: string, siteUrl: string) {
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
    procedureType: 'Retina evaluation and treatment planning',
    bodyLocation: isArabic ? 'العين والشبكية ومركز الإبصار' : 'Eye, retina, and macula',
    howPerformed: isArabic
      ? 'فحص الشبكية بعد توسيع الحدقة وتقييم مركز الإبصار وأعراض الشبكية مع التصوير أو خطة العلاج عند الحاجة.'
      : 'Dilated retina examination, macular assessment, review of retina symptoms, and imaging or treatment planning when needed.',
    followup: isArabic
      ? 'متابعة حسب التشخيص، خاصة لمرضى السكري أو أمراض مركز الإبصار أو أعراض الشبكية التحذيرية.'
      : 'Follow-up based on diagnosis, especially for diabetes, macular disease, or retinal warning symptoms.',
    provider: {
      '@id': `${siteUrl}/#clinic`,
    },
  };
}

export default async function RetinaServicePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = retinaFaqs[locale];
  const procedureSchema = buildRetinaProcedureSchema(locale, siteUrl);
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
                  href={`/${locale}/appointments?serviceId=service-5`}
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
                  <ServiceIcon name="retina" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-5`}>
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.warningTitle}</h2>
                <ol className="mt-5 grid gap-3 md:grid-cols-2">
                  {copy.warningItems.map((item, index) => (
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
                href={`/${locale}/appointments?serviceId=service-5`}
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
