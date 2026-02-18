import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import registerRoutes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { normalizeOrigin, parseAllowedOrigins } from './utils/origin';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const DEFAULT_FRONTEND_ORIGIN = 'https://imaginative-otter-9fa0f4.netlify.app';
const allowedOrigins = parseAllowedOrigins(process.env.FRONTEND_URL, DEFAULT_FRONTEND_ORIGIN);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);
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
