import { NextRequest, NextResponse } from 'next/server';
import { SecurityLogger } from '@/lib/security-logger';
import { sendEmail } from '@/lib/email';
import { ApiError } from '@/lib/errors';
import { contactFormDataSchema } from '@/types/forms';
import { EmailError } from '@/lib/email';
import { emailService } from '@/lib/email';
import { ZodError } from 'zod';

const RATE_LIMIT_KEY = 'contact:rate-limit';
const RATE_LIMIT_WINDOW = 60; // 1 minute
const MAX_REQUESTS = 5;

/**
 * @api {post} /api/contact Send a contact form message
 * @apiName SendContactMessage
 * @apiGroup Contact
 * @apiDescription Handles contact form submissions and sends emails
 * 
 * @apiBody {String} name Sender's name
 * @apiBody {String} email Sender's email address
 * @apiBody {String} subject Message subject
 * @apiBody {String} message Message content
 * 
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {String} message Success message
 * 
 * @apiError {Boolean} success Operation status
 * @apiError {String} message Error message
 * @apiError {String[]} [errors] Validation errors
 * @apiError {String} [error] Internal error message
 */
export async function POST(request: NextRequest) {
  try {
    let formData;
    try {
      // Use formData() to handle potential multipart/form-data
      formData = await request.formData();
    } catch (error) {
      console.error('Failed to parse request data:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request data format',
        },
        { status: 400 }
      );
    }

    // Extract data from FormData
    const data = {
      name: formData.get('name') as string | null,
      email: formData.get('email') as string | null,
      subject: formData.get('subject') as string | null,
      message: formData.get('message') as string | null,
      // Add other fields from your form if necessary
    };

    try {
      // Validate the extracted data
      const validatedData = contactFormDataSchema.parse(data);
      
      await emailService.sendEmail({
        to: process.env.CONTACT_EMAIL || 'default@example.com',
        subject: `Contact Form: ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
      });

      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200 }
      );
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation failed',
            errors: validationError.errors.map(err => err.message),
          },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message',
      },
      { status: 500 }
    );
  }
} 