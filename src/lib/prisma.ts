import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient;

// Function to get or create the Prisma client instance
const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'production') {
    // In production, always create a new instance
    if (!prismaInstance) {
       try {
         prismaInstance = new PrismaClient();
       } catch (e) {
         console.error("Failed to initialize Prisma Client in production:", e);
         // Depending on requirements, you might throw here or handle differently
         throw new Error("Could not connect to database.");
       }
    }
    return prismaInstance;
  } else {
    // In development, use the global variable to avoid multiple instances due to HMR
    if (!global.prisma) {
      try {
        global.prisma = new PrismaClient();
      } catch (e) {
         console.error("Failed to initialize Prisma Client in development:", e);
         throw new Error("Could not connect to database.");
      }
    }
    return global.prisma;
  }
};

// Export the function to get the client, not the instance itself
export const getPrisma = getPrismaClient; 