import type { ComponentType } from 'react';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  author?: string;
  authorTitle?: string;
  image?: string;
  imageAlt?: string;
}

interface BlogPostModule {
  default: ComponentType;
  metadata: BlogPostMetadata;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getBlogSlugs() {
  const files = await readdir(blogDirectory);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
    .sort();
}

export async function getBlogPost(slug: string) {
  const slugs = await getBlogSlugs();

  if (!slugs.includes(slug)) {
    return null;
  }

  return import(`@/content/blog/${slug}.mdx`) as Promise<BlogPostModule>;
}

export async function getBlogPosts() {
  const slugs = await getBlogSlugs();
  const loadedPosts = await Promise.all(slugs.map((slug) => getBlogPost(slug)));

  return loadedPosts
    .filter((post): post is BlogPostModule => Boolean(post))
    .map((post) => post.metadata)
    .sort((a, b) => b.date.localeCompare(a.date));
}
