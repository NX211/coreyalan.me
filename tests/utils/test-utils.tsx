import React from 'react';
import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../src/components/providers/AppProvider';

export const mockFormData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'Test message content',
};

export const mockSession = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
  },
  expires: '2025-04-09T22:05:14.952Z',
};

export const mockApiResponses = {
  contact: {
    success: {
      success: true,
      message: 'Message sent successfully!',
    },
    error: {
      success: false,
      message: 'Failed to send message',
    },
  }
};

const customRender = (ui: React.ReactElement, options = {}) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    ...options,
  });
};

// Re-export everything
export { screen, fireEvent, waitFor };
export { userEvent };
export { customRender as render };

// Export mock data
export { mockFormData, mockApiResponses }; 