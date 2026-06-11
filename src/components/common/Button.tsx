'use client';

import React from 'react';
import { classNames } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'touch-manipulation inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-200 motion-safe:md:hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0';

    const variantStyles = {
      primary: 'bg-cyan-700 text-white shadow-glow hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 focus:ring-cyan-500',
      secondary: 'border border-cyan-200 bg-white/85 text-cyan-900 shadow-sm md:shadow-elegant md:backdrop-blur hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-100 dark:hover:bg-cyan-900/60 focus:ring-cyan-400',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
    };

    const sizeStyles = {
      sm: 'px-3 py-2.5 text-sm min-h-[44px]',
      md: 'px-4 py-2.5 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[44px]',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={classNames(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          (isLoading || disabled) && 'opacity-50 cursor-not-allowed',
          className
        )}       
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin mr-2 h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
