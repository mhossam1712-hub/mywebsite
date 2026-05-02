'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { getLocalizedFaqs, getSectionText } from '@/utils/localized-content';

export const FAQsSection = () => {
  const t = useTranslations('faqs');
  const locale = useLocale();
  const faqs = getLocalizedFaqs(locale);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isArabic = locale === 'ar';
  const categoryLabels: Record<string, string> = isArabic
    ? {
        general: 'أسئلة عامة',
        lasik: 'أسئلة الليزك',
        cataract: 'أسئلة جراحة المياه البيضاء',
        iol: 'أسئلة العدسات المزروعة',
        glaucoma: 'أسئلة الجلوكوما',
      }
    : {
        general: 'General Eye Care FAQs',
        lasik: 'LASIK FAQs',
        cataract: 'Cataract Surgery FAQs',
        iol: 'IOL Lens Implant FAQs',
        glaucoma: 'Glaucoma FAQs',
      };
  const groupedFaqs = Object.entries(categoryLabels).map(([category, label]) => ({
    category,
    label,
    faqs: faqs.filter((faq) => faq.category === category),
  }));

  return (
    <section className="bg-white px-3 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{getSectionText('faqsEyebrow', locale)}</span>
          <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{t('title')}</h2>
          <p className="text-lg text-slate-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="space-y-10">
          {groupedFaqs.map((group) => (
            <div key={group.category}>
              <h3 className={`mb-4 text-2xl font-extrabold text-slate-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="overflow-hidden rounded-lg border border-cyan-100 bg-white/90 shadow-elegant backdrop-blur transition-colors duration-300 dark:border-cyan-900/60 dark:bg-gray-950/60"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                      className={`flex w-full items-center justify-between gap-4 px-6 py-4 transition-colors duration-200 hover:bg-cyan-50/70 dark:hover:bg-cyan-950/40 ${isArabic ? 'text-right' : 'text-left'}`}
                    >
                      <span className="text-2xl text-cyan-700 transition-transform duration-200 dark:text-cyan-300">
                        {expandedId === faq.id ? '−' : '+'}
                      </span>
                      <h4 className={`flex-1 font-semibold text-slate-950 dark:text-white ${isArabic ? 'text-right' : 'text-left'}`}>{faq.question}</h4>
                    </button>
                    {expandedId === faq.id && (
                      <div className="border-t border-cyan-100 bg-cyan-50/45 dark:border-cyan-900/60 dark:bg-cyan-950/20">
                        <p className={`px-6 py-4 leading-7 text-slate-700 dark:text-gray-300 ${isArabic ? 'text-right' : 'text-left'}`}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
                </div>
      </div>
    </section>
  );
};
