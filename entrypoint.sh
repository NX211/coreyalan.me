#!/bin/sh
# Start Cloud SQL proxy in the background if INSTANCE_CONNECTION_NAME is set
if [ -n "$INSTANCE_CONNECTION_NAME" ]; then
  echo "Starting Cloud SQL proxy for $INSTANCE_CONNECTION_NAME"
  /cloud-sql-proxy --port 5432 $INSTANCE_CONNECTION_NAME &
  # Wait for proxy to start
  echo "Waiting 10s for proxy to start..."
  sleep 10
fi

# Start the Next.js application
echo "Starting Next.js application..."
node server.js 