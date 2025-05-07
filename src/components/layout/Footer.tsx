'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary dark:text-white">
              Corey Alan Consulting
            </Link>
            <div className="flex space-x-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Turning Vision Into Reality With Code And Design
            </p>
            <div className="mt-4 flex space-x-4">
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
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a 
                  href="https://members.jlshawconsulting.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                >
                  JL Shaw Consulting
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/NX211/traefik-webfinger" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                >
                  Traefik WebFinger
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/NX211/traefik-proxmox-provider" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                >
                  Traefik Proxmox Provider
                </a>
              </li>
              <li>
                <a 
                  href="https://homelabhobby.social/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                >
                  HomeLab Hobby
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Corey Alan Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 