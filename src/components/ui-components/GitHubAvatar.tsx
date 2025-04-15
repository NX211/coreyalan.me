'use client';

import { useState, useEffect } from 'react';
import { getGitHubProfile } from '@/lib/github';
import Image from 'next/image';

interface GitHubAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function GitHubAvatar({ size = 'md' }: GitHubAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        setLoading(true);
        const profile = await getGitHubProfile('coreyalan');
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
  }, []);

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse`} />
    );
  }

  if (error || !avatarUrl) {
    // Fallback to logo if there's an error
    return (
      <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden`}>
        <Image
          src="/logo.png"
          alt="GitHub avatar"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden`}>
      <Image
        src={avatarUrl}
        alt="GitHub avatar"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  );
} 