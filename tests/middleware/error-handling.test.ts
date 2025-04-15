import { NextRequest } from 'next/server';
import { errorHandler } from '@/middleware/error-handling';
import { SecurityLogger } from '@/lib/security-logger';

jest.mock('@/lib/security-logger', () => ({
  SecurityLogger: {
    logSecurityEvent: jest.fn(),
  },
}));

describe('Error Handling Middleware', () => {
  const mockRequest = new NextRequest('http://localhost:3000/api/test', {
    method: 'GET',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle handler errors', async () => {
    const mockHandler = jest.fn().mockRejectedValue(new Error('Test error'));

    const response = await errorHandler(mockRequest, mockHandler);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Internal server error');
    expect(SecurityLogger.logSecurityEvent).toHaveBeenCalledWith(
      'middleware_error',
      mockRequest,
      expect.objectContaining({
        error: expect.any(Error),
      })
    );
  });

  it('should chain multiple middleware successfully', async () => {
    const mockHandler = jest.fn().mockResolvedValue(new Response(JSON.stringify({ success: true })));

    const response = await errorHandler(mockRequest, mockHandler);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(SecurityLogger.logSecurityEvent).not.toHaveBeenCalled();
  });
}); 