import { getEnvVar } from '../env';

export interface InvoiceNinjaConfig {
  apiKey: string;
  baseUrl: string;
}

export function getInvoiceNinjaConfig(): InvoiceNinjaConfig {
  const apiKey = getEnvVar('INVOICE_NINJA_API_KEY');
  const baseUrl = getEnvVar('INVOICE_NINJA_URL', 'https://api.invoiceninja.com');

  if (!apiKey) {
    throw new Error('Invoice Ninja API configuration is missing');
  }

  return {
    apiKey,
    baseUrl,
  };
} 