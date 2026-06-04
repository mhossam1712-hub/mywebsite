import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CLINIC_INFO } from '@/constants';
import { clinicDisplayName, phoneHref, whatsAppHref } from '@/lib/clinic';

type MobileBottomActionBarProps = {
  locale: string;
};

const baseButtonClasses =
  'inline-flex min-h-12 flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-extrabold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950';

export async function MobileBottomActionBar({ locale }: MobileBottomActionBarProps) {
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const appointmentT = await getTranslations({ locale, namespace: 'appointment' });
  const isArabic = locale === 'ar';
  const clinicName = clinicDisplayName(locale);
  const whatsappUrl = whatsAppHref();
  const callLabel = commonT('call');
  const whatsappLabel = commonT('whatsapp');
  const bookLabel = appointmentT('title');

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-[95] border-t border-cyan-100 bg-white px-3 py-3 shadow-md dark:border-cyan-900/60 dark:bg-slate-950 md:hidden"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        aria-label={isArabic ? 'إجراءات سريعة للعيادة' : 'Quick clinic actions'}
      >
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href={`tel:${phoneHref(CLINIC_INFO.phone)}`}
            className={`${baseButtonClasses} border border-cyan-200 bg-white text-cyan-900 hover:bg-cyan-50 focus:ring-cyan-400 dark:border-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-50 dark:hover:bg-cyan-900/70`}
            aria-label={isArabic ? `اتصل ب${clinicName}` : `Call ${clinicName}`}
          >
            {callLabel}
          </a>
          <a
            href={whatsappUrl ?? `mailto:${CLINIC_INFO.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseButtonClasses} border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 focus:ring-emerald-400 dark:border-emerald-900/70 dark:bg-emerald-950/65 dark:text-emerald-50 dark:hover:bg-emerald-900/70`}
            aria-label={isArabic ? `راسل ${clinicName} عبر واتساب` : `Message ${clinicName} on WhatsApp`}
          >
            {whatsappLabel}
          </a>
          <Link
            href={`/${locale}/appointments`}
            className={`${baseButtonClasses} bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500`}
            aria-label={isArabic ? `احجز موعداً في ${clinicName}` : `Book an appointment at ${clinicName}`}
          >
            {bookLabel}
          </Link>
        </div>
      </nav>
      <div
        className="h-[calc(5.75rem+env(safe-area-inset-bottom))] md:hidden"
        aria-hidden="true"
      />
    </>
  );
}
