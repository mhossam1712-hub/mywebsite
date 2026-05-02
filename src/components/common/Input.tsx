import React from 'react';
import { classNames } from '@/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={classNames(
          'w-full px-3 py-2 border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          'transition-colors duration-200',
          error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {hint && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
    </div>
  )
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={classNames(
          'w-full px-3 py-2 border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
          'resize-none',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
          'transition-colors duration-200',
          error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {hint && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
    </div>
  )
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={classNames(
          'w-full px-3 py-2 border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-white',
          'transition-colors duration-200',
          error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {hint && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
    </div>
  )
);

Select.displayName = 'Select';
