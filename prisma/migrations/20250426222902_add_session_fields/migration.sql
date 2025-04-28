/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `email` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNinjaId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- Add new columns with default values for existing records
ALTER TABLE "Session" ADD COLUMN "email" TEXT NOT NULL DEFAULT 'dev@example.com';
ALTER TABLE "Session" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Development User';
ALTER TABLE "Session" ADD COLUMN "invoiceNinjaId" TEXT NOT NULL DEFAULT 'dev-user';
ALTER TABLE "Session" ADD COLUMN "role" TEXT;

-- Remove default values after data is populated
ALTER TABLE "Session" ALTER COLUMN "email" DROP DEFAULT;
ALTER TABLE "Session" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "Session" ALTER COLUMN "invoiceNinjaId" DROP DEFAULT;

-- Drop the updatedAt column
ALTER TABLE "Session" DROP COLUMN "updatedAt";

-- Create indexes if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'Session_userId_idx') THEN
        CREATE INDEX "Session_userId_idx" ON "Session"("userId");
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'Session_invoiceNinjaId_idx') THEN
        CREATE INDEX "Session_invoiceNinjaId_idx" ON "Session"("invoiceNinjaId");
    END IF;
END $$;
