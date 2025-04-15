import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize Google Drive client
const initGoogleDriveClient = () => {
  // The key file should be a JSON service account key from Google Cloud
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

  return google.drive({ version: 'v3', auth: serviceAccountAuth });
};

// Create a folder if it doesn't exist
export const findOrCreateFolder = async (folderName: string, parentFolderId?: string): Promise<string> => {
  const drive = initGoogleDriveClient();
  
  // Check if folder already exists
  const query = [
    `mimeType='application/vnd.google-apps.folder'`,
    `name='${folderName}'`,
    'trashed=false'
  ];
  
  if (parentFolderId) {
    query.push(`'${parentFolderId}' in parents`);
  }

  const res = await drive.files.list({
    q: query.join(' and '),
    fields: 'files(id, name)',
    spaces: 'drive'
  });

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id as string;
  }

  // If folder doesn't exist, create it
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parentFolderId && { parents: [parentFolderId] })
  };

  const folder = await drive.files.create({
    requestBody: folderMetadata,
    fields: 'id'
  });

  return folder.data.id as string;
};

// Upload file to Google Drive
export const uploadFileToDrive = async (
  fileName: string,
  mimeType: string,
  fileContent: Buffer,
  folderId: string
): Promise<{ id: string; webViewLink: string }> => {
  const drive = initGoogleDriveClient();

  const fileMetadata = {
    name: fileName,
    parents: [folderId]
  };

  const media = {
    mimeType,
    body: fileContent
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id, webViewLink'
  });

  // Set permissions - anyone with the link can view
  await drive.permissions.create({
    fileId: response.data.id as string,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  });

  return {
    id: response.data.id as string,
    webViewLink: response.data.webViewLink as string
  };
};

// Get shared folder ID (find or create)
export const getClientSharedFolder = async (clientEmail: string): Promise<string> => {
  // First, find or create the main uploads folder
  const mainFolderId = await findOrCreateFolder('Client Uploads');
  
  // Then find or create a specific folder for this client
  // Use email as an identifier, but clean it up for folder name
  const clientFolderName = `${clientEmail.split('@')[0]}-uploads`;
  return findOrCreateFolder(clientFolderName, mainFolderId);
}; 