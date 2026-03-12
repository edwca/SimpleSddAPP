import dotenv from 'dotenv';

dotenv.config();

const normalizarOrigin = (origin: string): string => origin.trim().replace(/\/+$/, '');

const leerNumero = (
  valor: string | undefined,
  valorPorDefecto: number,
  variable: string,
): number => {
  if (valor === undefined || valor.trim() === '') {
    return valorPorDefecto;
  }

  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    throw new Error(`La variable ${variable} debe ser numerica.`);
  }

  return numero;
};

export const env = {
  puerto: leerNumero(process.env.PORT, 3000, 'PORT'),
  apiBaseUrl: process.env.API_BASE_URL?.trim() || 'https://dog.ceo/api',
  rateLimitMax: leerNumero(process.env.RATE_LIMIT_MAX, 100, 'RATE_LIMIT_MAX'),
  allowedOrigins: (process.env.ALLOWED_ORIGIN ||
    'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map(normalizarOrigin)
    .filter(Boolean),
  axiosTimeoutMs: 5000,
};
