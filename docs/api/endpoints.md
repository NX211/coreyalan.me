# API Endpoints Documentation

## Security Overview

### Authentication & Authorization

- All endpoints (except public) require authentication
- JWT-based authentication with NextAuth.js
- Role-based access control for admin routes
- Session-based authentication for web clients

### Security Middleware

The following middleware is applied to all API routes:

1. Rate Limiting
2. CSRF Protection
3. API Protection
4. Session Validation

### Security Headers

All API responses include:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`
- `Strict-Transport-Security`

## Public Endpoints

### Authentication

- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Description**: User login
- **Security**: Public
- **Request Body**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Endpoint**: `/api/auth/register`
- **Method**: POST
- **Description**: User registration
- **Security**: Public
- **Request Body**: See registration schema

## Protected Endpoints

### DocuSeal Integration

#### Document Upload

- **Endpoint**: `/api/docuseal/documents`
- **Method**: POST
- **Description**: Handles document upload to DocuSeal
- **Security**: Protected, requires authentication
- **Headers**:
  - `X-CSRF-Token`: Required for POST requests
- **Request Body**: FormData with document file
- **Response**: Document ID and status

#### Document Status

- **Endpoint**: `/api/docuseal/documents/[id]`
- **Method**: GET
- **Description**: Retrieves document status
- **Security**: Protected, requires authentication
- **Parameters**: Document ID
- **Response**: Document status and metadata

### Session Management

- **Endpoint**: `/api/auth/session`
- **Method**: GET
- **Description**: Retrieves current session information
- **Security**: Protected, requires authentication
- **Response**: User session data

### Role Management

- **Endpoint**: `/api/auth/role`
- **Method**: GET
- **Description**: Retrieves user role information
- **Security**: Protected, requires authentication
- **Response**: User role and permissions

## Admin Endpoints

### User Management

- **Endpoint**: `/api/admin/users`
- **Method**: GET/POST/PUT/DELETE
- **Description**: User management operations
- **Security**: Protected, requires admin role
- **Headers**:
  - `X-CSRF-Token`: Required for non-GET requests

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "status": "HTTP_STATUS_CODE"
  }
}
```

Common error codes:

- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `429`: Too Many Requests - Rate limit exceeded
- `400`: Bad Request - Invalid input
- `500`: Internal Server Error

## Rate Limiting

- All endpoints are rate-limited
- Default limit: 100 requests per 15 minutes
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until limit reset

## Security Best Practices

1. Always include CSRF token in non-GET requests
2. Handle rate limit responses gracefully
3. Implement proper error handling
4. Use HTTPS in production
5. Validate all input data
6. Follow principle of least privilege

## Client Portal

### Document Management

- **Endpoint**: `/api/client/documents`
- **Method**: GET/POST
- **Description**: Manages client documents
- **Response**: Document list or upload status

### Profile Management

- **Endpoint**: `/api/client/profile`
- **Method**: GET/PUT
- **Description**: Manages client profile information
- **Response**: Profile data or update status
