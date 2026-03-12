import axios, { type AxiosInstance, isAxiosError } from 'axios';

import { env } from '../config/env';
import { AppError } from '../utils/app-error';

type RespuestaDogCeo<T> = {
  message: T;
  status: string;
};

export class DogCeoClient {
  private readonly cliente: AxiosInstance;

  public constructor() {
    this.cliente = axios.create({
      baseURL: env.apiBaseUrl,
      timeout: env.axiosTimeoutMs,
    });
  }

  public async obtenerRazas(): Promise<Record<string, string[]>> {
    try {
      const respuesta = await this.cliente.get<
        RespuestaDogCeo<Record<string, string[]>>
      >('/breeds/list/all');

      if (respuesta.data.status !== 'success') {
        throw new AppError(
          502,
          'UPSTREAM_ERROR',
          'La API externa devolvio una respuesta no valida.',
        );
      }

      return respuesta.data.message;
    } catch (error) {
      throw this.mapearError(error);
    }
  }

  public async obtenerImagenesPorRaza(raza: string): Promise<string[]> {
    try {
      const respuesta = await this.cliente.get<RespuestaDogCeo<string[]>>(
        `/breed/${encodeURIComponent(raza)}/images`,
      );

      if (respuesta.data.status !== 'success') {
        throw new AppError(
          502,
          'UPSTREAM_ERROR',
          'La API externa devolvio una respuesta no valida.',
        );
      }

      return respuesta.data.message;
    } catch (error) {
      throw this.mapearError(error);
    }
  }

  public async descargarImagenDesdeUrl(
    imageUrl: string,
  ): Promise<{ contenido: Buffer; contentType: string | undefined }> {
    try {
      const respuesta = await this.cliente.get<ArrayBuffer>(imageUrl, {
        responseType: 'arraybuffer',
      });

      return {
        contenido: Buffer.from(respuesta.data),
        contentType:
          typeof respuesta.headers['content-type'] === 'string'
            ? respuesta.headers['content-type']
            : undefined,
      };
    } catch (error) {
      throw this.mapearError(error);
    }
  }

  private mapearError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (isAxiosError(error)) {
      const statusCode = error.response?.status === 404 ? 404 : 502;
      const codigo = statusCode === 404 ? 'BREED_NOT_FOUND' : 'UPSTREAM_ERROR';
      const mensaje =
        statusCode === 404
          ? 'La raza solicitada no existe en la API externa.'
          : 'No fue posible consultar la API externa.';

      return new AppError(statusCode, codigo, mensaje, {
        status: error.response?.status,
      });
    }

    return new AppError(
      500,
      'INTERNAL_ERROR',
      'Ocurrio un error inesperado al consultar Dog CEO.',
    );
  }
}
