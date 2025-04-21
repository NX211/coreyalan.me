import type { NextApiRequest, NextApiResponse } from 'next';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface ErrorResponse {
  message: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'NX211';

const query = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Repository[] | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN is not set');
    return res.status(500).json({ message: 'GitHub token is not configured' });
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      throw new Error('Failed to fetch data from GitHub API');
    }

    const repositories: Repository[] = data.data.user.pinnedItems.nodes.map((node: any) => ({
      name: node.name,
      description: node.description || '',
      html_url: node.url,
      stargazers_count: node.stargazerCount,
      forks_count: node.forkCount,
      language: node.primaryLanguage?.name || ''
    }));

    res.status(200).json(repositories);
  } catch (error) {
    console.error('Error in /api/github/pinned-repos:', error);
    const message = error instanceof Error ? error.message : 'An internal server error occurred';
    res.status(500).json({ message });
  }
} 