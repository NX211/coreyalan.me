import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { SecurityLogger } from '@/lib/security/logger';
import { cookies } from 'next/headers';
import { deleteSession } from '@/lib/server/session';
import { invoiceNinjaService } from '@/lib/invoice-ninja';

export const POST = securityMiddleware(async (request: NextRequest) => {
  try {
    // Get session token from cookies
    const sessionId = cookies().get('session')?.value;
    
    // Clear Invoice Ninja token regardless of session
    invoiceNinjaService.setToken(null);
    
    if (sessionId) {
      // Delete session from database
      await deleteSession(sessionId);
      
      // Clear cookies
      cookies().delete('session');
      
      // Log the successful logout
      await SecurityLogger.logSecurityEvent('logout_success', request, {
        sessionId,
      });
    }

    // Optional: Try to call Invoice Ninja logout endpoint
    // This depends on if the API supports a logout endpoint
    try {
      // Attempt to call a logout endpoint if available
      // await fetch(`${invoiceNinjaBaseUrl}/api/v1/logout`, {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${token}` },
      // });
    } catch (error) {
      // Ignore errors from the logout endpoint
      console.warn('Failed to call Invoice Ninja logout endpoint:', error);
    }

    return NextResponse.json(
      { message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    
    // Log the error
    await SecurityLogger.logSecurityEvent('logout_error', request, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { error: 'Something went wrong during logout' },
      { status: 500 }
    );
  }
}); 