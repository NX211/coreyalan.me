'use client';

import { cache } from 'react';
import Image from 'next/image';
import { getGitHubProfile } from '@/lib/github/index';

// Server Component
async function GitHubAvatarServer({ username, size = 128, className }: { 
  username: string; 
  size?: number;
  className?: string; 
}) {
  const profile = await getGitHubProfile(username);
  const avatarUrl = profile?.avatar_url || '/images/logo.png';
  const altText = profile ? username : `${username} (fallback)`;

  return (
    <Image
      src={avatarUrl}
      alt={altText}
      width={size}
      height={size}
      className={className || 'rounded-full'}
    />
  );
}

// Client Component Wrapper
export default function GitHubAvatar(props: { 
  username: string; 
  size?: number;
  className?: string; 
}) {
  return <GitHubAvatarServer {...props} />;
} 