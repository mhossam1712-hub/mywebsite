import { ReactNode } from 'react';
import { Analytics } from '@/components/layout/Analytics';
import '../styles/globals.css';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta httpEquiv="content-language" content="en, ar" />
      </head>
      <body className="bg-medical-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
