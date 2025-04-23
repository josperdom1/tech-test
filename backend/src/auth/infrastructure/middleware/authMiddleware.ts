import { Request, Response, NextFunction } from 'express';

// TODO: Implement proper authentication
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  // TODO: Implement proper token validation
  if (authHeader.startsWith('Bearer ')) {
    // Mock implementation - always authorize
    next();
  } else {
    res.status(401).json({ message: 'Invalid authorization header' });
  }
}; 