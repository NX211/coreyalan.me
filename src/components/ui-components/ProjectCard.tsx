'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode, faLink } from '@fortawesome/free-solid-svg-icons';
import { ProjectInfo } from '@/types/common';

interface ProjectCardProps extends Omit<ProjectInfo, 'technologies' | 'type'> {}

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  catalogUrl,
  websiteUrl,
  logoUrl
}: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {logoUrl && (
              <div className="relative flex-shrink-0 w-10 h-10">
                <Image 
                  src={logoUrl} 
                  alt={`${title} logo`} 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
          </div>
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
            </a>
          )}
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {tags.map((tag) => {
              // Map color string to the appropriate Tailwind classes
              const getTagClasses = (color: string) => {
                const colorMap: Record<string, string> = {
                  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                  pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
                  indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
                  gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                };
                
                return colorMap[color] || colorMap.gray;
              };
              
              return (
                <span 
                  key={tag.name} 
                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${getTagClasses(tag.color)}`}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>
        )}
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
            >
              <FontAwesomeIcon icon={faCode} className="mr-2 h-4 w-4" />
              View Code
            </a>
          )}
          {websiteUrl && (
            <a 
              href={websiteUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
            >
              <FontAwesomeIcon icon={faLink} className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          )}
          {catalogUrl && (
            <a 
              href={catalogUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
            >
              <FontAwesomeIcon icon={faLink} className="mr-2 h-4 w-4" />
              View Catalog
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 