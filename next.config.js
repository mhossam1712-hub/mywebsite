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

const oldBrokenUrlSources = [
  '/Contact',
  '/FAQs',
  '/en/Contact',
  '/en/FAQs',
  '/ar/Contact',
  '/ar/FAQs',
];

function oldBrokenUrlRedirects() {
  return oldBrokenUrlSources.map((source) => ({
    source,
    destination: canonicalOrigin,
    statusCode: 301,
  }));
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
      {
        source: '/',
        destination: `${canonicalOrigin}/en`,
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    qualities: [70, 72, 75],
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
