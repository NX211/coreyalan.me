// Define mock API responses locally
const mockApiResponses = {
  contact: {
    success: { success: true, message: 'Message sent successfully' },
    error: { success: false, message: 'Failed to send message' }
  }
};

export const mockApiHandler = (url: string, options: RequestInit = {}) => {
  // Contact form submission
  if (url.includes('/api/contact')) {
    if (options.method === 'POST') {
      return Promise.resolve(
        new Response(
          JSON.stringify(mockApiResponses.contact.success),
          { status: 200 }
        )
      );
    }
  }

  // Default response
  return Promise.resolve(
    new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404 }
    )
  );
}; 