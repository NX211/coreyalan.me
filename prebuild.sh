#!/bin/bash
set -e

echo "Running ESLint to fix issues..."
npm run lint:fix

# Fix apostrophes in files with known issues
echo "Fixing apostrophes in files with known issues..."
find src/app -type f -name "*.tsx" -exec sed -i "" "s/'/\&apos;/g" {} \;
find src/components -type f -name "*.tsx" -exec sed -i "" "s/'/\&apos;/g" {} \;

echo "Pre-build checks completed."
exit 0 