#!/bin/sh
# Start Cloud SQL proxy in the background
/cloud-sql-proxy --port 5432 $INSTANCE_CONNECTION_NAME &

# Generate Prisma client
npx prisma generate

# Apply migrations in production
npx prisma migrate deploy

# Start the Next.js application
node server.js 