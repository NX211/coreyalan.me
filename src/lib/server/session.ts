import { cookies } from 'next/headers';
import { prisma } from '../db/prisma';
import { Session as PrismaSession, Prisma } from '@prisma/client';

export type Session = PrismaSession;

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get('session')?.value;
    
    if (!sessionId) {
      console.log('No session cookie found');
      return null;
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      console.log('No session found in database for ID:', sessionId);
      return null;
    }

    if (session.expiresAt < new Date()) {
      console.log('Session expired:', sessionId);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export type CreateSessionInput = Prisma.SessionCreateInput;

export async function createSession(data: CreateSessionInput): Promise<Session> {
  const session = await prisma.session.create({
    data,
  });

  return session;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: { id: sessionId },
  });
} 