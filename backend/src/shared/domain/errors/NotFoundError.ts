import { ApplicationError } from './ApplicationError';

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND');
  }
} 