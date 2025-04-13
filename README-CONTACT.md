# Contact Form Configuration

This document outlines how to configure the white-label contact form on your website.

## Overview

The contact form is a custom Next.js implementation that provides a seamless, white-label experience for your users. Instead of using Google Forms (which shows Google branding), this form:

1. Validates input on both client and server
2. Submits data via a Next.js API route
3. Sends emails using nodemailer
4. Shows appropriate loading, success, and error states

## Setup Instructions

### 1. Email Configuration

To enable email sending, you need to configure your email server settings. Add the following environment variables to your `.env.local` file:

```
# Email Server Configuration for Contact Form
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_SERVER_SECURE=false
EMAIL_FROM=contact@coreyalan.me
EMAIL_TO=corey@coreyalan.me
```

Replace the values with your own email service provider's information:

- `EMAIL_SERVER_HOST`: Your SMTP server address (e.g., smtp.gmail.com, smtp.office365.com)
- `EMAIL_SERVER_PORT`: The port for your SMTP server (typically 587 for TLS or 465 for SSL)
- `EMAIL_SERVER_USER`: Your email account username
- `EMAIL_SERVER_PASSWORD`: Your email account password or app password
- `EMAIL_SERVER_SECURE`: Set to 'true' for SSL (port 465) or 'false' for TLS/STARTTLS (port 587)
- `EMAIL_FROM`: The "from" email address that will appear on emails
- `EMAIL_TO`: The email address where form submissions will be sent

### 2. Email Service Providers

#### Gmail
If using Gmail, you might need to:
1. Enable "Less secure app access" (not recommended for production)
2. Or better, create an "App Password" in your Google account security settings

#### Outlook/Office 365
For Outlook/Office 365, you'll need to:
1. Enable SMTP AUTH in your account settings
2. Consider creating an app password

#### Transactional Email Services
For production, we recommend using a transactional email service:

- **SendGrid**: Update with `smtp.sendgrid.net` and your API key
- **Mailgun**: Use `smtp.mailgun.org` with your credentials
- **Amazon SES**: Use the appropriate AWS regional endpoint

## Testing

After configuration, test your form to ensure it's working correctly:

1. Fill out the form with valid information
2. Submit the form
3. Verify that you receive the email
4. Check that the success message appears to the user

## Troubleshooting

If emails are not being sent:

1. Check your console logs for error messages
2. Verify your SMTP credentials are correct
3. Make sure your email provider allows SMTP access
4. Try using a different email provider
5. Check if your email provider has rate limiting or requires additional configuration

## Security Considerations

For production environments:
1. Always use environment variables for sensitive information
2. Configure SPF and DKIM records for your domain to improve email deliverability
3. Consider adding CAPTCHA for spam protection
4. Implement rate limiting on your form submissions 