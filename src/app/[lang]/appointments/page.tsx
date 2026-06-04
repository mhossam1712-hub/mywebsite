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

  return <AppointmentsClient locale={lang} initialServiceId={serviceId} />;
}
