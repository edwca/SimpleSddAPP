import { type NextFunction, type Request, type Response } from 'express';

import { BreedService } from '../services/breed-service';
import { PdfService } from '../services/pdf-service';

const breedService = new BreedService();
const pdfService = new PdfService();

export class BreedController {
  public async listarRazas(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const razas = await breedService.listarRazas();

      res.json({
        datos: razas,
        meta: {
          total: razas.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async obtenerImagenesDeRaza(
    req: Request<{ breed: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const datos = await breedService.obtenerImagenesDeRaza(req.params.breed);

      res.json({
        datos,
        meta: {
          total: datos.imagenes.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async obtenerHistoriaDeRaza(
    req: Request<{ breed: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const datos = await breedService.obtenerHistoriaDeRaza(req.params.breed);

      res.json({
        datos,
      });
    } catch (error) {
      next(error);
    }
  }

  public async obtenerImagenRepresentativa(
    req: Request<{ breed: string }, unknown, unknown, { download?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const datos = await breedService.obtenerImagenRepresentativa(req.params.breed);
      const esDescarga = req.query.download === '1';

      res.setHeader(
        'Content-Type',
        datos.contentType || 'application/octet-stream',
      );
      res.setHeader('Cache-Control', 'public, max-age=300');

      if (esDescarga) {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${datos.raza.id}-imagen-principal.jpg"`,
        );
      }

      res.send(datos.contenido);
    } catch (error) {
      next(error);
    }
  }

  public async descargarPdfDeRaza(
    req: Request<{ breed: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const pdf = await pdfService.generarPdfDeRaza(req.params.breed);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${req.params.breed}-reporte.pdf"`,
      );
      res.send(pdf);
    } catch (error) {
      next(error);
    }
  }
}
