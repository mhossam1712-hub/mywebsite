'use client';

import React from 'react';
import { classNames } from '@/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantStyles = {
      default:
        'border border-white/80 bg-white/90 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.55),0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur dark:border-cyan-800/45 dark:bg-slate-900/[0.92] dark:shadow-[0_22px_55px_-28px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.08)_inset]',
      elevated:
        'border border-white/90 bg-white/[0.96] shadow-[0_28px_70px_-34px_rgba(15,23,42,0.62),0_2px_0_rgba(255,255,255,0.95)_inset,0_-18px_35px_-32px_rgba(8,145,178,0.7)_inset] backdrop-blur dark:border-cyan-700/45 dark:bg-slate-900/95 dark:shadow-[0_30px_75px_-34px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.1)_inset,0_-18px_35px_-34px_rgba(34,211,238,0.35)_inset]',
      outlined:
        'border border-cyan-200/90 bg-white/[0.72] shadow-[0_18px_44px_-30px_rgba(8,145,178,0.75),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur dark:border-cyan-700/55 dark:bg-cyan-950/[0.32] dark:shadow-[0_22px_60px_-34px_rgba(6,182,212,0.55),0_1px_0_rgba(255,255,255,0.08)_inset]',
    };

    return (
      <div
        ref={ref}
        className={classNames(
          'creative-card rounded-lg p-6 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.25deg] hover:brightness-[1.02]',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, className, children, ...props }, ref) => (
    <div ref={ref} className={classNames('mb-4', className)} {...props}>
      {children}
      {title && <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={classNames('', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={classNames('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';
