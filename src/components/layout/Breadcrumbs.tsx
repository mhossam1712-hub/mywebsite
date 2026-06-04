'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteUrl } from '@/lib/site-url';
import { classNames } from '@/utils';

type Locale = 'en' | 'ar';

type BreadcrumbItem = {
  name: string;
  href: string;
};

const localizedLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    doctors: 'Doctors',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    faqs: 'FAQs',
    branches: 'Branches',
    smouha: 'Smouha',
    'raml-station': 'Raml Station',
    lasik: 'LASIK Surgery',
    'cataract-surgery': 'Cataract Surgery',
    glaucoma: 'Glaucoma',
    retina: 'Retina',
    'dry-eye': 'Dry Eye',
    'online-eye-tests': 'Online Eye Tests',
    'eye-tests': 'Online Eye Tests',
    appointments: 'Appointments',
    dashboard: 'Dashboard',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    doctors: 'الأطباء',
    about: 'عن العيادة',
    contact: 'اتصل بنا',
    blog: 'المدونة',
    faqs: 'الأسئلة الشائعة',
    branches: 'الفروع',
    smouha: 'سموحة',
    'raml-station': 'محطة الرمل',
    lasik: 'جراحة الليزك',
    'cataract-surgery': 'جراحة المياه البيضاء',
    glaucoma: 'علاج الجلوكوما',
    retina: 'علاج الشبكية',
    'dry-eye': 'علاج جفاف العين',
    'online-eye-tests': 'اختبارات النظر على الإنترنت',
    'eye-tests': 'اختبارات النظر على الإنترنت',
    appointments: 'حجز موعد',
    dashboard: 'لوحة التحكم',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
  },
};

function toTitleCase(slug: string) {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getLocaleFromSegments(segments: string[]): Locale {
  return segments[0] === 'ar' ? 'ar' : 'en';
}

function getHrefForSegment(segment: string, locale: Locale, defaultHref: string) {
  if (segment === 'branches') {
    return `/${locale}/contact`;
  }

  return defaultHref;
}

function getBreadcrumbItems(pathname: string): { locale: Locale; items: BreadcrumbItem[] } {
  const segments = pathname.split('/').filter(Boolean);
  const locale = getLocaleFromSegments(segments);
  const pathSegments = segments[0] === 'en' || segments[0] === 'ar' ? segments.slice(1) : segments;
  const labels = localizedLabels[locale];
  const localeRoot = `/${locale}`;
  const items: BreadcrumbItem[] = [
    {
      name: labels.home,
      href: localeRoot,
    },
  ];

  pathSegments.forEach((segment, index) => {
    const defaultHref = `${localeRoot}/${pathSegments.slice(0, index + 1).join('/')}`;

    items.push({
      name: labels[segment] ?? toTitleCase(segment),
      href: getHrefForSegment(segment, locale, defaultHref),
    });
  });

  return { locale, items };
}

function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}

export function Breadcrumbs() {
  const pathname = usePathname() || '/en';
  const { locale, items } = getBreadcrumbItems(pathname);
  const isArabic = locale === 'ar';
  const schema = buildBreadcrumbSchema(items);

  return (
    <div className="border-b border-cyan-100 bg-white/90 dark:border-cyan-900/70 dark:bg-slate-950/90">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <nav
        aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'}
        dir={isArabic ? 'rtl' : 'ltr'}
        className="mx-auto max-w-7xl px-4 py-3 text-sm"
      >
        <ol className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-300">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={classNames(
                      'h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300',
                      isArabic && 'rotate-180'
                    )}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.22 15.78a.75.75 0 0 1 0-1.06L11.94 10 7.22 5.28a.75.75 0 0 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}

                {isLast ? (
                  <span aria-current="page" className="font-bold text-slate-950 dark:text-white">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="font-semibold text-cyan-800 transition-colors hover:text-cyan-950 dark:text-cyan-200 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
