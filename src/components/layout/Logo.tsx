'use client';

import Link from 'next/link';
// import Image from 'next/image'; // Temporarily commented out

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Using standard img tag for testing */}
      <img 
        src="/images/logo-header.png"
        alt="Corey Alan Logo"
        className="w-8 h-8 object-contain"
        // Removed fill, sizes, priority - not applicable to standard img
      />
      <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
        Corey Alan
      </span>
    </Link>
  );
}

export default Logo; 