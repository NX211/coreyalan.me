import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { rateLimitMiddleware } from '@/middleware/rate-limit';
import { csrfMiddleware } from '@/middleware/csrf';
import { apiProtectionMiddleware } from '@/middleware/api-protection';
import { getToken } from 'next-auth/jwt';
import { securityMiddleware } from '@/middleware/security';
import { redis } from '@/lib/redis';
import { SecurityLogger } from '@/lib/security/logger';

// Mock Redis
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  })),
}));

// Mock next-auth
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('@/lib/redis', () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  },
}));

jest.mock('@/lib/security/logger', () => ({
  SecurityLogger: {
    logSecurityEvent: jest.fn(),
  },
}));

describe('Security Middleware', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = new NextRequest('http://localhost:3000/api/test', {
      method: 'GET',
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests within limit', async () => {
      (redis.incr as jest.Mock).mockResolvedValue(50);
      
      const response = await rateLimitMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });

    it('should block requests over limit', async () => {
      (redis.incr as jest.Mock).mockResolvedValue(101);
      
      const response = await rateLimitMiddleware(mockRequest);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(429);
      expect(response.statusText).toBe('Too Many Requests');
    });

    it('should set expiry on first request', async () => {
      (redis.incr as jest.Mock).mockResolvedValue(1);
      
      await rateLimitMiddleware(mockRequest);
      expect(redis.expire).toHaveBeenCalledWith(
        expect.stringContaining('rate-limit'),
        expect.any(Number)
      );
    });
  });

  describe('CSRF Protection', () => {
    it('should allow GET requests without token', async () => {
      mockRequest = new NextRequest('http://localhost/api/test', {
        method: 'GET',
      });
      
      const response = await csrfMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });

    it('should block POST requests without token', async () => {
      mockRequest = new NextRequest('http://localhost/api/test', {
        method: 'POST',
      });
      
      const response = await csrfMiddleware(mockRequest);
      expect(response.status).toBe(403);
    });

    it('should validate CSRF token for POST requests', async () => {
      mockRequest = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': 'valid-token',
        },
      });
      
      (getToken as jest.Mock).mockResolvedValue({ csrfToken: 'valid-token' });
      
      const response = await csrfMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });

    it('should block invalid CSRF tokens', async () => {
      mockRequest = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': 'invalid-token',
        },
      });
      
      (getToken as jest.Mock).mockResolvedValue({ csrfToken: 'valid-token' });
      
      const response = await csrfMiddleware(mockRequest);
      expect(response.status).toBe(403);
    });
  });

  describe('API Protection', () => {
    it('should allow public routes', async () => {
      mockRequest = new NextRequest('http://localhost/api/public/test', {
        method: 'GET',
      });
      
      const response = await apiProtectionMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });

    it('should block unauthenticated requests', async () => {
      (getToken as jest.Mock).mockResolvedValue(null);
      
      const response = await apiProtectionMiddleware(mockRequest);
      expect(response.status).toBe(401);
    });

    it('should allow authenticated requests', async () => {
      (getToken as jest.Mock).mockResolvedValue({ role: 'user' });
      
      const response = await apiProtectionMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });

    it('should block non-admin access to admin routes', async () => {
      mockRequest = new NextRequest('http://localhost/api/admin/test', {
        method: 'GET',
      });
      (getToken as jest.Mock).mockResolvedValue({ role: 'user' });
      
      const response = await apiProtectionMiddleware(mockRequest);
      expect(response.status).toBe(403);
    });

    it('should allow admin access to admin routes', async () => {
      mockRequest = new NextRequest('http://localhost/api/admin/test', {
        method: 'GET',
      });
      (getToken as jest.Mock).mockResolvedValue({ role: 'admin' });
      
      const response = await apiProtectionMiddleware(mockRequest);
      expect(response).toEqual(NextResponse.next());
    });
  });

  it('should rate limit requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/test', {
      method: 'GET',
    });
    (redis.incr as jest.Mock).mockResolvedValue(101);
    
    const response = await rateLimitMiddleware(request);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(429);
    expect(response.statusText).toBe('Too Many Requests');
  });

  it('should log security events', async () => {
    const request = new NextRequest('http://localhost:3000/api/test', {
      method: 'GET',
    });
    (redis.incr as jest.Mock).mockResolvedValue(101);
    
    await rateLimitMiddleware(request);
    expect(SecurityLogger.logSecurityEvent).toHaveBeenCalledWith(
      'rate_limit_exceeded',
      request,
      expect.any(Object)
    );
  });
}); 