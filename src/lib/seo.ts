import type { Metadata } from 'next';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { branchDisplayName, phoneHref } from '@/lib/clinic';
import type { FAQ } from '@/types';
import { getLocalizedDoctors, getLocalizedServices } from '@/utils/localized-content';

const TITLE_SEPARATOR = '|';
export const CANONICAL_SITE_URL = 'https://abdallaeyeclinic.com';

type Locale = 'en' | 'ar';
type LocalizedText = {
  en: string;
  ar: string;
};
type LocalizedOgImage = {
  url: string;
  alt: LocalizedText;
};

export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

export const OG_IMAGES = {
  home: {
    url: '/assets/images/og/home.png',
    alt: {
      en: 'Abdalla Eye Clinic ophthalmology care in Alexandria with LASIK, cataract, glaucoma, retina, and dry eye services',
      ar: 'رعاية طب وجراحة العيون في عيادة عبد الله للعيون بالإسكندرية وتشمل الليزك والمياه البيضاء والجلوكوما والشبكية وجفاف العين',
    },
  },
  blog: {
    url: '/assets/images/og/blog.png',
    alt: {
      en: 'Abdalla Eye Clinic eye care blog with patient education articles about vision, symptoms, and treatment options',
      ar: 'مدونة عيادة عبد الله للعيون بمقالات تثقيفية عن النظر وأعراض العين وخيارات العلاج',
    },
  },
} as const satisfies Record<string, LocalizedOgImage>;

export const SERVICE_OG_IMAGES = {
  lasik: {
    url: '/assets/images/og/lasik.png',
    alt: {
      en: 'LASIK consultation and laser vision correction assessment at Abdalla Eye Clinic in Alexandria',
      ar: 'استشارة الليزك وتقييم تصحيح الإبصار بالليزر في عيادة عبد الله للعيون بالإسكندرية',
    },
  },
  cataract: {
    url: '/assets/images/og/cataract.png',
    alt: {
      en: 'Cataract evaluation, lens planning, and cataract surgery care at Abdalla Eye Clinic in Alexandria',
      ar: 'تقييم المياه البيضاء وتخطيط العدسة وجراحة المياه البيضاء في عيادة عبد الله للعيون بالإسكندرية',
    },
  },
  glaucoma: {
    url: '/assets/images/og/glaucoma.png',
    alt: {
      en: 'Glaucoma screening, eye pressure monitoring, and optic nerve follow-up at Abdalla Eye Clinic in Alexandria',
      ar: 'فحص الجلوكوما ومتابعة ضغط العين والعصب البصري في عيادة عبد الله للعيون بالإسكندرية',
    },
  },
  retina: {
    url: '/assets/images/og/retina.png',
    alt: {
      en: 'Retina evaluation for diabetic eye disease, flashes, floaters, and urgent warning symptoms in Alexandria',
      ar: 'تقييم الشبكية لمرضى السكري والومضات والعوائم والأعراض التحذيرية العاجلة في الإسكندرية',
    },
  },
  dryEye: {
    url: '/assets/images/og/dry-eye.png',
    alt: {
      en: 'Dry eye diagnosis and treatment for burning, irritation, screen fatigue, and tear film problems in Alexandria',
      ar: 'تشخيص وعلاج جفاف العين للحرقان والتهيج وإجهاد الشاشات ومشكلات طبقة الدموع في الإسكندرية',
    },
  },
} as const satisfies Record<string, LocalizedOgImage>;

export const DEFAULT_OG_IMAGE = OG_IMAGES.home.url;

export function ogImageUrl(title: string): string {
  return `/api/og?title=${encodeURIComponent(title)}`;
}
type RouteSeoKey =
  | 'home'
  | 'eyeTests'
  | 'blog'
  | 'services'
  | 'doctors'
  | 'about'
  | 'contact'
  | 'appointments'
  | 'faqs'
  | 'branches'
  | 'privacy'
  | 'terms'
  | 'dashboard';
