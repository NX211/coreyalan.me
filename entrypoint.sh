#!/bin/sh
# Start Cloud SQL proxy in the background if INSTANCE_CONNECTION_NAME is set
if [ -n "$INSTANCE_CONNECTION_NAME" ]; then
  echo "Starting Cloud SQL proxy for $INSTANCE_CONNECTION_NAME"
  /cloud-sql-proxy --port 5432 $INSTANCE_CONNECTION_NAME &
  # Wait for proxy to start
  sleep 2
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Apply migrations in production if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Applying database migrations..."
  npx prisma migrate deploy
fi

# Start the Next.js application
echo "Starting Next.js application..."
node server.js 