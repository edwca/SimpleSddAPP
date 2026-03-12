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

export type RespuestaListadoRazas = {
  datos: Raza[];
  meta: {
    total: number;
  };
};

export type RespuestaImagenesDeRaza = {
  datos: ImagenesDeRaza;
  meta: {
    total: number;
  };
};

export type RespuestaHistoriaDeRaza = {
  datos: HistoriaDeRaza;
};
