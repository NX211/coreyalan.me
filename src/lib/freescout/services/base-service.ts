import { FreeScoutAuthConfig } from '../types';

export class BaseService {
  protected config: FreeScoutAuthConfig;

  constructor(config: FreeScoutAuthConfig) {
    this.config = config;
  }
} 