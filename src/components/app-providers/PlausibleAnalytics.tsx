'use client';

import Script from 'next/script';

export function PlausibleAnalytics() {
  return (
    <Script
      strategy="afterInteractive"
      data-domain="coreyalan.me"
      src="https://plausible.io/js/script.js"
    />
  );
} 