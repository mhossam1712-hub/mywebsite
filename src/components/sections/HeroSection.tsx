import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getSectionText, sectionText } from '@/utils/localized-content';

type SectionProps = {
  locale: string;
};

export const HeroSection = async ({ locale }: SectionProps) => {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const featureCards = locale === 'ar' ? sectionText.featureCards.ar : sectionText.featureCards.en;

  return (
    <section className="section-shell flex min-h-[calc(100svh-4.5rem)] items-center bg-[linear-gradient(135deg,#073b4c_0%,#0f766e_48%,#6d5bd0_100%)] px-3 py-14 text-white transition-colors duration-300 sm:px-4 sm:py-20 md:min-h-[calc(100svh-5rem)] md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(120deg,transparent_0_18%,rgba(255,255,255,0.16)_18%_19%,transparent_19%_35%,rgba(255,255,255,0.12)_35%_36%,transparent_36%),radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.16),transparent_16rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_25rem),linear-gradient(90deg,rgba(7,59,76,0.88),rgba(7,59,76,0.54)_44%,rgba(15,118,110,0.7))]" />
      <div className="hero-aurora pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.24),transparent_20rem),radial-gradient(circle_at_82%_28%,rgba(245,158,11,0.24),transparent_18rem)]" />
      <div className="pointer-events-none absolute left-[8%] top-24 h-24 w-24 rounded-full border border-white/20 bg-white/[0.08] blur-sm" />
      <div className="pointer-events-none absolute right-[12%] top-16 h-16 w-16 rounded-full border border-amber-200/30 bg-amber-200/[0.12] blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-medical-50 to-transparent dark:from-gray-950" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.86fr] lg:gap-14">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex rounded-full border border-white/30 bg-white/14 px-6 py-3 text-base font-extrabold uppercase tracking-[0.2em] text-cyan-50 shadow-elegant backdrop-blur sm:text-lg">
              {getSectionText('heroBadge', locale)}
            </span>
            <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-cyan-50/90 sm:text-lg md:text-xl">
              {t('subtitle')}
            </p>
            <div className="flex justify-center">
              <Link
                href={`/${locale}/appointments`}
                className="hero-primary-cta inline-flex min-h-14 items-center justify-center rounded-lg bg-white px-9 py-3 text-lg font-extrabold text-cyan-950 shadow-[0_20px_45px_-24px_rgba(255,255,255,0.75),0_1px_0_rgba(255,255,255,0.95)_inset] transition-colors hover:bg-cyan-50 sm:px-12 sm:text-xl"
              >
                {t('cta')}
              </Link>
            </div>
          </div>

          <div className="hero-float relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg border border-white/24 bg-white/12 shadow-[0_32px_90px_-44px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.22)_inset] backdrop-blur">
            <Image
              src="/assets/images/hero-ophthalmologist.jpg"
              alt="Ophthalmologist performing an eye examination"
              fill
              priority
              fetchPriority="high"
              quality={72}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,59,76,0.28),transparent_42%,rgba(109,91,208,0.20)),linear-gradient(180deg,transparent_58%,rgba(7,59,76,0.34))]" />
            <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] animate-[shimmerSweep_5s_ease-in-out_infinite]" />
            <div className="absolute bottom-4 start-4 rounded-lg border border-white/25 bg-white/16 px-4 py-3 text-left shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-50/80">
                {getSectionText('heroImageEyebrow', locale)}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{getSectionText('heroImageCaption', locale)}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-3 text-left sm:mt-20 sm:grid-cols-3 sm:gap-4 lg:mt-24">
          {featureCards.map((item) => (
            <div key={item.title} className="creative-card rounded-lg border border-white/24 bg-white/[0.14] p-4 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.75),0_1px_0_rgba(255,255,255,0.18)_inset] backdrop-blur transition-transform duration-300 hover:-translate-y-1.5">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-cyan-50/75">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
