'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Separated into its own component because useSearchParams() requires a Suspense
// boundary in the App Router — keeping it here so callers don't need to wrap.
function PixelPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Skip the initial mount — the base code in the Script block already fires
    // fbq('track','PageView') once. Only subsequent soft navigations need it.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');
      `}</Script>
      {/* noscript fallback for browsers with JavaScript disabled */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <PixelPageViewTracker />
      </Suspense>
    </>
  );
}
