'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { classNames } from '@/utils';

function useFieldAccessibility({
  id,
  error,
  hint,
  describedBy,
}: {
  id?: string;
  error?: string;
  hint?: string;
  describedBy?: string;
}) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const ariaDescribedBy = [describedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

  return {
    fieldId,
    hintId,
    errorId,
    ariaDescribedBy,
  };
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, 'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const { fieldId, hintId, errorId, ariaDescribedBy } = useFieldAccessibility({
      id,
      error,
      hint,
      describedBy,
    });

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={classNames(
            'w-full px-3 py-2.5 text-base border rounded-lg appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'transition-colors duration-200',
            error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
        {hint && <p id={hintId} className="text-gray-500 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, 'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const { fieldId, hintId, errorId, ariaDescribedBy } = useFieldAccessibility({
      id,
      error,
      hint,
      describedBy,
    });

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={classNames(
            'w-full px-3 py-2 text-base border rounded-lg appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
            'resize-none',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'transition-colors duration-200',
            error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
        {hint && <p id={hintId} className="text-gray-500 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  placeholderLabel?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      className,
      id,
      placeholderLabel,
      'aria-describedby': describedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const locale = useLocale();
    const { fieldId, hintId, errorId, ariaDescribedBy } = useFieldAccessibility({
      id,
      error,
      hint,
      describedBy,
    });
    const localizedPlaceholder = placeholderLabel ?? (locale === 'ar' ? 'اختر خياراً' : 'Select an option');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={classNames(
            'w-full px-3 py-2.5 text-base border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'transition-colors duration-200',
            error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
            className
          )}
          {...props}
        >
          <option value="">{localizedPlaceholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p id={errorId} className="text-red-600 text-sm mt-1">{error}</p>}
        {hint && <p id={hintId} className="text-gray-500 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
