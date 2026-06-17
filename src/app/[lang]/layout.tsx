import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Analytics } from '@/components/layout/Analytics';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import { LOCALES, isValidLocale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import {
  buildMedicalClinicSchema,
  createRootMetadata,
  serializeStructuredData,
} from '@/lib/seo';
import { getDirection } from '@/utils';
import '../../styles/globals.css';

const siteUrl = getSiteUrl();
const metadataBase = new URL('https://abdallaeyeclinic.com');
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'CCOzpuU40fiYJh7XR2BnGQmMRPnl_EN9hSaFjWhlP2U';
// Replace the empty string with your Bing Webmaster Tools code once you
// retrieve it from bing.com/webmasters → Add site → Verify → XML meta tag.
const bingVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
  'BING_CODE_HERE';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    ...createRootMetadata({
      lang,
      siteUrl,
      verification: {
        google: googleVerification,
        bing: bingVerification,
      },
    }),
    metadataBase,
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<unknown>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = (await params) as { lang: string };

  if (!isValidLocale(lang)) {
    notFound();
  }

  setRequestLocale(lang);

  const messages = await getMessages();
  const direction = getDirection(lang);
  const structuredData = buildMedicalClinicSchema(lang, siteUrl);

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta httpEquiv="content-language" content="en, ar" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
      </head>
      <body className="bg-medical-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={lang}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
            />
            <Header locale={lang} />
            <Breadcrumbs />
            <main className="min-h-screen">{children}</main>
            <Footer locale={lang} />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
