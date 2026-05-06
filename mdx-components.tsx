import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold text-slate-950 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-slate-900 dark:text-gray-100">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 leading-8 text-slate-700 dark:text-gray-300">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 space-y-3 pl-5 text-slate-700 dark:text-gray-300">{children}</ul>
    ),
    li: ({ children }) => <li className="list-disc leading-7">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-cyan-800 dark:text-cyan-200">{children}</strong>,
    img: ({ src, alt }) => (
      <Image
        src={String(src)}
        alt={alt ?? ''}
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 768px, 100vw"
        className="mt-8 h-auto w-full rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700"
      />
    ),
    ...components,
  };
}
