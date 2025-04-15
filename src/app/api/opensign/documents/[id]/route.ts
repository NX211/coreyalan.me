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
    
    // Get the document from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents/${id}`, {
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
        { message: data.message || 'Failed to fetch document' },
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Delete the document from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-token': `${process.env.OPENSIGN_API_KEY}`,
      },
    });
    
    // If no content response, return success
    if (response.status === 204) {
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, try to get response data
    const data = await response.json().catch(() => ({}));
    
    // If the API request failed, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to delete document' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Document delete error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 