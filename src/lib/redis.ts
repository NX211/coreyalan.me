import { Redis } from '@upstash/redis';

// Create a more resilient Redis client that works with both local and Upstash environments
const getRedisConfig = () => {
  // For production, prefer the Upstash REST API URLs
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return {
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    };
  }

  // For local development, ensure URL starts with https for Upstash client
  if (process.env.REDIS_URL && process.env.REDIS_TOKEN) {
    const url = process.env.REDIS_URL.startsWith('redis://')
      ? `https://${process.env.REDIS_URL.substring(8)}`
      : process.env.REDIS_URL;
    
    return {
      url,
      token: process.env.REDIS_TOKEN,
    };
  }

  throw new Error('Redis configuration is missing. Please set REDIS_URL and REDIS_TOKEN or UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
};

export const redis = new Redis(getRedisConfig()); 