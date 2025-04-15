// Mock data for testing
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'client'
};

export const mockSession = {
  user: mockUser,
  expires: new Date(Date.now() + 3600 * 1000).toISOString()
};

export const mockDocument = {
  id: 'test-doc-id',
  name: 'Test Document.pdf',
  status: 'pending',
  url: 'https://example.com/test-doc'
};

export const mockInvoice = {
  id: 'test-invoice-id',
  amount: 100.00,
  status: 'pending',
  client_id: 'test-client-id'
};

// Mock API responses
export const mockApiResponses = {
  invoiceNinja: {
    create: {
      success: {
        id: 'test-invoice-id',
        number: 'INV-001',
        status: 'draft'
      }
    }
  },
  contact: {
    success: {
      message: 'Message sent successfully'
    },
    error: {
      message: 'Failed to send message',
      errors: ['Invalid email format']
    }
  }
}; 