import { NextRequest } from 'next/server';

export class SecurityLogger {
  static async logSecurityEvent(
    event: string,
    request: NextRequest,
    details?: Record<string, any>
  ) {
    const logData = {
      timestamp: new Date().toISOString(),
      event,
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
      path: request.nextUrl.pathname,
      method: request.method,
      ...details,
    };

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Security Event:', logData);
    }

    // TODO: Implement proper logging service integration
    // This could be Sentry, a logging service, or a database
  }

  static async logAuthAttempt(
    request: NextRequest,
    success: boolean,
    details?: Record<string, any>
  ) {
    await this.logSecurityEvent(
      success ? 'auth_success' : 'auth_failure',
      request,
      details
    );
  }

  static async logRateLimitHit(request: NextRequest) {
    await this.logSecurityEvent('rate_limit_hit', request);
  }

  static async logCsrfViolation(request: NextRequest) {
    await this.logSecurityEvent('csrf_violation', request);
  }
} 