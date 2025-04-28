'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/hooks/useSession';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const session = useSession();
  const isAuthenticated = session?.isAuthenticated ?? false;

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
          
          {/* Auth Link in Mobile Menu */}
          {isAuthenticated ? (
            <Link 
              href="/auth/logout" 
              className="flex items-center py-2 text-primary"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          ) : (
            <Link 
              href="/auth/login" 
              className="flex items-center py-2 text-primary"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu; 