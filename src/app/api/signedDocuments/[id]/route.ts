import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

// GET /api/signedDocuments/[id] - Get a specific signed document
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

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
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    const body = await request.json();
    
    const document = await prisma.signedDocument.update({
      where: { id: params.id },
      data: {
        ...body,
        ...(body.status === 'SIGNED' && !body.signedAt ? { signedAt: new Date() } : {}),
      },
    });

    return NextResponse.json(document);
  } catch (error: any) {
    console.error('Failed to update signed document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update signed document' },
      { status: 500 }
    );
  }
}

// DELETE /api/signedDocuments/[id] - Delete a signed document
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    await prisma.signedDocument.delete({ 
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Failed to delete signed document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete signed document' },
      { status: 500 }
    );
  }
} 