import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import registerRoutes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND, credentials: true }));
app.use(express.json());
app.use(cookieParser());
registerRoutes(app);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
