import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { pool } from './config/database';
import { secureHeaders } from './middleware/secureHeaders';
import { generalLimiter } from './middleware/rateLimiter';
import { logger } from './utils/logger';
import boatRoutes from './routes/boatRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(secureHeaders);
app.set('trust proxy', 1);

app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(morgan('combined', {
  stream: { write: (msg: string) => logger.http(msg.trim()) },
}));

app.use(express.json({ limit: '10kb' }));

app.use('/api/', generalLimiter);

app.use('/api/boats', boatRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.NODE_ENV });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', { err });
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const server = app.listen(env.PORT, async () => {
  try {
    await pool.query('SELECT 1');
    logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  } catch (err) {
    logger.error('Database connection failed on startup', { err });
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  server.close(() => {
    pool.end();
    logger.info('Server gracefully shut down');
  });
});

export default app;
