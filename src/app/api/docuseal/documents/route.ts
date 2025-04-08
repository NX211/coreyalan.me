import { NextRequest, NextResponse } from 'next/server';

const DOCUSEAL_API_URL = 'https://api.docuseal.com/v1';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the client
    const formData = await request.formData();
    
    // Send it to DocuSeal API
    const response = await fetch(`${DOCUSEAL_API_URL}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DOCUSEAL_API_KEY}`,
      },
      body: formData,
    });
    
    // Get the response data
    const data = await response.json();
    
    // If the API request failed, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to upload document' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 