import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

// GET /api/documents/[id] - Get a specific document
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    const document = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error: any) {
    console.error('Failed to fetch document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

// PATCH /api/documents/[id] - Update a document
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    const body = await request.json();
    const document = await prisma.document.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(document);
  } catch (error: any) {
    console.error('Failed to update document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update document' },
      { status: 500 }
    );
  }
}

// DELETE /api/documents/[id] - Delete a document
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    await prisma.document.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Failed to delete document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete document' },
      { status: 500 }
    );
  }
} 