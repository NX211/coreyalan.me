'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { getPinnedRepos, RepoData } from '@/lib/github';

// Function to get tag color based on language
const getLanguageColor = (language: string): string => {
  const colorMap: Record<string, string> = {
    "JavaScript": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "TypeScript": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Python": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Go": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    "Java": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "C#": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "PHP": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    "Ruby": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Rust": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    "HTML": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "CSS": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Shell": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };
  
  return colorMap[language] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
};

// Function to generate additional tags based on repo name and description
const getAdditionalTags = (repo: RepoData): { name: string, color: string }[] => {
  const tags: { name: string, color: string }[] = [];
  const nameAndDesc = `${repo.repo.toLowerCase()} ${repo.description.toLowerCase()}`;
  
  // Check for common topics
  if (nameAndDesc.includes('traefik')) {
    tags.push({ name: 'Traefik', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' });
  }
  
  if (nameAndDesc.includes('proxmox')) {
    tags.push({ name: 'Proxmox', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' });
  }
  
  if (nameAndDesc.includes('docker') || nameAndDesc.includes('container')) {
    tags.push({ name: 'Docker', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' });
  }
  
  if (nameAndDesc.includes('web')) {
    tags.push({ name: 'Web', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' });
  }
  
  if (nameAndDesc.includes('api')) {
    tags.push({ name: 'API', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' });
  }
  
  if (nameAndDesc.includes('plugin')) {
    tags.push({ name: 'Plugin', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' });
  }
  
  // Return up to 2 additional tags
  return tags.slice(0, 2);
};

export default function GithubPinnedRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        setLoading(true);
        
        // Fetch pinned repositories using our utility
        const pinnedRepos = await getPinnedRepos(username);
        
        // Add debugging
        console.log("Fetched GitHub repos:", JSON.stringify(pinnedRepos, null, 2));
        
        setRepos(pinnedRepos);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, [username]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg text-center">
        <FontAwesomeIcon icon={faExclamationTriangle} className="h-8 w-8 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{error}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Unable to load repositories from GitHub. Please try again later.
        </p>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Pinned Repositories</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No pinned repositories found on this GitHub profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <div key={`${repo.owner}-${repo.repo}`} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {repo.repo}
          </h3>
          
          {/* Tags section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.language && (
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getLanguageColor(repo.language)}`}>
                {repo.language}
              </span>
            )}
            {getAdditionalTags(repo).map((tag, index) => (
              <span key={index} className={`text-xs font-medium px-2.5 py-0.5 rounded ${tag.color}`}>
                {tag.name}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
            {repo.description || 'No description provided'}
          </p>
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2">
                {/* Language tag moved to the top with other tags */}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center">
                  <FontAwesomeIcon icon={faStar} className="mr-1 h-3 w-3" />
                  {repo.stars}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center">
                  <FontAwesomeIcon icon={faCodeBranch} className="mr-1 h-3 w-3" />
                  {repo.forks}
                </span>
              </div>
            </div>
            <div className="text-right">
              <a
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View Repository
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 