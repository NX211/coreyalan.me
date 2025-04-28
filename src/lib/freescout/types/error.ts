export class FreeScoutError extends Error {
  public status: number;
  public errors?: any[];

  constructor(message: string, options: { status: number; errors?: any[]; message?: string }) {
    super(options.message || message);
    this.name = 'FreeScoutError';
    this.status = options.status;
    this.errors = options.errors;
  }
} 