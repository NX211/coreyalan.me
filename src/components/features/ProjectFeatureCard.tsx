'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui-components/Icon';
import { 
  faExternalLinkAlt,
  faCode,
  faServer,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { ProjectFeature } from '@/types/common';

interface ProjectFeatureCardProps extends Omit<ProjectFeature, 'technologies'> {
  technologies: string[];
}

export default function ProjectFeatureCard({
  title,
  description,
  imageUrl,
  technologies,
  githubUrl,
  liveUrl,
  type
}: ProjectFeatureCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-2 right-2 z-10">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            type === 'frontend' ? 'bg-blue-100 text-blue-800' :
            type === 'backend' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {type === 'frontend' && <Icon icon={faCode} className="mr-1 h-3 w-3" />}
            {type === 'backend' && <Icon icon={faServer} className="mr-1 h-3 w-3" />}
            {type === 'fullstack' && <Icon icon={faDatabase} className="mr-1 h-3 w-3" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-end space-x-4">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              <Icon icon={faCode} className="mr-1 h-4 w-4" />
              View Code
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              <Icon icon={faExternalLinkAlt} className="mr-1 h-4 w-4" />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 