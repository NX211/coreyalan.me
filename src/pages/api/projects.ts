import { NextApiRequest, NextApiResponse } from 'next';
import { schemas } from '@/types/common';
import { z } from 'zod';
import { apiSecurityMiddleware } from '@/middleware/apiSecurity';
import { errorHandler } from '@/middleware/errorHandler';
import { ValidationError, NotFoundError } from '@/middleware/errorHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(req, res, async () => {
    switch (req.method) {
      case 'GET':
        try {
          const projects = await getProjects();
          return res.status(200).json(projects);
        } catch {
          throw new NotFoundError('projects');
        }

      case 'POST':
        try {
          const projectSchema = z.union([schemas.projectInfo, schemas.projectFeature]);
          let newProject;
          try {
            newProject = projectSchema.parse(req.body);
          } catch (err) {
            if (err instanceof z.ZodError) {
              throw new ValidationError('Invalid project data', {
                zodError: err.errors,
              });
            }
            throw err;
          }
          
          const createdProject = await createProject(newProject);
          return res.status(201).json(createdProject);
        } catch (err) {
          if (err instanceof ValidationError) {
            throw err;
          }
          throw new ValidationError('Failed to create project', {
            error: err instanceof Error ? err.message : 'Unknown error'
          });
        }

      default:
        throw new ValidationError('Method not allowed', {
          method: req.method,
          allowedMethods: ['GET', 'POST']
        });
    }
  });
}

async function getProjects() {
  try {
    // Implementation to fetch projects from database
    return [];
  } catch {
    throw new NotFoundError('Failed to fetch projects');
  }
}

async function createProject(project: z.infer<typeof schemas.projectInfo> | z.infer<typeof schemas.projectFeature>) {
  try {
    // Implementation to create project in database
    return project;
  } catch (err) {
    throw new ValidationError('Failed to create project', {
      project,
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

export default apiSecurityMiddleware(handler); 