'use client';

import Link from 'next/link';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative w-12 h-12">
        <Image
          src="/images/logo.png"
          alt="Corey Alan Consulting Logo"
          fill
          className="object-contain"
          sizes="48px"
          priority
        />
      </div>
      <span className="text-xl font-bold text-[#37abc8]">Corey Alan Consulting</span>
    </Link>
  );
}

export default Logo; 