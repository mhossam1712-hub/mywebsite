import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CLINIC_BRANCHES, CLINIC_INFO } from '@/constants';
import { ThemeProvider } from '@/context/ThemeContext';
import { LOCALES, isValidLocale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import { getDirection } from '@/utils';

const siteUrl = getSiteUrl();
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'CCOzpuU40fiYJh7XR2BnGQmMRPnl_EN9hSaFjWhlP2U';
const bingVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_MSVALIDATE ||
  '';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  const languageName = isArabic ? 'Arabic' : 'English';

  return {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Abdalla Eye Clinic - Alexandria, Egypt',
    template: '%s | Abdalla Eye Clinic',
  },
  description:
    'Leading ophthalmology clinic in Alexandria offering LASIK surgery, cataract treatment, glaucoma management, and comprehensive eye care.',
  keywords: [
    'ophthalmologist Alexandria',
    'eye clinic Alexandria Egypt',
    'LASIK Alexandria',
    'cataract surgery Egypt',
    'glaucoma treatment',
    'retina specialist Alexandria',
  ],
  alternates: {
    canonical: `/${lang}`,
    languages: {
      en: '/en',
      ar: '/ar',
      'x-default': '/en',
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
  },
  openGraph: {
    title: 'Abdalla Eye Clinic - Alexandria, Egypt',
    description:
      'Expert ophthalmology care, diagnostics, LASIK, cataract, glaucoma, and retinal treatment in Alexandria.',
    url: siteUrl,
    siteName: 'Abdalla Eye Clinic',
    locale: 'en_US',
    alternateLocale: ['ar_EG'],
    type: 'website',
    images: [
      {
        url: '/assets/images/hero-ophthalmologist.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdalla Eye Clinic ophthalmology care in Alexandria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdalla Eye Clinic - Alexandria, Egypt',
    description:
      'Comprehensive eye care, LASIK, cataract, glaucoma, and retinal treatment in Alexandria.',
    images: [
      {
        url: '/assets/images/hero-ophthalmologist.jpg',
        alt: 'Abdalla Eye Clinic ophthalmology examination in Alexandria',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/navicon.ico', type: 'image/x-icon' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/navicon.ico',
    apple: '/assets/images/abdalla-eye-emblem.png',
  },
  other: {
    language: languageName,
    'content-language': lang,
    'geo.region': 'EG-ALX',
    'geo.placename': 'Alexandria, Egypt',
    distribution: 'global',
    rating: 'general',
    'image': `${siteUrl}/assets/images/hero-ophthalmologist.jpg`,
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
  const isArabic = lang === 'ar';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}/#clinic`,
    name: isArabic ? 'عيادة عبد الله للعيون' : CLINIC_INFO.name,
    url: siteUrl,
    logo: `${siteUrl}/assets/images/abdalla-eye-logo.png`,
    image: [
      `${siteUrl}/assets/images/hero-ophthalmologist.jpg`,
      `${siteUrl}/assets/images/abdalla-eye-logo.png`,
      `${siteUrl}/assets/images/dr-mohamed-hossam-abdalla-card.jpg`,
      `${siteUrl}/assets/images/prof-ahmed-hossam-abdalla-card.jpg`,
    ],
    description: CLINIC_INFO.description,
    medicalSpecialty: 'Ophthalmology',
    telephone: CLINIC_INFO.phone,
    email: CLINIC_INFO.email,
    address: CLINIC_BRANCHES.map((branch) => ({
      '@type': 'PostalAddress',
      streetAddress: isArabic ? branch.addressAr : branch.address,
      addressLocality: CLINIC_INFO.city,
      addressCountry: CLINIC_INFO.country,
    })),
    areaServed: ['Alexandria', 'Egypt'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        opens: '12:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      CLINIC_INFO.socialMedia.facebook,
      CLINIC_INFO.socialMedia.instagram,
      CLINIC_INFO.socialMedia.twitter,
    ].filter(Boolean),
  };

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages} locale={lang}>
        <div lang={lang} dir={direction}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer locale={lang} />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
