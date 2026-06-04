import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const BLOG_ADMIN_SESSION_COOKIE = 'abdalla_blog_admin';
export const BLOG_ADMIN_CSRF_COOKIE = 'abdalla_blog_csrf';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

type AuthFailureReason =
  | 'disabled'
  | 'not-configured'
  | 'unauthorized'
  | 'bad-origin'
  | 'bad-csrf';

export interface AdminAuthResult {
  ok: boolean;
  reason?: AuthFailureReason;
  status: number;
}

export function isBlogAuthoringEnabled() {
  if (process.env.NODE_ENV === 'production') {
    return process.env.BLOG_AUTHORING_ENABLED === 'true';
  }

  return process.env.BLOG_AUTHORING_ENABLED !== 'false';
}

function getAdminPassword() {
  return process.env.BLOG_ADMIN_PASSWORD || process.env.ADMIN_DASHBOARD_PASSWORD || '';
}

function getAdminApiToken() {
  return process.env.BLOG_ADMIN_API_TOKEN || '';
}

function getSigningSecret() {
  return process.env.BLOG_ADMIN_SESSION_SECRET || getAdminPassword();
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

function sign(value: string) {
  const secret = getSigningSecret();

  if (!secret) return '';

  return createHmac('sha256', secret).update(value).digest('hex');
}

function validatePassword(password: string) {
  const expectedPassword = getAdminPassword();

  return Boolean(expectedPassword) && safeEqual(password, expectedPassword);
}

export function authenticateBlogAdminPassword(password: unknown) {
  return typeof password === 'string' && validatePassword(password);
}

export function isBlogAdminConfigured() {
  return Boolean(getAdminPassword());
}

export function createBlogAdminSession() {
  const issuedAt = Date.now().toString();
  const nonce = randomBytes(16).toString('hex');
  const payload = `${issuedAt}.${nonce}`;
  const signature = sign(payload);

  if (!signature) return '';

  return `${payload}.${signature}`;
}

function verifyBlogAdminSessionValue(value?: string) {
  if (!value) return false;

  const [issuedAt, nonce, signature] = value.split('.');

  if (!issuedAt || !nonce || !signature) return false;

  const issuedAtNumber = Number(issuedAt);
  const sessionAge = Date.now() - issuedAtNumber;

  if (!Number.isFinite(issuedAtNumber) || sessionAge < 0 || sessionAge > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  const expectedSignature = sign(`${issuedAt}.${nonce}`);

  return Boolean(expectedSignature) && safeEqual(signature, expectedSignature);
}

export function hasValidBlogAdminSession(cookieStore: CookieReader) {
  return verifyBlogAdminSessionValue(cookieStore.get(BLOG_ADMIN_SESSION_COOKIE)?.value);
}

export function createCsrfToken() {
  return randomBytes(24).toString('hex');
}

export function blogAdminCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function blogAdminCsrfCookieOptions() {
  return {
    httpOnly: false,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

function hasValidBearerToken(request: NextRequest) {
  const adminApiToken = getAdminApiToken();
  const authorization = request.headers.get('authorization');

  if (!adminApiToken || !authorization?.startsWith('Bearer ')) return false;

  return safeEqual(authorization.slice('Bearer '.length), adminApiToken);
}

function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (!origin) return false;

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

function hasValidCsrfToken(request: NextRequest) {
  const headerToken = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get(BLOG_ADMIN_CSRF_COOKIE)?.value;

  return Boolean(
    headerToken &&
      cookieToken &&
      /^[a-f0-9]{48}$/i.test(headerToken) &&
      /^[a-f0-9]{48}$/i.test(cookieToken) &&
      safeEqual(headerToken, cookieToken)
  );
}

export function validateBlogWriteRequest(request: NextRequest): AdminAuthResult {
  if (!isBlogAuthoringEnabled()) {
    return { ok: false, reason: 'disabled', status: 404 };
  }

  if (!isBlogAdminConfigured() && !getAdminApiToken()) {
    return { ok: false, reason: 'not-configured', status: 404 };
  }

  if (hasValidBearerToken(request)) {
    return { ok: true, status: 200 };
  }

  if (!verifyBlogAdminSessionValue(request.cookies.get(BLOG_ADMIN_SESSION_COOKIE)?.value)) {
    return { ok: false, reason: 'unauthorized', status: 401 };
  }

  if (!hasSameOrigin(request)) {
    return { ok: false, reason: 'bad-origin', status: 403 };
  }

  if (!hasValidCsrfToken(request)) {
    return { ok: false, reason: 'bad-csrf', status: 403 };
  }

  return { ok: true, status: 200 };
}

export function safeAuthErrorMessage(reason?: AuthFailureReason) {
  if (reason === 'disabled' || reason === 'not-configured') {
    return 'Not found';
  }

  if (reason === 'unauthorized') {
    return 'Authentication required';
  }

  return 'Request rejected';
}
