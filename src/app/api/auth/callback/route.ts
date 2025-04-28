import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { createSession } from '@/lib/server/session';
import { SecurityLogger } from '@/lib/security/logger';
import { InvoiceNinjaToken } from '@/types/invoice-ninja';
import { cookies } from 'next/headers';
import { UserService } from '@/lib/db/user';

export const GET = securityMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const userId = searchParams.get('user_id');
  const clientId = searchParams.get('client_id');
  const email = searchParams.get('email') || 'client@example.com';
  const name = searchParams.get('name') || 'Client User';

  if (!token) {
    await SecurityLogger.logSecurityEvent('auth_callback_missing_token', request);
    return NextResponse.redirect(new URL('/auth/login?error=no_token', request.url));
  }

  try {
    // Create a proper token object
    const tokenData: InvoiceNinjaToken = {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      refresh_token: token, // Using the same token for refresh in this case
    };

    // Set the token in Invoice Ninja service
    invoiceNinjaService.setToken(token, token);

    // Try to get user information from Invoice Ninja
    try {
      const userProfile = await invoiceNinjaService.getUserProfile();
      
      if (userProfile) {
        // Check if user exists in our database
        let localUser = await UserService.getUserByInvoiceNinjaId(userProfile.id);
        
        // If not, create a new user record
        if (!localUser) {
          const clientData = {
            id: userProfile.id,
            name: `${userProfile.first_name} ${userProfile.last_name}`.trim(),
            email: userProfile.email,
            phone: userProfile.phone || '',
            address1: '', // These fields might not be available 
            city: '',
            state: '',
            postal_code: '',
            country_id: '',
            contacts: [
              {
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
                phone: userProfile.phone || '',
                is_primary: true
              }
            ],
            settings: {
              language_id: 'en', // Default language
              currency_id: 'USD' // Default currency
            }
          };
          
          localUser = await UserService.createUser(clientData);
        }
        
        // Create session with user information
        const session = await createSession({
          userId: localUser.id,
          email: userProfile.email,
          name: `${userProfile.first_name} ${userProfile.last_name}`.trim(),
          invoiceNinjaId: userProfile.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        });
        
        // Set session cookie
        cookies().set('session', session.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
        
        // Log successful authentication
        await SecurityLogger.logSecurityEvent('auth_callback_success', request, {
          userId: userProfile.id,
          email: userProfile.email
        });
        
        // Redirect to dashboard
        const redirectUrl = new URL('/client-portal', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Failed to get user profile:', error);
      // Continue with the fallback approach if we can't get the user profile
    }
    
    // Fallback: Create session with the provided information
    const session = await createSession({
      userId: userId || 'temp-user-id',
      email: email,
      name: name,
      invoiceNinjaId: clientId || 'temp-client-id',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });
    
    // Set session cookie
    cookies().set('session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    // Log successful authentication
    await SecurityLogger.logSecurityEvent('auth_callback_success', request);
    
    const redirectUrl = new URL('/client-portal', request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error('Auth callback error:', error);
    await SecurityLogger.logSecurityEvent('auth_callback_failure', request, {
      error: error?.message || 'Unknown error'
    });
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('error', 'authentication_failed');
    return NextResponse.redirect(loginUrl);
  }
}); 