import { Express } from 'express';
import authRouter from './auth';
import githubRouter from './github';

export default function registerRoutes(app: Express) {
  app.use('/api/auth', authRouter);
  app.use('/api/github', githubRouter);
}
