import nodemailer from 'nodemailer';
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
  private transporter: nodemailer.Transporter;

  constructor() {
    const config = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    try {
      smtpConfigSchema.parse(config);
      this.transporter = nodemailer.createTransport(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new EmailError(
          'Invalid SMTP configuration: ' + error.errors.map(e => e.message).join(', '),
          'INVALID_CONFIG'
        );
      }
      throw new EmailError('Failed to initialize email service', 'INIT_ERROR');
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      // Validate email options
      emailOptionsSchema.parse(options);

      // Send email
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@coreyalan.me',
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
    try {
      await this.transporter.verify();
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

export async function sendEmail({ to, subject, text }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
  });
} 