import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { UserService } from '@/lib/db/user';
import { ValidationError, UnauthorizedError } from '@/lib/api/errors';
import { SecurityLogger } from '@/lib/security/logger';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/server/session';
import { InvoiceNinjaClient } from '@/types/invoice-ninja';
import { InvoiceNinjaAuthError } from '@/lib/invoice-ninja/client';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  otp: z.string().optional(), // For 2FA
});

export const POST = securityMiddleware(async (request: NextRequest) => {
  try {
    const data = await request.json();
    
    // Validate input
    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      await SecurityLogger.logSecurityEvent('login_validation_error', request, {
        errors: validationResult.error.errors
      });
      throw new ValidationError(
        'Validation failed',
        validationResult.error.errors.reduce((acc, error) => {
          const path = error.path.join('.');
          acc[path] = [error.message];
          return acc;
        }, {} as Record<string, string[]>)
      );
    }

    // Authenticate with Invoice Ninja
    const { email, password, otp } = validationResult.data;
    
    try {
      // Call Invoice Ninja authentication API
      const user = await invoiceNinjaService.authenticateUser(email, password, otp);

      if (!user) {
        await SecurityLogger.logSecurityEvent('login_failed', request, {
          email,
          reason: 'Invalid credentials'
        });
        throw new UnauthorizedError('Invalid email or password');
      }

      // Get or create local user record
      let localUser = await UserService.getUserByInvoiceNinjaId(user.id);
      
      // If user doesn't exist locally, create a new record
      if (!localUser) {
        // Convert Invoice Ninja user to client format for local storage
        const clientData: InvoiceNinjaClient = {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim(),
          email: user.email,
          phone: user.phone || '',
          address1: '', // These fields might not be available from the user object
          city: '',
          state: '',
          postal_code: '',
          country_id: '',
          contacts: [
            {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              phone: user.phone || '',
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

      // Create session
      const session = await createSession({
        userId: localUser.id,
        email: localUser.email,
        name: localUser.name || `${user.first_name} ${user.last_name}`,
        invoiceNinjaId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      });

      // Set session cookie
      cookies().set('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // Set expiry to match token expiry if available
        maxAge: 60 * 60 * 24 * 7, // 1 week default
      });

      // Log successful login
      await SecurityLogger.logSecurityEvent('login_success', request, {
        userId: localUser.id,
        email: localUser.email
      });

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: localUser.id,
          email: localUser.email,
          name: localUser.name || `${user.first_name} ${user.last_name}`,
        }
      });
    } catch (error) {
      if (error instanceof InvoiceNinjaAuthError) {
        await SecurityLogger.logSecurityEvent('login_failed', request, {
          email,
          reason: error.message
        });
        
        throw new UnauthorizedError(error.message);
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { message: error.message, errors: error.details },
        { status: error.statusCode }
      );
    } else if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    await SecurityLogger.logSecurityEvent('login_error', request, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}); 