<<<<<<< HEAD
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
=======
# Corey Alan - Personal Website

This is the codebase for my personal website and client portal built with Next.js.

## OpenSign Integration

This project uses [OpenSign](https://opensignlabs.com/) for document signing functionality. OpenSign is an open-source document signing solution that provides:

- Digital document signing
- Template management
- Secure signature validation
- White-label document signing experience

### Environment Setup

To use OpenSign in this project, you need to set the following environment variables:

```
OPENSIGN_API_KEY=your_opensign_api_key_here
```

You can get your API key by signing up at [OpenSign](https://opensignlabs.com/).

## Google Drive Integration

This project integrates with Google Drive for document uploads. Clients can upload documents securely, and they will be stored in organized folders in Google Drive.

### Environment Setup

To enable Google Drive uploads, set these environment variables:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
UPLOAD_API_KEY=your_secure_upload_api_key
NEXT_PUBLIC_UPLOAD_API_KEY=your_secure_upload_api_key
```

See `docs/google-drive-setup.md` for detailed setup instructions.

### Key Components

- **DocumentSigning**: A component that renders the OpenSign form for signing documents
- **DocumentUpload**: A component for uploading documents to be shared via Google Drive
- **OpenSignForm**: A custom wrapper for the OpenSign SDK that handles loading and error states

### API Routes

The following API routes are used for interacting with these services:

- `/api/opensign/documents`: For uploading and listing documents for signing
- `/api/opensign/documents/[id]`: For retrieving and deleting specific signing documents
- `/api/opensign/documents/[id]/signing-url`: For generating signing URLs
- `/api/upload/google-drive`: For uploading files to Google Drive

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with the required environment variables
4. Start the development server:
   ```
   npm run dev
   ```

## Production

This project is set up to be deployed using Docker. A `docker-compose.yml` file is included for easy deployment.

```
docker-compose up -d
>>>>>>> master
``` 