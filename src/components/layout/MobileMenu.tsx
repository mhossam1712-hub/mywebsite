'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { classNames } from '@/utils';

type NavItem = {
  href: string;
  label: string;
};

type ServiceLink = {
  href: string;
  label: string;
  slug: string;
};

type BranchLink = {
  href: string;
  label: string;
  slug: string;
};

type MobileMenuProps = {
  locale: string;
  navItems: NavItem[];
  serviceLinks: ServiceLink[];
  serviceHeading: string;
  branchLinks: BranchLink[];
  branchHeading: string;
  menuLabel: string;
  callLabel: string;
  appointmentLabel: string;
  phoneHref: string;
  primaryActionClasses: string;
  secondaryActionClasses: string;
  languageToggleClassName: string;
};

export function MobileMenu({
  locale,
  navItems,
  serviceLinks,
  serviceHeading,
  branchLinks,
  branchHeading,
  menuLabel,
  callLabel,
  appointmentLabel,
  phoneHref,
  primaryActionClasses,
  secondaryActionClasses,
  languageToggleClassName,
}: MobileMenuProps) {
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  };

  return (
    <details ref={mobileMenuRef} className="group md:hidden">
      <summary
        className="relative z-[120] inline-flex h-12 w-12 touch-manipulation select-none list-none items-center justify-center rounded-lg border border-cyan-100 bg-white/90 text-slate-900 shadow-sm transition-colors hover:bg-cyan-50 active:bg-cyan-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 [&::-webkit-details-marker]:hidden"
        aria-label={menuLabel}
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
        className="absolute inset-x-0 top-full z-[105] max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-cyan-100 bg-white/[0.98] px-3 py-4 shadow-md dark:border-cyan-800/45 dark:bg-slate-950/[0.98] sm:px-4"
      >
        <nav className="flex flex-col gap-2 md:flex-row md:gap-2">
          {navItems.map((item) => {
            const fullPath = `/${locale}${item.href}`;
            const isActive = pathname === fullPath || pathname.endsWith(item.href);

            return (
              <div key={item.href}>
                <Link
                  href={fullPath}
                  onClick={closeMobileMenu}
                  className={classNames(
                    'nav-link-creative block rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                    isActive
                      ? 'bg-cyan-50 text-cyan-900 shadow-[0_10px_24px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset] dark:bg-cyan-400/16 dark:text-cyan-50 dark:shadow-[0_14px_28px_-20px_rgba(34,211,238,0.85),0_1px_0_rgba(255,255,255,0.12)_inset]'
                      : 'text-slate-700 hover:bg-white/80 hover:text-cyan-900 hover:shadow-[0_10px_24px_-20px_rgba(15,23,42,0.5),0_1px_0_rgba(255,255,255,0.85)_inset] dark:text-slate-100 dark:hover:bg-cyan-400/12 dark:hover:text-white dark:hover:shadow-[0_14px_28px_-22px_rgba(34,211,238,0.7),0_1px_0_rgba(255,255,255,0.1)_inset]'
                  )}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50/70 p-3 dark:border-cyan-900/70 dark:bg-cyan-950/30">
          <p className="px-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-900 dark:text-cyan-100">
            {serviceHeading}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {serviceLinks.map((service) => {
              const isActive = pathname === service.href;

              return (
                <Link
                  key={service.slug}
                  href={service.href}
                  onClick={closeMobileMenu}
                  className={classNames(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-cyan-700 text-white'
                      : 'bg-white text-slate-800 hover:bg-cyan-100 dark:bg-slate-900 dark:text-cyan-50 dark:hover:bg-cyan-900'
                  )}
                >
                  {service.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-cyan-100 bg-white/80 p-3 dark:border-cyan-900/70 dark:bg-slate-900/80">
          <p className="px-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-900 dark:text-cyan-100">
            {branchHeading}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {branchLinks.map((branch) => {
              const isActive = pathname === branch.href;

              return (
                <Link
                  key={branch.slug}
                  href={branch.href}
                  onClick={closeMobileMenu}
                  className={classNames(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-cyan-700 text-white'
                      : 'bg-cyan-50 text-slate-800 hover:bg-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900'
                  )}
                >
                  {branch.label}
                </Link>
              );
            })}
          </div>
          <Link
            href={`/${locale}/branches`}
            onClick={closeMobileMenu}
            className="mt-2 block rounded-lg px-3 py-2 text-sm font-bold text-cyan-700 transition-colors hover:bg-cyan-50 dark:text-cyan-300 dark:hover:bg-cyan-950/50"
          >
            {locale === 'ar' ? 'جميع الفروع ←' : 'All Branches →'}
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <ThemeToggle onToggle={closeMobileMenu} />
            <LanguageToggle locale={locale} onNavigate={closeMobileMenu} className={languageToggleClassName} />
          </div>
          <a href={`tel:${phoneHref}`} onClick={closeMobileMenu} className={`${secondaryActionClasses} w-full px-4 py-2 text-base`}>
            {callLabel}
          </a>
          <Link href={`/${locale}/appointments`} onClick={closeMobileMenu} className={`${primaryActionClasses} w-full px-4 py-2 text-base`}>
            {appointmentLabel}
          </Link>
        </div>
      </div>
    </details>
  );
}
