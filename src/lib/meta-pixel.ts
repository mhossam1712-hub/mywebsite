export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    // Don't pass a third argument when there are no params — fbevents.js
    // distinguishes between a missing data object and an explicit undefined.
    if (params !== undefined) {
      window.fbq('track', name, params);
    } else {
      window.fbq('track', name);
    }
  }
}
