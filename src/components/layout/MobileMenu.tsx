'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const getLinkClass = () => {
    return 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white';
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <Link 
            href="/" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            About
          </Link>
          <Link 
            href="/projects" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            Contact
          </Link>
          <Link 
            href="/client-portal" 
            className={`${getLinkClass()} py-2`}
            onClick={onClose}
          >
            Client Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu; 