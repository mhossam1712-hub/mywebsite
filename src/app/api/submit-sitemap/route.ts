import { NextResponse } from 'next/server';

const SITEMAP_URL = 'https://abdallaeyeclinic.com/sitemap.xml';

const PING_ENDPOINTS = [
  { name: 'google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
  { name: 'bing', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
];

async function ping(name: string, url: string): Promise<{ name: string; ok: boolean; status: number; error?: string }> {
  try {
    const res = await fetch(url, { method: 'GET' });
    const error = res.ok ? undefined : (await res.text()) || res.statusText;

    return { name, ok: res.ok, status: res.status, ...(error ? { error } : {}) };
  } catch (err) {
    return { name, ok: false, status: 0, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function POST() {
  const results = await Promise.all(PING_ENDPOINTS.map(({ name, url }) => ping(name, url)));
  const allOk = results.every((r) => r.ok);

  return NextResponse.json(
    {
      success: allOk,
      sitemap: SITEMAP_URL,
      results: Object.fromEntries(results.map(({ name, ...rest }) => [name, rest])),
    },
    { status: allOk ? 200 : 502 }
  );
}
