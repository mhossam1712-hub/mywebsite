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
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm motion-safe:md:transition-transform motion-safe:md:duration-200 motion-safe:md:hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0';

    const variantStyles = {
      primary: 'bg-cyan-700 text-white shadow-glow hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 focus:ring-cyan-500',
      secondary: 'border border-cyan-200 bg-white/85 text-cyan-900 shadow-sm md:shadow-elegant md:backdrop-blur hover:bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-100 dark:hover:bg-cyan-900/60 focus:ring-cyan-400',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
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
            <span className="inline-block animate-spin mr-2">⌛</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
