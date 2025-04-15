import { Page } from '@playwright/test';
import { validFormData, invalidFormData, apiResponses } from '../fixtures/contact-form';

export async function fillContactForm(page: Page, data: typeof validFormData) {
  await page.getByLabel('Name').fill(data.name);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Subject').fill(data.subject);
  await page.getByLabel('Message').fill(data.message);
}

export async function submitContactForm(page: Page) {
  await page.getByRole('button', { name: 'Send Message' }).click();
}

export async function mockApiResponse(page: Page, responseType: keyof typeof apiResponses) {
  const response = apiResponses[responseType];
  await page.route('/api/contact', async (route) => {
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
}

export async function expectValidationErrors(page: Page) {
  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Subject is required')).toBeVisible();
  await expect(page.getByText('Message is required')).toBeVisible();
}

export async function expectEmailValidationError(page: Page) {
  await expect(page.getByText('Invalid email address')).toBeVisible();
} 