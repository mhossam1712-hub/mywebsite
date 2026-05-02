import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#0891b2',
          600: '#0e7490',
          700: '#155e75',
          900: '#164e63',
        },
        medical: {
          50: '#f7fbfc',
          100: '#edf7f7',
          500: '#5e7182',
          600: '#405263',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f59e0b',
          600: '#d97706',
        },
        plum: {
          500: '#6d5bd0',
          700: '#4c3da4',
        },
      },
      boxShadow: {
        elegant: '0 18px 45px -22px rgba(15, 23, 42, 0.35)',
        'elegant-lg': '0 28px 80px -32px rgba(15, 23, 42, 0.45)',
        glow: '0 22px 55px -28px rgba(8, 145, 178, 0.65)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
