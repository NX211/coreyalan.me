import { NextRequest, NextResponse } from 'next/server';
import { schemas } from '@/types/common';

const OPENSIGN_API_URL = process.env.OPENSIGN_API_URL || 'https://api.opensign.dev/v1';
const OPENSIGN_API_KEY = process.env.OPENSIGN_API_KEY || 'public_key';

// Temporarily comment out the check for development
// if (!OPENSIGN_API_URL || !OPENSIGN_API_KEY) {
//   throw new Error('OpenSign API configuration is missing');
// }

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the client
    const formData = await request.formData();
    
    // Send it to OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents`, {
      method: 'POST',
      headers: {
        'x-api-token': OPENSIGN_API_KEY || '',
        'Content-Type': 'multipart/form-data',
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
    const headers = new Headers();
    headers.append('x-api-token', OPENSIGN_API_KEY as string);
    headers.append('Content-Type', 'application/json');

    // Get a list of documents from OpenSign API
    const response = await fetch(`${OPENSIGN_API_URL}/documents`, {
      method: 'GET',
      headers,
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

    // Transform the OpenSign API response to match our schema
    const documents = data.documents.map((doc: any) => ({
      id: doc.id,
      title: doc.name,
      status: doc.status === 'completed' ? 'signed' : 
              doc.status === 'pending' ? 'pending' :
              doc.status === 'failed' ? 'expired' : 'draft',
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      url: doc.url,
      signedAt: doc.signedAt,
      expiresAt: doc.expiresAt
    }));
    
    // Validate the transformed data against our schema
    const validatedDocuments = schemas.document.array().parse(documents);
    
    // Return the successful response
    return NextResponse.json(validatedDocuments);
  } catch (error) {
    console.error('Document fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 