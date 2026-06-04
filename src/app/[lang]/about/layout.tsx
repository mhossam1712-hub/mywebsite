import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createRouteMetadata } from '@/lib/seo';

type AboutLayoutProps = {
  children: ReactNode;
};

type MetadataProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({
    lang,
    path: '/about',
    title: {
      en: 'About Abdalla Eye Clinic in Alexandria',
      ar: 'عن عيادة عبد الله للعيون في الإسكندرية',
    },
    description: {
      en: 'Learn about Abdalla Eye Clinic, an Alexandria ophthalmology clinic providing comprehensive eye exams, LASIK assessment, cataract care, glaucoma follow-up, retina checks, dry eye treatment, and patient-centered eye care.',
      ar: 'تعرف على عيادة عبد الله للعيون في الإسكندرية، عيادة عيون تقدم فحوصات شاملة، تقييم الليزك، رعاية المياه البيضاء، متابعة الجلوكوما، فحوصات الشبكية، علاج جفاف العين، ورعاية تتمحور حول المريض.',
    },
  });
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return children;
}
