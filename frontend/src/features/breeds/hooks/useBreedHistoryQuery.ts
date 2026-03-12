import { useQuery } from '@tanstack/react-query';

import { obtenerHistoriaDeRaza } from '../../../services/api';

export const useBreedHistoryQuery = (raza: string | null) =>
  useQuery({
    queryKey: ['breed-history', raza],
    queryFn: () => obtenerHistoriaDeRaza(raza ?? ''),
    enabled: Boolean(raza),
    staleTime: 1000 * 60 * 30,
  });