type StructuredData = Record<string, unknown>;
type ClinicBranch = (typeof CLINIC_BRANCHES)[number];
type LocalizedService = ReturnType<typeof getLocalizedServices>[number];
type LocalizedDoctor = ReturnType<typeof getLocalizedDoctors>[number];

type VerificationTokens = {
  google?: string;
  bing?: string;
};

type PageMetadataInput = {
  lang: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  appendBrand?: boolean;
};

type RouteSeoText = {
  title: LocalizedText;
  description: LocalizedText;
  appendBrand?: boolean;
};

export const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
} satisfies Metadata['robots'];

export const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
} satisfies Metadata['robots'];

const rootSeoText: { title: LocalizedText; description: LocalizedText } = {
  title: {
    en: `${CLINIC_INFO.name} - ${CLINIC_INFO.city}, ${CLINIC_INFO.country}`,
    ar: `${CLINIC_INFO.nameAr} - ${CLINIC_INFO.cityAr}، ${CLINIC_INFO.countryAr}`,
  },
  description: {
    en: 'Leading ophthalmology clinic in Alexandria offering LASIK surgery, cataract treatment, glaucoma management, retina care, dry eye treatment, and comprehensive eye exams.',
    ar: 'عيادة عيون متخصصة في الإسكندرية تقدم الليزك وجراحة المياه البيضاء وعلاج الجلوكوما والشبكية وجفاف العين وفحوصات العيون الشاملة.',
  },
};

const localizedKeywords: Record<Locale, string[]> = {
  en: [
    'ophthalmologist Alexandria',
    'eye clinic Alexandria Egypt',
    'LASIK Alexandria',
    'cataract surgery Alexandria',
    'glaucoma treatment Alexandria',
    'retina specialist Alexandria',
    'dry eye treatment Alexandria',
  ],
  ar: [
    'طبيب عيون الإسكندرية',
    'عيادة عيون الإسكندرية',
    'ليزك الإسكندرية',
    'عملية المياه البيضاء الإسكندرية',
    'علاج الجلوكوما الإسكندرية',
    'دكتور شبكية الإسكندرية',
    'علاج جفاف العين الإسكندرية',
  ],
};

