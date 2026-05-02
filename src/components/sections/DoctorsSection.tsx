'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { getLocalizedDoctors, getSectionText } from '@/utils/localized-content';
import { Card, CardBody, CardHeader } from '../common/Card';

export const DoctorsSection = () => {
  const t = useTranslations('doctors');
  const locale = useLocale();
  const doctors = getLocalizedDoctors(locale);

  return (
    <section className="bg-white px-3 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{getSectionText('doctorsEyebrow', locale)}</span>
          <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {doctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader>
                <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 768px) 384px, calc(100vw - 72px)"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{doctor.name}</h3>
                <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{doctor.specialty}</p>
              </CardHeader>
              <CardBody>
                <div className="space-y-2 text-sm text-slate-600 dark:text-gray-300">
                  {doctor.experience > 0 && (
                    <p>
                      <span className="font-semibold">{t('experience')}:</span>{' '}
                      {locale === 'ar' ? `${doctor.experience} سنة` : `${doctor.experience} years`}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">{t('languages')}:</span> {doctor.languages.join(', ')}
                  </p>
                  <p className="mt-3 text-slate-700 dark:text-gray-300">{doctor.bio}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
