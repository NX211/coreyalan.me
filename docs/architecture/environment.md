# Environment Variables and Security Configuration

## Overview

This document outlines all environment variables required for the application and their security implications.

## Environment Variables

### Authentication

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `NEXTAUTH_URL` | Base URL for NextAuth.js | High | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js encryption | Critical | Yes |
| `NEXTAUTH_JWT_SECRET` | Secret for JWT token signing | Critical | Yes |

### Database

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `DATABASE_URL` | Database connection string | Critical | Yes |

### External Services

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `DOCUSEAL_API_KEY` | API key for DocuSeal service | High | Yes |
| `INVOICE_NINJA_API_KEY` | API key for Invoice Ninja | High | Yes |
| `INVOICE_NINJA_URL` | Invoice Ninja API URL | Medium | Yes |

### OAuth2 Configuration

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | High | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Critical | Yes |

### Session Management

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `SESSION_SECRET` | Secret for session encryption | Critical | Yes |
| `COOKIE_SECRET` | Secret for cookie signing | Critical | Yes |

### Security Configuration

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `CORS_ORIGIN` | Allowed CORS origin | High | Yes |
| `RATE_LIMIT_WINDOW` | Rate limit window in milliseconds | Medium | Yes |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per window | Medium | Yes |
| `CSRF_SECRET` | Secret for CSRF token generation | Critical | Yes |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | High | Yes |
| `SECURITY_LOG_LEVEL` | Security logging level | Medium | Yes |

### Redis Configuration

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `REDIS_URL` | Redis connection URL | High | Yes |
| `REDIS_TOKEN` | Redis authentication token | Critical | Yes |

### Logging

| Variable | Description | Security Level | Required |
|----------|-------------|----------------|----------|
| `LOG_LEVEL` | Application logging level | Medium | Yes |
| `SENTRY_DSN` | Sentry DSN for error tracking | High | No |

## Security Best Practices

### Secret Management

1. All secrets should be at least 32 characters long
2. Use different secrets for different environments
3. Never commit secrets to version control
4. Rotate secrets regularly
5. Use a secure secret management service in production

### Environment Setup

1. Development:
   - Use `.env.local` for local development
   - Set `NODE_ENV=development`
   - Use development-specific API keys
   - Enable debug logging

2. Production:
   - Use `.env.production`
   - Set `NODE_ENV=production`
   - Use production API keys
   - Enable only necessary logging
   - Enable all security features

### Security Headers

The application automatically sets the following security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`
- `Strict-Transport-Security`

### Rate Limiting

- Default: 100 requests per 15 minutes
- Configured via Redis
- IP-based rate limiting
- Customizable per environment

### CSRF Protection

- Enabled for all non-GET requests
- Token-based validation
- Customizable secret
- Automatic token generation

### Session Security

- HTTP-only cookies
- Secure cookies in production
- SameSite=Lax
- Regular session validation
- Automatic token refresh

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Check `.env.example` for required variables
   - Ensure all variables are set in your environment
   - Verify variable names match exactly

2. **Authentication Failures**
   - Verify secrets are properly set
   - Check token expiration
   - Validate session configuration

3. **Rate Limiting Issues**
   - Check Redis connection
   - Verify rate limit configuration
   - Monitor request patterns

4. **CSRF Token Errors**
   - Verify token generation
   - Check token validation
   - Ensure proper headers are set

### Security Monitoring

1. Enable security logging
2. Monitor rate limit hits
3. Track authentication attempts
4. Log CSRF violations
5. Monitor session activity
