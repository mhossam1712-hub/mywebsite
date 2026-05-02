'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { getLocalizedServices, getSectionText } from '@/utils/localized-content';
import { Card, CardBody, CardHeader } from '../common/Card';
import { ServiceIcon } from '../common/ServiceIcon';

export const ServicesSection = () => {
  const t = useTranslations('services');
  const locale = useLocale();
  const services = getLocalizedServices(locale);

  return (
    <section className="section-shell bg-medical-50 px-3 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{getSectionText('servicesEyebrow', locale)}</span>
          <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id} variant="elevated">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 shadow-inner dark:bg-cyan-950/60 dark:text-cyan-200">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{service.name}</h3>
              </CardHeader>
              <CardBody>
                <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-gray-400">{service.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
