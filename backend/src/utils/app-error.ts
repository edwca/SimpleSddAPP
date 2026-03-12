export class AppError extends Error {
  public readonly statusCode: number;

  public readonly codigo: string;

  public readonly detalle?: unknown;

  public constructor(
    statusCode: number,
    codigo: string,
    mensaje: string,
    detalle?: unknown,
  ) {
    super(mensaje);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.codigo = codigo;
    this.detalle = detalle;
  }
}
