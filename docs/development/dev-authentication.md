# Development Authentication

This document outlines the secure development authentication system that allows developers to authenticate in the local development environment without connecting to the production Invoice Ninja service.

## Overview

The development authentication system uses JWT (JSON Web Tokens) to create secure temporary tokens that can be used for authentication in the development environment. This approach:

1. Completely isolates development authentication from production systems
2. Mimics the same session management flow used in production
3. Allows testing different user roles and permissions
4. Provides a dedicated development login page and API endpoint

## How It Works

1. A developer visits `/dev-login` in the development environment
2. They enter their email, name, and select a role (user or admin)
3. The system generates a JWT token with these details
4. The token is used to create a session in the database
5. Normal session cookie authentication is used from this point forward
6. The system behaves exactly as it would with a real Invoice Ninja authenticated user

## Implementation Details

### Files and Components

- **`src/lib/auth/dev-jwt.ts`**: Core JWT token generation and verification
- **`src/app/api/dev-auth/route.ts`**: API endpoint for development authentication
- **`src/components/development/DevLoginForm.tsx`**: Development login form component
- **`src/app/dev-login/page.tsx`**: Development login page

### Environment Configuration

The following environment variables must be set in `.env.development` or `.env.local`:

```
# Development Authentication
DEV_AUTH_ENABLED=true
DEV_JWT_SECRET=your-secure-secret-key-min-32-chars
```

| Variable | Description | Required |
| --- | --- | --- |
| `DEV_AUTH_ENABLED` | Enable/disable development authentication (must be "true") | Yes |
| `DEV_JWT_SECRET` | Secret key used to sign JWT tokens (min 32 characters) | Yes |

## Security Considerations

The development authentication system includes several security measures:

1. **Environment Isolation**: Only works when `NODE_ENV=development` and `DEV_AUTH_ENABLED=true`
2. **Server-side Verification**: All JWT operations happen on the server-side
3. **Short-lived Tokens**: Tokens expire after 24 hours by default
4. **Security Logging**: All authentication attempts are logged using the security logger
5. **Multiple Validation Layers**: Input validation using Zod and token validation

## Usage

### For Developers

1. Ensure you have the required environment variables set in your local environment
2. Start the development server with `npm run dev`
3. Navigate to `http://localhost:3000/dev-login`
4. Fill in the form with your development credentials
5. Select a role (user or admin)
6. Click "Development Login"

### For Testing

The system stores the JWT token in `localStorage` under the key `dev_auth_token`, which can be used for direct API testing if needed.

```javascript
// Example: Get the dev token for API testing
const devToken = localStorage.getItem('dev_auth_token');

// Use in fetch requests
fetch('/api/protected-endpoint', {
  headers: {
    'Authorization': `Bearer ${devToken}`
  }
});
```

## API Reference

### POST /api/dev-auth

Creates a development authentication session.

**Request Body:**

```json
{
  "email": "dev@example.com",
  "name": "Developer Name",
  "role": "user" // or "admin"
}
```

**Response (Success):**

```json
{
  "message": "Development login successful",
  "user": {
    "email": "dev@example.com",
    "name": "Developer Name",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error):**

```json
{
  "message": "Error message",
  "errors": [...] // Optional validation errors
}
```

## Development vs Production

The development authentication system is completely separate from the production system:

| Feature | Development Auth | Production Auth |
| --- | --- | --- |
| Authentication Provider | Local JWT | Invoice Ninja |
| User Storage | Local Database | Invoice Ninja + Local DB |
| Session Management | Same as Production | Cookie-based Sessions |
| 2FA Support | No | Yes |
| Available in Production | No | Yes |

## Troubleshooting

### Common Issues

1. **"Development authentication is disabled"**
   - Ensure `DEV_AUTH_ENABLED=true` is set in your environment
   - Verify you are running in development mode (`NODE_ENV=development`)

2. **Session not created after successful login**
   - Check the database connection
   - Verify the JWT token is being correctly generated and validated

3. **Redirects not working after login**
   - Ensure your routes and middleware are correctly configured
   - Check browser console for any errors

## Implementation Notes

- The development authentication system intentionally uses the same session management code as production to ensure consistency
- No real Invoice Ninja credentials are used or stored
- All development users are ephemeral and only exist in the local database 