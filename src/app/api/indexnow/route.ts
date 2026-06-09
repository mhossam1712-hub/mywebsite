import { NextResponse } from 'next/server';

const indexNowPayload = {
  host: 'www.abdallaeyeclinic.com',
  key: 'c39fca90b8c641cdbce65f86b5cc31c9',
  keyLocation: 'https://www.abdallaeyeclinic.com/c39fca90b8c641cdbce65f86b5cc31c9.txt',
  urlList: [
    'https://www.abdallaeyeclinic.com/',
    'https://www.abdallaeyeclinic.com/en',
    'https://www.abdallaeyeclinic.com/en/services',
    'https://www.abdallaeyeclinic.com/en/appointments',
    'https://www.abdallaeyeclinic.com/en/doctors',
    'https://www.abdallaeyeclinic.com/en/eye-tests',
    'https://www.abdallaeyeclinic.com/en/contact',
    'https://www.abdallaeyeclinic.com/en/about',
    'https://www.abdallaeyeclinic.com/en/blog',
    'https://www.abdallaeyeclinic.com/ar',
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
