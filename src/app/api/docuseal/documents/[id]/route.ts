import { NextRequest, NextResponse } from 'next/server';

const DOCUSEAL_API_URL = 'https://api.docuseal.com/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = params.id;
    
    // Send request to DocuSeal API
    const response = await fetch(
      `${DOCUSEAL_API_URL}/documents/${documentId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.DOCUSEAL_API_KEY}`,
        },
      }
    );
    
    // Get the response data
    const data = await response.json();
    
    // If the API request failed, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to get document status' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Document status error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 