import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import {
  BLOG_ADMIN_CSRF_COOKIE,
  BLOG_ADMIN_SESSION_COOKIE,
  authenticateBlogAdminPassword,
  blogAdminCookieOptions,
  blogAdminCsrfCookieOptions,
  createBlogAdminSession,
  createCsrfToken,
  hasValidBlogAdminSession,
  isBlogAdminConfigured,
  isBlogAuthoringEnabled,
} from '@/lib/blog-admin-auth';
import DashboardClient from './DashboardClient';

interface DashboardPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string }>;
}

function dashboardPath(lang: string, error?: string) {
  return error ? `/${lang}/dashboard?error=${encodeURIComponent(error)}` : `/${lang}/dashboard`;
}

function AccessUnavailable() {
  return (
    <div className="bg-medical-50 px-4 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader title="Admin access unavailable" subtitle="Blog authoring is not enabled for this environment." />
          <CardBody>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Configure the required server environment variables to use this dashboard.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function LoginForm({ lang, error }: { lang: string; error?: string }) {
  async function login(formData: FormData) {
    'use server';

    const password = formData.get('password');

    if (!isBlogAuthoringEnabled() || !isBlogAdminConfigured()) {
      redirect(dashboardPath(lang, 'unavailable'));
    }

    if (!authenticateBlogAdminPassword(password)) {
      redirect(dashboardPath(lang, 'invalid'));
    }

    const cookieStore = await cookies();
    const csrfToken = createCsrfToken();

    cookieStore.set(BLOG_ADMIN_SESSION_COOKIE, createBlogAdminSession(), blogAdminCookieOptions());
    cookieStore.set(BLOG_ADMIN_CSRF_COOKIE, csrfToken, blogAdminCsrfCookieOptions());

    redirect(dashboardPath(lang));
  }

  const errorMessage =
    error === 'invalid'
      ? 'Invalid admin password.'
      : error === 'unavailable'
        ? 'Admin access is not available.'
        : '';

  return (
    <div className="bg-medical-50 px-4 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader title="Blog admin" subtitle="Sign in to create clinic articles." />
          <CardBody>
            <form action={login} className="space-y-5">
              <div>
                <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  Admin password
                </label>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                />
              </div>

              {errorMessage && (
                <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" size="lg" fullWidth>
                Sign in
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default async function DashboardPage({ params, searchParams }: DashboardPageProps) {
  const { lang } = await params;
  const { error } = await searchParams;

  if (!isBlogAuthoringEnabled() || !isBlogAdminConfigured()) {
    return <AccessUnavailable />;
  }

  const cookieStore = await cookies();

  if (!hasValidBlogAdminSession(cookieStore)) {
    return <LoginForm lang={lang} error={error} />;
  }

  const csrfToken = cookieStore.get(BLOG_ADMIN_CSRF_COOKIE)?.value;

  if (!csrfToken || !/^[a-f0-9]{48}$/i.test(csrfToken)) {
    return <LoginForm lang={lang} error="unavailable" />;
  }

  return <DashboardClient csrfToken={csrfToken} />;
}
