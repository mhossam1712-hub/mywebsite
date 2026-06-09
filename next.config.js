/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const createMDX = require('@next/mdx');

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const canonicalOrigin = 'https://www.abdallaeyeclinic.com';
const apexHost = 'abdallaeyeclinic.com';
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
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: apexHost,
        },
      ],
      destination: `${canonicalOrigin}/:path*`,
      statusCode: 301,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: wwwHost,
        },
        {
          type: 'header',
          key: 'x-forwarded-proto',
          value: 'http',
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
    qualities: [70, 72, 75],
    unoptimized: false,
  },
};

module.exports = withNextIntl(withMDX(nextConfig));
