import { FreeScoutBaseClient } from './base-client';
import { z } from 'zod';
import { FreeScoutError } from '../types/error';
import { ApiResponse } from '../types';

// Rate limiting configuration
interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number; // in milliseconds
}

// Cache configuration
interface CacheConfig {
  enabled: boolean;
  ttl: number; // in milliseconds
}

// Retry configuration
interface RetryConfig {
  maxAttempts: number;
  initialDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
  backoffFactor: number;
}

export class FreeScoutUtilityService extends FreeScoutBaseClient {
  private rateLimitConfig: RateLimitConfig;
  private cacheConfig: CacheConfig;
  private retryConfig: RetryConfig;
  private requestQueue: Map<string, Promise<any>>;
  private requestCount: Map<string, number>;
  private lastRequestTime: Map<string, number>;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: any) {
    super(config);
    this.rateLimitConfig = {
      maxRequests: 100,
      timeWindow: 60000, // 1 minute
    };
    this.cacheConfig = {
      enabled: true,
      ttl: 300000, // 5 minutes
    };
    this.retryConfig = {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      backoffFactor: 2,
    };
    this.requestQueue = new Map();
    this.requestCount = new Map();
    this.lastRequestTime = new Map();
    this.cache = new Map();
  }

  /**
   * Set rate limiting configuration
   */
  setRateLimitConfig(config: Partial<RateLimitConfig>): void {
    this.rateLimitConfig = { ...this.rateLimitConfig, ...config };
  }

  /**
   * Set cache configuration
   */
  setCacheConfig(config: Partial<CacheConfig>): void {
    this.cacheConfig = { ...this.cacheConfig, ...config };
  }

  /**
   * Set retry configuration
   */
  setRetryConfig(config: Partial<RetryConfig>): void {
    this.retryConfig = { ...this.retryConfig, ...config };
  }

  /**
   * Validate request data against a schema
   */
  validateRequest<T>(data: unknown, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new FreeScoutError('Validation Error', {
          status: 400,
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  /**
   * Validate response data against a schema
   */
  validateResponse<T>(data: unknown, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new FreeScoutError('Invalid Response', {
          status: 500,
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  /**
   * Check if a request should be rate limited
   */
  private isRateLimited(endpoint: string): boolean {
    const now = Date.now();
    const lastTime = this.lastRequestTime.get(endpoint) || 0;
    const count = this.requestCount.get(endpoint) || 0;

    if (now - lastTime > this.rateLimitConfig.timeWindow) {
      this.requestCount.set(endpoint, 1);
      this.lastRequestTime.set(endpoint, now);
      return false;
    }

    if (count >= this.rateLimitConfig.maxRequests) {
      return true;
    }

    this.requestCount.set(endpoint, count + 1);
    return false;
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData<T>(key: string): T | null {
    if (!this.cacheConfig.enabled) return null;

    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.cacheConfig.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  /**
   * Cache data with timestamp
   */
  private setCachedData<T>(key: string, data: T): void {
    if (!this.cacheConfig.enabled) return;
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Retry a failed request with exponential backoff
   */
  private async retryRequest<T>(
    fn: () => Promise<T>,
    attempt = 1
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= this.retryConfig.maxAttempts) {
        throw error;
      }

      const delay = Math.min(
        this.retryConfig.initialDelay * Math.pow(this.retryConfig.backoffFactor, attempt - 1),
        this.retryConfig.maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
      return this.retryRequest(fn, attempt + 1);
    }
  }

  /**
   * Make a request with all utility features
   */
  async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    // Check rate limiting
    if (this.isRateLimited(endpoint)) {
      throw new FreeScoutError('Rate Limit Exceeded', {
        status: 429,
        message: 'Too many requests',
      });
    }

    // Check cache for GET requests
    if (options.method === 'GET' || !options.method) {
      const cached = this.getCachedData<T>(endpoint);
      if (cached) return cached;
    }

    // Deduplicate concurrent requests
    const requestKey = `${endpoint}-${JSON.stringify(options)}`;
    if (this.requestQueue.has(requestKey)) {
      return this.requestQueue.get(requestKey) as Promise<T>;
    }

    const requestPromise = this.retryRequest(async () => {
      const response = await this.get<ApiResponse<T>>(endpoint, options as any);

      // Validate response if schema provided
      if (schema) {
        this.validateResponse(response.data, schema);
      }

      // Cache successful GET responses
      if (options.method === 'GET' || !options.method) {
        this.setCachedData(endpoint, response.data);
      }

      return response.data;
    });

    this.requestQueue.set(requestKey, requestPromise);
    try {
      return await requestPromise;
    } finally {
      this.requestQueue.delete(requestKey);
    }
  }

  /**
   * Clear cache for a specific endpoint or all endpoints
   */
  clearCache(endpoint?: string): void {
    if (endpoint) {
      this.cache.delete(endpoint);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Reset rate limiting counters
   */
  resetRateLimit(): void {
    this.requestCount.clear();
    this.lastRequestTime.clear();
  }
} 