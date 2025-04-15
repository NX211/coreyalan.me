import { z } from 'zod';

/**
 * GitHub repository data schema
 */
export const repoDataSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  description: z.string(),
  language: z.string(),
  stars: z.number().int().min(0),
  forks: z.number().int().min(0),
  link: z.string().url()
});

export type RepoData = z.infer<typeof repoDataSchema>;

/**
 * GitHub user profile schema
 */
export const gitHubUserProfileSchema = z.object({
  login: z.string().min(1),
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  html_url: z.string().url(),
  blog: z.string(),
  location: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number().int().min(0),
  followers: z.number().int().min(0),
  following: z.number().int().min(0)
});

export type GitHubUserProfile = z.infer<typeof gitHubUserProfileSchema>;

/**
 * This is a fallback method that uses the REST API to get recent repositories
 * GitHub's GraphQL API is preferred for getting pinned repositories, but requires authentication
 */
export async function getGitHubRepos(username: string): Promise<RepoData[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const repos = await response.json();
    
    // Filter out the personal website repository
    const filteredRepos = repos.filter((repo: any) => repo.name !== 'coreyalan.me');
    
    // Transform GitHub API format to our standard format
    return filteredRepos.slice(0, 3).map((repo: any) => ({
      owner: repo.owner?.login || username,
      repo: repo.name || 'Unknown Repository',
      description: repo.description || 'No description provided',
      language: repo.language || '',
      stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
      forks: typeof repo.forks_count === 'number' ? repo.forks_count : 0,
      link: repo.html_url || `https://github.com/${username}`
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

/**
 * This is an unofficial API that can get pinned repositories without authentication
 * Note that it might not be reliable long-term if GitHub changes their webpage structure
 */
export async function getPinnedRepos(username: string): Promise<RepoData[]> {
  try {
    // Use an unofficial API endpoint
    const response = await fetch(`https://gh-pinned-repos.egoist.dev/api/user/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pinned repositories');
    }
    
    const data = await response.json();
    return data.map((repo: any) => ({
      owner: username,
      repo: repo.repo,
      description: repo.description,
      language: repo.language,
      stars: typeof repo.stars === 'number' ? repo.stars : 0,
      forks: typeof repo.forks === 'number' ? repo.forks : 0,
      link: repo.link
    }));
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return [];
  }
}

/**
 * Fetch GitHub user profile information
 */
export async function getGitHubProfile(username: string): Promise<GitHubUserProfile | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    
    const data = await response.json();
    return {
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name,
      bio: data.bio,
      html_url: data.html_url,
      blog: data.blog,
      location: data.location,
      twitter_username: data.twitter_username,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
} 