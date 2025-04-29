'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FaqCardProps {
  question: string;
  children: React.ReactNode;
}

export function FaqCard({ question, children }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 sm:px-5 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white pr-4">{question}</h3>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible h-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
} 