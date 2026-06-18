import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ThemeToggle } from '../common/ThemeToggle';
import { CLINIC_BRANCHES, CLINIC_INFO, NAVIGATION_ITEMS } from '@/constants';
import { branchAreaName, clinicDisplayName, phoneHref } from '@/lib/clinic';
import { getDedicatedServiceLinks, serviceLinksHeading, serviceNavigationLabel } from '@/lib/service-links';
import { classNames } from '@/utils';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';

const actionLinkClasses =
  'inline-flex items-center justify-center rounded-lg font-semibold shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-200 motion-safe:md:hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950';

const primaryActionClasses =
  `${actionLinkClasses} bg-cyan-700 text-white shadow-glow hover:bg-cyan-800 focus:ring-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500`;

const secondaryActionClasses =
  `${actionLinkClasses} border border-cyan-200 bg-white text-cyan-950 md:shadow-elegant hover:bg-cyan-50 focus:ring-cyan-400 dark:border-cyan-700 dark:bg-slate-900 dark:text-cyan-50 dark:hover:bg-cyan-950`;

const desktopLanguageToggleClasses =
  'inline-flex h-9 min-w-12 items-center justify-center rounded-lg border border-cyan-200 bg-white px-3 text-sm font-bold text-cyan-950 shadow-[0_10px_24px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset] motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-cyan-50 dark:border-cyan-700 dark:bg-slate-900 dark:text-cyan-50 dark:shadow-[0_14px_28px_-20px_rgba(34,211,238,0.65),0_1px_0_rgba(255,255,255,0.1)_inset] dark:hover:bg-cyan-950';

const mobileLanguageToggleClasses =
  'inline-flex h-10 min-w-14 items-center justify-center rounded-lg border border-cyan-200 bg-white px-3 text-sm font-bold text-cyan-900 shadow-sm transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-50 dark:hover:bg-cyan-900/70';

type HeaderProps = {
  locale: string;
};

export const Header = async ({ locale }: HeaderProps) => {
  const t = await getTranslations({ locale });
  const navigationT = await getTranslations({ locale, namespace: 'navigation' });
  const callLabel = t('common.call');
  const appointmentLabel = t('appointment.title');
  const phone = phoneHref(CLINIC_INFO.phone);
  const clinicName = clinicDisplayName(locale);
  const serviceLinks = getDedicatedServiceLinks(locale);
  const serviceHeading = serviceLinksHeading(locale);
  const serviceNavLabel = serviceNavigationLabel(locale);
  const branchesLabel = locale === 'ar' ? 'الفروع' : 'Branches';
  const openMenuLabel = locale === 'ar' ? 'افتح القائمة' : 'Open menu';
  const navItems = NAVIGATION_ITEMS.map((item) => ({
    href: item.href,
    label: navigationT(item.label),
  }));
  const branchLinks = CLINIC_BRANCHES.map((branch) => ({
    href: `/${locale}/branches/${branch.slug}`,
    label: branchAreaName(branch, locale),
    slug: branch.slug,
  }));

  return (
    <header className="sticky top-0 z-[100] isolate border-b border-cyan-100 bg-white shadow-md dark:border-cyan-800/70 dark:bg-slate-950 dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)]">
      <div className="relative z-[110] mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-cyan-100 bg-white shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-200 motion-safe:md:hover:-rotate-3 motion-safe:md:hover:scale-[1.03] dark:border-cyan-800/60 dark:bg-slate-950 sm:h-11 sm:w-11 md:shadow-[0_14px_30px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset]">
            <Image
              src="/assets/images/abdalla-eye-emblem-64.png"
              alt={`${clinicName} eye logo`}
              fill
              sizes="44px"
              quality={70}
              className="object-contain p-1"
            />
          </div>
          <span className="text-lg font-bold text-slate-950 dark:text-white sm:text-xl">
            {clinicName}
          </span>
        </Link>

        <div className="hidden md:block">
          <nav className="flex flex-col gap-2 md:flex-row md:gap-1.5">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  className={classNames(
                    'nav-link-creative block rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-extrabold text-slate-950 shadow-sm motion-safe:transition-colors motion-safe:duration-200 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-950 active:translate-y-0 dark:border-cyan-900/70 dark:bg-slate-900 dark:text-cyan-50 dark:hover:border-cyan-700 dark:hover:bg-cyan-950'
                  )}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="group relative">
              <button
                type="button"
                className={classNames(
                  'nav-link-creative flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-extrabold text-slate-950 shadow-sm motion-safe:transition-colors motion-safe:duration-200 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-950 active:translate-y-0 dark:border-cyan-900/70 dark:bg-slate-900 dark:text-cyan-50 dark:hover:border-cyan-700 dark:hover:bg-cyan-950'
                )}
                aria-haspopup="true"
              >
                <span>{branchesLabel}</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="invisible absolute start-0 top-full z-[130] mt-2 min-w-52 translate-y-1 rounded-lg border border-cyan-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-cyan-900/70 dark:bg-slate-950">
                {branchLinks.map((branch) => (
                  <Link
                    key={branch.slug}
                    href={branch.href}
                    className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-800 transition-colors hover:bg-cyan-50 hover:text-cyan-900 dark:text-cyan-50 dark:hover:bg-cyan-950"
                  >
                    {branch.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <ThemeToggle />
          <LanguageToggle locale={locale} className={desktopLanguageToggleClasses} />
          {/* TODO(meta-pixel): Header is a Server Component. To fire trackEvent('Contact')
              on this tel: click, extract it into a small 'use client' wrapper. */}
          <a href={`tel:${phone}`} className={`${secondaryActionClasses} px-3 py-1.5 text-sm`}>
            {callLabel}
          </a>
          <Link href={`/${locale}/appointments`} className={`${primaryActionClasses} px-3 py-1.5 text-sm`}>
            {appointmentLabel}
          </Link>
        </div>

        <MobileMenu
          locale={locale}
          navItems={navItems}
          serviceLinks={serviceLinks}
          serviceHeading={serviceHeading}
          branchLinks={branchLinks}
          branchHeading={branchesLabel}
          menuLabel={openMenuLabel}
          callLabel={callLabel}
          appointmentLabel={appointmentLabel}
          phoneHref={phone}
          primaryActionClasses={primaryActionClasses}
          secondaryActionClasses={secondaryActionClasses}
          languageToggleClassName={mobileLanguageToggleClasses}
        />
      </div>
      <div className="hidden border-t border-cyan-100 bg-cyan-50/80 dark:border-cyan-900/70 dark:bg-slate-900/80 lg:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto scrollbar-hide px-4 py-2" aria-label={serviceNavLabel}>
          <span className="shrink-0 text-xs font-black uppercase tracking-[0.14em] text-cyan-900 dark:text-cyan-100">
            {serviceHeading}
          </span>
          {serviceLinks.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 transition-colors hover:bg-white hover:text-cyan-900 dark:text-cyan-50 dark:hover:bg-cyan-950/70 dark:hover:text-white"
            >
              {service.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
