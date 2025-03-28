// Define our standard repository interface
export interface RepoData {
  owner: string;
  repo: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  link: string;
}

// This is a fallback method that uses the REST API to get recent repositories
// GitHub's GraphQL API is preferred for getting pinned repositories, but requires authentication
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
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      link: repo.html_url || `https://github.com/${username}`
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// This is an unofficial API that can get pinned repositories without authentication
// Note that it might not be reliable long-term if GitHub changes their webpage structure
export async function getPinnedRepos(username: string): Promise<RepoData[]> {
  try {
    // Use an unofficial API endpoint
    const response = await fetch(`https://gh-pinned-repos.egoist.dev/api/user/${username}`);
    
    if (!response.ok) {
      console.log('Pinned repos API failed, falling back to standard repos');
      return getGitHubRepos(username);
    }
    
    const pinnedRepos = await response.json();
    
    // Check if we got a valid response with an array
    if (!Array.isArray(pinnedRepos)) {
      console.log('Pinned repos response is not an array:', pinnedRepos);
      return getGitHubRepos(username);
    }
    
    // Add a specific check for empty array or wrong data
    if (pinnedRepos.length === 0) {
      console.log('Pinned repos array is empty, falling back to standard repos');
      return getGitHubRepos(username);
    }
    
    // Log the pinned repos for debugging
    console.log('Raw pinned repos:', JSON.stringify(pinnedRepos, null, 2));
    
    // Transform to our standard format
    const formattedRepos = pinnedRepos
      .filter((repo: any) => repo.repo !== 'coreyalan.me') // Filter out the website repo
      .map((repo: any) => ({
        owner: repo.owner || username,
        repo: repo.repo || 'Unknown Repository',
        description: repo.description || 'No description provided',
        language: repo.language || '',
        stars: typeof repo.stars === 'number' ? repo.stars : 0,
        forks: typeof repo.forks === 'number' ? repo.forks : 0,
        link: repo.link || `https://github.com/${username}/${repo.repo || ''}`
      }));
    
    // Ensure we only return actual pinned repos
    return formattedRepos;
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return getGitHubRepos(username);
  }
}

// Fetch GitHub user profile information
export interface GitHubUserProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  blog: string;
  location: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export async function getGitHubProfile(username: string): Promise<GitHubUserProfile | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
} 