import { NextRequest, NextResponse } from 'next/server';

const OPENSIGN_API_URL = 'https://api.opensignlabs.com/v1';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the client
    const formData = await request.formData();
    
    // Send it to OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents`, {
      method: 'POST',
      headers: {
        'x-api-token': `${process.env.OPENSIGN_API_KEY}`,
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

export async function GET(request: NextRequest) {
  try {
    // Get a list of documents from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents`, {
      method: 'GET',
      headers: {
        'x-api-token': `${process.env.OPENSIGN_API_KEY}`,
      },
    });
    
    // Get the response data
    const data = await response.json();
    
    // If the API request failed, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch documents' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Document fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 