const routeSeoText: Record<RouteSeoKey, RouteSeoText> = {
  home: {
    title: {
      en: 'Abdalla Eye Clinic Alexandria — LASIK, Cataract & Eye Care',
      ar: 'عيادة عبد الله للعيون في الإسكندرية',
    },
    description: {
      en: 'Expert eye care in Alexandria, Egypt. LASIK surgery, cataract treatment, glaucoma, retina & dry eye specialists. Book your appointment today — Smouha & Raml Station.',
      ar: 'عيادة عيون متخصصة في الإسكندرية تقدم فحوصات شاملة للنظر، الليزك، جراحة المياه البيضاء، علاج الجلوكوما، أمراض الشبكية، جفاف العين، وعيون الأطفال. احجز موعدك اليوم.',
    },
    appendBrand: false,
  },
  eyeTests: {
    title: {
      en: 'Online Eye Tests — Free Vision Screening | Abdalla Eye Clinic Alexandria',
      ar: 'اختبارات النظر التفاعلية',
    },
    description: {
      en: 'Take a free online eye test from home. Check color vision, central vision, contrast sensitivity & more. Provided by Abdalla Eye Clinic, Alexandria.',
      ar: 'فحوصات عيون تفاعلية أولية تشمل لوحات إيشيهارا، شبكة أمسلر، حساسية التباين، وفرز أعراض العيون مع عرض النتيجة للمريض.',
    },
    appendBrand: false,
  },
  blog: {
    title: {
      en: 'Eye Care Blog | Abdalla Eye Clinic',
      ar: 'مدونة العناية بالعين | عيادة عبد الله للعيون',
    },
    description: {
      en: 'Expert eye care articles from Abdalla Eye Clinic covering LASIK, cataracts, comprehensive eye exams, glaucoma, retina care, and healthy vision habits.',
      ar: 'مقالات طبية من عيادة عبد الله للعيون عن الليزك والمياه البيضاء وفحوصات العين والجلوكوما والشبكية وعادات الحفاظ على صحة النظر.',
    },
  },
  services: {
    title: {
      en: 'Eye Care Services Alexandria — LASIK, Cataract, Glaucoma | Abdalla Eye Clinic',
      ar: 'خدمات طب وجراحة العيون في الإسكندرية',
    },
    description: {
      en: 'Comprehensive ophthalmology services in Alexandria: LASIK, cataract surgery, glaucoma treatment, retinal care, dry eye & pediatric eye care. Serving Smouha & Raml Station.',
      ar: 'تعرف على خدمات عيادة عبد الله للعيون مثل فحص العين الشامل، الليزك، جراحة المياه البيضاء، علاج الجلوكوما، الشبكية، جفاف العين، وعيون الأطفال.',
    },
    appendBrand: false,
  },
  doctors: {
    title: {
      en: 'Our Ophthalmologists in Alexandria | Prof. Ahmed & Dr. Mohamed Abdalla',
      ar: 'أطباء عيادة عبد الله للعيون',
    },
    description: {
      en: 'Meet our specialist eye doctors in Alexandria — Prof. Ahmed Hossam Abdalla and Dr. Mohamed Hossam Abdalla. Expert ophthalmology care at Abdalla Eye Clinic.',
      ar: 'تعرف على أطباء عيادة عبد الله للعيون في الإسكندرية واحجز رعاية متخصصة لفحوصات العين والليزك والمياه البيضاء والجلوكوما والشبكية وعيون الأطفال.',
    },
    appendBrand: false,
  },
  about: {
    title: {
      en: 'About Abdalla Eye Clinic',
      ar: 'عن عيادة عبد الله للعيون',
    },
    description: {
      en: 'Learn about Abdalla Eye Clinic, an ophthalmology clinic in Alexandria focused on comprehensive eye care, diagnostics, surgery, and patient-centered follow-up.',
      ar: 'تعرف على عيادة عبد الله للعيون في الإسكندرية ورؤيتها في تقديم رعاية عيون شاملة وتشخيص دقيق وجراحات ومتابعة تتمحور حول المريض.',
    },
  },
  contact: {
    title: {
      en: 'Contact Abdalla Eye Clinic — Alexandria Eye Specialists',
      ar: 'تواصل مع عيادة عبد الله للعيون في الإسكندرية',
    },
    description: {
      en: 'Contact Abdalla Eye Clinic in Alexandria. Call, WhatsApp, or visit us at Smouha (Wataneya Medical Center) or Raml Station. Open Sat–Wed, 12PM–9PM.',
      ar: 'تواصل مع عيادة عبد الله للعيون للحجز ومعرفة أرقام الفروع وواتساب والبريد الإلكتروني ومواقع عيادات سموحة ومحطة الرمل في الإسكندرية.',
    },
    appendBrand: false,
  },
  appointments: {
    title: {
      en: 'Book an Eye Appointment | Abdalla Eye Clinic',
      ar: 'احجز موعد كشف عيون | عيادة عبد الله للعيون',
    },
    description: {
      en: 'Book an eye examination at Abdalla Eye Clinic in Alexandria. Choose your branch, service, and preferred appointment date, then confirm by WhatsApp.',
      ar: 'احجز كشف عيون في عيادة عبد الله للعيون بالإسكندرية. اختر الفرع والخدمة والتاريخ المناسب، ثم أكد الحجز عبر واتساب.',
    },
    appendBrand: false,
  },
  faqs: {
    title: {
      en: 'Eye Care FAQs — LASIK, Cataract & Glaucoma Questions Answered',
      ar: 'أسئلة شائعة عن عيادة العيون في الإسكندرية',
    },
    description: {
      en: 'Answers to common questions about LASIK, cataract surgery, glaucoma, IOL implants, and general eye health from the specialists at Abdalla Eye Clinic, Alexandria.',
      ar: 'اعرف إجابات الأسئلة الشائعة عن فحص العين والليزك والمياه البيضاء والجلوكوما والعدسات المزروعة والأعراض والحجز والمتابعة في عيادة عبد الله للعيون.',
    },
    appendBrand: false,
  },
  branches: {
    title: {
      en: 'Abdalla Eye Clinic Branches in Alexandria',
      ar: 'فروع عيادة عبد الله للعيون في الإسكندرية',
    },
    description: {
      en: 'Find Abdalla Eye Clinic branches in Smouha and Raml Station, Alexandria. Choose the nearest branch, view details, and book your eye appointment.',
      ar: 'تعرف على فروع عيادة عبد الله للعيون في سموحة ومحطة الرمل بالإسكندرية، واختر الفرع الأقرب لك لحجز كشف العيون بسهولة.',
    },
    appendBrand: false,
  },
  privacy: {
    title: {
      en: 'Privacy Policy',
      ar: 'سياسة الخصوصية',
    },
    description: {
      en: 'Read how Abdalla Eye Clinic handles website, appointment, and patient contact information.',
      ar: 'اقرأ كيف تتعامل عيادة عبد الله للعيون مع بيانات الموقع والحجز ومعلومات التواصل مع المرضى.',
    },
  },
  terms: {
    title: {
      en: 'Terms and Conditions',
      ar: 'الشروط والأحكام',
    },
    description: {
      en: 'Review the terms and conditions for using the Abdalla Eye Clinic website and online services.',
      ar: 'راجع الشروط والأحكام الخاصة باستخدام موقع عيادة عبد الله للعيون وخدماتها الإلكترونية.',
    },
  },
  dashboard: {
    title: {
      en: 'Blog Admin',
      ar: 'إدارة المدونة',
    },
    description: {
      en: 'Private blog authoring dashboard for Abdalla Eye Clinic.',
      ar: 'لوحة خاصة لإدارة مقالات عيادة عبد الله للعيون.',
    },
  },
};


