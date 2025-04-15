#!/bin/bash
set -e

# Set environment variables
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
export NEXT_SKIP_STATIC_EXPORT=true

# Check if PostgreSQL is running (optional - comment out if not needed)
pg_isready -h localhost -p 5432 -U postgres &>/dev/null || {
  echo "Warning: PostgreSQL database doesn't appear to be running."
  echo "If your app requires a database, start it before proceeding."
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
}

# Start the development server
echo "Starting Next.js in development mode..."
npx next dev

# This will only run if the server is stopped
echo "Development server stopped." 