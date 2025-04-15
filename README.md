# Corey Alan Portfolio

## Development

This project uses Next.js with PostgreSQL for database functionality.

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local` (if not already done)
   - Update database connection strings and other configuration

3. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

### Running the Development Server

Use the provided script to run the development server:

```bash
./run-dev.sh
```

This script will:
- Set proper environment variables
- Check if PostgreSQL is running
- Start the Next.js development server

### Building for Production

Use the build script to create a production build:

```bash
./build.sh
```

This script:
- Sets proper environment variables
- Cleans previous build artifacts
- Builds the application
- Logs the build output to `build.log`

### Database Management

- Generate Prisma client: `npm run db:generate`
- Push schema changes: `npm run db:push`
- Open Prisma Studio: `npm run db:studio`

## Docker Development

```bash
npm run docker:dev  # Start containers
npm run docker:down # Stop containers
``` 