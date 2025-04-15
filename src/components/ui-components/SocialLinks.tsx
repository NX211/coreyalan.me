'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4">
      <a 
        href="https://github.com/NX211" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
        aria-label="GitHub"
      >
        <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
      </a>
      <a 
        href="https://www.linkedin.com/in/corey-stone-17b19a80" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
        aria-label="LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
      </a>
      <a 
        href="https://authoritah.social/@nx211" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
        aria-label="Mastodon"
      >
        <FontAwesomeIcon icon={faMastodon} className="h-6 w-6" />
      </a>
      <a 
        href="https://bsky.app/profile/nx211.bsky.social" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
        aria-label="Bluesky"
      >
        <FontAwesomeIcon icon={faBluesky} className="h-6 w-6" />
      </a>
    </div>
  );
} 