import { ApplicationError } from './ApplicationError';

export class DatabaseError extends ApplicationError {
  constructor(message: string, public readonly originalError: unknown) {
    super(message, 500, 'DATABASE_ERROR');
  }
} 