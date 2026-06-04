import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getSectionText, sectionText } from '@/utils/localized-content';

type SectionProps = {
  locale: string;
};

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  content: string;
  service: string;
  permissioned?: boolean;
};

function StarRating({ rating }: { rating: number }) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="mb-3 flex" role="img" aria-label={`${normalizedRating} out of 5`}>
      {[...Array(normalizedRating)].map((_, i) => (
        <span key={i} className="text-yellow-400" aria-hidden="true">
          ⭐
        </span>
      ))}
    </div>
  );
}

export const TestimonialsSection = async ({ locale }: SectionProps) => {
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  const testimonials = (locale === 'ar' ? sectionText.testimonials.ar : sectionText.testimonials.en) as Testimonial[];
  // Patient reviews must be real, permissioned, and publishable before they are shown on the site.
  const publishableTestimonials = testimonials.filter((testimonial) => testimonial.permissioned === true);

  if (publishableTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-medical-50 px-3 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">{getSectionText('testimonialsEyebrow', locale)}</span>
          <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {publishableTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-white/80 bg-white/92 p-6 shadow-elegant backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-elegant-lg dark:border-white/10 dark:bg-gray-900/85"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-700 to-plum-500 font-bold text-white shadow-glow">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-950 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{testimonial.service}</p>
                </div>
              </div>
              <StarRating rating={testimonial.rating} />
              <p className="text-slate-700 dark:text-gray-300">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
