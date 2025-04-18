import type { NextApiRequest, NextApiResponse } from 'next';

// Define a type for the expected pinned repository data structure (adjust as needed)
type PinnedRepo = {
  owner: string;
  repo: string;
  link: string;
  description?: string;
  image: string;
  website?: string;
  language?: string;
  languageColor?: string;
  stars: string | number;
  forks: string | number;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PinnedRepo[] | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // Replace with your actual GitHub username
  const username = 'NX211'; 
  const externalApiUrl = `https://gh-pinned-repos.egoist.dev/api/user/${username}`;

  try {
    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      // Log the error details from the external API if possible
      let errorBody = 'Failed to fetch from external service';
      try {
        errorBody = await response.text();
      } catch (_) { /* ignore parsing error */ }
      console.error(`Error fetching pinned repos from ${externalApiUrl}: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`External service responded with status ${response.status}`);
    }

    const pinnedRepos: PinnedRepo[] = await response.json();
    res.status(200).json(pinnedRepos);

  } catch (error) {
    console.error('Error in /api/github/pinned-repos:', error);
    const message = error instanceof Error ? error.message : 'An internal server error occurred';
    res.status(500).json({ message: `Failed to fetch pinned repositories: ${message}` });
  }
} 