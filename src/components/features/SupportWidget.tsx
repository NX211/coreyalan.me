'use client';

import { useEffect } from 'react';

export default function SupportWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://support.coreyalan.me/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
} 