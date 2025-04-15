import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { ApiError } from '@/lib/errors';

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    throw new ApiError('Failed to get session', 500);
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new ApiError('Unauthorized', 401);
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    throw new ApiError('Forbidden', 403);
  }
  return session;
}

export async function signIn(credentials: { email: string; password: string }) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new ApiError('Invalid credentials', 401);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to sign in', 500);
  }
}

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new ApiError('Failed to sign out', 500);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to sign out', 500);
  }
} 