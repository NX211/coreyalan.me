import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface OpenSourceProject {
  name: string;
  description: string;
  iconUrl: string;
  websiteUrl: string;
  githubUrl?: string;
  gitlabUrl?: string;
  category: 'business' | 'support' | 'contribution';
}

const projects: OpenSourceProject[] = [
  {
    name: 'OpenSign',
    description: 'An open-source document signing platform that provides secure and efficient digital signature solutions.',
    iconUrl: '/images/projects/opensign-logo.svg',
    websiteUrl: 'https://opensign.com',
    githubUrl: 'https://github.com/opensign/opensign',
    category: 'business'
  },
  {
    name: 'FreeScout',
    description: 'A free and open-source help desk and shared inbox solution for managing customer support.',
    iconUrl: '/images/projects/freescout-logo.svg',
    websiteUrl: 'https://freescout.net',
    githubUrl: 'https://github.com/freescout-helpdesk/freescout',
    category: 'business'
  },
  {
    name: 'Invoice Ninja',
    description: 'An open-source invoicing and time-tracking platform for freelancers and small businesses.',
    iconUrl: '/images/projects/invoice-ninja-logo.svg',
    websiteUrl: 'https://invoiceninja.com',
    githubUrl: 'https://github.com/invoiceninja/invoiceninja',
    category: 'business'
  },
  {
    name: 'Rust Desk',
    description: 'A remote desktop software written in Rust, providing secure and efficient remote access.',
    iconUrl: '/images/projects/rustdesk-logo.svg',
    websiteUrl: 'https://rustdesk.com',
    githubUrl: 'https://github.com/rustdesk/rustdesk',
    category: 'business'
  },
  {
    name: 'Keila',
    description: 'An open-source email marketing platform for managing newsletters and campaigns.',
    iconUrl: '/images/projects/keila-logo.svg',
    websiteUrl: 'https://keila.io',
    githubUrl: 'https://github.com/pentacent/keila',
    category: 'business'
  },
  {
    name: 'Traefik',
    description: 'A modern HTTP reverse proxy and load balancer that makes deploying microservices easy.',
    iconUrl: '/images/projects/traefik-logo.svg',
    websiteUrl: 'https://traefik.io',
    githubUrl: 'https://github.com/traefik/traefik',
    category: 'support'
  }
];

export default function OpenSourceProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div 
          key={project.name}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col"
        >
          <div className="p-6 flex-grow">
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center mb-3">
                <Image
                  src={project.iconUrl}
                  alt={`${project.name} logo`}
                  fill
                  className="p-1"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                {project.name}
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                project.category === 'business' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                project.category === 'support' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
              }`}>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.websiteUrl && (
                <Link
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
                >
                  <FontAwesomeIcon icon={faLink} className="mr-2 h-4 w-4" />
                  Website
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
                >
                  <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              )}
              {project.gitlabUrl && (
                <Link
                  href={project.gitlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary dark:text-blue-400 hover:underline"
                >
                  <FontAwesomeIcon icon={faGitlab} className="mr-2 h-4 w-4" />
                  GitLab
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 