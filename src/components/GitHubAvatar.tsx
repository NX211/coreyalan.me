'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGitHubProfile } from '@/lib/github';

export default function GitHubAvatar({ username, size = 128, className }: { 
  username: string; 
  size?: number;
  className?: string; 
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        setLoading(true);
        const profile = await getGitHubProfile(username);
        if (profile) {
          setAvatarUrl(profile.avatar_url);
        } else {
          setError('Failed to load GitHub profile');
        }
      } catch (err) {
        console.error('Error fetching GitHub avatar:', err);
        setError('Failed to load GitHub avatar');
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [username]);

  if (loading) {
    return (
      <div 
        className={`${className || 'rounded-full'} bg-gray-200 dark:bg-gray-700 animate-pulse`}
        style={{ width: size, height: size }}
      />
    );
  }

  if (error || !avatarUrl) {
    // Fallback to logo if there's an error
    return (
      <Image
        src="/images/logo.png"
        alt={`${username} (fallback)`}
        width={size}
        height={size}
        className={className || 'rounded-full'}
      />
    );
  }

  return (
    <Image
      src={avatarUrl}
      alt={username}
      width={size}
      height={size}
      className={className || 'rounded-full'}
    />
  );
} 