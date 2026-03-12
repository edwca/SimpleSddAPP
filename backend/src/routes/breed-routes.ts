import { Router } from 'express';

import { BreedController } from '../controllers/breed-controller';

const breedController = new BreedController();

export const breedRoutes = Router();

breedRoutes.get('/breeds', (req, res, next) => {
  void breedController.listarRazas(req, res, next);
});

breedRoutes.get('/breeds/:breed/images', (req, res, next) => {
  void breedController.obtenerImagenesDeRaza(req, res, next);
});

breedRoutes.get('/breeds/:breed/featured-image', (req, res, next) => {
  void breedController.obtenerImagenRepresentativa(req, res, next);
});

breedRoutes.get('/breeds/:breed/history', (req, res, next) => {
  void breedController.obtenerHistoriaDeRaza(req, res, next);
});

breedRoutes.get('/breeds/:breed/report.pdf', (req, res, next) => {
  void breedController.descargarPdfDeRaza(req, res, next);
});
