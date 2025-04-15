'use client';

import { useState, useEffect } from 'react';

interface ScrollHandlerProps {
  onScrollChange: (isScrolled: boolean) => void;
}

function ScrollHandler({ onScrollChange }: ScrollHandlerProps) {
  useEffect(() => {
    const handleScroll = () => {
      onScrollChange(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollChange]);

  return null;
}

export default ScrollHandler; 