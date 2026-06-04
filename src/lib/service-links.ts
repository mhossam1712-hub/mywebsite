import { getLocalizedServices } from '@/utils/localized-content';

export const DEDICATED_SERVICE_SLUGS = [
  'lasik',
  'cataract-surgery',
  'glaucoma',
  'retina',
  'dry-eye',
  'online-eye-tests',
] as const;

type DedicatedServiceSlug = (typeof DEDICATED_SERVICE_SLUGS)[number];
type LocalizedService = ReturnType<typeof getLocalizedServices>[number];

const dedicatedServiceSlugSet = new Set<string>(DEDICATED_SERVICE_SLUGS);

export function serviceLocale(locale: string) {
  return locale === 'ar' ? 'ar' : 'en';
}

export function isDedicatedServiceSlug(slug: string | undefined): slug is DedicatedServiceSlug {
  return Boolean(slug && dedicatedServiceSlugSet.has(slug));
}

export function serviceHref(locale: string, service: Pick<LocalizedService, 'id' | 'slug'>) {
  const normalizedLocale = serviceLocale(locale);

  if (isDedicatedServiceSlug(service.slug)) {
    return `/${normalizedLocale}/services/${service.slug}`;
  }

  return `/${normalizedLocale}/appointments?serviceId=${encodeURIComponent(service.id)}`;
}

export function getDedicatedServiceLinks(locale: string) {
  const normalizedLocale = serviceLocale(locale);
  const servicesBySlug = new Map(
    getLocalizedServices(normalizedLocale).map((service) => [service.slug, service])
  );

  return DEDICATED_SERVICE_SLUGS.map((slug) => {
    const service = servicesBySlug.get(slug);

    return {
      slug,
      href: `/${normalizedLocale}/services/${slug}`,
      id: service?.id ?? slug,
      label: service?.name ?? slug,
      description: service?.description ?? '',
      icon: service?.icon ?? 'eye-exam',
    };
  });
}

export function serviceLinksHeading(locale: string) {
  return serviceLocale(locale) === 'ar' ? 'خدمات متخصصة' : 'Specialized Services';
}

export function serviceLearnMoreLabel(locale: string) {
  return serviceLocale(locale) === 'ar' ? 'اقرأ المزيد' : 'Learn more';
}

export function serviceDetailsLabel(locale: string) {
  return serviceLocale(locale) === 'ar' ? 'تفاصيل الخدمة' : 'Service details';
}

export function allServicesLabel(locale: string) {
  return serviceLocale(locale) === 'ar' ? 'كل خدمات العيون' : 'All eye care services';
}

export function serviceNavigationLabel(locale: string) {
  return serviceLocale(locale) === 'ar' ? 'روابط الخدمات المتخصصة' : 'Specialized service links';
}
