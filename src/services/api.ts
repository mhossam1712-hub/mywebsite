import type { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const REQUEST_TIMEOUT_MS = 10000;

function apiUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

async function postApi<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl(url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

    if (body && typeof body.success === 'boolean') {
      return body;
    }

    return {
      success: response.ok,
      error: response.ok ? undefined : 'Request failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof DOMException && error.name === 'AbortError'
        ? 'Request timed out'
        : error instanceof Error ? error.message : 'Unknown error occurred',
    };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export const contactService = {
  sendContactForm: (data: unknown) => postApi('/contact', data),
};
