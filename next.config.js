/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const createMDX = require('@next/mdx');

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },
  images: {
    qualities: [70, 72, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
};

module.exports = withNextIntl(withMDX(nextConfig));
