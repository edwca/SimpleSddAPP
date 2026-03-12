import { Alert, Box, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import type { Raza } from '../../../types/breed';

type BreedListProps = {
  razas: Raza[];
  razaSeleccionada: string | null;
  cargando: boolean;
  error: boolean;
  onSelectBreed: (raza: string) => void;
  mensajeVacio?: string;
};

export const BreedList = ({
  razas,
  razaSeleccionada,
  cargando,
  error,
  onSelectBreed,
  mensajeVacio = 'No hay razas para mostrar con el filtro actual.',
}: BreedListProps): JSX.Element => {
  if (cargando) {
    return (
      <Box px={2} pb={3}>
        <LoadingSkeleton variant="lista" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box px={2} pb={3}>
        <Alert severity="error">No fue posible cargar la lista de razas.</Alert>
      </Box>
    );
  }

  if (razas.length === 0) {
    return (
      <Box px={2} pb={3}>
        <Alert severity="info">{mensajeVacio}</Alert>
      </Box>
    );
  }

  return (
    <List
      sx={{
        px: 1.5,
        pb: 3,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {razas.map((raza) => (
        <ListItemButton
          key={raza.id}
          selected={raza.id === razaSeleccionada}
          onClick={() => onSelectBreed(raza.id)}
          data-testid={`breed-item-${raza.id}`}
          sx={{
            alignItems: 'flex-start',
            mb: 0.75,
            borderRadius: '28px',
            px: 2,
            py: 1.65,
            transition: 'transform 160ms ease, box-shadow 160ms ease',
            border: '1px solid rgba(148, 163, 184, 0.12)',
            backgroundColor:
              raza.id === razaSeleccionada
                ? 'rgba(255,255,255,0.88)'
                : 'rgba(255,255,255,0.52)',
            '&:hover': {
              transform: 'translateX(4px)',
              boxShadow: '0 14px 24px rgba(15, 23, 42, 0.08)',
            },
          }}
        >
          <ListItemText
            primary={raza.nombre}
            secondary={
              raza.subRazas.length > 0 ? (
                <Stack direction="row" spacing={0.75} flexWrap="wrap" mt={0.5}>
                  {raza.subRazas.map((subRaza) => (
                    <Typography variant="caption" color="text.secondary" key={subRaza}>
                      {subRaza}
                    </Typography>
                  ))}
                </Stack>
              ) : (
                'Perfil general'
              )
            }
            secondaryTypographyProps={{
              component: 'div',
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};
