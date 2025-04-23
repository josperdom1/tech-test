import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../../../domain/errors/ApplicationError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    errorCode: 'INTERNAL_SERVER_ERROR'
  });
}; 