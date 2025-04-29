'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface SiteProjectCardProps {
  title: string;
  tags: { name: string; color: 'blue' | 'green' | 'purple' | 'yellow' | 'orange' | 'pink' | 'red' | 'indigo' | 'gray' }[];
  websiteUrl?: string;
  logoUrl: string;
}

export default function SiteProjectCard({
  title,
  tags,
  websiteUrl,
  logoUrl,
}: SiteProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02]">
      {/* Site Screenshot */}
      <div className="relative w-full h-[480px]">
        <Image 
          src={logoUrl} 
          alt={`${title} website screenshot`} 
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          className="rounded-t-lg"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {tags.map((tag) => (
            <span 
              key={tag.name} 
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                tag.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                tag.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                tag.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                tag.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                tag.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                tag.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                tag.color === 'pink' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                tag.color === 'indigo' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Visit Website Button */}
        {websiteUrl && (
          <div className="flex justify-center">
            <a 
              href={websiteUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faLink} className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 