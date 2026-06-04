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
      source: '/',
      has: [
        {
          type: 'host',
          value: apexHost,
        },
      ],
      destination: `${canonicalOrigin}/en`,
      permanent: true,
    },
    {
      source: '/',
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
      destination: `${canonicalOrigin}/en`,
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: apexHost,
        },
      ],
      destination: `${canonicalOrigin}/:path*`,
      permanent: true,
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
      permanent: true,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      ...canonicalRedirects(),
      ...legacyEyeTestRedirects(),
      {
        source: '/',
        destination: `${canonicalOrigin}/en`,
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [70, 72, 75],
    unoptimized: false,
  },
};

module.exports = withNextIntl(withMDX(nextConfig));
