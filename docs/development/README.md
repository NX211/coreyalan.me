# Development Guide

> For API documentation, see [API Reference](../api/README.md).
> For production deployment, see [Deployment Guide](../deployment/guide.md).

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis (Upstash)
- Git

## Local Development Setup

1. Clone and initialize:
```bash
git clone https://github.com/yourusername/coreyalan.me.git
cd coreyalan.me
npm install
cp .env.example .env
```

2. Configure development environment:
```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development_secret
NEXTAUTH_JWT_SECRET=development_jwt_secret

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/coreyalan_dev

# External Services
DOCUSEAL_API_KEY=development_key
INVOICE_NINJA_API_KEY=development_key
REDIS_URL=development_redis_url
REDIS_TOKEN=development_redis_token

# Security
CORS_ORIGIN=http://localhost:3000
CSRF_SECRET=development_csrf_secret
ALLOWED_ORIGINS=http://localhost:3000
```

## Development Workflow

### Starting Development Environment
```bash
# Start services
npm run docker:dev

# Initialize database
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

### Development Tools
- App: http://localhost:3000
- Prisma Studio: http://localhost:5555 (`npm run db:studio`)
- Database: localhost:5432
- Redis: Upstash development instance

## Testing & Quality Assurance

> See [API Testing](../api/README.md#testing) for API-specific tests.

### Running Tests
```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Code Quality
```bash
# Lint check
npm run lint

# Fix issues
npm run lint -- --fix
```

## Database Development

### Schema Management
```bash
# Generate client
npm run db:generate

# Apply changes
npm run db:push

# View data
npm run db:studio
```

### Migrations
```bash
# Create migration
npx prisma migrate dev --name <feature_name>

# Apply to development
npx prisma migrate deploy
```

## Debugging

### Logging
```bash
# Enable debug logs
LOG_LEVEL=debug npm run dev

# View security logs
tail -f logs/security.log
```

### Common Issues

1. **Database**
```bash
# Check status
docker-compose ps db

# View logs
docker-compose logs db
```

2. **Redis**
```bash
# Test connection
redis-cli -u $REDIS_URL ping
```

3. **Rate Limiting**
```bash
# Check status
curl -I http://localhost:3000/api/status
```

## Contributing

1. Branch from `main`
2. Write tests
3. Implement changes
4. Run tests and linter
5. Submit PR

## Development Security

> See [API Security](../api/README.md#security) for security implementation details.

### Local Security Measures
- CSRF protection enabled
- Rate limiting active
- Security headers set
- Error logging configured

### Development Best Practices
- Use environment variables
- Follow TypeScript types
- Write unit tests
- Document changes
- Review security implications

## Support

For development issues:
1. Check application logs
2. Review security logs
3. Check test coverage
4. Contact team lead

> For production issues, see [Deployment Guide](../deployment/guide.md#support). 