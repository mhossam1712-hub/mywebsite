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

const path = '/services/glaucoma';

const seoText = {
  title: {
    en: 'Glaucoma Treatment in Alexandria',
    ar: 'علاج الجلوكوما في الإسكندرية',
  },
  description: {
    en: 'Glaucoma screening, eye pressure monitoring, optic nerve follow-up, drops, laser, and surgical care at Abdalla Eye Clinic in Alexandria.',
    ar: 'فحص الجلوكوما ومتابعة ضغط العين والعصب البصري والقطرات والليزر والجراحة عند الحاجة في عيادة عبد الله للعيون في الإسكندرية.',
  },
} as const;

const pageCopy = {
  en: {
    eyebrow: 'Glaucoma Care',
    title: 'Protecting sight through pressure and optic nerve monitoring',
    intro:
      'Glaucoma can damage the optic nerve silently, especially in early stages. At Abdalla Eye Clinic in Alexandria, glaucoma care focuses on early detection, pressure control, optic nerve follow-up, and a treatment plan you can maintain.',
    overviewTitle: 'Glaucoma Overview',
    overview:
      'A glaucoma evaluation reviews eye pressure, optic nerve appearance, corneal thickness, drainage angle, visual field results, retinal nerve fiber imaging when needed, family history, and current medications.',
    benefitsTitle: 'Why Early Care Matters',
    benefits: [
      'Detects glaucoma before noticeable vision loss in many patients',
      'Tracks eye pressure and optic nerve changes over time',
      'Helps reduce the risk of preventable permanent vision loss',
      'Builds a clear plan for drops, laser, surgery, or observation',
    ],
    candidatesTitle: 'Who Should Be Checked',
    candidates: [
      'Adults with high eye pressure or suspicious optic nerve findings',
      'People with a family history of glaucoma',
      'Patients with diabetes, high myopia, eye trauma, or steroid use',
      'Anyone with reduced side vision, halos, eye pain, or unexplained vision changes',
      'Patients already using glaucoma drops who need ongoing monitoring',
    ],
    treatmentTitle: 'Treatment Options',
    treatmentItems: [
      'Eye pressure monitoring and risk assessment',
      'Prescription eye drops with adherence support',
      'Laser treatment when appropriate',
      'Surgical options when drops or laser are not enough',
      'Regular visual field and optic nerve follow-up',
    ],
    followupTitle: 'Follow-Up Process',
    followup: [
      'Bring your current drops and previous test reports if available',
      'Measure eye pressure and review optic nerve status',
      'Repeat visual field or imaging tests when needed',
      'Adjust treatment based on pressure targets and progression risk',
      'Keep scheduled follow-ups even when vision feels normal',
    ],
    linksTitle: 'Plan Your Glaucoma Visit',
    appointment: 'Book Glaucoma Consultation',
    doctors: 'Meet Our Doctors',
    contact: 'Contact the Clinic',
    branches: 'Alexandria Branches',
    branchLinkPrefix: 'Visit',
    faqsTitle: 'Glaucoma FAQs',
    ctaTitle: 'Need glaucoma screening or follow-up in Alexandria?',
    ctaText:
      'Book a glaucoma consultation for eye pressure measurement, optic nerve assessment, and a personalized treatment plan.',
  },
  ar: {
    eyebrow: 'رعاية الجلوكوما',
    title: 'حماية النظر بمتابعة ضغط العين والعصب البصري',
    intro:
      'قد تسبب الجلوكوما تلفاً في العصب البصري دون أعراض واضحة، خاصة في المراحل المبكرة. في عيادة عبد الله للعيون في الإسكندرية، نركز على الاكتشاف المبكر، ضبط ضغط العين، متابعة العصب البصري، ووضع خطة علاج يمكن الالتزام بها.',
    overviewTitle: 'نظرة عامة على الجلوكوما',
    overview:
      'يشمل تقييم الجلوكوما قياس ضغط العين، فحص العصب البصري، سمك القرنية، زاوية تصريف العين، نتائج مجال الإبصار، تصوير ألياف العصب عند الحاجة، التاريخ العائلي، والأدوية الحالية.',
    benefitsTitle: 'أهمية المتابعة المبكرة',
    benefits: [
      'اكتشاف الجلوكوما قبل حدوث ضعف ملحوظ في النظر لدى كثير من المرضى',
      'متابعة ضغط العين وتغيرات العصب البصري بمرور الوقت',
      'تقليل خطر فقدان النظر الدائم الذي يمكن الوقاية منه',
      'وضع خطة واضحة للقطرات أو الليزر أو الجراحة أو المتابعة فقط',
    ],
    candidatesTitle: 'من يحتاج إلى فحص الجلوكوما؟',
    candidates: [
      'البالغون الذين لديهم ارتفاع في ضغط العين أو اشتباه في العصب البصري',
      'من لديهم تاريخ عائلي للجلوكوما',
      'مرضى السكري أو قصر النظر الشديد أو إصابات العين أو استخدام الكورتيزون',
      'أي شخص لديه ضعف في الرؤية الجانبية أو هالات أو ألم بالعين أو تغير غير مفسر في النظر',
      'المرضى الذين يستخدمون قطرات الجلوكوما ويحتاجون متابعة منتظمة',
    ],
    treatmentTitle: 'خيارات العلاج',
    treatmentItems: [
      'متابعة ضغط العين وتقييم عوامل الخطورة',
      'قطرات علاجية مع شرح طريقة الالتزام بها',
      'العلاج بالليزر عند مناسبته للحالة',
      'خيارات جراحية عندما لا تكفي القطرات أو الليزر',
      'متابعة مجال الإبصار والعصب البصري بانتظام',
    ],
    followupTitle: 'خطوات المتابعة',
    followup: [
      'إحضار القطرات الحالية والتقارير السابقة إن وجدت',
      'قياس ضغط العين ومراجعة حالة العصب البصري',
      'إعادة مجال الإبصار أو التصوير عند الحاجة',
      'تعديل العلاج حسب ضغط العين المستهدف وخطر التدهور',
      'الالتزام بزيارات المتابعة حتى إذا كان النظر طبيعياً',
    ],
    linksTitle: 'خطط لزيارة الجلوكوما',
    appointment: 'احجز استشارة الجلوكوما',
    doctors: 'تعرف على الأطباء',
    contact: 'تواصل مع العيادة',
    branches: 'فروع الإسكندرية',
    branchLinkPrefix: 'زيارة فرع',
    faqsTitle: 'أسئلة شائعة عن الجلوكوما',
    ctaTitle: 'تحتاج فحص أو متابعة جلوكوما في الإسكندرية؟',
    ctaText:
      'احجز استشارة للجلوكوما لقياس ضغط العين، تقييم العصب البصري، ووضع خطة علاج مناسبة لحالتك.',
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

function buildGlaucomaProcedureSchema(lang: string, siteUrl: string) {
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
    procedureType: 'Glaucoma screening and treatment',
    bodyLocation: isArabic ? 'العين والعصب البصري' : 'Eye and optic nerve',
    howPerformed: isArabic
      ? 'قياس ضغط العين وفحص العصب البصري ومجال الإبصار مع العلاج بالقطرات أو الليزر أو الجراحة عند الحاجة.'
      : 'Eye pressure measurement, optic nerve assessment, visual field testing, and treatment with drops, laser, or surgery when needed.',
    followup: isArabic
      ? 'متابعة منتظمة لضغط العين والعصب البصري ومجال الإبصار.'
      : 'Regular follow-up for eye pressure, optic nerve status, and visual field changes.',
    provider: {
      '@id': `${siteUrl}/#clinic`,
    },
  };
}

export default async function GlaucomaServicePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const isArabic = locale === 'ar';
  const copy = pageCopy[locale];
  const siteUrl = getSiteUrl();
  const faqs = getLocalizedFaqs(locale).filter((faq) => faq.category === 'glaucoma').slice(0, 8);
  const procedureSchema = buildGlaucomaProcedureSchema(locale, siteUrl);
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
                  href={`/${locale}/appointments?serviceId=service-4`}
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
                  <ServiceIcon name="glaucoma" className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{copy.linksTitle}</h2>
                <div className="mt-5 space-y-3">
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/doctors`}>
                    {copy.doctors}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/contact`}>
                    {copy.contact}
                  </Link>
                  <Link className="block font-bold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300" href={`/${locale}/appointments?serviceId=service-4`}>
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
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{copy.followupTitle}</h2>
                <ol className="mt-5 grid gap-3 md:grid-cols-2">
                  {copy.followup.map((item, index) => (
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
                href={`/${locale}/appointments?serviceId=service-4`}
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
