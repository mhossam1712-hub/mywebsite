import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { DoctorsSection } from '@/components/sections/DoctorsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { HomepageReviewsSection } from '@/components/sections/HomepageReviewsSection';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { createRouteMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '', route: 'home' });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <>
      <HeroSection locale={lang} />
      <ServicesSection locale={lang} />
      <DoctorsSection locale={lang} />
      <TestimonialsSection locale={lang} />
      <WhyChooseSection locale={lang} />
      <HomepageReviewsSection locale={lang} />
      <LocationsSection locale={lang} />
    </>
  );
}
