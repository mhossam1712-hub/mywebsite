import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';
import { LOCALES } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abdallaeyeclinic.com';

const staticRoutes = [
  '',
  '/about',
  '/appointments',
  '/blog',
  '/contact',
  '/doctors',
  '/eye-tests',
  '/faqs',
  '/services',
] as const;

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

async function getDefaultUrls() {
  const posts = await getBlogPosts();
  const urls: string[] = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      urls.push(absoluteUrl(`/${locale}${route}`));
    }

    for (const post of posts) {
      urls.push(absoluteUrl(`/${locale}/blog/${post.slug}`));
    }
  }

  return urls;
}

export async function POST(request: NextRequest) {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return NextResponse.json(
      { success: false, error: 'INDEXNOW_KEY is not configured' },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const urlList = Array.isArray(body.urlList) && body.urlList.length > 0
    ? body.urlList
    : await getDefaultUrls();

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key,
      keyLocation: absoluteUrl('/indexnow-key.txt'),
      urlList,
    }),
  });

  return NextResponse.json({
    success: response.ok,
    status: response.status,
    submitted: urlList.length,
  }, { status: response.ok ? 200 : 502 });
}
