// Canonical casing for every Meta standard event this site uses.
// Meta's fbq is case-sensitive: 'Lead' ≠ 'lead'. Normalising here means
// callers can never accidentally send a wrong-cased name.
const STANDARD_EVENTS: Record<string, string> = {
  lead: 'Lead',
  pageview: 'PageView',
  contact: 'Contact',
  purchase: 'Purchase',
  viewcontent: 'ViewContent',
  addtocart: 'AddToCart',
  search: 'Search',
  completeregistration: 'CompleteRegistration',
  subscribe: 'Subscribe',
  initiatecheckout: 'InitiateCheckout',
};

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    const canonical = STANDARD_EVENTS[name.toLowerCase()] ?? name;
    // Don't pass a third argument when there are no params — fbevents.js
    // distinguishes between a missing data object and an explicit undefined.
    if (params !== undefined) {
      window.fbq('track', canonical, params);
    } else {
      window.fbq('track', canonical);
    }
  }
}
