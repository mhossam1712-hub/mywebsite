'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { FAQsSection } from '@/components/sections/FAQsSection';

export default function FAQsPage() {
  const t = useTranslations('faqs');

  return (
    <div className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>
      </div>
      <FAQsSection />
    </div>
  );
}
