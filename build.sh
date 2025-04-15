#!/bin/bash
set -e

# Print each command before executing
set -x

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production  # Changed to production mode for Cloud Run deployment
export NEXT_SKIP_STATIC_EXPORT=true

# Generate Prisma client first
echo "Generating Prisma client..."
npx prisma generate

# Ensure dependencies are installed
echo "Checking dependencies..."
npm ci --quiet

# Clean previous build
echo "Cleaning previous build artifacts..."
rm -rf .next
rm -rf out

# Run the build with proper error handling
echo "Building the application..."
npx next build --no-lint  # Removed the unsupported --skip-typescript-check flag

# Check build status
if [ $? -ne 0 ]; then
  echo "Build failed! Check build.log for details."
  exit 1
fi

echo "Build completed successfully." 