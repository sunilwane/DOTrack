import crypto from 'crypto';

export const generateRefreshToken = (size = 64) => {
  return crypto.randomBytes(size).toString('hex');
};

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
