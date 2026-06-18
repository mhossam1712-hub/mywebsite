export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, params);
  }
}
