import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// Function to validate webhook signature
function validateSignature(signature: string | null, payload: string): boolean {
  if (!signature || !process.env.OPENSIGN_WEBHOOK_SECRET) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', process.env.OPENSIGN_WEBHOOK_SECRET);
  const calculatedSignature = hmac.update(payload).digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
}

// POST /api/webhooks/document-signed - Handle signing service webhooks
export async function POST(request: NextRequest) {
  try {
    // Get the raw request body for signature validation
    const rawBody = await request.text();
    
    // Validate webhook signature
    const signature = request.headers.get('x-opensign-signature');
    if (!validateSignature(signature, rawBody)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    // Parse the body as JSON
    const body = JSON.parse(rawBody);
    
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
          status: 'SIGNED',
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