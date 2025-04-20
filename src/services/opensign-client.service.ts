import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

// Base API response schema
const baseResponseSchema = z.object({
  data: z.any(),
  message: z.string().optional(),
  error: z.string().optional(),
});

// Template schemas
const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const templateListSchema = z.array(templateSchema);

// User schemas
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userListSchema = z.array(userSchema);

// Contact schemas
const contactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const contactListSchema = z.array(contactSchema);

// Folder schemas
const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const folderListSchema = z.array(folderSchema);

export class OpenSignClientService {
  private client: AxiosInstance;
  private readonly baseUrl: string;

  constructor(apiKey: string) {
    this.baseUrl = 'https://api.opensignlabs.com/v1';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'x-api-token': apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(
    method: string,
    url: string,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        method,
        url,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || 'An error occurred'
        );
      }
      throw error;
    }
  }

  // Templates
  async listTemplates() {
    const response = await this.request<unknown>('GET', '/templates');
    return templateListSchema.parse(response);
  }

  async getTemplate(id: string) {
    const response = await this.request<unknown>('GET', `/templates/${id}`);
    return templateSchema.parse(response);
  }

  async createTemplate(data: z.infer<typeof templateSchema>) {
    const response = await this.request<unknown>('POST', '/templates', { data });
    return templateSchema.parse(response);
  }

  async updateTemplate(id: string, data: Partial<z.infer<typeof templateSchema>>) {
    const response = await this.request<unknown>('PUT', `/templates/${id}`, { data });
    return templateSchema.parse(response);
  }

  async deleteTemplate(id: string) {
    await this.request('DELETE', `/templates/${id}`);
  }

  // Users
  async listUsers() {
    const response = await this.request<unknown>('GET', '/users');
    return userListSchema.parse(response);
  }

  async getUser(id: string) {
    const response = await this.request<unknown>('GET', `/users/${id}`);
    return userSchema.parse(response);
  }

  async createUser(data: z.infer<typeof userSchema>) {
    const response = await this.request<unknown>('POST', '/users', { data });
    return userSchema.parse(response);
  }

  async updateUser(id: string, data: Partial<z.infer<typeof userSchema>>) {
    const response = await this.request<unknown>('PUT', `/users/${id}`, { data });
    return userSchema.parse(response);
  }

  async deleteUser(id: string) {
    await this.request('DELETE', `/users/${id}`);
  }

  // Contacts
  async listContacts() {
    const response = await this.request<unknown>('GET', '/contacts');
    return contactListSchema.parse(response);
  }

  async getContact(id: string) {
    const response = await this.request<unknown>('GET', `/contacts/${id}`);
    return contactSchema.parse(response);
  }

  async createContact(data: z.infer<typeof contactSchema>) {
    const response = await this.request<unknown>('POST', '/contacts', { data });
    return contactSchema.parse(response);
  }

  async updateContact(id: string, data: Partial<z.infer<typeof contactSchema>>) {
    const response = await this.request<unknown>('PUT', `/contacts/${id}`, { data });
    return contactSchema.parse(response);
  }

  async deleteContact(id: string) {
    await this.request('DELETE', `/contacts/${id}`);
  }

  // Folders
  async listFolders() {
    const response = await this.request<unknown>('GET', '/folders');
    return folderListSchema.parse(response);
  }

  async getFolder(id: string) {
    const response = await this.request<unknown>('GET', `/folders/${id}`);
    return folderSchema.parse(response);
  }

  async createFolder(data: z.infer<typeof folderSchema>) {
    const response = await this.request<unknown>('POST', '/folders', { data });
    return folderSchema.parse(response);
  }

  async updateFolder(id: string, data: Partial<z.infer<typeof folderSchema>>) {
    const response = await this.request<unknown>('PUT', `/folders/${id}`, { data });
    return folderSchema.parse(response);
  }

  async deleteFolder(id: string) {
    await this.request('DELETE', `/folders/${id}`);
  }
} 