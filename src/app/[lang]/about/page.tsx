'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { CLINIC_INFO } from '@/constants';

const valueIcons = [
  {
    label: 'Patient First',
    path: (
      <>
        <path d="M12 12.5a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M4.8 20.5a7.2 7.2 0 0 1 14.4 0" />
        <path d="M18 8.5h4" />
        <path d="M20 6.5v4" />
      </>
    ),
  },
  {
    label: 'Excellence',
    path: (
      <>
        <path d="m12 3 2.7 5.45 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6-4.36-4.25 6.03-.88L12 3Z" />
      </>
    ),
  },
  {
    label: 'Innovation',
    path: (
      <>
        <path d="M12 3a6 6 0 0 0-3.4 10.95c.9.62 1.4 1.45 1.4 2.55h4c0-1.1.5-1.93 1.4-2.55A6 6 0 0 0 12 3Z" />
        <path d="M9.5 20h5" />
        <path d="M10 17h4" />
      </>
    ),
  },
  {
    label: 'Compassion',
    path: (
      <>
        <path d="M12 20s-7-4.35-7-10a4.1 4.1 0 0 1 7-2.9A4.1 4.1 0 0 1 19 10c0 5.65-7 10-7 10Z" />
      </>
    ),
  },
  {
    label: 'Integrity',
    path: (
      <>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="m6 7-3 6h6L6 7Z" />
        <path d="m18 7-3 6h6l-3-6Z" />
      </>
    ),
  },
];

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const patientPromise = isArabic
    ? {
        title: 'لماذا يختار المرضى عيادة عبد الله للعيون؟',
        subtitle: 'رعاية عيون موثوقة تستحقها.',
        statements: [
          { title: 'رؤيتك أولويتنا', description: 'رعاية دقيقة تبدأ من احتياجك الحقيقي.' },
          { title: 'اختبر الفرق', description: 'مع عيادة عبد الله للعيون في كل زيارة.' },
          { title: 'خبرة بلمسة إنسانية', description: 'رعاية عيون متخصصة واهتمام شخصي.' },
        ],
      }
    : {
        title: 'Why Patients Choose Abdalla Eye Clinic',
        subtitle: 'Trusted Eyecare You Deserve.',
        statements: [
          { title: 'Your Vision, Our Priority', description: 'Thoughtful ophthalmology care centered around what matters most to you.' },
          { title: 'See the Difference', description: 'A calmer, clearer clinic experience shaped by attentive guidance.' },
          { title: 'Expert Eye Care', description: 'Clinical precision, advanced insight, and personal attention at every visit.' },
        ],
      };

  return (
    <div className="py-12 md:py-24 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isArabic ? CLINIC_INFO.descriptionAr : CLINIC_INFO.description}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="elevated">
            <CardHeader title={t('mission')} />
            <CardBody>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t('mission_text')}</p>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardHeader title={t('vision')} />
            <CardBody>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t('vision_text')}</p>
            </CardBody>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(t.raw('values_list') as string[]).map((value: string, idx: number) => (
              <Card key={idx} variant="outlined" className="text-center">
                <CardBody className="flex min-h-44 flex-col items-center justify-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-800 shadow-[0_14px_28px_-20px_rgba(8,145,178,0.9)] ring-1 ring-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-200 dark:ring-cyan-800/70">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {valueIcons[idx]?.path}
                    </svg>
                  </div>
                  <h3 className="text-center text-2xl font-extrabold leading-tight text-gray-950 dark:text-white md:text-[1.35rem]">
                    {value}
                  </h3>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Patient Promise */}
        <div className="rounded-lg border border-cyan-100 bg-medical-50/90 p-8 text-center shadow-elegant transition-colors duration-200 dark:border-cyan-900/60 dark:bg-gray-900/70 md:p-12">
          <span className="eyebrow mb-4">{isArabic ? 'اختيار المرضى' : 'Patient Trust'}</span>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-gray-950 dark:text-white">
            {patientPromise.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-extrabold text-cyan-800 dark:text-cyan-200">
            {patientPromise.subtitle}
          </p>
          <div className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {patientPromise.statements.map((statement, index) => (
              <div
                key={statement.title}
                className="group relative overflow-hidden rounded-lg border border-cyan-100 bg-white p-6 text-center shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-300 motion-safe:md:hover:-translate-y-1 md:shadow-[0_18px_42px_-28px_rgba(15,23,42,0.45)] md:hover:border-cyan-200 md:hover:shadow-elegant-lg dark:border-white/10 dark:bg-gray-950/70 dark:md:hover:border-cyan-800"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-cyan-700 dark:bg-cyan-400" />
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-50 text-lg font-black text-cyan-800 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-700 group-hover:text-white dark:bg-cyan-950/70 dark:text-cyan-200 dark:ring-cyan-800">
                  {index + 1}
                </div>
                <h3 className="text-xl font-extrabold leading-snug text-gray-950 dark:text-white">{statement.title}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-gray-600 dark:text-gray-300">{statement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
