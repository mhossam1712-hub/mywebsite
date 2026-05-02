'use client';

import React from 'react';

type ServiceIconName =
  | 'eye-exam'
  | 'lasik'
  | 'cataract'
  | 'glaucoma'
  | 'retina'
  | 'contact-lens'
  | 'dry-eye'
  | 'pediatric';

interface ServiceIconProps {
  name: string;
  className?: string;
}

const iconPaths: Record<ServiceIconName, React.ReactNode> = {
  'eye-exam': (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lasik: (
    <>
      <path d="M3 12h7" />
      <path d="M14 12h7" />
      <path d="m12 3 1.4 5.2L18 6l-2.2 4.6L21 12l-5.2 1.4L18 18l-4.6-2.2L12 21l-1.4-5.2L6 18l2.2-4.6L3 12l5.2-1.4L6 6l4.6 2.2L12 3Z" />
    </>
  ),
  cataract: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M9 9.5a4 4 0 0 1 5.5 5.5" />
      <path d="m16.5 16.5 3 3" />
    </>
  ),
  glaucoma: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M6 12a6 6 0 0 0 12 0" />
      <path d="M12 6v6l3 3" />
    </>
  ),
  retina: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v3" />
      <path d="M12 17v3" />
      <path d="M4 12h3" />
      <path d="M17 12h3" />
      <path d="m6.4 6.4 2.1 2.1" />
      <path d="m15.5 15.5 2.1 2.1" />
    </>
  ),
  'contact-lens': (
    <>
      <path d="M4 12c1.8-3 4.4-4.5 8-4.5S18.2 9 20 12c-1.8 3-4.4 4.5-8 4.5S5.8 15 4 12Z" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </>
  ),
  'dry-eye': (
    <>
      <path d="M12 3s5 5.3 5 9a5 5 0 0 1-10 0c0-3.7 5-9 5-9Z" />
      <path d="M9.5 14a3 3 0 0 0 5 0" />
    </>
  ),
  pediatric: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="M8 13.5 5.5 16" />
      <path d="m16 13.5 2.5 2.5" />
    </>
  ),
};

export function ServiceIcon({ name, className = 'h-6 w-6' }: ServiceIconProps) {
  const paths = iconPaths[name as ServiceIconName] ?? iconPaths['eye-exam'];

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths}
    </svg>
  );
}
