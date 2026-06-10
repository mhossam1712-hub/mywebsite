import Link from 'next/link';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { SERVICE_CARDS } from '@/lib/internalLinks';

const ICON_NAME: Record<string, string> = {
  lasik: 'lasik',
  'cataract-surgery': 'cataract',
  glaucoma: 'glaucoma',
  retina: 'retina',
  'dry-eye': 'dry-eye',
};

type Props = {
  slugs: string[];
  locale: string;
};

export function RelatedServices({ slugs, locale }: Props) {
  const isArabic = locale === 'ar';
  const heading = isArabic ? 'الخدمات ذات الصلة' : 'Related Services';
  const cta = isArabic ? 'اعرف أكثر' : 'Learn more';

  const services = slugs.flatMap((slug) => {
    const card = SERVICE_CARDS[slug];
    return card ? [{ slug, card }] : [];
  });

  if (services.length === 0) return null;

  return (
    <aside
      aria-label={heading}
      className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-700"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950 dark:text-white">
        {heading}
      </h2>
      <ul
        className={`grid gap-4 ${services.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}
        role="list"
      >
        {services.map(({ slug, card }) => {
          const name = isArabic ? card.nameAr : card.name;
          const description = isArabic ? card.descriptionAr : card.description;
          const href = `/${locale}/services/${slug}`;

          return (
            <li key={slug}>
              <Link
                href={href}
                className="group flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-cyan-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 transition-colors group-hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:group-hover:bg-cyan-900/60">
                  <ServiceIcon name={ICON_NAME[slug] ?? 'eye-exam'} className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-bold text-slate-900 group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-200">
                    {name}
                  </span>
                  <span className="text-sm leading-6 text-slate-600 dark:text-gray-400">
                    {description}
                  </span>
                </span>
                <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  {cta}
                  <svg
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${isArabic ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
