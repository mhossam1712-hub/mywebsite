import type { Metadata } from 'next';
import { createRouteMetadata } from '@/lib/seo';
import ContactClient from './ContactClient';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return createRouteMetadata({ lang, path: '/contact', route: 'contact' });
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;

  return <ContactClient locale={lang} />;
}
