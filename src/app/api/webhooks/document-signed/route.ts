import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { Status } from '@prisma/client';

// POST /api/webhooks/document-signed - Handle signing service webhooks
export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    // Validate API key
    const apiKey = request.headers.get('x-api-token');
    if (apiKey !== process.env.OPENSIGN_API_KEY) {
      console.error('Invalid API key');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the body as JSON
    const body = await request.json();
    
    // Handle OpenSign webhook
    if (body.type === 'document.signed') {
      const externalId = body.documentId;
      
      // Find the document by external ID
      const document = await prisma.signedDocument.findFirst({
        where: { externalId },
      });
      
      if (!document) {
        console.error('Document not found with external ID:', externalId);
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }
      
      // Update document status
      await prisma.signedDocument.update({
        where: { id: document.id },
        data: {
          status: Status.SIGNED,
          signedAt: new Date(),
          signedDocumentUrl: body.signedDocumentUrl || document.documentUrl,
        },
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { error: 'Unhandled webhook event' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Failed to process webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 