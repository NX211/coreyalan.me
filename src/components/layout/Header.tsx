'use client';

import { useState } from 'react';
import { useTheme } from '@/components/app-providers/ThemeProvider';
import Icon from '@/components/ui-components/Icon';
import { faBars, faXmark, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import ScrollHandler from './ScrollHandler';
import Logo from './Logo';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          
          <NavLinks />
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              <Icon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="w-5 h-5"
              />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <Icon 
                icon={isMenuOpen ? faXmark : faBars} 
                className="w-5 h-5"
              />
            </button>
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