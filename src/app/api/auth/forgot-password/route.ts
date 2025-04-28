import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPrisma } from '@/lib/prisma';
import crypto from 'crypto';

// Initialize Resend only if API key exists
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Update user with reset token
      await prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry,
        } as any,
      });

      // Send reset email if Resend is configured
      if (resend) {
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        await resend.emails.send({
          from: 'noreply@coreyalan.me',
          to: email,
          subject: 'Password Reset Request',
          html: `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <p><a href="${resetUrl}">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `,
        });
      } else {
        console.log('Resend API key not configured. Email would have been sent to:', email);
        console.log('Reset token:', resetToken);
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 