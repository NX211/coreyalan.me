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
    },
    task: {
      create: {
        success: {
          id: 'test-task-id',
          description: 'Test Task',
          client_id: 'test-client-id',
          status_id: 'test-status-id',
          date: new Date().toISOString(),
          created_at: Date.now(),
          updated_at: Date.now(),
          user_id: 'test-user-id'
        }
      },
      status: {
        success: {
          id: 'test-status-id',
          name: 'In Progress',
          color: '#000000',
          sort_order: 1,
          created_at: Date.now(),
          updated_at: Date.now()
        }
      }
    },
    project: {
      create: {
        id: '1',
        name: 'Test Project',
        client_id: '1',
        description: 'Test project description',
        is_deleted: false,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
        number: 'P-001',
        color: '#FF0000',
        budgeted_hours: 100,
        task_rate: 50,
        due_date: '2024-12-31',
        private_notes: 'Private notes',
        public_notes: 'Public notes',
        custom_value1: 'Custom 1',
        custom_value2: 'Custom 2',
        custom_value3: 'Custom 3',
        custom_value4: 'Custom 4',
        documents: [],
        tasks: []
      },
      list: [
        {
          id: '1',
          name: 'Test Project 1',
          client_id: '1',
          description: 'Test project 1 description',
          is_deleted: false,
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
          number: 'P-001',
          color: '#FF0000',
          budgeted_hours: 100,
          task_rate: 50,
          due_date: '2024-12-31',
          private_notes: 'Private notes',
          public_notes: 'Public notes',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: [],
          tasks: []
        },
        {
          id: '2',
          name: 'Test Project 2',
          client_id: '2',
          description: 'Test project 2 description',
          is_deleted: false,
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
          number: 'P-002',
          color: '#00FF00',
          budgeted_hours: 200,
          task_rate: 75,
          due_date: '2024-12-31',
          private_notes: 'Private notes 2',
          public_notes: 'Public notes 2',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: [],
          tasks: []
        }
      ]
    },
    vendor: {
      create: {
        id: '1',
        name: 'Test Vendor',
        website: 'https://testvendor.com',
        phone: '123-456-7890',
        email: 'contact@testvendor.com',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postal_code: '12345',
        country_id: 'US',
        is_deleted: false,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
        number: 'V-001',
        vat_number: 'VAT123456',
        id_number: 'ID123456',
        custom_value1: 'Custom 1',
        custom_value2: 'Custom 2',
        custom_value3: 'Custom 3',
        custom_value4: 'Custom 4',
        documents: []
      },
      list: [
        {
          id: '1',
          name: 'Test Vendor 1',
          website: 'https://testvendor1.com',
          phone: '123-456-7890',
          email: 'contact@testvendor1.com',
          address1: '123 Test St',
          city: 'Test City',
          state: 'TS',
          postal_code: '12345',
          country_id: 'US',
          is_deleted: false,
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
          number: 'V-001',
          vat_number: 'VAT123456',
          id_number: 'ID123456',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: []
        },
        {
          id: '2',
          name: 'Test Vendor 2',
          website: 'https://testvendor2.com',
          phone: '987-654-3210',
          email: 'contact@testvendor2.com',
          address1: '456 Test Ave',
          city: 'Test Town',
          state: 'TT',
          postal_code: '54321',
          country_id: 'US',
          is_deleted: false,
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
          number: 'V-002',
          vat_number: 'VAT654321',
          id_number: 'ID654321',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: []
        }
      ]
    },
    product: {
      create: {
        id: '1',
        product_key: 'PROD-001',
        notes: 'Test product description',
        cost: 50.00,
        price: 100.00,
        quantity: 100,
        tax_name1: 'VAT',
        tax_rate1: 20,
        is_deleted: false,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
        custom_value1: 'Custom 1',
        custom_value2: 'Custom 2',
        custom_value3: 'Custom 3',
        custom_value4: 'Custom 4',
        documents: []
      },
      list: [
        {
          id: '1',
          product_key: 'PROD-001',
          notes: 'Test product 1 description',
          cost: 50.00,
          price: 100.00,
          quantity: 100,
          tax_name1: 'VAT',
          tax_rate1: 20,
          is_deleted: false,
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: []
        },
        {
          id: '2',
          product_key: 'PROD-002',
          notes: 'Test product 2 description',
          cost: 75.00,
          price: 150.00,
          quantity: 50,
          tax_name1: 'VAT',
          tax_rate1: 20,
          is_deleted: false,
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: []
        }
      ]
    },
    expense: {
      create: {
        id: '1',
        amount: 100.00,
        vendor_id: '1',
        client_id: '1',
        category_id: '1',
        expense_date: '2024-03-20',
        payment_date: '2024-03-20',
        payment_type_id: '1',
        private_notes: 'Test expense',
        public_notes: 'Public test expense',
        tax_name1: 'VAT',
        tax_rate1: 20,
        is_deleted: false,
        created_at: '2024-03-20T00:00:00Z',
        updated_at: '2024-03-20T00:00:00Z',
        number: 'EXP-001',
        custom_value1: 'Custom 1',
        custom_value2: 'Custom 2',
        custom_value3: 'Custom 3',
        custom_value4: 'Custom 4',
        documents: []
      },
      list: [
        {
          id: '1',
          amount: 100.00,
          vendor_id: '1',
          client_id: '1',
          category_id: '1',
          expense_date: '2024-03-20',
          payment_date: '2024-03-20',
          payment_type_id: '1',
          private_notes: 'Test expense',
          public_notes: 'Public test expense',
          tax_name1: 'VAT',
          tax_rate1: 20,
          is_deleted: false,
          created_at: '2024-03-20T00:00:00Z',
          updated_at: '2024-03-20T00:00:00Z',
          number: 'EXP-001',
          custom_value1: 'Custom 1',
          custom_value2: 'Custom 2',
          custom_value3: 'Custom 3',
          custom_value4: 'Custom 4',
          documents: []
        }
      ],
      categories: [
        { id: '1', name: 'Travel' },
        { id: '2', name: 'Meals' },
        { id: '3', name: 'Office Supplies' }
      ],
      paymentTypes: [
        { id: '1', name: 'Credit Card' },
        { id: '2', name: 'Bank Transfer' },
        { id: '3', name: 'Cash' }
      ]
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