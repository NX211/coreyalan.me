import { FreeScoutAuthConfig } from '../types';
import { BaseService } from './base-service';

export class AuthService extends BaseService {
  constructor(config: FreeScoutAuthConfig) {
    super(config);
  }

  async getConfig(): Promise<FreeScoutAuthConfig> {
    return this.config;
  }
} 