'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

type ThemeToggleProps = {
  onToggle?: () => void;
};

export const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    onToggle?.();
  };

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
        }`}
      />
      <span className="absolute left-2 text-xs font-bold text-gray-800">☀️</span>
      <span className="absolute right-2 text-xs font-bold text-gray-900">🌙</span>
    </button>
  );
};
