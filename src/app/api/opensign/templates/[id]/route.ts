import { NextRequest, NextResponse } from 'next/server';
import { OpenSignClientService } from '@/services/opensign-client.service';

const client = new OpenSignClientService(process.env.OPENSIGN_API_KEY!);

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const template = await client.getTemplate(params.id);
    return NextResponse.json(template);
  } catch (error) {
    console.error('Failed to get template:', error);
    return NextResponse.json(
      { error: 'Failed to get template' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const data = await request.json();
    const template = await client.updateTemplate(params.id, data);
    return NextResponse.json(template);
  } catch (error) {
    console.error('Failed to update template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await client.deleteTemplate(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
} 