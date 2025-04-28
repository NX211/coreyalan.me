export type FreeScoutAuthMethod = 'header' | 'query' | 'basic';

export interface FreeScoutAuthConfig {
  apiKey: string;
  method?: FreeScoutAuthMethod;
  baseUrl: string;
}

export interface FreeScoutAuthHeaders {
  'X-FreeScout-API-Key'?: string;
  'Authorization'?: string;
}

export interface FreeScoutAuthQuery {
  api_key?: string;
} 