import React from 'react';
import Link from 'next/link';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { branchAreaName, branchDirectionsHref, branchEmbedUrl } from '@/lib/clinic';

type Props = { locale: string };

const ui = {
  en: {
    eyebrow: 'Find Us',
    heading: 'Two Locations in Alexandria',
    subtitle:
      'Visit us at either of our two clinic branches — both open Saturday through Wednesday, 12:00 PM to 9:00 PM.',
    address: 'Address',
    phone: 'Phone',
    hours: 'Opening hours',
    hoursValue: 'Sat–Wed · 12:00 PM– 9:00 PM',
    directions: 'Get directions',
    appointment: 'Book an appointment',
  },
  ar: {
    eyebrow: 'زيارتنا',
    heading: 'فرعان في الإسكندرية',
    subtitle:
      'زورونا في أي من فرعَي العيادة — كلاهما مفتوح من السبت إلى الأربعاء، من 12 ظهراً حتى 9 مساءً.',
    address: 'العنوان',
    phone: 'الهاتف',
    hours: 'ساعات العمل',
    hoursValue: 'السبت–الأربعاء · 12:00 ظهراً – 9:00 مساءً',
    directions: 'الاتجاهات',
    appointment: 'احجز موعدًا',
  },
};

export function LocationsSection({ locale }: Props) {
  const isArabic = locale === 'ar';
  const t = isArabic ? ui.ar : ui.en;

  return (
    <section
      className="bg-white px-3 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-4 sm:py-16 md:py-24"
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{t.eyebrow}</span>
          <h2
            id="locations-heading"
            className="mb-4 mt-3 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl"
          >
            {t.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CLINIC_BRANCHES.map((branch) => {
            const areaName = branchAreaName(branch, locale);
            const embedUrl = branchEmbedUrl(branch);
            const directionsUrl = branchDirectionsHref(branch);
            const branchAddress = isArabic ? branch.addressAr : branch.address;

            return (
              <div
                key={branch.slug}
                className="overflow-hidden rounded-lg border border-cyan-100 bg-white shadow-elegant dark:border-cyan-900/60 dark:bg-gray-950/80"
              >
                {/* Map embed */}
                <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${CLINIC_INFO.name} — ${areaName} branch location on Google Maps`}
                  />
                </div>

                {/* Branch info */}
                <div className={`p-5 sm:p-6 ${isArabic ? 'text-right' : ''}`}>
                  <h3 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">
                    {isArabic
                      ? `${CLINIC_INFO.nameAr} — ${areaName}`
                      : `${areaName} Clinic`}
                  </h3>

                  <dl className="space-y-3 text-sm">
                    <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <dt className="w-20 shrink-0 font-semibold text-slate-600 dark:text-gray-400">
                        {t.address}
                      </dt>
                      <dd className="text-slate-800 dark:text-gray-200">{branchAddress}</dd>
                    </div>
                    <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <dt className="w-20 shrink-0 font-semibold text-slate-600 dark:text-gray-400">
                        {t.phone}
                      </dt>
                      <dd>
                        <a
                          href={`tel:${branch.phone}`}
                          className="font-medium text-cyan-800 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-100"
                        >
                          {branch.phone}
                        </a>
                      </dd>
                    </div>
                    <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <dt className="w-20 shrink-0 font-semibold text-slate-600 dark:text-gray-400">
                        {t.hours}
                      </dt>
                      <dd className="text-slate-800 dark:text-gray-200">{t.hoursValue}</dd>
                    </div>
                  </dl>

                  <div className={`mt-5 flex flex-wrap gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-bold text-cyan-900 transition-colors hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-50 dark:hover:bg-cyan-900"
                    >
                      {t.directions}
                    </a>
                    <Link
                      href={`/${locale}/appointments`}
                      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-800 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600"
                    >
                      {t.appointment}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
