import cors from 'cors';
import express from 'express';
import crearRateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found';
import { breedRoutes } from './routes/breed-routes';
import { AppError } from './utils/app-error';

export const createApp = (): express.Express => {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || env.allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(
          new AppError(
            403,
            'FORBIDDEN_ORIGIN',
            'El origen solicitado no esta permitido por CORS.',
          ),
        );
      },
    }),
  );
  app.use(express.json());
  app.use(
    '/api',
    crearRateLimit({
      windowMs: 15 * 60 * 1000,
      max: env.rateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get('/health', (_req, res) => {
    res.json({
      estado: 'ok',
    });
  });

  app.use('/api', breedRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
