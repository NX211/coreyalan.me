'use client';

import Link from 'next/link';
import Image from 'next/image'; // Re-enabled

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Increased logo size again */}
      <div className="relative w-12 h-12"> {/* Increased from w-10 h-10 */}
        <Image
          src="/images/logo-header.png" // Kept corrected path
          alt="Corey Alan Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 48px, 48px" // Updated sizes
          priority
        />
      </div>
    </Link>
  );
}

export default Logo; 