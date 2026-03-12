import { DogCeoClient } from '../clients/dog-ceo-client';
import { WikipediaClient } from '../clients/wikipedia-client';
import { AppError } from '../utils/app-error';

export type Raza = {
  id: string;
  nombre: string;
  subRazas: string[];
};

export type ImagenesDeRaza = {
  raza: {
    id: string;
    nombre: string;
  };
  imagenes: string[];
};

export type HistoriaDeRaza = {
  raza: {
    id: string;
    nombre: string;
  };
  historia: string;
  fuente: {
    nombre: string;
    url: string | null;
  };
};

export type ImagenRepresentativa = {
  raza: {
    id: string;
    nombre: string;
  };
  contenido: Buffer;
  contentType: string | undefined;
};

const clienteDogCeo = new DogCeoClient();
const clienteWikipedia = new WikipediaClient();

const formatearNombre = (valor: string): string =>
  valor
    .split('-')
    .map((fragmento) =>
      fragmento
        ? fragmento.charAt(0).toUpperCase() + fragmento.slice(1)
        : fragmento,
    )
    .join(' ');

const validarRaza = (raza: string): string => {
  const valor = raza.trim().toLowerCase();

  if (!/^[a-z-]+$/.test(valor)) {
    throw new AppError(
      400,
      'BAD_REQUEST',
      'La raza solicitada no es valida.',
    );
  }

  return valor;
};

const mensajesFallbackPorRaza: Record<string, string> = {
  husky:
    'El husky siberiano se desarrollo en Siberia junto al pueblo chukchi, que lo crio como perro de trineo resistente, sociable y capaz de recorrer grandes distancias bajo temperaturas extremas.',
  beagle:
    'El beagle moderno se consolidó en Inglaterra a partir de perros sabuesos pequeños utilizados para seguir liebres y conejos, destacando por su olfato fino y su temperamento activo.',
  boxer:
    'El boxer tiene sus bases en Alemania del siglo XIX, donde descendio de perros de trabajo como el bullenbeisser y evoluciono hasta convertirse en un perro guardian y de compañia muy versatil.',
  bulldog:
    'El bulldog ingles paso de un origen ligado a actividades brutales del pasado a convertirse, tras una fuerte seleccion, en una raza de compañia asociada a calma, firmeza y lealtad.',
  labrador:
    'El labrador retriever desciende de perros de agua utilizados por pescadores en Terranova y fue refinado en Reino Unido como perro cobrador, destacando por su inteligencia y caracter equilibrado.',
  poodle:
    'Aunque hoy suele asociarse a Francia, el poodle tiene una historia vinculada a Europa central como perro cobrador de agua, y con el tiempo sumo un fuerte lugar en los hogares y exposiciones.',
  rottweiler:
    'El rottweiler se relaciona con perros de trabajo del Imperio romano y mas tarde con tareas de arreo y proteccion en la ciudad alemana de Rottweil, donde consolidó su nombre moderno.',
};

const construirHistoriaFallback = (raza: Raza): string => {
  const mensajePredefinido = mensajesFallbackPorRaza[raza.id];

  if (mensajePredefinido) {
    return mensajePredefinido;
  }

  const segmentoSubRazas =
    raza.subRazas.length > 0
      ? ` Dentro de esta raza tambien aparecen variantes como ${raza.subRazas.join(
          ', ',
        )}.`
      : '';

  return `${raza.nombre} forma parte del catalogo consultado por la aplicacion y su historia esta ligada a la evolucion de los perros de trabajo y compañia en distintas regiones del mundo.${segmentoSubRazas} Cuando no existe una reseña externa precisa, la aplicacion mantiene esta descripcion generica para no interrumpir la experiencia.`;
};

export class BreedService {
  public async listarRazas(): Promise<Raza[]> {
    const razas = await clienteDogCeo.obtenerRazas();

    return Object.entries(razas)
      .map(([id, subRazas]) => ({
        id,
        nombre: formatearNombre(id),
        subRazas: subRazas.map(formatearNombre),
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  public async obtenerRazaPorId(raza: string): Promise<Raza> {
    const razaValidada = validarRaza(raza);
    const razas = await this.listarRazas();
    const razaEncontrada = razas.find((item) => item.id === razaValidada);

    if (!razaEncontrada) {
      throw new AppError(
        404,
        'BREED_NOT_FOUND',
        'La raza solicitada no existe en el catalogo disponible.',
      );
    }

    return razaEncontrada;
  }

  public async obtenerImagenesDeRaza(raza: string): Promise<ImagenesDeRaza> {
    const razaValidada = validarRaza(raza);
    const imagenes = await clienteDogCeo.obtenerImagenesPorRaza(razaValidada);

    return {
      raza: {
        id: razaValidada,
        nombre: formatearNombre(razaValidada),
      },
      imagenes,
    };
  }

  public async obtenerHistoriaDeRaza(raza: string): Promise<HistoriaDeRaza> {
    const razaCatalogo = await this.obtenerRazaPorId(raza);
    const resumen = await clienteWikipedia.buscarHistoria(razaCatalogo);

    return {
      raza: {
        id: razaCatalogo.id,
        nombre: razaCatalogo.nombre,
      },
      historia: resumen?.extracto || construirHistoriaFallback(razaCatalogo),
      fuente: {
        nombre: resumen?.fuente || 'Resumen interno',
        url: resumen?.url || null,
      },
    };
  }

  public async obtenerImagenRepresentativa(
    raza: string,
  ): Promise<ImagenRepresentativa> {
    const imagenes = await this.obtenerImagenesDeRaza(raza);
    const imagenRepresentativa = imagenes.imagenes[0];

    if (!imagenRepresentativa) {
      throw new AppError(
        404,
        'FEATURED_IMAGE_NOT_FOUND',
        'La raza seleccionada no tiene una imagen representativa disponible.',
      );
    }

    const recurso = await clienteDogCeo.descargarImagenDesdeUrl(imagenRepresentativa);

    return {
      raza: imagenes.raza,
      contenido: recurso.contenido,
      contentType: recurso.contentType,
    };
  }
}
