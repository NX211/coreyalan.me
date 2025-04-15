import { PrismaClient } from '@/generated/prisma';

// Create global Prisma client
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
  });
};

// Properly type the global object
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use existing instance or create a new one
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Only save to global in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 