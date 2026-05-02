import { notFound, redirect } from 'next/navigation';

interface LegacyRoutePageProps {
  params: Promise<unknown>;
}

export default async function LegacyRoutePage({ params }: LegacyRoutePageProps) {
  const { lang, legacy } = (await params) as { lang: string; legacy: string };

  if (legacy === 'Contact') {
    redirect(`/${lang}/contact`);
  }

  if (legacy === 'FAQs') {
    redirect(`/${lang}/faqs`);
  }

  notFound();
}
