import { InvoiceNinjaClient } from '@/types/invoice-ninja';
import { prisma } from './prisma';

export class ClientService {
  static async createClient(invoiceNinjaClient: InvoiceNinjaClient) {
    return prisma.user.create({
      data: {
        invoiceNinjaId: invoiceNinjaClient.id,
        name: invoiceNinjaClient.name,
        email: invoiceNinjaClient.email,
        phone: invoiceNinjaClient.phone,
        website: invoiceNinjaClient.website,
        address1: invoiceNinjaClient.address1,
        address2: invoiceNinjaClient.address2 || null,
        city: invoiceNinjaClient.city,
        state: invoiceNinjaClient.state,
        postalCode: invoiceNinjaClient.postal_code,
        countryId: invoiceNinjaClient.country_id,
        contacts: {
          create: invoiceNinjaClient.contacts.map(contact => ({
            firstName: contact.first_name,
            lastName: contact.last_name,
            email: contact.email,
            phone: contact.phone,
            isPrimary: contact.is_primary,
          })),
        },
      },
      include: {
        contacts: true,
      },
    });
  }

  static async getClientByInvoiceNinjaId(invoiceNinjaId: string) {
    return prisma.user.findUnique({
      where: { invoiceNinjaId },
      include: { contacts: true },
    });
  }

  static async updateClient(invoiceNinjaId: string, data: Partial<InvoiceNinjaClient>) {
    return prisma.user.update({
      where: { invoiceNinjaId },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address1: data.address1,
        address2: data.address2 || null,
        city: data.city,
        state: data.state,
        postalCode: data.postal_code,
        countryId: data.country_id,
        contacts: {
          updateMany: data.contacts?.map(contact => ({
            where: { email: contact.email },
            data: {
              firstName: contact.first_name,
              lastName: contact.last_name,
              phone: contact.phone,
              isPrimary: contact.is_primary,
            },
          })),
        },
      },
      include: { contacts: true },
    });
  }
} 