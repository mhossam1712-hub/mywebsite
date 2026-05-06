'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { ThemeToggle } from '../common/ThemeToggle';
import { CLINIC_INFO } from '@/constants';

const phoneHref = (phone: string) => phone.replace(/\D/g, '');

const actionLinkClasses =
  'inline-flex items-center justify-center rounded-lg font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950';

const primaryActionClasses =
  `${actionLinkClasses} bg-cyan-700 text-white shadow-glow hover:bg-cyan-800 focus:ring-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500`;

const secondaryActionClasses =
  `${actionLinkClasses} border border-cyan-200 bg-white/85 text-cyan-900 shadow-elegant backdrop-blur hover:bg-cyan-50 focus:ring-cyan-400 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-100 dark:hover:bg-cyan-900/60`;

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDetailsElement>(null);

  const targetLocale = locale === 'ar' ? 'en' : 'ar';
  const localeLabel = locale === 'ar' ? 'EN' : 'AR';
  const localeHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${targetLocale}`);
  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  };

  return (
    <header className="sticky top-0 z-[100] isolate border-b border-white/70 bg-white/86 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-colors duration-300 dark:border-cyan-800/35 dark:bg-slate-950/94 dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)]">
      <div className="relative z-[110] mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-cyan-100 bg-white shadow-[0_14px_30px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset] transition-transform duration-200 hover:-rotate-3 hover:scale-[1.03] dark:border-cyan-800/60 dark:bg-slate-950 sm:h-11 sm:w-11">
            <Image
              src="/assets/images/abdalla-eye-emblem-64.png"
              alt="Abdalla Eye Clinic eye logo"
              fill
              sizes="44px"
              quality={70}
              className="object-contain p-1"
            />
          </div>
          <span className="text-lg font-bold text-slate-950 dark:text-white sm:text-xl">Abdalla Eye Clinic</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* CTA Buttons & Theme Toggle */}
        <div className="hidden md:flex gap-4 items-center">
          <ThemeToggle />
          <Link
            href={localeHref}
            hrefLang={targetLocale}
            className="inline-flex h-9 min-w-12 items-center justify-center rounded-lg border border-cyan-200 bg-white/85 px-3 text-sm font-bold text-cyan-900 shadow-[0_10px_24px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-50 dark:border-cyan-800/70 dark:bg-cyan-950/45 dark:text-cyan-50 dark:shadow-[0_14px_28px_-20px_rgba(34,211,238,0.65),0_1px_0_rgba(255,255,255,0.1)_inset] dark:hover:bg-cyan-900/70"
            aria-label={`Switch language to ${targetLocale === 'ar' ? 'Arabic' : 'English'}`}
          >
            {localeLabel}
          </Link>
          <a href={`tel:${phoneHref(CLINIC_INFO.phone)}`} className={`${secondaryActionClasses} px-3 py-1.5 text-sm`}>
            {t('common.call')}
          </a>
          <Link href={`/${locale}/appointments`} className={`${primaryActionClasses} px-3 py-1.5 text-sm`}>
            {t('appointment.title')}
          </Link>
        </div>

        {/* Mobile Menu */}
        <details ref={mobileMenuRef} className="group md:hidden">
          <summary
            className="relative z-[120] inline-flex h-12 w-12 touch-manipulation select-none list-none items-center justify-center rounded-lg border border-cyan-100 bg-white/90 text-slate-900 shadow-sm transition-colors hover:bg-cyan-50 active:bg-cyan-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
            aria-controls="mobile-navigation"
          >
            <svg className="h-6 w-6 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg className="hidden h-6 w-6 group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
            </svg>
          </summary>
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-[105] max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-cyan-100 bg-white/[0.98] px-3 py-4 shadow-elegant backdrop-blur-xl dark:border-cyan-800/45 dark:bg-slate-950/[0.98] sm:px-4"
          >
            <Navigation onNavigate={closeMobileMenu} />
            <div className="mt-4 flex flex-col gap-2">
              <div className="mb-4 flex items-center justify-between gap-3">
                <ThemeToggle onToggle={closeMobileMenu} />
                <Link
                  href={localeHref}
                  hrefLang={targetLocale}
                  onClick={closeMobileMenu}
                  className="inline-flex h-10 min-w-14 items-center justify-center rounded-lg border border-cyan-200 bg-white px-3 text-sm font-bold text-cyan-900 shadow-sm transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-50 dark:hover:bg-cyan-900/70"
                  aria-label={`Switch language to ${targetLocale === 'ar' ? 'Arabic' : 'English'}`}
                >
                  {localeLabel}
                </Link>
              </div>
              <a href={`tel:${phoneHref(CLINIC_INFO.phone)}`} onClick={closeMobileMenu} className={`${secondaryActionClasses} w-full px-4 py-2 text-base`}>
                {t('common.call')}
              </a>
              <Link href={`/${locale}/appointments`} onClick={closeMobileMenu} className={`${primaryActionClasses} w-full px-4 py-2 text-base`}>
                {t('appointment.title')}
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
};
