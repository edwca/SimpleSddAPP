import axios from 'axios';

import type {
  RespuestaHistoriaDeRaza,
  RespuestaImagenesDeRaza,
  RespuestaListadoRazas,
} from '../types/breed';

const apiUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: apiUrl,
  timeout: 8000,
});

export const obtenerRazas = async (): Promise<RespuestaListadoRazas> => {
  const respuesta = await api.get<RespuestaListadoRazas>('/breeds');
  return respuesta.data;
};

export const obtenerHistoriaDeRaza = async (
  raza: string,
): Promise<RespuestaHistoriaDeRaza> => {
  const respuesta = await api.get<RespuestaHistoriaDeRaza>(
    `/breeds/${encodeURIComponent(raza)}/history`,
  );
  return respuesta.data;
};

export const obtenerImagenesDeRaza = async (
  raza: string,
): Promise<RespuestaImagenesDeRaza> => {
  const respuesta = await api.get<RespuestaImagenesDeRaza>(
    `/breeds/${encodeURIComponent(raza)}/images`,
  );
  return respuesta.data;
};

export const obtenerUrlImagenRepresentativa = (raza: string): string =>
  `${apiUrl}/breeds/${encodeURIComponent(raza)}/featured-image`;

export const descargarImagenRepresentativa = async (
  raza: string,
): Promise<Blob> => {
  const respuesta = await api.get<Blob>(
    `/breeds/${encodeURIComponent(raza)}/featured-image?download=1`,
    {
      responseType: 'blob',
    },
  );

  return respuesta.data;
};

export const descargarPdfDeRaza = async (raza: string): Promise<Blob> => {
  const respuesta = await api.get<Blob>(
    `/breeds/${encodeURIComponent(raza)}/report.pdf`,
    {
      responseType: 'blob',
    },
  );

  return respuesta.data;
};
