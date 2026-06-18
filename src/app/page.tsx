import { redirect } from 'next/navigation';

// Perform an internal server-side redirect so the browser never sees a
// round-trip to the full canonical URL — saves one HTTP round-trip on TTFB.
export default function RootPage() {
  redirect('/en');
}
