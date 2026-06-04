import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardBody } from '@/components/common/Card';
import { MobileBottomActionBar } from '@/components/common/MobileBottomActionBar';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { BRANCH_FAQS, CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { LOCALES } from '@/i18n/config';
import { branchAreaName, clinicLocation, phoneHref, whatsAppHref } from '@/lib/clinic';
import {
  allServicesLabel,
  getDedicatedServiceLinks,
  serviceDetailsLabel,
  serviceLinksHeading,
  serviceNavigationLabel,
} from '@/lib/service-links';
import { getSiteUrl } from '@/lib/site-url';
import {
  buildFAQPageSchema,
  createRouteMetadata,
  serializeStructuredData,
} from '@/lib/seo';
import { getLocalizedFaqs } from '@/utils/localized-content';

type PageProps = {
  params: Promise<{ lang: string; branch: string }>;
};

type Branch = (typeof CLINIC_BRANCHES)[number];

const branchCopy = {
  smouha: {
    title: {
      en: 'Smouha Eye Clinic Branch',
      ar: 'فرع عيادة العيون في سموحة',
    },
    description: {
      en: 'Visit Abdalla Eye Clinic Smouha branch at Wataneya Medical Center on 14th May Street for eye exams, LASIK, cataract, glaucoma, retina, and pediatric eye care.',
      ar: 'زوروا فرع عيادة عبد الله للعيون في سموحة بالمركز الطبي الوطنية في شارع 14 مايو لفحوصات العيون والليزك والمياه البيضاء والجلوكوما والشبكية وعيون الأطفال.',
    },
    areaName: {
      en: 'Smouha',
      ar: 'سموحة',
    },
  },
  'raml-station': {
    title: {
      en: 'Raml Station Eye Clinic Branch',
      ar: 'فرع عيادة العيون في محطة الرمل',
    },
    description: {
      en: 'Visit Abdalla Eye Clinic Raml Station branch at 22 Al-Ghorfa Al-Togareya Street for eye exams, LASIK, cataract, glaucoma, retina, and pediatric eye care.',
      ar: 'زوروا فرع عيادة عبد الله للعيون في محطة الرمل في 22 شارع الغرفة التجارية لفحوصات العيون والليزك والمياه البيضاء والجلوكوما والشبكية وعيون الأطفال.',
    },
    areaName: {
      en: 'Raml Station',
      ar: 'محطة الرمل',
    },
  },
} as const;

const localizedText = {
  en: {
    eyebrow: 'Abdalla Eye Clinic Branch',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    book: 'Book an appointment',
    address: 'Address',
    hours: 'Opening hours',
    hoursValue: 'Saturday - Wednesday, 12:00 PM - 9:00 PM',
    closed: 'Thursday and Friday: Closed',
    mapTitle: 'Map',
    mapPlaceholder: 'Map embed placeholder',
    openMap: 'Open in Google Maps',
    landmarks: 'Nearby landmarks',
    services: 'Services at this branch',
    serviceLink: 'Service details',
    faqs: 'Branch FAQs',
    faqIntro: 'Common questions before visiting this branch.',
  },
  ar: {
    eyebrow: 'فرع عيادة عبد الله للعيون',
    phone: 'الهاتف',
    whatsapp: 'واتساب',
    book: 'احجز موعداً',
    address: 'العنوان',
    hours: 'مواعيد العمل',
    hoursValue: 'السبت - الأربعاء، 12:00 ظهراً - 9:00 مساءً',
    closed: 'الخميس والجمعة: مغلق',
    mapTitle: 'الخريطة',
    mapPlaceholder: 'مكان تضمين الخريطة',
    openMap: 'افتح في خرائط Google',
    landmarks: 'معالم قريبة',
    services: 'الخدمات في هذا الفرع',
    serviceLink: 'تفاصيل الخدمة',
    faqs: 'أسئلة شائعة عن الفرع',
    faqIntro: 'أسئلة شائعة قبل زيارة هذا الفرع.',
  },
} as const;

function getBranch(slug: string) {
  return CLINIC_BRANCHES.find((branch) => branch.slug === slug);
}

function getBranchCopy(slug: string) {
  return branchCopy[slug as keyof typeof branchCopy];
}

function localizeBranchFaqs(faqs: typeof BRANCH_FAQS[string], lang: string) {
  if (lang !== 'ar') return faqs;

  return faqs.map((faq) => ({
    ...faq,
    question: faq.questionAr ?? faq.question,
    answer: faq.answerAr ?? faq.answer,
  }));
}

function getBranchFaqs(lang: string, branchSlug: string) {
  const branchFaqs = BRANCH_FAQS[branchSlug];

  if (branchFaqs) {
    return localizeBranchFaqs(branchFaqs, lang);
  }

  const faqs = getLocalizedFaqs(lang);
  const preferredIds = ['faq-2', 'faq-7', 'faq-8', 'faq-5', 'faq-1'];

  return preferredIds
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq));
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => (
    CLINIC_BRANCHES.map((branch) => ({ lang, branch: branch.slug }))
  ));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, branch: branchSlug } = await params;
  const copy = getBranchCopy(branchSlug);

  if (!copy) {
    return {};
  }

  return createRouteMetadata({
    lang,
    path: `/branches/${branchSlug}`,
    title: copy.title,
    description: copy.description,
  });
}

