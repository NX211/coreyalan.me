import { NextRequest, NextResponse } from 'next/server';
import { OpenSignClientService } from '@/services/opensign-client.service';

const client = new OpenSignClientService(process.env.OPENSIGN_API_KEY!);

export async function GET(request: NextRequest) {
  try {
    const contacts = await client.listContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to list contacts:', error);
    return NextResponse.json(
      { error: 'Failed to list contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const contact = await client.createContact(data);
    return NextResponse.json(contact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
} 