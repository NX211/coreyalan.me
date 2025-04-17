import { Redis } from '@upstash/redis';

let redisInstance: Redis | null = null;

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
    // Note: The Upstash client requires https/http URLs, not redis://
    // We might need a different client (like ioredis) for a standard redis:// URL
    // For now, assume REDIS_URL is intended for Upstash format or adapt as needed.
    // If using a local standard Redis server, this config might need changes.
    const url = process.env.REDIS_URL.startsWith('redis://')
      ? `https://${process.env.REDIS_URL.substring(8)}` // Attempt conversion
      : process.env.REDIS_URL;
    
    return {
      url,
      token: process.env.REDIS_TOKEN, // Upstash client needs a token
    };
  }

  // Only throw error at runtime when config is actually needed
  // During build, this function might be called but client isn't created yet
  // Returning null or a dummy config might be safer depending on usage
  // Let's return null to indicate config is missing, allow caller to handle
  return null; 
};

// Export a function to get the client instance (Singleton pattern)
export const getRedisClient = (): Redis | null => {
  if (!redisInstance) {
    const config = getRedisConfig();
    if (config) {
      try {
        redisInstance = new Redis(config);
      } catch (error) {
        console.error("Failed to initialize Redis client:", error);
        // Optionally throw here if Redis is absolutely critical at the point of first access
        // throw new Error('Failed to initialize Redis client');
        return null; // Return null if initialization fails
      }
    } else {
       console.warn('Redis configuration is missing. Skipping Redis client initialization.');
       return null; // Return null if config is missing
    }
  }
  return redisInstance;
}; 