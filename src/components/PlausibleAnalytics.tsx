'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Extend Window interface with Plausible types
declare global {
  interface Window {
    plausible: any;
  }
}

export default function PlausibleAnalytics() {
  // Set up the plausible function
  useEffect(() => {
    window.plausible = window.plausible || function() { 
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  }, []);

  return (
    <>
      <Script
        defer
        data-domain="coreyalan.me"
        src="https://stats.authoritah.com/js/script.outbound-links.pageview-props.tagged-events.js"
        strategy="afterInteractive"
      />
    </>
  );
} 