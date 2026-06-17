import { NextResponse } from 'next/server';

const indexNowPayload = {
  host: 'abdallaeyeclinic.com',
  key: 'c39fca90b8c641cdbce65f86b5cc31c9',
  keyLocation: 'https://abdallaeyeclinic.com/c39fca90b8c641cdbce65f86b5cc31c9.txt',
  urlList: [
    'https://abdallaeyeclinic.com/',
    'https://abdallaeyeclinic.com/en',
    'https://abdallaeyeclinic.com/en/services',
    'https://abdallaeyeclinic.com/en/appointments',
    'https://abdallaeyeclinic.com/en/doctors',
    'https://abdallaeyeclinic.com/en/eye-tests',
    'https://abdallaeyeclinic.com/en/contact',
    'https://abdallaeyeclinic.com/en/about',
    'https://abdallaeyeclinic.com/en/blog',
    'https://abdallaeyeclinic.com/ar',
  ],
};

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function submitToEndpoint(url: string): Promise<{ ok: boolean; status: number; error?: string }> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(indexNowPayload),
    });
    const error = res.ok ? undefined : (await res.text()) || res.statusText;

    return { ok: res.ok, status: res.status, error };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export async function POST() {
  const [indexNow, bing] = await Promise.all([
    submitToEndpoint('https://api.indexnow.org/indexnow'),
    submitToEndpoint('https://www.bing.com/indexnow'),
  ]);

  const allOk = indexNow.ok && bing.ok;

  return NextResponse.json(
    {
      success: allOk,
      submitted: indexNowPayload.urlList.length,
      results: {
        indexNow: { status: indexNow.status, ok: indexNow.ok, ...(indexNow.error ? { error: indexNow.error } : {}) },
        bing: { status: bing.status, ok: bing.ok, ...(bing.error ? { error: bing.error } : {}) },
      },
    },
    { status: allOk ? 200 : 502 }
  );
}
