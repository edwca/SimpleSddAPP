import { type Request, type Response } from 'express';

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      codigo: 'NOT_FOUND',
      mensaje: 'El recurso solicitado no existe.',
    },
  });
};
