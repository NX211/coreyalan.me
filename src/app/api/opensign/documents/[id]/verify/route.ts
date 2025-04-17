import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

const OPENSIGN_API_URL = 'https://api.opensignlabs.com/v1';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/opensign/documents/[id]/verify - Verify a document's signature
 * 
 * This endpoint verifies the cryptographic signature of a document by:
 * 1. Checking if the document exists in our database
 * 2. Verifying the document's signature with OpenSign's API
 * 3. Returning verification results
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    const prisma = getPrisma();
    if (!prisma) throw new Error('Database connection is unavailable');

    // First check if we have this document in our database
    const storedDocument = await prisma.signedDocument.findFirst({
      where: { externalId: id },
      include: { signer: true },
    });
    
    // Get verification data from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents/${id}/verify`, {
      method: 'GET',
      headers: {
        'x-api-token': `${process.env.OPENSIGN_API_KEY}`,
      },
    });
    
    // If the API request failed, handle it appropriately
    if (!response.ok) {
      // Try to get response data
      const data = await response.json().catch(() => ({}));
      
      return NextResponse.json(
        { 
          isValid: false,
          error: data.message || 'Failed to verify document with OpenSign' 
        },
        { status: response.status }
      );
    }
    
    // Get the verification result from OpenSign
    const opensignData = await response.json();
    
    // Return combined verification result from our database and OpenSign
    return NextResponse.json({
      isValid: opensignData.isValid && storedDocument?.status === 'SIGNED',
      details: {
        documentId: id,
        signedBy: storedDocument?.signer?.email || opensignData.signedBy,
        signedOn: storedDocument?.signedAt || opensignData.signedOn,
        documentHash: opensignData.documentHash,
        verifiedAt: new Date().toISOString(),
        status: storedDocument?.status || 'UNKNOWN'
      }
    });
  } catch (error: any) {
    console.error('Document verification error:', error);
    return NextResponse.json(
      { 
        isValid: false,
        error: error.message || 'Internal server error during verification'
      },
      { status: 500 }
    );
  }
}

// Remove unused POST handler if not needed, or implement similarly
/*
export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma(); 
    if (!prisma) throw new Error('Database connection is unavailable');
    // ... rest of function using prisma ...
  } catch (error: any) {
     // ... error handling ...
  }
} 
*/ 