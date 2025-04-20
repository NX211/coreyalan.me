import { cache } from 'react';

export interface GitHubRelease {
  tag_name: string;
  assets: {
    name: string;
    browser_download_url: string;
  }[];
}

export interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches the latest RustDesk release information from GitHub
 * Uses React's cache to prevent multiple fetches during the same render
 */
export const getLatestRustDeskRelease = cache(async (): Promise<GitHubRelease> => {
  const response = await fetch(
    'https://api.github.com/repos/rustdesk/rustdesk/releases/latest',
    {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch RustDesk release information');
  }

  return response.json();
});

/**
 * Fetches pinned repositories from GitHub
 */
export const getPinnedRepos = cache(async (): Promise<RepoData[]> => {
  const response = await fetch(
    'https://api.github.com/users/corey-stone/repos?sort=updated&per_page=6',
    {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pinned repositories');
  }

  const repos = await response.json();
  return repos.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language,
    topics: repo.topics,
  }));
});

/**
 * Fetches GitHub user profile information
 */
export const getGitHubProfile = cache(async (username: string): Promise<GitHubProfile> => {
  const response = await fetch(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 3600 } // Revalidate every hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub profile information');
  }

  return response.json();
});