const dayNames = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
} as const;

export function normalizeLocale(lang: string): Locale {
  return lang === 'ar' ? 'ar' : 'en';
}

export function localizedText(text: LocalizedText, lang: string) {
  return normalizeLocale(lang) === 'ar' ? text.ar : text.en;
}

export function getRouteSeoText(route: RouteSeoKey, lang: string) {
  const routeText = routeSeoText[route];

  return {
    title: localizedText(routeText.title, lang),
    description: localizedText(routeText.description, lang),
  };
}

function localizedOptionalText(text: LocalizedText | string | undefined, lang: string) {
  if (!text) return undefined;

  return typeof text === 'string' ? text : localizedText(text, lang);
}

export function canonicalUrl(lang: string, path = '') {
  const localizedPath = localizedPathname(path);

  return `/${normalizeLocale(lang)}${localizedPath}`;
}

export function clinicNameForLocale(lang: string) {
  return normalizeLocale(lang) === 'ar' ? CLINIC_INFO.nameAr : CLINIC_INFO.name;
}

export function clinicLocationForLocale(lang: string) {
  return normalizeLocale(lang) === 'ar'
    ? `${CLINIC_INFO.cityAr}، ${CLINIC_INFO.countryAr}`
    : `${CLINIC_INFO.city}, ${CLINIC_INFO.country}`;
}

