// Mock Prisma client for build environments
export const mockPrismaClient = {
  document: {
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
  },
  signedDocument: {
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
  },
  user: {
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
  },
  documentTemplate: {
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
  },
  $connect: () => Promise.resolve(),
  $disconnect: () => Promise.resolve(),
}; 