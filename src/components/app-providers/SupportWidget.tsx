'use client';

import Script from 'next/script';

export function SupportWidget() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://widget.supportwidget.com/widget.js"
      data-widget-id="YOUR_WIDGET_ID"
    />
  );
} 