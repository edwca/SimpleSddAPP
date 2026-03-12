import { useQuery } from '@tanstack/react-query';

import { obtenerRazas } from '../../../services/api';

export const useBreedsQuery = () =>
  useQuery({
    queryKey: ['breeds'],
    queryFn: obtenerRazas,
    staleTime: 1000 * 60 * 10,
  });
