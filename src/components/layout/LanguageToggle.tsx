'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LanguageToggleProps = {
  locale: string;
  className: string;
  onNavigate?: () => void;
};

export function LanguageToggle({ locale, className, onNavigate }: LanguageToggleProps) {
  const pathname = usePathname();
  const targetLocale = locale === 'ar' ? 'en' : 'ar';
  const localeLabel = locale === 'ar' ? 'EN' : 'AR';
  const localeHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${targetLocale}`);

  return (
    <Link
      href={localeHref}
      hrefLang={targetLocale}
      onClick={onNavigate}
      className={className}
      aria-label={`Switch language to ${targetLocale === 'ar' ? 'Arabic' : 'English'}`}
    >
      {localeLabel}
    </Link>
  );
}
