'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import Icon from '@/components/ui-components/Icon';
import { faBars, faXmark, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import ScrollHandler from './ScrollHandler';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useSession } from '@/lib/hooks/useSession';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const session = useSession();
  const isAuthenticated = session?.isAuthenticated ?? false;

  const handleScrollChange = (scrolled: boolean) => {
    setIsScrolled(scrolled);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <ScrollHandler onScrollChange={handleScrollChange} />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="px-4">
            <NavLinks />
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* Auth Buttons - Desktop */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <Button asChild variant="default">
                  <Link href="/auth/logout">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="default">
                  <Link href="/auth/login">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Mobile Auth Button */}
            <div className="md:hidden">
              {isAuthenticated ? (
                <Button asChild variant="ghost" size="icon">
                  <Link href="/auth/logout">
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="icon">
                  <Link href="/auth/login">
                    <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Icon 
                icon={isMenuOpen ? faXmark : faBars} 
                className="w-5 h-5"
              />
            </Button>
          </div>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </header>
  );
} 