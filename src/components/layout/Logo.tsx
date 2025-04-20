'use client';

import Link from 'next/link';
import Image from 'next/image'; // Re-enabled

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Increased logo size again */}
      <div className="relative w-16 h-16"> {/* Increased to 56x56px (h-14) to better fill header height */}
        <Image
          src="/images/logo-header.png" // Kept corrected path
          alt="Corey Alan Logo"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 68px, 68px" // Updated sizes to match new dimensions
          priority
        />
      </div>
    </Link>
  );
}

export default Logo; 