import { POST } from '@/app/api/contact/route';
import { emailService } from '@/lib/email';
import { ApiError } from '@/lib/errors';
import { NextRequest } from 'next/server';

jest.mock('@/lib/email');

const mockEmailService = emailService as jest.Mocked<typeof emailService>;

describe('Contact API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.CONTACT_EMAIL = 'test@example.com';
  });

  afterEach(() => {
    delete process.env.CONTACT_EMAIL;
  });

  it('should handle successful contact form submission', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    mockEmailService.sendEmail.mockResolvedValueOnce();

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      success: true,
      message: 'Message sent successfully!',
    });
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Contact Form: Test Subject',
      text: expect.stringContaining('Test Message'),
    });
  });

  it('should handle validation errors', async () => {
    const mockData = {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: '',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Validation failed',
      errors: expect.arrayContaining([
        expect.any(String),
      ]),
    });
    expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
  });

  it('should handle invalid JSON body', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid-json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Invalid request body',
    });
    expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
  });

  it('should handle email service errors', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    mockEmailService.sendEmail.mockRejectedValueOnce(
      new ApiError('Failed to send email', 500)
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'Failed to send email',
    });
  });
}); 