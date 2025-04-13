import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/signedDocuments/[id] - Get a specific signed document
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = await prisma.signedDocument.findUnique({
      where: { id: params.id },
      include: { signer: true },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Signed document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Failed to fetch signed document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signed document' },
      { status: 500 }
    );
  }
}

// PATCH /api/signedDocuments/[id] - Update a signed document (e.g., mark as signed)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const document = await prisma.signedDocument.update({
      where: { id: params.id },
      data: {
        ...body,
        ...(body.status === 'SIGNED' && !body.signedAt ? { signedAt: new Date() } : {}),
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Failed to update signed document:', error);
    return NextResponse.json(
      { error: 'Failed to update signed document' },
      { status: 500 }
    );
  }
} 