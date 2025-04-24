import { Request, Response, NextFunction } from 'express';
  import { NotFoundError } from '../../../domain/errors/NotFoundError';
  import { DatabaseError } from '../../../domain/errors/DatabaseError';
  import { InvalidDutyError } from '../../../domain/errors/InvalidDutyError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      error: error.message
    });
  }

  if (error instanceof DatabaseError) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }

  if (error instanceof InvalidDutyError) {
    return res.status(400).json({
      error: error.message
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}; 