import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { schemas } from '@/types/common';
import { formSchemas } from '@/types/forms';
import { apiSecurityMiddleware } from '@/middleware/apiSecurity';
import { errorHandler } from '@/middleware/errorHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(req, res, async () => {
    switch (req.method) {
      case 'GET':
        const documents = await getDocuments();
        return res.status(200).json(documents);

      case 'POST':
        const formData = await formSchemas.documentUploadFormData.parse(req.body);
        const document = await createDocument(formData);
        return res.status(201).json(document);

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  });
}

async function getDocuments() {
  // Implementation to fetch documents from database
  return [];
}

async function createDocument(data: z.infer<typeof formSchemas.documentUploadFormData>) {
  // Implementation to create document in database
  return {
    id: '1',
    name: data.file.name,
    type: data.file.type,
    size: data.file.size,
    url: 'https://example.com/document',
    uploadedAt: new Date().toISOString(),
    status: 'completed',
  };
}

export default apiSecurityMiddleware(handler); 