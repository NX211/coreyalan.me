export const validFormData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a test message for the contact form.'
};

export const invalidFormData = {
  name: '',
  email: 'invalid-email',
  subject: '',
  message: ''
};

export const apiResponses = {
  success: {
    status: 200,
    body: { success: true, message: 'Message sent successfully' }
  },
  error: {
    status: 500,
    body: { 
      success: false, 
      message: 'Failed to send message',
      error: 'Internal server error'
    }
  },
  rateLimit: {
    status: 429,
    body: { 
      success: false, 
      message: 'Too many contact form submissions, please try again later',
      resetTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }
  }
}; 