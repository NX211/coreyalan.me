import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { PrismaClient, Status } from '@prisma/client'; // Import type if needed

// Helper function to check if a string is a valid Status enum key
function isValidStatus(status: string): status is Status {
  return status in Status;
}

// GET /api/signedDocuments - Get all signed documents
export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma(); // Get client inside try block
    if (!prisma) throw new Error('Database connection is unavailable');

    const searchParams = request.nextUrl.searchParams;
    const statusParam = searchParams.get('status');

    let statusFilter: Status | undefined = undefined;
    if (statusParam) {
      if (isValidStatus(statusParam)) {
        statusFilter = statusParam;
      } else {
        console.warn(`Invalid status query parameter: ${statusParam}`);
        // Optionally return 400 Bad Request for invalid status
        return NextResponse.json({ error: `Invalid status value: ${statusParam}` }, { status: 400 });
      }
    }

    const documents = await prisma.signedDocument.findMany({
      where: statusFilter ? { status: statusFilter } : {}, // Use validated status
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(documents);

  } catch (error: any) {
    console.error('Error fetching signed documents:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch documents' }, 
      { status: 500 } // Keep status 500 for simplicity
    );
  }
}

// POST /api/signedDocuments - Create a new signed document
export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma(); // Get client inside try block
    if (!prisma) throw new Error('Database connection is unavailable');

    const body = await request.json();
    
    // Validate status if provided, otherwise default applies
    let documentStatus = body.status;
    if (documentStatus && !isValidStatus(documentStatus)) {
        return NextResponse.json({ error: `Invalid status value provided: ${documentStatus}` }, { status: 400 });
    }

    const document = await prisma.signedDocument.create({
      data: {
        documentName: body.documentName,
        documentType: body.documentType,
        // Use validated status or allow Prisma default (PENDING)
        status: documentStatus as Status | undefined, 
        externalId: body.externalId,
        documentUrl: body.documentUrl,
        signedDocumentUrl: body.signedDocumentUrl,
        signerId: body.signerId,
        signedAt: body.signedAt ? new Date(body.signedAt) : undefined, // Ensure Date conversion
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined, // Ensure Date conversion
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create signed document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create signed document' },
      { status: 500 }
    );
  }
} 