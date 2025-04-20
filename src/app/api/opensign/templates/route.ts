import { NextRequest, NextResponse } from 'next/server';
import { OpenSignClientService } from '@/services/opensign-client.service';

const client = new OpenSignClientService(process.env.OPENSIGN_API_KEY!);

export async function GET(request: NextRequest) {
  try {
    const templates = await client.listTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Failed to list templates:', error);
    return NextResponse.json(
      { error: 'Failed to list templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const template = await client.createTemplate(data);
    return NextResponse.json(template);
  } catch (error) {
    console.error('Failed to create template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
} 