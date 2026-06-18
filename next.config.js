/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const createMDX = require('@next/mdx');

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const canonicalOrigin = 'https://abdallaeyeclinic.com';
const wwwHost = 'www.abdallaeyeclinic.com';

const unlocalizedLegacyEyeTestSources = [
  '/eye-tests',
  '/near-vision-test',
  '/near-vision-test.html',
];

const localizedLegacyEyeTestSources = [
  '/:lang(en|ar)/near-vision-test',
  '/:lang(en|ar)/near-vision-test.html',
];

// Next.js path matching is case-insensitive, so locale-prefixed variants like
// /en/Contact would shadow the real /en/contact page. Only keep un-localized
// legacy entries and send them to the correct canonical page.
function oldBrokenUrlRedirects() {
  return [
    { source: '/Contact', destination: '/en/contact', statusCode: 301 },
    { source: '/FAQs', destination: '/en/faqs', statusCode: 301 },
  ];
}

function legacyEyeTestRedirects() {
  return [
    ...localizedLegacyEyeTestSources.map((source) => ({
      source,
      destination: '/:lang/eye-tests',
      permanent: true,
    })),
    ...unlocalizedLegacyEyeTestSources.flatMap((source) => [
      {
        source,
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '^ar(?:-|,|;|$).*',
          },
        ],
        destination: '/ar/eye-tests',
        permanent: true,
      },
      {
        source,
        destination: '/en/eye-tests',
        permanent: true,
      },
    ]),
  ];
}

function canonicalRedirects() {
  return [
    {
      // Single-hop: www (http or https) → non-www HTTPS canonical
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: wwwHost,
        },
      ],
      destination: `${canonicalOrigin}/:path*`,
      statusCode: 301,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      ...oldBrokenUrlRedirects(),
      ...canonicalRedirects(),
      ...legacyEyeTestRedirects(),
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    qualities: [70, 75, 80, 85],
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(withMDX(nextConfig));
