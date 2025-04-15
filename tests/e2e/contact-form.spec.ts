import { test, expect } from '@playwright/test';
import { fillContactForm, submitContactForm, mockApiResponse, expectValidationErrors, expectEmailValidationError } from './utils/contact-form';
import { validFormData, invalidFormData } from './fixtures/contact-form';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display validation errors for empty form submission', async ({ page }) => {
    await submitContactForm(page);
    await expectValidationErrors(page);
  });

  test('should display validation error for invalid email', async ({ page }) => {
    await fillContactForm(page, invalidFormData);
    await submitContactForm(page);
    await expectEmailValidationError(page);
  });

  test('should successfully submit contact form', async ({ page }) => {
    await fillContactForm(page, validFormData);
    await mockApiResponse(page, 'success');
    await submitContactForm(page);
    await expect(page.getByText('Message sent successfully')).toBeVisible();
  });

  test('should handle API error gracefully', async ({ page }) => {
    await fillContactForm(page, validFormData);
    await mockApiResponse(page, 'error');
    await submitContactForm(page);
    await expect(page.getByText('Failed to send message')).toBeVisible();
  });

  test('should handle rate limiting', async ({ page }) => {
    await fillContactForm(page, validFormData);
    await mockApiResponse(page, 'rateLimit');
    await submitContactForm(page);
    await expect(page.getByText('Too many contact form submissions, please try again later')).toBeVisible();
  });
}); 