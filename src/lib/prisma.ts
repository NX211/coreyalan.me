import { mockPrismaClient } from './prisma-mock';

// Check if we're in a build environment
const isDockerBuild = process.env.NEXT_BUILD_IN_DOCKER === 'true';

// Use a dynamic import to avoid issues during build time
let prismaClient: any;

// For Docker builds, use the mock client
if (isDockerBuild) {
  prismaClient = mockPrismaClient;
} else {
  // In a non-build environment, we can safely use the real client
  if (process.env.NODE_ENV === 'production') {
    // In production, create a new instance
    try {
      const { PrismaClient } = require('@prisma/client');
      prismaClient = new PrismaClient();
    } catch (e) {
      console.error('Failed to initialize Prisma Client in production:', e);
      prismaClient = mockPrismaClient;
    }
  } else {
    // In development, use global to prevent multiple instances
    const { PrismaClient } = require('@prisma/client');
    const globalForPrisma = global as unknown as { prisma: any };
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    prismaClient = globalForPrisma.prisma;
  }
}

export const prisma = prismaClient; 