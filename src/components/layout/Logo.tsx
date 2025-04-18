'use client';

import Link from 'next/link';
import Image from 'next/image'; // Re-enabled

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Reverted back to next/image */}
      <div className="relative w-8 h-8">
        <Image
          src="/images/logo-header.png" // Kept corrected path
          alt="Corey Alan Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 32px, 32px"
          priority
        />
      </div>
      <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
        Corey Alan
      </span>
    </Link>
  );
}

export default Logo; 