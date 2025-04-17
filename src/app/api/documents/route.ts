import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

// GET /api/documents - Get all documents
export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const documents = await prisma.document.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(documents);
  } catch (error: any) {
    console.error('Failed to fetch documents:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create a new document
export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    const body = await request.json();
    
    const document = await prisma.document.create({
      data: {
        fileName: body.fileName,
        fileType: body.fileType,
        fileSize: body.fileSize,
        filePath: body.filePath,
        driveFileId: body.driveFileId,
        description: body.description,
        userId: body.userId,
        isPublic: body.isPublic || false,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create document' },
      { status: 500 }
    );
  }
} 