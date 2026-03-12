import axios, { type AxiosInstance, isAxiosError } from 'axios';

import type { Raza } from '../services/breed-service';
import { AppError } from '../utils/app-error';

type RespuestaBusquedaWikipedia = {
  query?: {
    search?: Array<{
      title: string;
    }>;
  };
};

type RespuestaResumenWikipedia = {
  extract?: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

type HistoriaWikipedia = {
  extracto: string;
  fuente: string;
  url: string | null;
};

const aliasPorRaza: Record<string, string[]> = {
  germanshepherd: ['German Shepherd', 'German Shepherd dog'],
  mexicanhairless: ['Xoloitzcuintli', 'Mexican hairless dog'],
  stbernard: ['St. Bernard (dog)', 'Saint Bernard'],
  shihtzu: ['Shih Tzu'],
  african: ['Africanis', 'African dog'],
  mastiff: ['Mastiff', 'English Mastiff'],
  sheepdog: ['Sheep dog', 'Old English Sheepdog'],
  waterdog: ['Water dog', 'Portuguese Water Dog'],
};

const construirTitulosPosibles = (raza: Raza): string[] => {
  const base = raza.nombre;
  const overrides = aliasPorRaza[raza.id] ?? [];

  return Array.from(
    new Set([
      ...overrides,
      base,
      `${base} dog`,
      `${base} perro`,
      `${base} breed`,
    ]),
  );
};

export class WikipediaClient {
  private readonly clienteBusquedaEs: AxiosInstance;

  private readonly clienteBusquedaEn: AxiosInstance;

  private readonly clienteResumenEs: AxiosInstance;

  private readonly clienteResumenEn: AxiosInstance;

  public constructor() {
    this.clienteBusquedaEs = axios.create({
      baseURL: 'https://es.wikipedia.org/w/api.php',
      timeout: 5000,
    });
    this.clienteBusquedaEn = axios.create({
      baseURL: 'https://en.wikipedia.org/w/api.php',
      timeout: 5000,
    });
    this.clienteResumenEs = axios.create({
      baseURL: 'https://es.wikipedia.org/api/rest_v1/page/summary',
      timeout: 5000,
    });
    this.clienteResumenEn = axios.create({
      baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary',
      timeout: 5000,
    });
  }

  public async buscarHistoria(raza: Raza): Promise<HistoriaWikipedia | null> {
    try {
      const titulos = construirTitulosPosibles(raza);

      for (const titulo of titulos) {
        const resumenEs = await this.obtenerResumenPorBusqueda(
          this.clienteBusquedaEs,
          this.clienteResumenEs,
          titulo,
          'Wikipedia ES',
        );

        if (resumenEs) {
          return resumenEs;
        }

        const resumenEn = await this.obtenerResumenPorBusqueda(
          this.clienteBusquedaEn,
          this.clienteResumenEn,
          titulo,
          'Wikipedia EN',
        );

        if (resumenEn) {
          return resumenEn;
        }
      }

      return null;
    } catch (error) {
      if (isAxiosError(error)) {
        return null;
      }

      throw new AppError(
        500,
        'INTERNAL_ERROR',
        'No fue posible construir la historia de la raza.',
      );
    }
  }

  private async obtenerResumenPorBusqueda(
    clienteBusqueda: AxiosInstance,
    clienteResumen: AxiosInstance,
    termino: string,
    fuente: string,
  ): Promise<HistoriaWikipedia | null> {
    const respuestaBusqueda = await clienteBusqueda.get<RespuestaBusquedaWikipedia>(
      '',
      {
        params: {
          action: 'query',
          list: 'search',
          srsearch: `${termino} dog breed`,
          format: 'json',
        },
      },
    );

    const titulos = respuestaBusqueda.data.query?.search
      ?.map((item) => item.title)
      .slice(0, 3);

    if (!titulos || titulos.length === 0) {
      return null;
    }

    for (const titulo of titulos) {
      const respuestaResumen = await clienteResumen.get<RespuestaResumenWikipedia>(
        `/${encodeURIComponent(titulo)}`,
      );

      const extracto = respuestaResumen.data.extract?.trim();

      if (extracto) {
        return {
          extracto,
          fuente,
          url: respuestaResumen.data.content_urls?.desktop?.page || null,
        };
      }
    }

    return null;
  }
}
