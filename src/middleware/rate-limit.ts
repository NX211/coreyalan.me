import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRedisClient } from '@/lib/redis';

export async function rateLimitMiddleware(request: NextRequest) {
  // Remove the build phase check, rely on deferred instantiation
  /*
  const isBuildPhase = !request.ip; 
  if (isBuildPhase) {
    return null; 
  }
  */

  // Get Redis client instance (only at runtime now)
  const redis = getRedisClient();

  // If Redis client failed to initialize (e.g., missing config), bypass rate limiting
  if (!redis) { 
    console.warn('Redis client not available, skipping rate limiting.');
    return null; 
  }

  const ip = request.ip ?? '127.0.0.1';
  const window = Number(process.env.RATE_LIMIT_WINDOW) || 900000; // 15 minutes
  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

  try {
    const key = `rate-limit:${ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, window / 1000);
    }

    if (current > maxRequests) {
      // Rate limit exceeded, return 429
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    // Rate limit check passed, allow request to proceed
    return null; // Indicate success to composer/handler
  } catch (error) {
    console.error('Rate limit error (proceeding):', error);
    // If Redis fails, allow request to proceed but log the error
    return null; // Indicate success (bypass) to composer/handler
  }
} 