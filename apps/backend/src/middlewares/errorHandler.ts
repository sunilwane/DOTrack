import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.status || 500;
  const isProd = process.env.NODE_ENV === 'production';
  const message = status >= 500 ? 'Internal Server Error' : err?.message || 'Error';
  if (!isProd) console.error(err);
  res.status(status).json({ error: message });
}