export function localizedPathname(path = '') {
  const pathWithoutQuery = path.split(/[?#]/, 1)[0] || '';
  const normalizedPath = pathWithoutQuery.startsWith('/') ? pathWithoutQuery : `/${pathWithoutQuery}`;
  const withoutLocale = normalizedPath.replace(/^\/(?:en|ar)(?=\/|$)/, '');

  return withoutLocale === '/' ? '' : withoutLocale.replace(/\/$/, '');
}

export function localizedAlternates(path = '') {
  const localizedPath = localizedPathname(path);

  return {
    en: `/en${localizedPath}`,
    ar: `/ar${localizedPath}`,
    'x-default': xDefaultUrl(localizedPath),
  };
}

export function localizedAbsoluteAlternates(siteUrl: string, path = '') {
  return Object.fromEntries(
    Object.entries(localizedAlternates(path)).map(([locale, url]) => [locale, absoluteUrl(siteUrl, url)])
  );
}

export function absoluteCanonicalUrl(lang: string, path = '') {
  return absoluteUrl(CANONICAL_SITE_URL, canonicalUrl(lang, path));
}

function canonicalAlternates(lang: string, path = '') {
  return {
    canonical: absoluteCanonicalUrl(lang, path),
    languages: localizedAbsoluteAlternates(CANONICAL_SITE_URL, path),
  };
}

export function xDefaultUrl(path = '') {
  return `/en${localizedPathname(path)}`;
}

export function openGraphLocale(lang: string) {
  return normalizeLocale(lang) === 'ar' ? 'ar_EG' : 'en_US';
}

export function alternateOpenGraphLocale(lang: string) {
  return normalizeLocale(lang) === 'ar' ? 'en_US' : 'ar_EG';
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripTrailingBrand(title: string, lang: string) {
  const brands = [clinicNameForLocale(lang), CLINIC_INFO.name, CLINIC_INFO.nameAr];

  return brands.reduce((currentTitle, brand) => {
    const trailingBrandPattern = new RegExp(`\\s*(?:\\||-|–|—)\\s*${escapeRegExp(brand)}\\s*$`, 'i');

    return currentTitle.replace(trailingBrandPattern, '').trim();
  }, title.trim());
}

function titleAlreadyIncludesBrand(title: string, lang: string) {
  const normalizedTitle = title.toLocaleLowerCase();
  const brands = [clinicNameForLocale(lang), CLINIC_INFO.name, CLINIC_INFO.nameAr];

  return brands.some((brand) => normalizedTitle.includes(brand.toLocaleLowerCase()));
}

export function titleWithBrand(title: string, lang: string) {
  const strippedTitle = stripTrailingBrand(title, lang);
  const brand = clinicNameForLocale(lang);

  if (!strippedTitle) return brand;
  if (titleAlreadyIncludesBrand(strippedTitle, lang)) return strippedTitle;

  return `${strippedTitle} ${TITLE_SEPARATOR} ${brand}`;
}

function resolveRouteText({
  lang,
  route,
  title,
  description,
}: {
  lang: string;
  route?: RouteSeoKey;
  title?: LocalizedText;
  description?: LocalizedText;
}) {
  if (route) {
    const routeText = routeSeoText[route];

    return {
      ...getRouteSeoText(route, lang),
      appendBrand: routeText.appendBrand,
    };
  }

  return {
    title: localizedText(title as LocalizedText, lang),
    description: localizedText(description as LocalizedText, lang),
    appendBrand: undefined,
  };
}

function createBaseMetadata({
  lang,
  path,
  title,
  description,
  image,
  imageAlt,
  appendBrand = true,
}: PageMetadataInput): Metadata {
  const fullTitle = appendBrand ? titleWithBrand(title, lang) : title;
  const siteName = clinicNameForLocale(lang);
  const resolvedImage = image ?? ogImageUrl(fullTitle);
  const resolvedImageAlt = imageAlt ?? fullTitle;

  return {
    metadataBase: new URL(CANONICAL_SITE_URL),
    title: fullTitle,
    description,
    alternates: canonicalAlternates(lang, path),
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteCanonicalUrl(lang, path),
      siteName,
      locale: openGraphLocale(lang),
      alternateLocale: [alternateOpenGraphLocale(lang)],
      type: 'website',
      images: [
        {
          url: resolvedImage,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [
        {
          url: resolvedImage,
          alt: resolvedImageAlt,
        },
      ],
    },
  };
}

export function createRouteMetadata({
  lang,
  path,
  route,
  title,
  description,
  image,
  imageAlt,
}: {
  lang: string;
  path: string;
  route?: RouteSeoKey;
  title?: LocalizedText;
  description?: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText | string;
}): Metadata {
  const text = resolveRouteText({ lang, route, title, description });

  return createBaseMetadata({
    lang,
    path,
    title: text.title,
    description: text.description,
    image,
    imageAlt: localizedOptionalText(imageAlt, lang),
    appendBrand: text.appendBrand,
  });
}

export function createArticleMetadata({
  lang,
  path,
  title,
  description,
  image,
  imageAlt,
  publishedTime,
  authors,
}: PageMetadataInput & {
  imageAlt?: string;
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const fullTitle = titleWithBrand(title, lang);
  const siteName = clinicNameForLocale(lang);
  const resolvedImage = image ?? ogImageUrl(fullTitle);

  return {
    metadataBase: new URL(CANONICAL_SITE_URL),
    title: fullTitle,
    description,
    alternates: canonicalAlternates(lang, path),
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteCanonicalUrl(lang, path),
      siteName,
      locale: openGraphLocale(lang),
      alternateLocale: [alternateOpenGraphLocale(lang)],
      type: 'article',
      publishedTime,
      authors,
      images: [
        {
          url: resolvedImage,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [
        {
          url: resolvedImage,
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
  };
}

export function createNoindexRouteMetadata({
  lang,
  path,
  route,
  title,
  description,
  image,
  imageAlt,
}: {
  lang: string;
  path: string;
  route?: RouteSeoKey;
  title?: LocalizedText;
  description?: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText | string;
}): Metadata {
  return {
    ...createRouteMetadata({ lang, path, route, title, description, image, imageAlt }),
    robots: NOINDEX_ROBOTS,
  };
}

export function createRootMetadata({
  lang,
  siteUrl,
  verification,
}: {
  lang: string;
  siteUrl: string;
  verification?: VerificationTokens;
}): Metadata {
  const locale = normalizeLocale(lang);
  const title = titleWithBrand(localizedText(rootSeoText.title, locale), locale);
  const description = localizedText(rootSeoText.description, locale);
  const image = ogImageUrl(title);
  const imageAlt = title;

  return {
    metadataBase: new URL(CANONICAL_SITE_URL),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: localizedKeywords[locale],
    alternates: canonicalAlternates(locale),
    verification: {
      ...(verification?.google ? { google: verification.google } : {}),
      ...(verification?.bing ? { other: { 'msvalidate.01': verification.bing } } : {}),
    },
    openGraph: {
      title,
      description,
      url: absoluteCanonicalUrl(locale),
      siteName: clinicNameForLocale(locale),
      locale: openGraphLocale(locale),
      alternateLocale: [alternateOpenGraphLocale(locale)],
      type: 'website',
      images: [
        {
          url: image,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    robots: INDEXABLE_ROBOTS,
    icons: {
      icon: [
        { url: '/navicon.ico', type: 'image/x-icon' },
        { url: '/favicon.ico', type: 'image/x-icon' },
      ],
      shortcut: '/navicon.ico',
      apple: '/assets/images/abdalla-eye-emblem.png',
    },
    other: {
      language: locale === 'ar' ? 'Arabic' : 'English',
      'content-language': locale,
      'geo.region': 'EG-ALX',
      'geo.placename': `${CLINIC_INFO.city}, ${CLINIC_INFO.country}`,
      distribution: 'global',
      rating: 'general',
      image: `${siteUrl}${image}`,
    },
  };
}

export function absoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString();
}

function validSocialProfileUrl(url: string | undefined) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    const isSocialHost = ['facebook.com', 'www.facebook.com', 'instagram.com', 'www.instagram.com'].includes(hostname);

    return isSocialHost ? parsedUrl.toString() : null;
  } catch {
    return null;
  }
}

function branchMapUrl(branch: ClinicBranch) {
  return branch.googleMapsPlaceUrl ?? branch.mapUrl;
}

function branchGeo(branch: ClinicBranch) {
  if (branch.geo.latitude === null || branch.geo.longitude === null) {
    return null;
  }

  const latitude = Number(branch.geo.latitude);
  const longitude = Number(branch.geo.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    '@type': 'GeoCoordinates',
    latitude,
    longitude,
  };
}

function openingHoursSpecification() {
  return Object.entries(CLINIC_INFO.workingHours)
    .filter(([, slot]) => !slot.isClosed)
    .map(([day, slot]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayNames[day as keyof typeof dayNames],
      opens: slot.open,
      closes: slot.close,
    }));
}

function buildAvailableServices(services: LocalizedService[], siteUrl: string) {
  return services.map((service) => ({
    '@type': 'MedicalProcedure',
    '@id': `${siteUrl}/#${service.id}`,
    name: service.name,
    description: service.description,
    medicalSpecialty: 'Ophthalmology',
  }));
}

function buildPhysicianNodes({
  doctors,
  branchNodes,
  locale,
  siteUrl,
}: {
  doctors: LocalizedDoctor[];
  branchNodes: StructuredData[];
  locale: string;
  siteUrl: string;
}) {
  return doctors.map((doctor) => ({
    '@type': 'Physician',
    '@id': `${siteUrl}/#${doctor.id}`,
    name: doctor.name,
    url: absoluteUrl(siteUrl, canonicalUrl(locale, '/doctors')),
    jobTitle: doctor.specialty,
    description: doctor.bio,
    image: absoluteUrl(siteUrl, doctor.image),
    medicalSpecialty: 'Ophthalmology',
    worksFor: { '@id': `${siteUrl}/#clinic` },
    worksLocation: branchNodes.map((branch) => ({ '@id': branch['@id'] })),
    knowsLanguage: doctor.languages,
  }));
}

export function buildMedicalClinicSchema(locale: string, siteUrl: string): StructuredData {
  const isArabic = normalizeLocale(locale) === 'ar';
  const clinicName = isArabic ? CLINIC_INFO.nameAr : CLINIC_INFO.name;
  const description = isArabic ? CLINIC_INFO.descriptionAr : CLINIC_INFO.description;
  const doctors = getLocalizedDoctors(locale);
  const services = getLocalizedServices(locale);
  const sameAs = [
    validSocialProfileUrl(CLINIC_INFO.socialMedia.facebook),
    validSocialProfileUrl(CLINIC_INFO.socialMedia.instagram),
  ].filter((url): url is string => Boolean(url));
  const openingHours = openingHoursSpecification();
  const availableService = buildAvailableServices(services, siteUrl);
  const branchNodes = CLINIC_BRANCHES.map((branch, index) => {
    const geo = branchGeo(branch);

    return {
      '@type': ['MedicalClinic', 'MedicalBusiness', 'LocalBusiness'],
      '@id': `${siteUrl}/#branch-${index + 1}`,
      name: branchDisplayName(branch, locale),
      parentOrganization: { '@id': `${siteUrl}/#clinic` },
      url: absoluteUrl(siteUrl, canonicalUrl(locale, '/contact')),
      telephone: branch.phone,
      priceRange: '$$',
      hasMap: branchMapUrl(branch),
      address: {
        '@type': 'PostalAddress',
        streetAddress: isArabic ? branch.addressAr : branch.address,
        addressLocality: CLINIC_INFO.city,
        postalCode: CLINIC_INFO.postalCode,
        addressCountry: CLINIC_INFO.countryCode,
      },
      ...(geo ? { geo } : {}),
      openingHoursSpecification: openingHours,
      medicalSpecialty: 'Ophthalmology',
      availableService: availableService.map((service) => ({ '@id': service['@id'] })),
    };
  });
  const physicianNodes = buildPhysicianNodes({ doctors, branchNodes, locale, siteUrl });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: clinicName,
        url: siteUrl,
        inLanguage: normalizeLocale(locale),
        publisher: { '@id': `${siteUrl}/#clinic` },
      },
      {
        '@type': ['MedicalClinic', 'MedicalBusiness', 'LocalBusiness'],
        '@id': `${siteUrl}/#clinic`,
        name: clinicName,
        alternateName: isArabic ? CLINIC_INFO.name : CLINIC_INFO.nameAr,
        description,
        url: siteUrl,
        logo: absoluteUrl(siteUrl, '/assets/images/abdalla-eye-emblem.png'),
        image: [
          absoluteUrl(siteUrl, DEFAULT_OG_IMAGE),
          absoluteUrl(siteUrl, '/assets/images/abdalla-eye-emblem.png'),
          absoluteUrl(siteUrl, '/assets/images/dr-mohamed-hossam-abdalla-card.webp'),
          absoluteUrl(siteUrl, '/assets/images/prof-ahmed-hossam-abdalla-card.webp'),
        ],
        telephone: CLINIC_INFO.phone,
        email: CLINIC_INFO.email,
        priceRange: '$$',
        hasMap: branchNodes.map((branch) => branch.hasMap).filter(Boolean),
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC_BRANCHES[0].address,
          addressLocality: CLINIC_INFO.city,
          postalCode: CLINIC_INFO.postalCode,
          addressCountry: CLINIC_INFO.countryCode,
        },
        areaServed: [
          { '@type': 'City', name: 'Alexandria' },
          { '@type': 'Country', name: 'Egypt' },
        ],
        medicalSpecialty: 'Ophthalmology',
        openingHoursSpecification: openingHours,
        ...(sameAs.length ? { sameAs } : {}),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: CLINIC_INFO.phone,
            contactType: 'appointments',
            areaServed: 'EG',
            availableLanguage: ['Arabic', 'English'],
          },
          ...(CLINIC_INFO.socialMedia.whatsapp
            ? [
                {
                  '@type': 'ContactPoint',
                  telephone: phoneHref(CLINIC_INFO.socialMedia.whatsapp),
                  contactType: 'WhatsApp appointments',
                  areaServed: 'EG',
                  availableLanguage: ['Arabic', 'English'],
                },
              ]
            : []),
        ],
        department: branchNodes.map((branch) => ({ '@id': branch['@id'] })),
        employee: physicianNodes.map((doctor) => ({ '@id': doctor['@id'] })),
        availableService: availableService.map((service) => ({ '@id': service['@id'] })),
        makesOffer: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@id': `${siteUrl}/#${service.id}`,
          },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isArabic ? 'خدمات عيادة العيون' : 'Eye clinic services',
          itemListElement: services.map((service, index) => ({
            '@type': 'OfferCatalog',
            position: index + 1,
            name: service.name,
            description: service.description,
          })),
        },
      },
      ...branchNodes,
      ...physicianNodes,
      ...availableService,
    ],
  };
}

export function buildFAQPageSchema({
  faqs,
  locale,
  siteUrl,
  path,
}: {
  faqs: FAQ[];
  locale: string;
  siteUrl: string;
  path: string;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(siteUrl, canonicalUrl(locale, path))}#faq`,
    url: absoluteUrl(siteUrl, canonicalUrl(locale, path)),
    inLanguage: normalizeLocale(locale),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema({
  locale,
  siteUrl,
  items,
}: {
  locale: string;
  siteUrl: string;
  items: Array<{ name: string; path: string }>;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(siteUrl, canonicalUrl(locale, item.path)),
    })),
  };
}

export function serializeStructuredData(data: StructuredData) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
