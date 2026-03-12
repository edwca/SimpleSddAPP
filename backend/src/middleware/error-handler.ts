import { type NextFunction, type Request, type Response } from 'express';

import { AppError } from '../utils/app-error';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  void next;

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        codigo: error.codigo,
        mensaje: error.message,
      },
    });

    return;
  }

  res.status(500).json({
    error: {
      codigo: 'INTERNAL_ERROR',
      mensaje: 'Ocurrio un error interno no controlado.',
    },
  });
};
