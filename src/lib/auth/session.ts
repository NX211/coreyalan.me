import { db } from '@/lib/db';

export interface Session {
  id: string;
  userId: string;
  email: string;
  name: string;
  invoiceNinjaId: string;
  role: string | null;
  createdAt: Date;
  expiresAt: Date;
}

export async function createSession(data: {
  userId: string;
  email: string;
  name: string;
  invoiceNinjaId: string;
  role?: string;
}): Promise<Session | null> {
  try {
    const session = await db.session.create({
      data: {
        userId: data.userId,
        email: data.email,
        name: data.name,
        invoiceNinjaId: data.invoiceNinjaId,
        role: data.role,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      },
    });
    
    return session;
  } catch (error) {
    console.error('Failed to create session:', error);
    return null;
  }
} 