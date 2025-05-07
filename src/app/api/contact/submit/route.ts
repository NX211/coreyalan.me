import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(2, { message: "Subject is required" }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    // Get form data
    const formData = await request.json();
    
    // Validate form data
    const result = contactFormSchema.safeParse(formData);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: result.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Destructure validated data
    const { name, email, subject = 'Website Contact Form', message } = result.data;
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
    
    // Construct email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || 'corey@coreyalan.com',
      replyTo: email,
      subject: `[Website Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4A6CF7;">New contact form submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <h3 style="margin-top: 20px;">Message:</h3>
  <p style="white-space: pre-wrap;">${message}</p>
</div>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent! I will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Contact form submission error:', {
      error,
      emailConfig: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: process.env.EMAIL_SERVER_SECURE,
        user: process.env.EMAIL_SERVER_USER ? '✓' : '✗',
        pass: process.env.EMAIL_SERVER_PASSWORD ? '✓' : '✗',
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO
      }
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit form. Please try again later.' 
      }, 
      { status: 500 }
    );
  }
} 