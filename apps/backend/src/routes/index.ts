import { Express } from 'express';
import authRouter from './auth';

export default function registerRoutes(app: Express) {
  app.use('/api/auth', authRouter);
}
