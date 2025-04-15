'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLinks() {
  const pathname = usePathname();

  const getLinkClass = () => {
    return 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white';
  };

  return (
    <nav className="hidden md:flex space-x-8">
      <Link 
        href="/" 
        className={getLinkClass()}
      >
        Home
      </Link>
      <Link 
        href="/about" 
        className={getLinkClass()}
      >
        About
      </Link>
      <Link 
        href="/projects" 
        className={getLinkClass()}
      >
        Projects
      </Link>
      <Link 
        href="/blog" 
        className={getLinkClass()}
      >
        Blog
      </Link>
      <Link 
        href="/contact" 
        className={getLinkClass()}
      >
        Contact
      </Link>
      <Link 
        href="/client-portal" 
        className={getLinkClass()}
      >
        Client Portal
      </Link>
    </nav>
  );
}

export default NavLinks; 