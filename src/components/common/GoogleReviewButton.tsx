import React from 'react';
import { classNames } from '@/utils';

interface GoogleReviewButtonProps {
  locale: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const sizeStyles = {
  sm: 'px-4 py-2.5 text-sm min-h-[44px] gap-2',
  md: 'px-5 py-2.5 text-base min-h-[44px] gap-2.5',
  lg: 'px-6 py-3 text-lg min-h-[44px] gap-3',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
};

export function GoogleReviewButton({ locale, className, size = 'lg' }: GoogleReviewButtonProps) {
  const isArabic = locale === 'ar';
  const label = isArabic ? 'اترك تقييماً على Google' : 'Leave us a Google Review';

  return (
    <a
      href="https://g.page/r/CYTId-ZSu7-hEBM/review"
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        'touch-manipulation inline-flex items-center justify-center rounded-lg font-semibold shadow-sm',
        'bg-white border border-gray-200 text-gray-800',
        'hover:bg-gray-50 hover:border-gray-300',
        'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        'dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700',
        'motion-safe:md:transition-transform motion-safe:md:duration-200 motion-safe:md:hover:-translate-y-0.5 active:translate-y-0',
        sizeStyles[size],
        className
      )}
    >
      <GoogleGIcon className={classNames('shrink-0', iconSizes[size])} />
      <span>{label}</span>
    </a>
  );
}