export default async function BranchLandingPage({ params }: PageProps) {
  const { lang, branch: branchSlug } = await params;
  const branch = getBranch(branchSlug);
  const copy = getBranchCopy(branchSlug);

  if (!branch || !copy) {
    notFound();
  }

  const isArabic = lang === 'ar';
  const text = localizedText[isArabic ? 'ar' : 'en'];
  const siteUrl = getSiteUrl();
  const title = isArabic ? copy.title.ar : copy.title.en;
  const description = isArabic ? copy.description.ar : copy.description.en;
  const areaName = branchAreaName(branch, lang);
  const address = isArabic ? branch.addressAr : branch.address;
  const landmarks = isArabic ? branch.landmarksAr : branch.landmarks;
  const whatsappUrl = whatsAppHref();
  const services = getDedicatedServiceLinks(lang);
  const serviceLinkLabel = serviceDetailsLabel(lang);
  const faqs = getBranchFaqs(lang, branch.slug);
  const faqSchema = buildFAQPageSchema({
    faqs,
    locale: lang,
    siteUrl,
    path: `/branches/${branch.slug}`,
  });

  return (
    <>
      <div className="bg-gray-50 py-12 transition-colors duration-200 dark:bg-gray-900 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqSchema) }}
        />

        <div className="mx-auto max-w-7xl px-4">
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
            <div>
              <span className="eyebrow mb-5">{text.eyebrow}</span>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 dark:text-white md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-300">
                {description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${phoneHref(branch.phone)}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-200 bg-white px-5 py-3 font-bold text-cyan-900 shadow-sm transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                >
                  {text.phone}: {branch.phone}
                </a>
                <a
                  href={whatsappUrl ?? `mailto:${CLINIC_INFO.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  {text.whatsapp}: {CLINIC_INFO.phone}
                </a>
                <Link
                  href={`/${lang}/appointments`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-700 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-cyan-800"
                >
                  {text.book}
                </Link>
              </div>
            </div>

            <Card variant="elevated" className="lg:sticky lg:top-28">
              <CardBody>
                <dl className="space-y-5">
                  <div>
                    <dt className="text-sm font-black uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-200">
                      {text.address}
                    </dt>
                    <dd className="mt-2 text-gray-800 dark:text-gray-200">{address}</dd>
                    <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {clinicLocation(lang)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-black uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-200">
                      {text.hours}
                    </dt>
                    <dd className="mt-2 text-gray-800 dark:text-gray-200">{text.hoursValue}</dd>
                    <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">{text.closed}</dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{text.mapTitle}</h2>
                <div className="mt-4 flex min-h-72 items-center justify-center rounded-lg border border-dashed border-cyan-300 bg-cyan-50 text-center text-sm font-semibold text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-100">
                  <div>
                    <p>{text.mapPlaceholder}</p>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex rounded-lg bg-cyan-700 px-4 py-2 text-white transition-colors hover:bg-cyan-800"
                    >
                      {text.openMap}
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">{text.landmarks}</h2>
                <ul className="mt-5 space-y-3">
                  {landmarks.map((landmark) => (
                    <li key={landmark} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200">
                      {landmark}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </section>

          <section className="mt-12" aria-label={serviceNavigationLabel(lang)}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-200">
              {serviceLinksHeading(lang)}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{text.services}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link key={service.slug} href={service.href} className="group block">
                  <Card variant="outlined" className="h-full p-4 transition-colors group-hover:border-cyan-300 group-hover:bg-cyan-50/50 dark:group-hover:bg-cyan-950/30">
                    <CardBody>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 transition-colors group-hover:bg-cyan-700 group-hover:text-white dark:bg-cyan-950 dark:text-cyan-200">
                        <ServiceIcon name={service.icon} className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-gray-950 transition-colors group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                        {service.label}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.description}</p>
                      <p className="mt-4 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                        {serviceLinkLabel}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
            <Link
              href={`/${lang}/services`}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-bold text-cyan-900 transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
            >
              {allServicesLabel(lang)}
            </Link>
          </section>

          <section className="mt-12 rounded-lg border border-cyan-100 bg-white p-5 shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/70 sm:p-7">
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white">{text.faqs}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{text.faqIntro}</p>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                  <summary className="cursor-pointer font-semibold text-gray-950 dark:text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
      <MobileBottomActionBar locale={lang} />
    </>
  );
}
