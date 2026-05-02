export const LOCALES = ['en', 'ar'] as const;
export const DEFAULT_LOCALE = 'en' as const;

export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && LOCALES.includes(locale as Locale);
}
