import { NextRequest, NextResponse } from 'next/server';

const OPENSIGN_API_URL = 'https://api.opensignlabs.com/v1';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Get signing URL from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents/${id}/signing-url`, {
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
        { message: data.message || 'Failed to generate signing URL' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('Signing URL generation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 