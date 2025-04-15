import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/forms/ContactForm';
import { AppProvider } from '@/components/providers/AppProvider';

// Mock the email service
jest.mock('@/lib/email', () => ({
  emailService: {
    sendEmail: jest.fn().mockResolvedValue(undefined),
    verifyConnection: jest.fn().mockResolvedValue(undefined),
  },
  EmailError: class extends Error {
    constructor(message: string, public readonly code: string) {
      super(message);
      this.name = 'EmailError';
    }
  }
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<AppProvider>{ui}</AppProvider>);
};

describe('Contact Form Integration', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should handle successful form submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    renderWithProvider(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test Message' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('should handle validation errors', async () => {
    renderWithProvider(<ContactForm />);
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent('Please enter your name');
      expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address');
      expect(screen.getByTestId('subject-error')).toHaveTextContent('Please enter a subject');
      expect(screen.getByTestId('message-error')).toHaveTextContent('Please enter your message');
    });
  });

  it('should handle API errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    renderWithProvider(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test Message' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });
}); 