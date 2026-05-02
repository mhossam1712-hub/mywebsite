'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { getLocalizedServices } from '@/utils/localized-content';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const services = getLocalizedServices(locale);

  return (
    <div className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} variant="elevated">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800 shadow-inner dark:bg-cyan-950/60 dark:text-cyan-200">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {locale === 'ar' ? 'المميزات:' : 'Features:'}
                  </h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/${locale}/appointments`} className="block">
                  <Button fullWidth>{commonT('call')}</Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
