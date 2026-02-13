import { CookieOptions } from 'express';

export const getRefreshCookieOptions = (): CookieOptions => {
  const isProd = process.env.NODE_ENV === 'production';
  const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    domain: undefined,
    path: '/api/auth',
    maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN ? Number(process.env.REFRESH_TOKEN_EXPIRES_IN) * 1000 : 7 * 24 * 60 * 60 * 1000),
  } as CookieOptions;
};
