import { InvoiceNinjaClientService } from './client';
import { configService } from '@/lib/config';

const config = configService.getConfig().invoiceNinja;

export const invoiceNinjaService = new InvoiceNinjaClientService(config); 