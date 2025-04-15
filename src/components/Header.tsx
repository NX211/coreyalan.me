'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = () => {
    return 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white';
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary dark:text-white">
            <img src="/images/logo-header.png" alt="Corey Stone" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={getLinkClass()}>
              Home
            </Link>
            <Link href="/about" className={getLinkClass()}>
              About
            </Link>
            <Link href="/projects" className={getLinkClass()}>
              Projects
            </Link>
            <Link href="/blog" className={getLinkClass()}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClass()}>
              Contact
            </Link>
            <Link href="/client-portal" className={getLinkClass()}>
              Client Portal
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="h-5 w-5 text-gray-700 dark:text-gray-300" 
              />
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="h-5 w-5 text-gray-700 dark:text-gray-300" 
              />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faXmark : faBars} 
                className="h-5 w-5 text-gray-700 dark:text-gray-300" 
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/projects" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="/blog" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/client-portal" 
                className={`${getLinkClass()} py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 