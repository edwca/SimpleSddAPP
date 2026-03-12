import PDFDocument from 'pdfkit';

import { BreedService } from './breed-service';

const breedService = new BreedService();

const agregarLinea = (
  documento: PDFKit.PDFDocument,
  etiqueta: string,
  valor: string,
): void => {
  documento
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(`${etiqueta}: `, {
      continued: true,
    })
    .font('Helvetica')
    .text(valor);
};

export class PdfService {
  public async generarPdfDeRaza(raza: string): Promise<Buffer> {
    const [historia, imagenes] = await Promise.all([
      breedService.obtenerHistoriaDeRaza(raza),
      breedService.obtenerImagenesDeRaza(raza),
    ]);

    return new Promise<Buffer>((resolve, reject) => {
      const documento = new PDFDocument({
        margin: 48,
      });
      const chunks: Buffer[] = [];

      documento.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      documento.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      documento.on('error', reject);

      documento
        .fillColor('#0f172a')
        .font('Helvetica-Bold')
        .fontSize(22)
        .text(`Reporte de raza: ${historia.raza.nombre}`);

      documento.moveDown(0.75);
      agregarLinea(
        documento,
        'Generado',
        new Date().toLocaleString('es-CL', {
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      );
      agregarLinea(documento, 'Total de imagenes', String(imagenes.imagenes.length));
      agregarLinea(documento, 'Fuente historia', historia.fuente.nombre);
      if (historia.fuente.url) {
        agregarLinea(documento, 'Referencia', historia.fuente.url);
      }

      documento.moveDown(1);
      documento
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Historia')
        .moveDown(0.4)
        .font('Helvetica')
        .fontSize(11)
        .fillColor('#334155')
        .text(historia.historia, {
          align: 'justify',
        });

      documento.moveDown(1);
      documento
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#0f172a')
        .text('Imagenes de referencia');

      imagenes.imagenes.slice(0, 8).forEach((imagen, indice) => {
        documento
          .moveDown(0.35)
          .font('Helvetica-Bold')
          .fontSize(10)
          .text(`Imagen ${indice + 1}`, {
            continued: true,
          })
          .font('Helvetica')
          .text(` - ${imagen}`, {
            link: imagen,
            underline: true,
          });
      });

      if (imagenes.imagenes.length > 8) {
        documento
          .moveDown(0.5)
          .font('Helvetica')
          .fontSize(10)
          .text(
            `Se omitieron ${imagenes.imagenes.length - 8} imagenes adicionales para mantener el reporte compacto.`,
          );
      }

      documento.end();
    });
  }
}
