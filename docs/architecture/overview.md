# Application Architecture Overview

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Document Management**: DocuSeal
- **Form Management**: Formbricks
- **Payment Processing**: Invoice Ninja

## Directory Structure

```markdown
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── docuseal/      # DocuSeal Integration
│   ├── client-portal/     # Client Portal Pages
│   └── (auth)/            # Authentication Pages
├── components/            # Reusable Components
├── lib/                   # Utility Functions
└── styles/               # Global Styles
```

## Key Components

### Authentication System

- NextAuth.js integration
- Role-based access control
- Session management
- Protected routes

### Document Management

- DocuSeal integration for document handling
- Secure document upload and storage
- Document signing workflow
- Document status tracking

### Client Portal

- Dashboard interface
- Document management
- Profile settings
- Communication tools

### API Integration

- DocuSeal API for document processing
- Invoice Ninja for payment processing
- Formbricks for form management
- Custom API routes for business logic

## Security Considerations

- Environment variable management
- API key security
- Data encryption
- Access control
- Rate limiting
