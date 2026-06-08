import { Express } from 'express';
import authRouter from './auth';
import githubRouter from './github';
import chatRouter from './chat';

export default function registerRoutes(app: Express) {
  app.use('/api/auth', authRouter);
  app.use('/api/github', githubRouter);
  app.use('/api/chat', chatRouter);
}
