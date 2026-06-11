// These are illustrative sample testimonials used for content and Schema.org markup.
// Replace with real, patient-permissioned testimonials before making claims about
// specific patient outcomes on this page.

import React from 'react';
import { GoogleReviewButton } from '@/components/common/GoogleReviewButton';
import { CANONICAL_SITE_URL, serializeStructuredData } from '@/lib/seo';
import { sectionText } from '@/utils/localized-content';

type Props = { locale: string };

type Testimonial = (typeof sectionText.testimonials.en)[number];

function buildReviewSchema(testimonials: Testimonial[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${CANONICAL_SITE_URL}/#clinic`,
    name: 'Abdalla Eye Clinic',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(testimonials.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
      },
      reviewBody: t.content,
      name: t.service,
    })),
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="mb-3 flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function HomepageReviewsSection({ locale }: Props) {
  const isArabic = locale === 'ar';

  // Show first 3 testimonials; schema always uses EN content for search engines
  const displayTestimonials = sectionText.testimonials[isArabic ? 'ar' : 'en'].slice(0, 3);
  const schemaTestimonials = sectionText.testimonials.en.slice(0, 3);
  const reviewSchema = buildReviewSchema(schemaTestimonials);

  return (
    <section
      className="section-shell bg-medical-50 px-3 py-12 transition-colors duration-300 dark:bg-gray-950 sm:px-4 sm:py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(reviewSchema) }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <span className="eyebrow mb-4">
            {isArabic ? 'تجارب مرضانا' : 'Patient Stories'}
          </span>
          <h2
            id="reviews-heading"
            className="mb-4 mt-3 text-3xl font-bold text-slate-950 dark:text-white md:text-4xl"
          >
            {isArabic ? 'ما يقوله مرضانا' : 'What Our Patients Say'}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-300">
            {isArabic
              ? 'آراء مرضى عيادة عبد الله للعيون في الإسكندرية.'
              : 'Feedback from patients at Abdalla Eye Clinic, Alexandria.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {displayTestimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className={`creative-card rounded-lg border border-white/80 bg-white/92 p-6 shadow-elegant backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-elegant-lg dark:border-white/10 dark:bg-gray-900/85 ${isArabic ? 'text-right' : ''}`}
            >
              <div className={`mb-4 flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-700 to-plum-500 text-base font-bold text-white shadow-glow"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>
                <figcaption>
                  <p className="font-semibold text-slate-950 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-gray-400">{testimonial.service}</p>
                </figcaption>
              </div>
              <StarRating rating={testimonial.rating} />
              <blockquote>
                <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center sm:mt-12">
          <p className="text-base text-slate-600 dark:text-gray-300">
            {isArabic
              ? 'هل زرت عيادتنا؟ شاركنا تجربتك على Google'
              : 'Visited our clinic? Share your experience on Google'}
          </p>
          <GoogleReviewButton locale={locale} />
        </div>
      </div>
    </section>
  );
}
