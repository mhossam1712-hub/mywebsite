import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { KEYWORD_MAP } from '@/lib/internalLinks';

// ─── Inline link injection ────────────────────────────────────────────────────

// Returns true if the character is a word character (letter, digit, _).
function isWordChar(ch: string | undefined): boolean {
  return ch !== undefined && /\w/.test(ch);
}

// Scan `text` for the first linkable keyword whose service slug has NOT already
// been linked in this paragraph.  Returns null when nothing is found.
function findFirstMatch(
  text: string,
  linked: Set<string>
): { index: number; length: number; slug: string; original: string } | null {
  let best: { index: number; length: number; slug: string; original: string } | null = null;

  for (const { keyword, slug } of KEYWORD_MAP) {
    if (linked.has(slug)) continue;
    const lower = text.toLowerCase();
    const kwLower = keyword.toLowerCase();
    const idx = lower.indexOf(kwLower);
    if (idx === -1) continue;

    // Word-boundary check: the character before and after the match must not
    // be a word character (so "glaucomatous" doesn't match "glaucoma").
    if (isWordChar(text[idx - 1])) continue;
    if (isWordChar(text[idx + keyword.length])) continue;

    // Prefer the earliest match; for ties prefer the longer keyword (KEYWORD_MAP
    // is already sorted longest-first, so the first hit at the same index wins).
    if (!best || idx < best.index) {
      best = {
        index: idx,
        length: keyword.length,
        slug,
        original: text.slice(idx, idx + keyword.length),
      };
    }
  }

  return best;
}

// Split a plain text string into an array of strings and <Link> elements,
// linking the first occurrence of each service keyword.
// `linked` is mutated to prevent the same service from being linked twice
// within the same paragraph.
function linkifyText(text: string, linked: Set<string>, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let remaining = text;
  let offset = 0;

  while (remaining.length > 0) {
    const match = findFirstMatch(remaining, linked);
    if (!match) {
      parts.push(remaining);
      break;
    }

    if (match.index > 0) parts.push(remaining.slice(0, match.index));

    linked.add(match.slug);
    parts.push(
      <Link
        key={`${keyBase}-${offset + match.index}`}
        href={`/en/services/${match.slug}`}
        className="font-medium text-cyan-700 underline decoration-cyan-700/30 underline-offset-2 transition-colors hover:text-cyan-900 hover:decoration-cyan-900/50 dark:text-cyan-300 dark:hover:text-cyan-100"
      >
        {match.original}
      </Link>
    );

    offset += match.index + match.length;
    remaining = remaining.slice(match.index + match.length);
  }

  return parts;
}

// Recursively walk React children, replacing text in string nodes with linked
// versions.  Skips <a> and <code> subtrees to avoid double-linking.
function processChildren(node: ReactNode, linked: Set<string>, keyBase: string): ReactNode {
  if (typeof node === 'string') {
    const parts = linkifyText(node, linked, keyBase);
    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
  }

  if (Array.isArray(node)) {
    return node.flatMap((child, i) => {
      const result = processChildren(child, linked, `${keyBase}-${i}`);
      return Array.isArray(result) ? result : [result];
    });
  }

  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.type === 'a' || el.type === 'code' || el.type === Link) return el;
    if (el.props.children == null) return el;
    const newChildren = processChildren(el.props.children, linked, keyBase);
    return cloneElement(el, {}, newChildren);
  }

  return node;
}

// Custom paragraph that injects internal service links into its text content.
// A fresh `linked` set per paragraph means each service is linked at most once
// per paragraph — clean and predictable without needing cross-component state.
function LinkedParagraph({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
  const linked = new Set<string>();
  const processed = processChildren(children as ReactNode, linked, 'p');
  return (
    <p {...props} className="mt-5 leading-8 text-slate-700 dark:text-gray-300">
      {processed}
    </p>
  );
}

// ─── MDX component map ────────────────────────────────────────────────────────

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold text-slate-950 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-slate-900 dark:text-gray-100">{children}</h3>
    ),
    p: LinkedParagraph,
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
        loading="lazy"
        sizes="(min-width: 1024px) 768px, 100vw"
        className="mt-8 h-auto w-full rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700"
      />
    ),
    ...components,
  };
}
