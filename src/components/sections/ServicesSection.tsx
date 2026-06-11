import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  allServicesLabel,
  getDedicatedServiceLinks,
  serviceLinksHeading,
  serviceNavigationLabel,
} from '@/lib/service-links';
import { getSectionText } from '@/utils/localized-content';

type SectionProps = {
  locale: string;
};

export const ServicesSection = async ({ locale }: SectionProps) => {
  const t = await getTranslations({ locale, namespace: 'services' });
  const serviceLinks = getDedicatedServiceLinks(locale);
  const isArabic = locale === 'ar';

  return (
    <section className="section-shell bg-medical-50 px-3 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{getSectionText('servicesEyebrow', locale)}</span>
          <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <nav
          aria-label={serviceNavigationLabel(locale)}
          className="rounded-lg border border-cyan-100 bg-white/85 p-3 shadow-sm dark:border-cyan-900/70 dark:bg-slate-900/70"
        >
          <div className={`flex flex-col gap-3 md:flex-row md:items-center ${isArabic ? 'md:text-right' : ''}`}>
            <p className="shrink-0 text-xs font-black uppercase tracking-[0.14em] text-cyan-900 dark:text-cyan-100">
              {serviceLinksHeading(locale)}
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 md:flex-wrap md:overflow-visible md:pb-0">
              {serviceLinks.map((service) => (
                <Link
                  key={service.slug}
                  href={service.href}
                  className="shrink-0 rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm font-bold text-cyan-950 transition-colors hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                >
                  {service.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/services`}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-cyan-950/50"
              >
                {allServicesLabel(locale)}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
