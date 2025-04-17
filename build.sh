#!/bin/bash
set -e

# Print each command before executing
set -x

# Generate Prisma client first (can happen anytime before build)
echo "Generating Prisma client..."
npx prisma generate

# Ensure ALL dependencies (including dev) are installed FIRST
echo "Installing dependencies..."
npm install --quiet # Run install before setting NODE_ENV

# Now set environment variables for the build process
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NEXT_SKIP_STATIC_EXPORT=true

# Clean previous build
echo "Cleaning previous build artifacts..."
rm -rf .next
rm -rf out

# Run the build
echo "Building the application..."
npx next build --no-lint

# Check build status
if [ $? -ne 0 ]; then
  echo "Build failed! Check build logs for details."
  exit 1
fi

echo "Build completed successfully." 