import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Analytics } from '@/components/layout/Analytics';
import { MetaPixel } from '@/components/layout/MetaPixel';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic',
});

const siteUrl = getSiteUrl();
const metadataBase = new URL('https://abdallaeyeclinic.com');
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'CCOzpuU40fiYJh7XR2BnGQmMRPnl_EN9hSaFjWhlP2U';
const bingVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? '';

// Inline script applied before React hydration to avoid a dark-mode flash.
// Must be a plain string with no template-literal interpolation so Next.js
// can emit it as a static <script> block in the SSR HTML.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const base = createRootMetadata({
    lang,
    siteUrl,
    verification: {
      google: googleVerification,
      bing: bingVerification,
    },
  });

  return {
    ...base,
    metadataBase,
    other: {
      ...(base.other as Record<string, string> | undefined),
      'facebook-domain-verification': 'r5ysmgmg2y437ww6ru60d3qgjymm3c',
    },
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

  const clarityId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID;

  return (
    <html
      lang={lang}
      dir={direction}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cairo.variable}`}
    >
      <head>
        {/* Blocking theme script — runs before React so no dark-mode flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta httpEquiv="content-language" content="en, ar" />
        {/* next/font handles its own font loading — no Google Fonts preconnect needed */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {clarityId && <link rel="preconnect" href="https://www.clarity.ms" />}
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
        <MetaPixel />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
