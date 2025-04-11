'use client';

import { useState, useEffect } from 'react';
import { getGitHubProfile } from '@/lib/github';

export default function GitHubAvatar({ username, className }: { username: string; className?: string }) {
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
      <div className={`${className || 'w-32 h-32'} rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse`} />
    );
  }

  if (error || !avatarUrl) {
    // Fallback to logo if there's an error
    return (
      <img
        src="/images/logo.png"
        alt={username}
        className={className || 'w-32 h-32 rounded-full'}
      />
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={username}
      className={className || 'w-32 h-32 rounded-full'}
    />
  );
} 