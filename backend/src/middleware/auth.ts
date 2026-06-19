import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }
  const token = authHeader.slice(7);
  if (token !== env.ADMIN_SECRET) {
    res.status(403).json({ success: false, error: 'Forbidden' });
    return;
  }
  next();
}
