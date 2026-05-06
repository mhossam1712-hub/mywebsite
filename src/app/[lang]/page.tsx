import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { DoctorsSection } from '@/components/sections/DoctorsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return {
    title: isArabic ? 'عيادة عبد الله للعيون في الإسكندرية' : 'Abdalla Eye Clinic Alexandria',
    description: isArabic
      ? 'عيادة عيون في الإسكندرية تقدم فحوصات شاملة، ليزك، مياه بيضاء، علاج الجلوكوما، الشبكية، وجفاف العين.'
      : 'Ophthalmology clinic in Alexandria offering comprehensive eye exams, LASIK, cataract surgery, glaucoma care, retinal treatment, and dry eye care.',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <>
      <HeroSection locale={lang} />
      <ServicesSection locale={lang} />
      <DoctorsSection locale={lang} />
      <TestimonialsSection locale={lang} />
    </>
  );
}
