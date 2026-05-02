'use client';

import React from 'react';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLocale } from 'next-intl';
import { getDirection } from '@/utils';

interface RootLayoutProps {
  children: ReactNode;
}

export const ClientLayout = ({ children }: RootLayoutProps) => {
  const locale = useLocale();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className="bg-white text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
};
