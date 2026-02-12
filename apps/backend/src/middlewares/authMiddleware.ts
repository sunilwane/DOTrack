import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import RevokedTokenModel from '../models/revokedToken.model';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Unauthorized' });
  const token = parts[1];

  try {
    const revoked = await RevokedTokenModel.findOne({ token });
    if (revoked) return res.status(401).json({ error: 'Token revoked' });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set');
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
