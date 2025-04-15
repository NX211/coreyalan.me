import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from '@/middleware/compose';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { UserService } from '@/lib/db/user';
import { ValidationError, ConflictError, ApiError } from '@/lib/api/errors';
import { SecurityLogger } from '@/lib/security/logger';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  countryId: z.string().min(1, 'Country is required'),
  contacts: z.array(z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    isPrimary: z.boolean().default(false),
  })).min(1, 'At least one contact is required'),
});

export const POST = securityMiddleware(async (request: NextRequest) => {
  try {
    const data = await request.json();
    
    // Validate input
    const validationResult = registrationSchema.safeParse(data);
    if (!validationResult.success) {
      await SecurityLogger.logSecurityEvent('registration_validation_error', request, {
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

    // Check if user already exists
    const existingUser = await UserService.getUserByInvoiceNinjaId(data.email);
    if (existingUser) {
      await SecurityLogger.logSecurityEvent('registration_duplicate', request, {
        email: data.email
      });
      throw new ConflictError('User already exists');
    }

    // Create client in Invoice Ninja
    const invoiceNinjaClient = await invoiceNinjaService.createClient(data);

    // Store user in local database
    const user = await UserService.createUser(invoiceNinjaClient);

    // Log successful registration
    await SecurityLogger.logSecurityEvent('registration_success', request, {
      userId: user.id,
      email: user.email
    });

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: error.statusCode }
      );
    }
    
    console.error('Registration error:', error);
    await SecurityLogger.logSecurityEvent('registration_error', request, {
      error: error?.message || 'Unknown error'
    });
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}); 