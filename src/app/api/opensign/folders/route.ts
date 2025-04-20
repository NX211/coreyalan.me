import { NextRequest, NextResponse } from 'next/server';
import { OpenSignClientService } from '@/services/opensign-client.service';

const client = new OpenSignClientService(process.env.OPENSIGN_API_KEY!);

export async function GET(request: NextRequest) {
  try {
    const folders = await client.listFolders();
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Failed to list folders:', error);
    return NextResponse.json(
      { error: 'Failed to list folders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const folder = await client.createFolder(data);
    return NextResponse.json(folder);
  } catch (error) {
    console.error('Failed to create folder:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    );
  }
} 