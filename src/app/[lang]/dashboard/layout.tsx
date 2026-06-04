import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createNoindexRouteMetadata } from '@/lib/seo';

type DashboardLayoutProps = {
  children: ReactNode;
};

type MetadataProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { lang } = await params;

  return createNoindexRouteMetadata({ lang, path: '/dashboard', route: 'dashboard' });
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return children;
}
