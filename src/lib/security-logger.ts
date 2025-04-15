import { NextRequest } from 'next/server';

interface SecurityEventDetails {
  error?: string;
  stack?: string;
  [key: string]: any;
}

export class SecurityLogger {
  static logSecurityEvent(
    eventType: string,
    request: NextRequest,
    details?: SecurityEventDetails
  ): void {
    const logData = {
      timestamp: new Date().toISOString(),
      eventType,
      url: request.url,
      method: request.method,
      ip: request.ip || request.headers.get('x-forwarded-for'),
      userAgent: request.headers.get('user-agent'),
      ...details,
    };

    // In production, this would send to a security monitoring service
    console.error('[Security Event]', logData);
  }
} 