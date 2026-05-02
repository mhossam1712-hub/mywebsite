'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { classNames } from '@/utils';

type NavigationProps = {
  onNavigate?: () => void;
};

export const Navigation = ({ onNavigate }: NavigationProps) => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  
  // Extract locale from pathname (e.g., '/en/services' -> 'en')
  const locale = pathname.split('/')[1];

  const navItems = [
    { href: '/', label: 'home' },
    { href: '/services', label: 'services' },
    { href: '/doctors', label: 'doctors' },
    { href: '/eye-tests', label: 'eye_tests' },
    { href: '/about', label: 'about' },
    { href: '/blog', label: 'blog' },
    { href: '/contact', label: 'contact' },
    { href: '/faqs', label: 'faqs' },
  ];

  return (
    <nav className="flex flex-col gap-2 md:flex-row md:gap-2">
      {navItems.map((item) => {
        const fullPath = `/${locale}${item.href}`;
        const isActive = pathname === fullPath || pathname.endsWith(item.href);
        return (
          <div key={item.href}>
            <Link
              href={fullPath}
              onClick={onNavigate}
              className={classNames(
                'nav-link-creative block rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0',
                isActive
                  ? 'bg-cyan-50 text-cyan-900 shadow-[0_10px_24px_-18px_rgba(8,145,178,0.8),0_1px_0_rgba(255,255,255,0.9)_inset] dark:bg-cyan-400/16 dark:text-cyan-50 dark:shadow-[0_14px_28px_-20px_rgba(34,211,238,0.85),0_1px_0_rgba(255,255,255,0.12)_inset]'
                  : 'text-slate-700 hover:bg-white/80 hover:text-cyan-900 hover:shadow-[0_10px_24px_-20px_rgba(15,23,42,0.5),0_1px_0_rgba(255,255,255,0.85)_inset] dark:text-slate-100 dark:hover:bg-cyan-400/12 dark:hover:text-white dark:hover:shadow-[0_14px_28px_-22px_rgba(34,211,238,0.7),0_1px_0_rgba(255,255,255,0.1)_inset]'
              )}
            >
              {t(item.label)}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};
