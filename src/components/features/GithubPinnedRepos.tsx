'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui-components/Icon';
import { 
  faStar, 
  faCodeBranch,
  faExclamationCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GithubPinnedRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github/pinned-repos');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch pinned repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 flex items-center space-x-4">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 dark:bg-red-900/10 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon
              icon={faExclamationCircle}
              className="h-5 w-5 text-red-400 dark:text-red-500"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Error loading repositories
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No pinned repositories found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <Link
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center">
            <Icon
              icon={faGithub}
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
            />
            <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
              {repo.name}
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {repo.description}
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Icon
                icon={faStar}
                className="mr-1 h-4 w-4"
              />
              {repo.stargazers_count}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Icon
                icon={faCodeBranch}
                className="mr-1 h-4 w-4"
              />
              {repo.forks_count}
            </div>
            {repo.language && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {repo.language}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 