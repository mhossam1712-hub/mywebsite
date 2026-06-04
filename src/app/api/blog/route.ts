import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { safeAuthErrorMessage, validateBlogWriteRequest } from '@/lib/blog-admin-auth';

export const runtime = 'nodejs';

interface BlogArticleRequest {
  title?: string;
  description?: string;
  category?: string;
  content?: string;
  slug?: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function escapeMetadata(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getAvailableSlug(baseSlug: string) {
  const fallbackSlug = baseSlug || 'untitled-article';
  let slug = fallbackSlug;
  let suffix = 2;

  while (await fileExists(path.join(blogDirectory, `${slug}.mdx`))) {
    slug = `${fallbackSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function safeError(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  const auth = validateBlogWriteRequest(request);

  if (!auth.ok) {
    return safeError(safeAuthErrorMessage(auth.reason), auth.status);
  }

  let body: BlogArticleRequest;

  try {
    body = (await request.json()) as BlogArticleRequest;
  } catch {
    return safeError('Invalid request body', 400);
  }

  const title = body.title?.trim() ?? '';
  const description = body.description?.trim() ?? '';
  const category = body.category?.trim() || 'Eye Health';
  const content = body.content?.trim() ?? '';

  if (!title || !description || !content) {
    return safeError('Title, description, and article content are required.', 400);
  }

  if (title.length > 140 || description.length > 320 || category.length > 80 || content.length > 50000) {
    return safeError('Submitted article is too large.', 413);
  }

  const baseSlug = slugify(body.slug?.trim() || title);
  const slug = await getAvailableSlug(baseSlug);
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const date = new Date().toISOString().slice(0, 10);

  const mdx = `export const metadata = {
  slug: '${escapeMetadata(slug)}',
  title: '${escapeMetadata(title)}',
  description: '${escapeMetadata(description)}',
  date: '${date}',
  readingTime: '${estimateReadingTime(content)}',
  category: '${escapeMetadata(category)}',
};

${content}
`;

  await writeFile(filePath, mdx, 'utf8');

  return NextResponse.json({
    success: true,
    slug,
    filePath: `src/content/blog/${slug}.mdx`,
  });
}
