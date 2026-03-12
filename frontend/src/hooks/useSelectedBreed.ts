import { startTransition, useState } from 'react';

type UseSelectedBreed = {
  razaSeleccionada: string | null;
  seleccionarRaza: (raza: string) => void;
};

export const useSelectedBreed = (): UseSelectedBreed => {
  const [razaSeleccionada, setRazaSeleccionada] = useState<string | null>(null);

  const seleccionarRaza = (raza: string) => {
    startTransition(() => {
      setRazaSeleccionada(raza);
    });
  };

  return {
    razaSeleccionada,
    seleccionarRaza,
  };
};
