import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Initialize Google Drive API with default credentials
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/drive'],
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const drive = google.drive({ version: 'v3', auth });

// File validation constants
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/jpeg',
  'image/png',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel'
];

// Validate a file
function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File ${file.name} exceeds maximum size of 50MB` 
    };
  }
  
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `File ${file.name} has unsupported type: ${file.type}` 
    };
  }
  
  // Additional security checks could be added here
  // For example, scanning file content for malware signatures
  
  return { valid: true };
}

// POST /api/upload/google-drive - Upload files to Google Drive
export async function POST(request: NextRequest) {
  try {
    // API key validation
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.UPLOAD_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const clientEmail = formData.get('clientEmail') as string;
    
    if (!clientEmail) {
      return NextResponse.json(
        { error: 'Client email is required' },
        { status: 400 }
      );
    }

    // Find or create the user
    let user = await prisma.user.findUnique({
      where: { email: clientEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: clientEmail },
      });
    }

    // Create folder for user if it doesn't exist
    const folderName = `Client_${clientEmail.replace('@', '_at_')}`;
    
    // Check if folder exists
    const folderResponse = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });
    
    let folderId;
    
    if (folderResponse.data.files && folderResponse.data.files.length > 0) {
      folderId = folderResponse.data.files[0].id;
    } else {
      // Create folder
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };
      
      const folder = await drive.files.create({
        requestBody: folderMetadata as any,
        fields: 'id',
      });
      
      folderId = folder.data?.id;
    }
    
    // Upload each file
    const uploadedFiles = [];
    const rejectedFiles = [];
    
    // Use Array.from to convert iterator to array
    const entries = Array.from(formData.entries());
    
    for (const [key, value] of entries) {
      if (key !== 'clientEmail' && value instanceof File) {
        const file = value;
        
        // Validate file before uploading
        const validation = validateFile(file);
        if (!validation.valid) {
          rejectedFiles.push({
            name: file.name,
            error: validation.error
          });
          continue;
        }
        
        // Upload to Google Drive
        const fileMetadata = {
          name: file.name,
          parents: folderId ? [folderId] : undefined,
        };
        
        const media = {
          mimeType: file.type,
          body: file.stream(),
        };
        
        // Add type assertions to fix type errors
        const driveResponse = await drive.files.create({
          requestBody: fileMetadata as any,
          media: media as any,
          fields: 'id,name,webViewLink',
        });
        
        const fileId = driveResponse.data?.id || '';
        const webViewLink = driveResponse.data?.webViewLink || '';
        
        // Save to database
        const document = await prisma.document.create({
          data: {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            filePath: webViewLink,
            driveFileId: fileId,
            userId: user.id,
          },
        });
        
        uploadedFiles.push({
          id: document.id,
          name: file.name,
          driveId: fileId,
          url: webViewLink,
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      rejected: rejectedFiles.length > 0 ? rejectedFiles : undefined
    });
  } catch (error) {
    console.error('Failed to upload files to Google Drive:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// Define the maximum content length
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  },
}; 