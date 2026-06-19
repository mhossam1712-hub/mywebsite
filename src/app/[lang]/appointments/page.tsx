import type { Metadata } from 'next';
import { createRouteMetadata } from '@/lib/seo';
import AppointmentsClient from './AppointmentsClient';

type PageProps = {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ serviceId?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '/appointments', route: 'appointments' });
}

export default async function AppointmentsPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const query = await searchParams;
  const serviceId = Array.isArray(query?.serviceId) ? query?.serviceId[0] : query?.serviceId;
  const isArabic = lang === 'ar';

  return (
    <>
      {/* Server-rendered H1 — guaranteed in the initial HTML seen by crawlers */}
      <div className="bg-gray-50 px-4 pt-12 dark:bg-gray-900 md:pt-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">
            {isArabic ? 'احجز موعد كشف عيون' : 'Book an Eye Appointment'}
          </h1>
        </div>
      </div>
      <AppointmentsClient locale={lang} initialServiceId={serviceId} />
    </>
  );
}
