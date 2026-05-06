const productionSiteUrl = 'https://www.abdallaeyeclinic.com';

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (
    !configuredUrl ||
    configuredUrl.includes('localhost') ||
    configuredUrl.includes('127.0.0.1')
  ) {
    return productionSiteUrl;
  }

  return configuredUrl.replace(/\/$/, '');
}
