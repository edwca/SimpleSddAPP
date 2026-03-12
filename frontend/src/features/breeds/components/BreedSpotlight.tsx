import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import type { HistoriaDeRaza, Raza } from '../../../types/breed';

type BreedSpotlightProps = {
  raza: Raza | null;
  historia: HistoriaDeRaza | null;
  cargando: boolean;
  errorHistoria: boolean;
  imageUrl: string | null;
  descargandoImagen: boolean;
  onDownloadImage: () => void;
  onOpenImage: (imageUrl: string) => void;
};

export const BreedSpotlight = ({
  raza,
  historia,
  cargando,
  errorHistoria,
  imageUrl,
  descargandoImagen,
  onDownloadImage,
  onOpenImage,
}: BreedSpotlightProps): JSX.Element => {
  const [imagenCargando, setImagenCargando] = useState(true);
  const [imagenConError, setImagenConError] = useState(false);

  useEffect(() => {
    setImagenCargando(Boolean(imageUrl));
    setImagenConError(false);
  }, [imageUrl]);

  if (cargando) {
    return <LoadingSkeleton variant="spotlight" />;
  }

  if (!raza) {
    return (
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 8,
          background: 'rgba(255,255,255,0.74)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.55)',
        }}
      >
        <Stack spacing={1.2}>
          <Typography variant="h4">Explora una raza</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
            El panel principal mostrara una imagen representativa y una reseña
            resumida cuando elijas una raza desde la navegacion lateral.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box
      data-testid="breed-spotlight"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          xl: 'minmax(0, 1.08fr) minmax(0, 0.92fr)',
        },
        gap: 3,
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 360, md: 520 },
          borderRadius: 8,
          background:
            'linear-gradient(160deg, rgba(6, 14, 25, 0.95) 0%, rgba(15, 118, 110, 0.72) 140%)',
          boxShadow: '0 32px 80px rgba(11, 18, 32, 0.14)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        {imageUrl ? (
          <>
            <Box
              component="img"
              src={imageUrl}
              alt={`Imagen principal de ${raza.nombre}`}
              data-testid="featured-image"
              onLoad={() => setImagenCargando(false)}
              onError={() => {
                setImagenCargando(false);
                setImagenConError(true);
              }}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: 360, md: 520 },
                objectFit: 'cover',
                display: imagenConError ? 'none' : 'block',
                transform: imagenCargando ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 320ms ease, opacity 220ms ease',
                opacity: imagenCargando ? 0.6 : 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(5, 9, 18, 0.02) 28%, rgba(5, 9, 18, 0.72) 100%)',
              }}
            />
          </>
        ) : null}

        {imagenConError || !imageUrl ? (
          <Stack
            spacing={1.2}
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              height: '100%',
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 4 },
              color: 'common.white',
            }}
          >
            <Typography variant="h4">Imagen no disponible</Typography>
            <Typography sx={{ maxWidth: 440, color: 'rgba(255,255,255,0.78)' }}>
              No fue posible cargar la imagen representativa de esta raza desde el
              proxy interno.
            </Typography>
          </Stack>
        ) : null}

        <Stack
          spacing={1.5}
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3.5 },
            color: 'common.white',
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="Imagen representativa"
              sx={{
                bgcolor: 'rgba(255,255,255,0.16)',
                color: 'common.white',
                backdropFilter: 'blur(18px)',
              }}
            />
            {raza.subRazas.length > 0 ? (
              <Chip
                label={`${raza.subRazas.length} subraza(s)`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              />
            ) : null}
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1.5}
          >
            <Box>
              <Typography variant="h3" sx={{ color: 'common.white' }}>
                {raza.nombre}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.74)', mt: 0.5 }}>
                Un vistazo limpio de la raza activa sin grillas ni distracciones.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DownloadRoundedIcon />}
                disabled={descargandoImagen || imagenConError}
                onClick={onDownloadImage}
              >
                {descargandoImagen ? 'Descargando...' : 'Descargar imagen'}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<OpenInFullRoundedIcon />}
                disabled={!imageUrl || imagenConError}
                onClick={() => {
                  if (imageUrl) {
                    onOpenImage(imageUrl);
                  }
                }}
                sx={{
                  borderColor: 'rgba(255,255,255,0.32)',
                  color: 'common.white',
                }}
              >
                Ampliar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: { xs: 2.75, md: 3.5 },
          borderRadius: 8,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,251,251,0.88) 100%)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 22px 70px rgba(11, 18, 32, 0.08)',
        }}
      >
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.22em', color: 'secondary.dark' }}
            >
              Contexto e historia
            </Typography>
            <Typography variant="h4">Perfil narrativo</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              Search Dog concentra la informacion principal de cada raza en una sola
              vista para lectura rapida.
            </Typography>
          </Stack>

          {errorHistoria ? (
            <Alert severity="error">
              No fue posible cargar la historia de la raza seleccionada.
            </Alert>
          ) : null}

          <Box
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: 5,
              background:
                'linear-gradient(180deg, rgba(236,253,245,0.84) 0%, rgba(255,255,255,0.72) 100%)',
              border: '1px solid rgba(15,118,110,0.12)',
            }}
          >
            <Typography
              color="text.primary"
              sx={{
                lineHeight: 1.9,
                whiteSpace: 'pre-line',
                textWrap: 'pretty',
              }}
            >
              {historia?.historia ||
                'La historia de esta raza no esta disponible en este momento.'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {raza.subRazas.length > 0
              ? raza.subRazas.map((subRaza) => (
                  <Chip key={subRaza} label={subRaza} variant="outlined" />
                ))
              : (
                  <Chip label="Sin subrazas registradas" variant="outlined" />
                )}
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Fuente utilizada
              </Typography>
              <Typography variant="subtitle1">
                {historia?.fuente.nombre || 'Resumen interno'}
              </Typography>
            </Box>

            {historia?.fuente.url ? (
              <Button
                variant="text"
                color="secondary"
                href={historia.fuente.url}
                target="_blank"
                rel="noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
              >
                Abrir referencia
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
