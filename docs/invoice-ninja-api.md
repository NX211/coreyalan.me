# Invoice Ninja API Integration Documentation

## Overview
This document tracks the implementation status of Invoice Ninja API features in the application.

## Authentication
- [x] API Token Authentication
  - Uses `X-API-TOKEN` and `X-API-SECRET` headers
  - Configured via environment variables
  - Implemented in `InvoiceNinjaClientService`

## Core Features

### Clients
- [x] List clients (`GET /api/v1/clients`)
- [x] Get client (`GET /api/v1/clients/:id`)
- [x] Create client (`POST /api/v1/clients`)
- [x] Update client (`PUT /api/v1/clients/:id`)
- [x] Delete client (`DELETE /api/v1/clients/:id`)

### Invoices
- [x] List invoices (`GET /api/v1/invoices`)
- [x] Get invoice (`GET /api/v1/invoices/:id`)
- [x] Create invoice (`POST /api/v1/invoices`)
- [x] Update invoice (`PUT /api/v1/invoices/:id`)
- [x] Delete invoice (`DELETE /api/v1/invoices/:id`)

### Quotes
- [x] List quotes (`GET /api/v1/quotes`)
- [x] Get quote (`GET /api/v1/quotes/:id`)
- [x] Create quote (`POST /api/v1/quotes`)
- [x] Update quote (`PUT /api/v1/quotes/:id`)
- [x] Delete quote (`DELETE /api/v1/quotes/:id`)

### Payments
- [x] List payments (`GET /api/v1/payments`)
- [x] Get payment (`GET /api/v1/payments/:id`)
- [x] Create payment (`POST /api/v1/payments`)
- [x] Update payment (`PUT /api/v1/payments/:id`)
- [x] Delete payment (`DELETE /api/v1/payments/:id`)

### Tasks
- [x] List tasks (`GET /api/v1/tasks`)
- [x] Get task (`GET /api/v1/tasks/:id`)
- [x] Create task (`POST /api/v1/tasks`)
- [x] Update task (`PUT /api/v1/tasks/:id`)
- [x] Delete task (`DELETE /api/v1/tasks/:id`)
- [x] Start task (`POST /api/v1/tasks/:id/start`)
- [x] Stop task (`POST /api/v1/tasks/:id/stop`)

### Task Statuses
- [x] List task statuses (`GET /api/v1/task_statuses`)
- [x] Get task status (`GET /api/v1/task_statuses/:id`)
- [x] Create task status (`POST /api/v1/task_statuses`)
- [x] Update task status (`PUT /api/v1/task_statuses/:id`)
- [x] Delete task status (`DELETE /api/v1/task_statuses/:id`)

### Projects
- [x] List projects (`GET /api/v1/projects`)
- [x] Get project (`GET /api/v1/projects/:id`)
- [x] Create project (`POST /api/v1/projects`)
- [x] Update project (`PUT /api/v1/projects/:id`)
- [x] Delete project (`DELETE /api/v1/projects/:id`)

### Vendors
- [x] List vendors (`GET /api/v1/vendors`)
- [x] Get vendor (`GET /api/v1/vendors/:id`)
- [x] Create vendor (`POST /api/v1/vendors`)
- [x] Update vendor (`PUT /api/v1/vendors/:id`)
- [x] Delete vendor (`DELETE /api/v1/vendors/:id`)

### Products
- [x] List products (`GET /api/v1/products`)
- [x] Get product (`GET /api/v1/products/:id`)
- [x] Create product (`POST /api/v1/products`)
- [x] Update product (`PUT /api/v1/products/:id`)
- [x] Delete product (`DELETE /api/v1/products/:id`)

### Expenses
- [x] List expenses (`GET /api/v1/expenses`)
  - Supports pagination
  - Supports filtering by status, client, vendor, category
  - Supports date range filtering
- [x] Get expense (`GET /api/v1/expenses/:id`)
  - Supports including related documents
- [x] Create expense (`POST /api/v1/expenses`)
  - Validates expense data using Zod schema
  - Supports all expense fields including taxes and custom values
- [x] Update expense (`PUT /api/v1/expenses/:id`)
  - Validates update data using Zod schema
- [x] Delete expense (`DELETE /api/v1/expenses/:id`)
- [x] Archive expense (`POST /api/v1/expenses/:id/archive`)
- [x] Restore expense (`POST /api/v1/expenses/:id/restore`)
- [x] Upload document (`POST /api/v1/expenses/:id/upload`)
  - Supports file uploads for receipts and other documents
- [x] Get expense categories (`GET /api/v1/expense_categories`)
- [x] Get payment types (`GET /api/v1/payment_types`)

## Pending Features

### Documents
- [ ] List documents
- [ ] Get document
- [ ] Upload document
- [ ] Delete document

### Webhooks
- [ ] List webhooks
- [ ] Create webhook
- [ ] Update webhook
- [ ] Delete webhook

### Users
- [x] List users (`GET /api/v1/users`)
  - Supports pagination
  - Supports filtering
- [x] Get user (`GET /api/v1/users/:id`)
- [x] Create user (`POST /api/v1/users`)
  - Validates user data using Zod schema
  - Supports all user fields including custom values
- [x] Update user (`PUT /api/v1/users/:id`)
  - Validates update data using Zod schema
- [x] Delete user (`DELETE /api/v1/users/:id`)
- [x] Archive user (`POST /api/v1/users/:id/archive`)
- [x] Restore user (`POST /api/v1/users/:id/restore`)
- [x] Upload avatar (`POST /api/v1/users/:id/upload`)
  - Supports file uploads for user avatars

### Companies
- [ ] List companies
- [ ] Get company
- [ ] Create company
- [ ] Update company
- [ ] Delete company

### Settings
- [ ] Get settings
- [ ] Update settings

## Utility Features
- [x] Pagination support
- [x] Error handling
- [x] Request/response validation
- [ ] Batch operations
- [x] File uploads
- [ ] PDF generation
- [ ] Email operations
- [x] Token management
- [ ] Rate limiting
- [ ] Cache management

## Configuration
- [x] Base URL configuration
- [x] API token configuration
- [x] API secret configuration
- [ ] Company token support
- [ ] User token support
- [ ] Rate limit configuration
- [ ] Cache configuration
- [ ] Retry mechanism configuration 