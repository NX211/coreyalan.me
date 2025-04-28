export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  customFields: Record<string, any>;
  socialProfiles: SocialProfile[];
  organization?: Organization;
}

export interface CustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  socialProfiles?: SocialProfile[];
  organizationId?: number;
}

export interface CustomerUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  socialProfiles?: SocialProfile[];
  organizationId?: number;
}

export interface SocialProfile {
  type: string;
  value: string;
}

export interface Organization {
  id: number;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  customFields?: Record<string, any>;
}

export interface CustomerListResponse {
  customers: Customer[];
  total: number;
  page: number;
  perPage: number;
}

export interface CustomerSearchResponse {
  customers: Customer[];
  total: number;
}

export interface CustomerHistory {
  events: Array<{
    type: string;
    timestamp: string;
    user?: {
      id: number;
      name: string;
    };
    data: any;
  }>;
} 