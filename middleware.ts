import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/config';

const intlMiddleware = createMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const legacyPath = pathname.match(/^\/(en|ar)\/(Contact|FAQs)$/);

  if (legacyPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${legacyPath[1]}/${legacyPath[2].toLowerCase()}`;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
