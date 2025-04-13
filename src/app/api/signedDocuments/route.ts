import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/signedDocuments - Get all signed documents
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const signerId = searchParams.get('signerId');
    const status = searchParams.get('status');

    const documents = await prisma.signedDocument.findMany({
      where: {
        ...(signerId ? { signerId } : {}),
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { signer: true },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Failed to fetch signed documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signed documents' },
      { status: 500 }
    );
  }
}

// POST /api/signedDocuments - Create a new signed document
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const document = await prisma.signedDocument.create({
      data: {
        documentName: body.documentName,
        documentType: body.documentType,
        status: body.status || 'PENDING',
        externalId: body.externalId,
        documentUrl: body.documentUrl,
        signedDocumentUrl: body.signedDocumentUrl,
        signerId: body.signerId,
        signedAt: body.signedAt,
        expiresAt: body.expiresAt,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Failed to create signed document:', error);
    return NextResponse.json(
      { error: 'Failed to create signed document' },
      { status: 500 }
    );
  }
} 