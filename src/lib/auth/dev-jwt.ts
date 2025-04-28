import jwt from 'jsonwebtoken';
import { createSession } from '@/lib/auth/session';
import { UserService } from '@/lib/db/user';
import { cookies } from 'next/headers';

// Define the shape of JWT payload
interface DevAuthPayload {
  userId: string;
  email: string;
  name: string;
  invoiceNinjaId: string;
  exp: number;
}

// Configuration
const DEV_JWT_SECRET = process.env.DEV_JWT_SECRET || 'development-jwt-secret-min-32-chars';
const TOKEN_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

/**
 * Generate a development JWT token
 */
export function generateDevJWT(payload: Omit<DevAuthPayload, 'exp'>): string {
  return jwt.sign(
    { 
      ...payload,
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY
    }, 
    DEV_JWT_SECRET
  );
}

/**
 * Verify a development JWT token
 */
export function verifyDevJWT(token: string): DevAuthPayload | null {
  try {
    return jwt.verify(token, DEV_JWT_SECRET) as DevAuthPayload;
  } catch (error) {
    console.error('Dev JWT verification error:', error);
    return null;
  }
}

/**
 * Create a development session from JWT
 */
export async function createDevSessionFromJWT(token: string): Promise<boolean> {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development' || process.env.DEV_AUTH_ENABLED !== 'true') {
    return false;
  }
  
  // Verify the token
  const payload = verifyDevJWT(token);
  if (!payload) {
    return false;
  }
  
  try {
    // Check if user exists by invoice ninja id since that's what we stored in the token
    let user = await UserService.getUserByInvoiceNinjaId(payload.invoiceNinjaId);
    
    // Create user if doesn't exist
    if (!user) {
      user = await UserService.createUser({
        id: payload.invoiceNinjaId,
        name: payload.name,
        email: payload.email,
        phone: '', // Required field
        address1: '', // Required field
        city: '', // Required field
        state: '', // Required field
        postal_code: '', // Required field 
        country_id: '', // Required field
        contacts: [{
          first_name: payload.name.split(' ')[0] || '',
          last_name: payload.name.split(' ')[1] || '',
          email: payload.email,
          phone: '', // Add empty phone field to satisfy the type
          is_primary: true
        }],
        settings: {
          language_id: 'en',
          currency_id: 'USD'
        }
      });
    }
    
    // Create session
    const session = await createSession({
      userId: user.id,
      email: payload.email,
      name: payload.name,
      invoiceNinjaId: payload.invoiceNinjaId,
    });
    
    if (!session) {
      console.error('Failed to create session');
      return false;
    }
    
    // Set session cookie
    cookies().set('session', session.id, {
      httpOnly: true,
      secure: false, // Not using HTTPS in development
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return true;
  } catch (error) {
    console.error('Error creating dev session:', error);
    return false;
  }
} 