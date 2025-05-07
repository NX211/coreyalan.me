import * as nodemailer from 'nodemailer';
import { z } from 'zod';

// Email options schema
const emailOptionsSchema = z.object({
  to: z.string().email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required'),
  text: z.string().min(1, 'Message content is required'),
});

export type EmailOptions = z.infer<typeof emailOptionsSchema>;

// SMTP configuration schema
const smtpConfigSchema = z.object({
  host: z.string().min(1, 'SMTP host is required'),
  port: z.number().int().min(1).max(65535),
  secure: z.boolean(),
  auth: z.object({
    user: z.string().min(1, 'SMTP user is required'),
    pass: z.string().min(1, 'SMTP password is required'),
  }),
});

export class EmailError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'EmailError';
  }
}

export class EmailService {
  private transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
  private isConfigured = false;

  constructor() {
    // Only initialize if we're not in a build process
    if (process.env.NEXT_BUILD_IN_DOCKER !== 'true') {
      this.initializeTransporter();
    }
  }

  private initializeTransporter() {
    const config = {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    };

    try {
      smtpConfigSchema.parse(config);
      this.transporter = nodemailer.createTransport(config);
      this.isConfigured = true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn('SMTP configuration is incomplete:', error.errors.map(e => e.message).join(', '));
      } else {
        console.warn('Failed to initialize email service:', error);
      }
      this.isConfigured = false;
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    // During build, just validate the options without sending
    if (process.env.NEXT_BUILD_IN_DOCKER === 'true') {
      emailOptionsSchema.parse(options);
      return;
    }

    // If not configured, throw a more descriptive error
    if (!this.isConfigured) {
      throw new EmailError(
        'Email service is not configured. Please check your SMTP settings.',
        'NOT_CONFIGURED'
      );
    }

    try {
      // Validate email options
      emailOptionsSchema.parse(options);

      // Send email
      const info = await this.transporter!.sendMail({
        from: process.env.SMTP_FROM || 'noreply@coreyalan.com',
        ...options,
      });

      if (!info.messageId) {
        throw new EmailError('Failed to send email: No message ID received', 'SEND_ERROR');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new EmailError(
          'Invalid email options: ' + error.errors.map(e => e.message).join(', '),
          'INVALID_OPTIONS'
        );
      }
      if (error instanceof EmailError) {
        throw error;
      }
      throw new EmailError('Failed to send email: ' + (error as Error).message, 'SEND_ERROR');
    }
  }

  async verifyConnection(): Promise<void> {
    if (!this.isConfigured) {
      throw new EmailError('Email service is not configured', 'NOT_CONFIGURED');
    }

    try {
      await this.transporter!.verify();
    } catch (error) {
      throw new EmailError(
        'Failed to verify SMTP connection: ' + (error as Error).message,
        'CONNECTION_ERROR'
      );
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Legacy function for backward compatibility
export async function sendEmail({ to, subject, text }: EmailOptions) {
  return emailService.sendEmail({ to, subject, text });
} 