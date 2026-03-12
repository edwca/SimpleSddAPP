import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Autocomplete,
  Box,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import type { Raza } from '../../../types/breed';

import { BreedList } from './BreedList';

type SidebarProps = {
  razas: Raza[];
  razaSeleccionada: string | null;
  cargando: boolean;
  error: boolean;
  onSelectBreed: (raza: string) => void;
};

const anchoSidebar = 320;

export const Sidebar = ({
  razas,
  razaSeleccionada,
  cargando,
  error,
  onSelectBreed,
}: SidebarProps): JSX.Element => {
  const [abiertoMobile, setAbiertoMobile] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const theme = useTheme();
  const esDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const razaActiva = razas.find((raza) => raza.id === razaSeleccionada) ?? null;
  const terminoBusqueda = textoBusqueda.trim().toLowerCase();
  const razasFiltradas = razas.filter((raza) => {
    if (!terminoBusqueda) {
      return true;
    }

    return (
      raza.nombre.toLowerCase().includes(terminoBusqueda) ||
      raza.id.toLowerCase().includes(terminoBusqueda) ||
      raza.subRazas.some((subRaza) =>
        subRaza.toLowerCase().includes(terminoBusqueda),
      )
    );
  });

  const contenido = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(245,249,248,0.96) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 46,
                height: 46,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 3.5,
                bgcolor: 'rgba(248, 250, 252, 0.82)',
                color: 'secondary.contrastText',
                boxShadow: '0 18px 36px rgba(11, 18, 32, 0.12)',
                border: '1px solid rgba(255,255,255,0.65)',
              }}
            >
              <PetsRoundedIcon sx={{ color: 'secondary.main' }} />
            </Box>
            <Stack spacing={0.15}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: '0.24em', color: 'text.secondary' }}
              >
                Search Dog
              </Typography>
              <Typography variant="h6">Razas con historia</Typography>
            </Stack>
          </Stack>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Busca una raza y abre una ficha visual unica servida desde el backend.
          </Typography>
        </Stack>

        <Autocomplete
          disablePortal
          options={razas}
          value={razaActiva}
          inputValue={textoBusqueda}
          onInputChange={(_event, valor) => {
            setTextoBusqueda(valor);
          }}
          onChange={(_event, valor) => {
            if (!valor) {
              return;
            }

            onSelectBreed(valor.id);
            setTextoBusqueda(valor.nombre);
            setAbiertoMobile(false);
          }}
          getOptionLabel={(option) => option.nombre}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="No se encontraron razas"
          sx={{ mt: 2.5 }}
          renderInput={(params) => (
            <TextField
              id={params.id}
              fullWidth
              size="small"
              placeholder="Buscar raza"
              label="Buscar raza"
              inputProps={params.inputProps}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', px: 3, pb: 1 }}
        >
          {razasFiltradas.length} raza(s) disponibles
        </Typography>

        <BreedList
          razas={razasFiltradas}
          razaSeleccionada={razaSeleccionada}
          cargando={cargando}
          error={error}
          mensajeVacio="No hay coincidencias para la busqueda actual."
          onSelectBreed={(raza) => {
            onSelectBreed(raza);
            setAbiertoMobile(false);
          }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      {!esDesktop ? (
        <IconButton
          aria-label="Abrir menu de razas"
          onClick={() => setAbiertoMobile(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1301,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      ) : null}

      {esDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: anchoSidebar,
            flexShrink: 0,
          }}
          PaperProps={{
            sx: {
              width: anchoSidebar,
              border: 'none',
              boxShadow: 'inset -1px 0 0 rgba(148, 163, 184, 0.16)',
            },
          }}
          open
        >
          {contenido}
        </Drawer>
      ) : (
        <Drawer
          open={abiertoMobile}
          onClose={() => setAbiertoMobile(false)}
          PaperProps={{
            sx: {
              width: 'min(90vw, 360px)',
            },
          }}
        >
          {contenido}
        </Drawer>
      )}
    </>
  );
};
