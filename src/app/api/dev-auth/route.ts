import { NextRequest, NextResponse } from 'next/server';
import { generateDevJWT, createDevSessionFromJWT } from '@/lib/auth/dev-jwt';
import { z } from 'zod';
import { SecurityLogger } from '@/lib/security/logger';
import { createSession, type CreateSessionInput } from '@/lib/server/session';
import { cookies } from 'next/headers';

// Only enable in development
export const dynamic = 'force-dynamic';

// Input validation schema
const devLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['user', 'admin']).default('user'),
});

export async function POST(request: NextRequest) {
  // Security check - only allow in development mode
  if (process.env.NODE_ENV !== 'development' || process.env.DEV_AUTH_ENABLED !== 'true') {
    await SecurityLogger.logSecurityEvent('dev_auth_blocked', request, {
      reason: 'Development authentication disabled or not in development mode'
    });
    
    return NextResponse.json(
      { message: 'Development authentication is disabled' },
      { status: 403 }
    );
  }
  
  try {
    const data = await request.json();
    
    // Validate input
    const result = devLoginSchema.safeParse(data);
    if (!result.success) {
      await SecurityLogger.logSecurityEvent('dev_auth_validation_error', request, {
        errors: result.error.errors
      });
      
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { email, name, role } = result.data;
    
    // Generate unique development Invoice Ninja ID
    const invoiceNinjaId = `dev-${role}-${Date.now()}`;
    
    // Create session with expiry date
    const sessionData: CreateSessionInput = {
      userId: invoiceNinjaId,
      email,
      name,
      invoiceNinjaId,
      role,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };
    
    const session = await createSession(sessionData);
    
    if (!session) {
      await SecurityLogger.logSecurityEvent('dev_auth_session_failed', request, {
        email,
        name,
        role
      });
      
      return NextResponse.json(
        { message: 'Failed to create development session' },
        { status: 500 }
      );
    }
    
    // Create redirect response to dashboard
    const response = NextResponse.redirect(new URL('/client-portal/dashboard', request.url));
    
    // Set session cookie
    response.cookies.set('session', session.id, {
      httpOnly: true,
      secure: false, // Not using HTTPS in development
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days to match session expiry
      path: '/',
    });
    
    // Log successful login
    await SecurityLogger.logSecurityEvent('dev_auth_success', request, {
      email,
      name,
      role,
      invoiceNinjaId
    });
    
    return response;
  } catch (error) {
    console.error('Development authentication error:', error);
    
    await SecurityLogger.logSecurityEvent('dev_auth_error', request, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return NextResponse.json(
      { message: 'An error occurred during development login' },
      { status: 500 }
    );
  }
} 