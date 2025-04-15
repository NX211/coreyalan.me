'use client';

import { useThemeStore } from '@/store/useStore';
import Icon from './Icon';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Icon
        icon={theme === 'light' ? faMoon : faSun}
        className="w-5 h-5 text-gray-800 dark:text-gray-200"
      />
    </button>
  );
} 